'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { MedicineCard } from '@/components/MedicineCard';
import { getMedicineName } from '@/lib/medicine-language';

import {
  Search,
  Mic,
  MicOff,
  Sparkles,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Pill,
  Calculator,
  AlertOctagon,
  Star,
  Clock,
  Trash2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const {
    t,
    language,
    medicines,
    recentlyViewed,
    clearRecentlyViewed,
    getMedicineById,
    setIsCommandPaletteOpen,
    showToast,
  } = useApp();

  const isHindi = language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState<string | null>(null);

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalCount = medicines.length;

  const highRiskCount = medicines.filter(
    (m) => m.riskCategory === 'HIGH RISK / ALERT'
  ).length;

  const cautionCount = medicines.filter(
    (m) => m.riskCategory === 'CAUTION REQUIRED'
  ).length;

  const safeCount = medicines.filter(
    (m) => m.riskCategory === 'GENERALLY SAFE'
  ).length;

  // =========================================================
  // POPULAR MEDICINES
  // =========================================================

  const popularMeds = medicines
    .filter((m) => m.popular)
    .slice(0, 6);

  // =========================================================
  // RECENTLY VIEWED
  // =========================================================

  const recentMeds = recentlyViewed
    .map((id) => getMedicineById(id))
    .filter(
      (m): m is NonNullable<typeof m> =>
        m !== undefined
    );

  // =========================================================
  // DIRECT SEARCH
  // =========================================================

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(
        `/medicines?q=${encodeURIComponent(searchQuery.trim())}`
      );
    } else {
      setIsCommandPaletteOpen(true);
    }
  };

  // =========================================================
  // VOICE SEARCH
  // =========================================================

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast(
        isHindi
          ? 'इस ब्राउज़र में वॉइस सर्च उपलब्ध नहीं है।'
          : 'Voice search not supported on this browser.',
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
        const result =
          event.results[0][0].transcript;

        setSearchQuery(result);
        setIsListening(false);

        showToast(
          isHindi
            ? `सुना गया: "${result}"`
            : `Heard: "${result}"`,
          'info'
        );

        router.push(
          `/medicines?q=${encodeURIComponent(result)}`
        );
      };

      recognition.onspeechend = () => {
        recognition.stop();
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
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
          ? 'माइक्रोफ़ोन शुरू नहीं किया जा सका।'
          : 'Could not initialize microphone.',
        'error'
      );
    }
  };

  // =========================================================
  // AI / NATURAL LANGUAGE QUERY
  // =========================================================

  const handleAiQuery = (
    promptText: string,
    queryType?: string
  ) => {
    setAiPrompt(promptText);

    const p = promptText.toLowerCase();

    // -------------------------------------------------------
    // PARACETAMOL
    // -------------------------------------------------------

    if (
      queryType === 'paracetamol' ||
      p.includes('paracetamol') ||
      p.includes('पैरासिटामोल')
    ) {
      const med = medicines.find(
        (m) => m.id === '76'
      );

      if (med) {
        const medName = getMedicineName(
          med,
          language
        );

        setAiResult(
          isHindi
            ? `${medName} (#76): ${med.pediatricDose}. CHC स्टॉक: ${med.availableStrength}. जोखिम: ${med.riskCategory}.`
            : `${medName} (#76): ${med.pediatricDose}. CHC Stock: ${med.availableStrength}. Risk: ${med.riskCategory}.`
        );

        return;
      }
    }

    // -------------------------------------------------------
    // GENERALLY SAFE
    // -------------------------------------------------------

    if (
      queryType === 'generallySafe' ||
      p.includes('generally safe') ||
      p.includes('safe medicines') ||
      p.includes('सामान्यतः सुरक्षित') ||
      p.includes('सुरक्षित दवाएं')
    ) {
      const safeMeds = medicines
        .filter(
          (m) =>
            m.riskCategory === 'GENERALLY SAFE'
        )
        .map((m) =>
          getMedicineName(m, language)
        );

      setAiResult(
        isHindi
          ? `${safeMeds.length} सामान्यतः सुरक्षित दवाएं सूचीबद्ध हैं: ${safeMeds
              .slice(0, 6)
              .join(', ')}${safeMeds.length > 6 ? '...' : ''}`
          : `${safeMeds.length} Generally Safe medicines listed: ${safeMeds
              .slice(0, 6)
              .join(', ')}${safeMeds.length > 6 ? '...' : ''}`
      );

      return;
    }

    // -------------------------------------------------------
    // CAUTION REQUIRED
    // -------------------------------------------------------

    if (
      queryType === 'cautionRequired' ||
      p.includes('caution required') ||
      p.includes('caution medicines') ||
      p.includes('सावधानी आवश्यक') ||
      p.includes('सावधानी वाली दवाएं')
    ) {
      const cautionMeds = medicines
        .filter(
          (m) =>
            m.riskCategory === 'CAUTION REQUIRED'
        )
        .map((m) =>
          getMedicineName(m, language)
        );

      setAiResult(
        isHindi
          ? `${cautionMeds.length} सावधानी आवश्यक वाली दवाएं सूचीबद्ध हैं: ${cautionMeds
              .slice(0, 6)
              .join(', ')}${cautionMeds.length > 6 ? '...' : ''}`
          : `${cautionMeds.length} Caution Required medicines listed: ${cautionMeds
              .slice(0, 6)
              .join(', ')}${cautionMeds.length > 6 ? '...' : ''}`
      );

      return;
    }

    // -------------------------------------------------------
    // INJECTION MEDICINES
    // -------------------------------------------------------

    if (
      queryType === 'injection' ||
      p.includes('injection') ||
      p.includes('inj') ||
      p.includes('इंजेक्शन')
    ) {
      const injs = medicines
        .filter((m) => m.dosageForm === 'INJ')
        .map((m) =>
          getMedicineName(m, language)
        );

      setAiResult(
        isHindi
          ? `CHC स्टॉक में ${injs.length} इंजेक्शन दवाएं मिलीं, जिनमें शामिल हैं: ${injs
              .slice(0, 6)
              .join(', ')}...`
          : `Found ${injs.length} injection medicines in CHC stock, including: ${injs
              .slice(0, 6)
              .join(', ')}...`
      );

      return;
    }

    // -------------------------------------------------------
    // HIGH RISK
    // -------------------------------------------------------

    if (
      queryType === 'highRisk' ||
      p.includes('high risk') ||
      p.includes('alert') ||
      p.includes('उच्च जोखिम') ||
      p.includes('सतर्कता')
    ) {
      const hr = medicines
        .filter(
          (m) =>
            m.riskCategory ===
            'HIGH RISK / ALERT'
        )
        .map((m) =>
          getMedicineName(m, language)
        );

      setAiResult(
        isHindi
          ? `${hr.length} उच्च जोखिम / सतर्कता वाली दवाएं सूचीबद्ध हैं: ${hr
              .slice(0, 5)
              .join(', ')}... (सख्त सत्यापन आवश्यक)।`
          : `${hr.length} High Risk / Alert medicines listed: ${hr
              .slice(0, 5)
              .join(', ')}... (Strict verification required).`
      );

      return;
    }

    // -------------------------------------------------------
    // 500 MG
    // -------------------------------------------------------

    if (
      queryType === '500mg' ||
      p.includes('500 mg') ||
      p.includes('500mg') ||
      p.includes('500 एमजी')
    ) {
      const s500 = medicines
        .filter((m) =>
          m.availableStrength.includes('500')
        )
        .map((m) =>
          getMedicineName(m, language)
        );

      setAiResult(
        isHindi
          ? `CHC स्टॉक में 500 mg स्ट्रेंथ वाली ${s500.length} दवाएं मिलीं: ${s500
              .slice(0, 5)
              .join(', ')}।`
          : `Found ${s500.length} medicines with 500 mg strength in CHC stock: ${s500
              .slice(0, 5)
              .join(', ')}.`
      );

      return;
    }

    // -------------------------------------------------------
    // NO RESULT
    // -------------------------------------------------------

    setAiResult(
      isHindi
        ? 'वर्तमान संदर्भ डेटाबेस में यह जानकारी उपलब्ध नहीं है।'
        : 'Information not available in the current reference database.'
    );
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="space-y-12 animate-in fade-in duration-300">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-800 text-white p-6 sm:p-10 md:p-12 shadow-xl shadow-sky-900/10">

        <div className="relative z-10 max-w-3xl space-y-6">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-sky-100 text-xs font-semibold tracking-wide border border-white/20">

            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

            {isHindi
              ? 'सामुदायिक स्वास्थ्य केन्द्र झकनावदा • 90 दवा प्रविष्टियां'
              : 'Community Health Centre Jhaknawda • 90 Drug Entries'}

          </div>

          {/* Title */}

          <div className="space-y-2">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {isHindi
                ? 'सीएचसी झकनावदा'
                : 'CHC Jhaknawda'}
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-sky-100">
              {isHindi
                ? 'बाल चिकित्सा त्वरित संदर्भ'
                : 'Pediatric Drug Quick-Reference'}
            </p>

            <p className="text-sm sm:text-base text-sky-100/90 font-normal leading-relaxed pt-1">
              {t.heroTagline}
            </p>

          </div>

          {/* Main Search */}

          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full max-w-2xl pt-2"
          >

            <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-sky-300/30 overflow-hidden p-1.5 focus-within:ring-4 focus-within:ring-sky-400/30 transition-all">

              <Search
                size={22}
                className="text-slate-400 ml-3 shrink-0"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder={
                  isListening
                    ? isHindi
                      ? 'सुन रहा है... दवा का नाम बोलें...'
                      : 'Listening... Speak medicine name...'
                    : isHindi
                      ? 'दवा का नाम, साल्ट या उपयोग खोजें...'
                      : 'Search medicine name, salt, or indication...'
                }
                className="w-full bg-transparent px-3 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 text-sm md:text-base focus:outline-hidden"
              />

              {/* Voice */}

              <button
                type="button"
                onClick={handleVoiceSearch}
                title={
                  isHindi
                    ? 'वॉइस सर्च'
                    : 'Voice Search'
                }
                className={`p-2.5 rounded-xl transition-all mr-1.5 ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-gray-800'
                }`}
              >
                {isListening ? (
                  <MicOff size={18} />
                ) : (
                  <Mic size={18} />
                )}
              </button>

              {/* Search button */}

              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs md:text-sm transition-colors shadow-sm shrink-0"
              >
                {t.searchMedicines}
              </button>

            </div>

            {/* Search hints */}

            <div className="flex items-center justify-between text-xs text-sky-100/80 px-2 pt-2">

              <span>
                {isHindi
                  ? 'टाइप करके देखें: "Paracetamol", "Amoxyclav", "Atropine"'
                  : 'Try typing: "Paracetamol", "Amoxyclav", "Atropine"'}
              </span>

              <button
                type="button"
                onClick={() =>
                  setIsCommandPaletteOpen(true)
                }
                className="hidden sm:inline-flex items-center gap-1 hover:text-white underline underline-offset-2"
              >
                {isHindi
                  ? 'त्वरित खोज पैलेट (Ctrl + K)'
                  : 'Quick search palette (Ctrl + K)'}
              </button>

            </div>

          </form>

        </div>

        {/* Decorative */}

        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="absolute right-40 top-10 w-40 h-40 rounded-full bg-sky-400/10 blur-xl pointer-events-none" />

      </section>

      {/* =====================================================
          SAFETY DISCLAIMER
      ====================================================== */}

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-800/60 rounded-2xl p-4 flex items-center gap-3.5 text-xs text-amber-900 dark:text-amber-200 shadow-2xs">

        <ShieldAlert
          size={20}
          className="text-amber-600 dark:text-amber-400 shrink-0"
        />

        <p className="font-medium leading-relaxed">
          {isHindi ? (
            <>
              <span className="font-bold underline">
                केवल नैदानिक संदर्भ:
              </span>{' '}
              मूल प्रिस्क्रिप्शन जानकारी सत्यापित करें और पेशेवर नैदानिक निर्णय लें।
            </>
          ) : (
            <>
              <span className="font-bold underline">
                Clinical reference only:
              </span>{' '}
              {t.clinicalDisclaimer}
            </>
          )}
        </p>

      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <section className="space-y-3">

        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
          {isHindi
            ? 'फॉर्म्युलरी आंकड़े और ट्रायेज'
            : 'Formulary Statistics & Triage'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Total */}

          <Link
            href="/medicines"
            className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-xs hover:shadow-md hover:border-sky-300 dark:hover:border-sky-700 transition-all"
          >

            <div className="flex items-center justify-between text-slate-500 dark:text-gray-400">

              <span className="text-xs font-semibold">
                {t.totalMedicines}
              </span>

              <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Pill size={16} />
              </div>

            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              {totalCount}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">
              {isHindi
                ? 'प्रामाणिक CHC स्टॉक आइटम'
                : 'Authentic CHC Stock Items'}
            </p>

          </Link>

          {/* High Risk */}

          <Link
            href="/medicines?risk=HIGH RISK / ALERT"
            className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-red-200/80 dark:border-red-900/50 shadow-xs hover:shadow-md hover:border-red-400 transition-all"
          >

            <div className="flex items-center justify-between text-red-600 dark:text-red-400">

              <span className="text-xs font-semibold">
                {t.highRiskAlert}
              </span>

              <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle size={16} />
              </div>

            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400 mt-2">
              {highRiskCount}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">
              {isHindi
                ? 'उच्च सतर्कता आवश्यक'
                : 'High vigilance required'}
            </p>

          </Link>

          {/* Caution */}

          <Link
            href="/medicines?risk=CAUTION REQUIRED"
            className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-amber-200/80 dark:border-amber-900/50 shadow-xs hover:shadow-md hover:border-amber-400 transition-all"
          >

            <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">

              <span className="text-xs font-semibold">
                {t.cautionRequired}
              </span>

              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertCircle size={16} />
              </div>

            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
              {cautionCount}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">
              {isHindi
                ? 'विरोधाभासों की जांच करें'
                : 'Check contraindications'}
            </p>

          </Link>

          {/* Generally Safe */}

          <Link
            href="/medicines?risk=GENERALLY SAFE"
            className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-emerald-200/80 dark:border-emerald-900/50 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all"
          >

            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">

              <span className="text-xs font-semibold">
                {t.generallySafe}
              </span>

              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 size={16} />
              </div>

            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
              {safeCount}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">
              {isHindi
                ? 'मानक बाल चिकित्सा दिशानिर्देश'
                : 'Standard pediatric guidelines'}
            </p>

          </Link>

        </div>

      </section>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <section className="space-y-3">

        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
          {t.quickActions}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">

          {/* Medicines */}

          <Link
            href="/medicines"
            className="flex items-center gap-3 p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-900/60 hover:bg-sky-100 dark:hover:bg-sky-950/50 transition-colors"
          >

            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Search size={18} />
            </div>

            <div className="truncate">

              <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                {t.searchMedicines}
              </h3>

              <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate">
                {isHindi
                  ? 'फॉर्म और रूट के अनुसार फ़िल्टर करें'
                  : 'Filter by form & route'}
              </p>

            </div>

          </Link>

          {/* Calculator */}

          <Link
            href="/dose-calculator"
            className="flex items-center gap-3 p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900/60 hover:bg-teal-100 dark:hover:bg-teal-950/50 transition-colors"
          >

            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Calculator size={18} />
            </div>

            <div className="truncate">

              <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                {t.doseCalculator}
              </h3>

              <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate">
                {isHindi
                  ? 'वजन के आधार पर गणना'
                  : 'Weight-based conversions'}
              </p>

            </div>

          </Link>

          {/* Emergency */}

          <Link
            href="/emergency"
            className="flex items-center gap-3 p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200/80 dark:border-red-900/60 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors"
          >

            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertOctagon size={18} />
            </div>

            <div className="truncate">

              <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                {t.emergencyReference}
              </h3>

              <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate">
                {isHindi
                  ? 'एंटीडोट और तत्काल पुनर्जीवन'
                  : 'Antidotes & stat resuscitation'}
              </p>

            </div>

          </Link>

          {/* Favorites */}

          <Link
            href="/favorites"
            className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors"
          >

            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Star size={18} />
            </div>

            <div className="truncate">

              <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                {t.favorites}
              </h3>

              <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate">
                {isHindi
                  ? 'स्टार की गई दवाओं तक त्वरित पहुंच'
                  : 'Quick access starred drugs'}
              </p>

            </div>

          </Link>

        </div>

      </section>

      {/* =====================================================
          AI / NATURAL LANGUAGE SEARCH
      ====================================================== */}

      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-lg">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          <div className="flex items-center gap-2.5">

            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
              <Sparkles size={18} />
            </div>

            <div>

              <h2 className="text-base sm:text-lg font-bold">
                {isHindi
                  ? 'स्मार्ट प्राकृतिक भाषा क्वेरी सहायक'
                  : 'Smart Natural Language Query Assistant'}
              </h2>

              <p className="text-xs text-slate-400">
                {isHindi
                  ? 'क्वेरी केवल सत्यापित CHC फॉर्म्युलरी से प्राप्त होती हैं, बिना क्लिनिकल अनुमान के।'
                  : 'Queries verified CHC formulary strictly without clinical hallucination.'}
              </p>

            </div>

          </div>

          <span className="text-[11px] text-indigo-300 font-mono bg-indigo-900/60 px-2.5 py-1 rounded-full border border-indigo-700/50 self-start sm:self-auto">
            {isHindi
              ? 'सख्त संदर्भ सुरक्षा सक्रिय'
              : 'Strict Reference Guardrail Active'}
          </span>

        </div>

        {/* Prompt Chips */}

        <div className="flex flex-wrap gap-2 pt-1">

          {[
            {
              key: 'generallySafe',
              en: 'Show generally safe medicines',
              hi: 'सामान्यतः सुरक्षित दवाएं दिखाएं',
            },
            {
              key: 'cautionRequired',
              en: 'Show caution required medicines',
              hi: 'सावधानी आवश्यक दवाएं दिखाएं',
            },
            {
              key: 'highRisk',
              en: 'Show high risk medicines',
              hi: 'उच्च जोखिम वाली दवाएं दिखाएं',
            },
            {
              key: 'injection',
              en: 'Find injection medicines',
              hi: 'इंजेक्शन वाली दवाएं खोजें',
            },
            {
              key: '500mg',
              en: 'Find medicines containing 500 mg strength',
              hi: '500 mg स्ट्रेंथ वाली दवाएं खोजें',
            },
          ].map((prompt) => {

            const displayText = isHindi
              ? prompt.hi
              : prompt.en;

            return (
              <button
                key={prompt.key}
                onClick={() =>
                  handleAiQuery(
                    displayText,
                    prompt.key
                  )
                }
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-slate-200"
              >
                &ldquo;{displayText}&rdquo;
              </button>
            );
          })}

        </div>

        {/* Query Result */}

        {aiResult && (

          <div className="mt-3 p-4 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-100 font-mono leading-relaxed animate-in fade-in duration-150">

            <span className="text-sky-400 font-bold block mb-1">
              {isHindi
                ? 'डेटाबेस सत्यापन परिणाम:'
                : 'Database Verification Result:'}
              {aiPrompt && (
                <span className="text-slate-300 font-normal ml-2">
                  (&ldquo;{aiPrompt}&rdquo;)
                </span>
              )}
            </span>

            {aiResult}

          </div>

        )}

      </section>

      {/* =====================================================
          RECENTLY VIEWED
      ====================================================== */}

      {recentMeds.length > 0 && (

        <section className="space-y-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Clock
                size={18}
                className="text-sky-600 dark:text-sky-400"
              />

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.recentlyViewed}
              </h2>

              <span className="text-xs font-mono text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                {recentMeds.length}
              </span>

            </div>

            <button
              onClick={clearRecentlyViewed}
              className="text-xs text-slate-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={13} />

              <span>
                {t.clearHistory}
              </span>
            </button>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {recentMeds
              .slice(0, 3)
              .map((medicine) => (
                <MedicineCard
                  key={medicine.id}
                  medicine={medicine}
                />
              ))}

          </div>

        </section>

      )}

      {/* =====================================================
          POPULAR MEDICINES
      ====================================================== */}

      <section className="space-y-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {t.popularMedicines}
            </h2>

          </div>

          <Link
            href="/medicines"
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1 transition-colors"
          >

            <span>
              {isHindi
                ? 'सभी 90 दवाएं देखें'
                : 'View All 90 Medicines'}
            </span>

            <ArrowRight size={14} />

          </Link>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {popularMeds.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
            />
          ))}

        </div>

      </section>

    </div>
  );
}