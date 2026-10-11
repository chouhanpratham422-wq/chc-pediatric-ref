'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Medicine, AdminChangeLog } from '@/types/medicine';
import { MEDICINES_DATA } from '@/data/medicines';
import { TRANSLATIONS, Language } from '@/lib/translations';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS.en;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Recently Viewed
  recentlyViewed: string[];
  addRecentlyViewed: (id: string) => void;
  clearRecentlyViewed: () => void;

  // Medicine Data (Original + Admin edits)
  medicines: Medicine[];
  getMedicineById: (id: string) => Medicine | undefined;
  updateMedicine: (updatedMed: Medicine, reason: string) => void;
  addCustomMedicine: (newMed: Medicine) => void;
  resetDatabaseToOriginal: () => void;
  changeLogs: AdminChangeLog[];

  // Global Command / Search Palette
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;

  // PWA Install Prompt
  deferredPrompt: any;
  installApp: () => void;
  isAppInstallable: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [language, setLanguageState] = useState<Language>('en');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>(MEDICINES_DATA);
  const [changeLogs, setChangeLogs] = useState<AdminChangeLog[]>([]);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAppInstallable, setIsAppInstallable] = useState<boolean>(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('chc_theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }

      const savedLang = localStorage.getItem('chc_lang') as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
        setLanguageState(savedLang);
      }

      const savedFavs = localStorage.getItem('chc_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }

      const savedRecents = localStorage.getItem('chc_recent_viewed');
      if (savedRecents) {
        setRecentlyViewed(JSON.parse(savedRecents));
      }

      const savedCustomMeds = localStorage.getItem('chc_custom_medicines');
      if (savedCustomMeds) {
        setMedicines(JSON.parse(savedCustomMeds));
      }

      const savedLogs = localStorage.getItem('chc_change_logs');
      if (savedLogs) {
        setChangeLogs(JSON.parse(savedLogs));
      }
    } catch (e) {
      console.error('Failed to load local settings:', e);
    }

    // PWA beforeinstallprompt handler
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsAppInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Global keyboard listener for Ctrl+K / Cmd+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem('chc_theme', 'dark');
        showToast('Dark mode enabled / डार्क मोड सक्रिय', 'info');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        localStorage.setItem('chc_theme', 'light');
        showToast('Light mode enabled / लाइट मोड सक्रिय', 'info');
      }
      return next;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('chc_lang', lang);
    if (lang === 'hi') {
      showToast('भाषा बदलकर हिन्दी कर दी गई', 'success');
    } else {
      showToast('Language switched to English', 'success');
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('chc_favorites', JSON.stringify(next));
      showToast(exists ? 'Removed from favorites' : 'Added to favorites', 'info');
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addRecentlyViewed = (id: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item !== id);
      const next = [id, ...filtered].slice(0, 10);
      localStorage.setItem('chc_recent_viewed', JSON.stringify(next));
      return next;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('chc_recent_viewed');
    showToast('Viewing history cleared', 'info');
  };

  const getMedicineById = (id: string) => {
    return medicines.find((m) => m.id === id);
  };

  const updateMedicine = (updatedMed: Medicine, reason: string) => {
    setMedicines((prev) => {
      const next = prev.map((m) => (m.id === updatedMed.id ? updatedMed : m));
      localStorage.setItem('chc_custom_medicines', JSON.stringify(next));
      return next;
    });

    const newLog: AdminChangeLog = {
      id: Date.now().toString(),
      medicineId: updatedMed.id,
      medicineName: updatedMed.genericName,
      timestamp: new Date().toISOString(),
      action: 'UPDATE_DOSE',
      details: reason || 'Updated medicine clinical or stock entry',
      author: 'Clinical Pharmacist / Medical Officer',
    };

    setChangeLogs((prev) => {
      const next = [newLog, ...prev];
      localStorage.setItem('chc_change_logs', JSON.stringify(next));
      return next;
    });

    showToast(`Updated ${updatedMed.genericName}`, 'success');
  };

  const addCustomMedicine = (newMed: Medicine) => {
    setMedicines((prev) => {
      const next = [...prev, newMed];
      localStorage.setItem('chc_custom_medicines', JSON.stringify(next));
      return next;
    });

    const newLog: AdminChangeLog = {
      id: Date.now().toString(),
      medicineId: newMed.id,
      medicineName: newMed.genericName,
      timestamp: new Date().toISOString(),
      action: 'ADD_MEDICINE',
      details: `Added new stock entry: ${newMed.genericName} (${newMed.availableStrength})`,
      author: 'Medical Officer / CHC Admin',
    };

    setChangeLogs((prev) => {
      const next = [newLog, ...prev];
      localStorage.setItem('chc_change_logs', JSON.stringify(next));
      return next;
    });

    showToast(`Added ${newMed.genericName}`, 'success');
  };

  const resetDatabaseToOriginal = () => {
    setMedicines(MEDICINES_DATA);
    setChangeLogs([]);
    localStorage.removeItem('chc_custom_medicines');
    localStorage.removeItem('chc_change_logs');
    showToast('Reset database to authentic PDF reference', 'info');
  };

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('Thank you for installing CHC Jhaknawda App!', 'success');
      setIsAppInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleTheme,
        language,
        setLanguage,
        t,
        favorites,
        toggleFavorite,
        isFavorite,
        recentlyViewed,
        addRecentlyViewed,
        clearRecentlyViewed,
        medicines,
        getMedicineById,
        updateMedicine,
        addCustomMedicine,
        resetDatabaseToOriginal,
        changeLogs,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        toasts,
        showToast,
        dismissToast,
        deferredPrompt,
        installApp,
        isAppInstallable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
