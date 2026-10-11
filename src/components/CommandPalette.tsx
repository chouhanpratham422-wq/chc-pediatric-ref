'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { RiskBadge } from '@/components/RiskBadge';
import {
  Search,
  X,
  Mic,
  MicOff,
  CornerDownLeft,
  Pill,
} from 'lucide-react';

import {
  getMedicineName,
  getAlternativeName,
  getDosageForm,
  getAvailableStrength,
  getMedicineDose,
} from '@/lib/medicine-language';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    medicines,
    t,
    showToast,
    language,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const isHindi = language === 'hi';

  // Filter medicines
  const filteredMeds =
    query.trim() === ''
      ? medicines.slice(0, 8)
      : medicines
          .filter((m) => {
            const q = query.toLowerCase();

            const hindiName = getMedicineName(m, language).toLowerCase();
            const hindiAlternative =
              getAlternativeName(m, language)?.toLowerCase() || '';
            const hindiForm = getDosageForm(m, language).toLowerCase();
            const hindiStrength =
              getAvailableStrength(m, language).toLowerCase();
            const hindiDose = getMedicineDose(m, language).toLowerCase();

            return (
              // Original English data
              m.genericName.toLowerCase().includes(q) ||
              (m.alternativeName &&
                m.alternativeName.toLowerCase().includes(q)) ||
              m.availableStrength.toLowerCase().includes(q) ||
              m.dosageForm.toLowerCase().includes(q) ||
              m.pediatricDose.toLowerCase().includes(q) ||

              // Current language display data
              hindiName.includes(q) ||
              hindiAlternative.includes(q) ||
              hindiStrength.includes(q) ||
              hindiForm.includes(q) ||
              hindiDose.includes(q)
            );
          })
          .slice(0, 10);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isCommandPaletteOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev < filteredMeds.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredMeds.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();

      if (filteredMeds[selectedIndex]) {
        const target = filteredMeds[selectedIndex];

        setIsCommandPaletteOpen(false);
        router.push(`/medicines/${target.id}`);
      }
    }
  };

  // Web Speech API Voice Search
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast(
        isHindi
          ? 'इस ब्राउज़र में वॉइस सर्च उपलब्ध नहीं है।'
          : 'Voice search not supported in this browser.',
        'warning'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();

      recognition.lang = isHindi ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;

        setQuery(speechResult);
        setIsListening(false);

        showToast(
          isHindi
            ? `सुना गया: "${speechResult}"`
            : `Heard: "${speechResult}"`,
          'info'
        );
      };

      recognition.onspeechend = () => {
        recognition.stop();
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);

        setIsListening(false);

        showToast(
          isHindi
            ? `वॉइस त्रुटि: ${event.error}`
            : `Voice error: ${event.error}`,
          'error'
        );
      };
    } catch {
      setIsListening(false);

      showToast(
        isHindi
          ? 'माइक्रोफोन शुरू नहीं हो सका।'
          : 'Could not initialize microphone.',
        'error'
      );
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-12 md:pt-20 px-4 animate-in fade-in duration-150"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-gray-800">
          <Search
            size={20}
            className="text-slate-400 dark:text-gray-500 shrink-0 mr-3"
          />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              isListening
                ? isHindi
                  ? 'अभी सुन रहे हैं... दवा का नाम बोलें...'
                  : 'Listening now... Speak medicine name...'
                : t.searchPlaceholder
            }
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-hidden text-base md:text-lg"
          />

          {/* Voice Search Button */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            title={
              isListening
                ? isHindi
                  ? 'सुन रहे हैं...'
                  : 'Listening...'
                : isHindi
                ? 'वॉइस सर्च'
                : 'Voice Search'
            }
            aria-label={
              isListening
                ? isHindi
                  ? 'सुन रहे हैं'
                  : 'Listening'
                : isHindi
                ? 'वॉइस सर्च'
                : 'Voice Search'
            }
            className={`p-2 rounded-lg transition-colors mr-1 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-gray-800'
            }`}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-gray-300 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            title={isHindi ? 'बंद करें' : 'Close'}
            aria-label={isHindi ? 'बंद करें' : 'Close'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-gray-800">
          {filteredMeds.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-gray-400 text-sm">
              <Pill
                size={32}
                className="mx-auto mb-2 text-slate-300 dark:text-gray-600"
              />

              {t.noResults}

              <div className="text-xs text-slate-400 mt-1">
                {isHindi
                  ? 'दवा का नाम, फॉर्म या खुराक से संबंधित शब्द आज़माएं'
                  : 'Try generic name, formulation, or dose keyword'}
              </div>
            </div>
          ) : (
            filteredMeds.map((med, index) => {
              const isSelected = index === selectedIndex;

              const displayName = getMedicineName(med, language);
              const displayAlternative = getAlternativeName(med, language);
              const displayForm = getDosageForm(med, language);
              const displayStrength = getAvailableStrength(
                med,
                language
              );
              const displayDose = getMedicineDose(med, language);

              return (
                <div
                  key={med.id}
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    router.push(`/medicines/${med.id}`);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100'
                      : 'hover:bg-slate-50 dark:hover:bg-gray-800/60 text-slate-800 dark:text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {/* Medicine ID */}
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-gray-500 shrink-0">
                      #{med.id}
                    </span>

                    <div className="truncate">
                      {/* Medicine Name */}
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm md:text-base text-slate-900 dark:text-white truncate">
                          {displayName}
                        </span>

                        {displayAlternative && (
                          <span className="text-xs text-slate-500 dark:text-gray-400 truncate">
                            ({displayAlternative})
                          </span>
                        )}
                      </div>

                      {/* Medicine Details */}
                      <div className="text-xs text-slate-500 dark:text-gray-400 truncate mt-0.5">
                        <span className="font-medium text-slate-700 dark:text-gray-300">
                          {displayForm}:
                        </span>{' '}
                        {displayStrength} •{' '}
                        {displayDose.substring(0, 45)}...
                      </div>
                    </div>
                  </div>

                  {/* Risk + Keyboard Indicator */}
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <RiskBadge
                      category={med.riskCategory}
                      size="sm"
                      showIcon={false}
                    />

                    {isSelected && (
                      <CornerDownLeft
                        size={14}
                        className="text-sky-600 dark:text-sky-400 hidden sm:block"
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-gray-800/80 border-t border-slate-200 dark:border-gray-800 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded text-[10px]">
                ↑
              </kbd>

              <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded text-[10px]">
                ↓
              </kbd>

              {isHindi ? 'नेविगेट करें' : 'Navigate'}
            </span>

            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded text-[10px]">
                ↵
              </kbd>

              {isHindi ? 'खोलें' : 'Open'}
            </span>

            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded text-[10px]">
                Esc
              </kbd>

              {isHindi ? 'बंद करें' : 'Close'}
            </span>
          </div>

          <span className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">
            {isHindi
              ? '90 प्रामाणिक CHC प्रविष्टियां'
              : '90 Authentic CHC Entries'}
          </span>
        </div>
      </div>
    </div>
  );
};