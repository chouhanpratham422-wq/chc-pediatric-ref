'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Stethoscope,
  Search,
  Moon,
  Sun,
  Download,
  Menu,
  X,
  CheckCircle,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const {
    isDark,
    toggleTheme,
    language,
    setLanguage,
    t,
    setIsCommandPaletteOpen,
    isAppInstallable,
    installApp,
    favorites,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHindi = language === 'hi';

  const navLinks = [
    { href: '/', label: t.home },
    { href: '/medicines', label: t.searchMedicines },
    { href: '/dose-calculator', label: t.doseCalculator },
    {
      href: '/emergency',
      label: t.emergencyReference,
      highlight: true,
    },
    { href: '/compare', label: t.compare },
    {
      href: '/favorites',
      label: t.favorites,
      badge: favorites.length > 0 ? favorites.length : undefined,
    },
    { href: '/admin', label: t.admin },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-slate-200/80 dark:border-gray-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-3 min-w-0">

        {/* Logo and Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 shrink min-w-0 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Stethoscope size={22} />
          </div>

          <div className="min-w-0">
            {/* App Title + Badge */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                {t.appTitle}
              </span>

              <span className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800 whitespace-nowrap">
                {t.officialBadge}
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-[11px] text-slate-500 dark:text-gray-400 font-medium hidden md:block mt-0.5 whitespace-nowrap">
              {t.officialSub}
            </p>
          </div>
        </Link>

        {/* Global Quick Search Button (Ctrl+K) */}
        <button
          type="button"
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-700 transition-colors text-xs lg:w-72 justify-between cursor-pointer"
          aria-label={isHindi ? 'दवा खोज खोलें' : 'Open medicine search'}
        >
          <span className="flex items-center gap-2 truncate">
            <Search size={14} className="text-slate-400 shrink-0" />

            <span className="truncate">
              {t.searchPlaceholder}
            </span>
          </span>

          <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-gray-400 shadow-2xs">
            Ctrl+K
          </kbd>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50'
                    : link.highlight
                    ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
                    : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}

                {link.badge !== undefined && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Utility Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">

          {/* Mobile Search */}
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="md:hidden p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors shrink-0"
            aria-label={isHindi ? 'खोज' : 'Search'}
            title={isHindi ? 'खोज' : 'Search'}
          >
            <Search size={20} />
          </button>

          {/* PWA Install Button */}
          {isAppInstallable && (
            <button
              type="button"
              onClick={installApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium shadow-xs transition-colors"
            >
              <Download size={14} />
              <span>{t.installApp}</span>
            </button>
          )}

          {/* Language Switcher */}
          <div
            className="flex items-center bg-slate-100 dark:bg-gray-800 p-0.5 rounded-xl border border-slate-200 dark:border-gray-700 shrink-0"
            aria-label={t.currentLanguageLabel}
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-1.5 sm:px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white dark:bg-sky-600 text-sky-700 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-1.5 sm:px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-1.5 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors cursor-pointer shadow-2xs shrink-0"
            title={
              isDark
                ? isHindi
                  ? 'लाइट मोड पर जाएं'
                  : 'Switch to Light Mode'
                : isHindi
                ? 'डार्क मोड पर जाएं'
                : 'Switch to Dark Mode'
            }
            aria-label={
              isDark
                ? isHindi
                  ? 'लाइट मोड पर जाएं'
                  : 'Switch to light mode'
                : isHindi
                ? 'डार्क मोड पर जाएं'
                : 'Switch to dark mode'
            }
          >
            {isDark ? (
              <>
                <Sun
                  size={17}
                  className="text-amber-400 animate-spin-slow"
                />
                <span className="text-[11px] font-bold text-amber-300 hidden sm:inline">
                  {t.lightMode}
                </span>
              </>
            ) : (
              <>
                <Moon size={17} className="text-slate-600" />
                <span className="text-[11px] font-bold text-slate-700 hidden sm:inline">
                  {t.darkMode}
                </span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer shrink-0"
            aria-label={isHindi ? 'मेनू खोलें या बंद करें' : 'Toggle menu'}
            title={isHindi ? 'मेनू' : 'Menu'}
          >
            {mobileMenuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-3 pb-5 space-y-1 animate-in slide-in-from-top-2 duration-150">

          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 font-semibold'
                    : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>{link.label}</span>

                {link.badge !== undefined && (
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100 dark:border-gray-800">
            <Link
              href="/validation"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            >
              <CheckCircle size={14} className="text-emerald-500" />

              <span>
                {t.validation}{' '}
                {isHindi
                  ? '- 90 आइटम सत्यापित'
                  : '- 90 Items Verified'}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};