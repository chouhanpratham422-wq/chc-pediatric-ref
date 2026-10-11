'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { RiskBadge } from '@/components/RiskBadge';
import {
  getMedicineName,
  getAlternativeName,
  getMedicineDose,
  getAgeRestriction,
  getDosageForm,
  getAvailableStrength,
  getPregnancyPrecautions,
  getDiabetesPrecautions,
  getHypertensionPrecautions,
  getOtherPrecautions,
  getRoutes,
} from '@/lib/medicine-language';
import {
  ArrowLeft,
  Star,
  Share2,
  Printer,
  Copy,
  Check,
  ShieldAlert,
  Pill,
  Calculator,
  Baby,
} from 'lucide-react';

export default function MedicineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string);

  const {
    getMedicineById,
    isFavorite,
    toggleFavorite,
    addRecentlyViewed,
    showToast,
    t,
    language,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const medicine = getMedicineById(id);

  // ---------------------------------------------------------
  // Hindi / English medicine data
  // ---------------------------------------------------------

  const medicineName = medicine
    ? getMedicineName(medicine, language)
    : '';

  const alternativeName = medicine
    ? getAlternativeName(medicine, language)
    : undefined;

  const pediatricDose = medicine
    ? getMedicineDose(medicine, language)
    : '';

  const ageRestriction = medicine
    ? getAgeRestriction(medicine, language)
    : undefined;

  const dosageForm = medicine
    ? getDosageForm(medicine, language)
    : '';

  const availableStrength = medicine
    ? getAvailableStrength(medicine, language)
    : '';

  const pregnancyPrecautions = medicine
    ? getPregnancyPrecautions(medicine, language)
    : undefined;

  const diabetesPrecautions = medicine
    ? getDiabetesPrecautions(medicine, language)
    : undefined;

  const hypertensionPrecautions = medicine
    ? getHypertensionPrecautions(medicine, language)
    : undefined;

  const otherPrecautions = medicine
    ? getOtherPrecautions(medicine, language)
    : undefined;

  const routes = medicine
    ? getRoutes(medicine, language)
    : [];

  const isHindi = language === 'hi';

  // Track recently viewed
  useEffect(() => {
    if (medicine) {
      addRecentlyViewed(medicine.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicine?.id]);

  // ---------------------------------------------------------
  // Medicine not found
  // ---------------------------------------------------------

  if (!medicine) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-400 flex items-center justify-center mx-auto">
          <Pill size={32} />
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {isHindi ? 'दवा नहीं मिली' : 'Medicine Not Found'}
        </h2>

        <p className="text-xs text-slate-500 dark:text-gray-400">
          {isHindi
            ? `दवा आईडी #${id} CHC झकनावदा फॉर्मुलरी में नहीं मिली।`
            : `The requested medicine ID #${id} was not found in the CHC Jhaknawda formulary.`}
        </p>

        <Link
          href="/medicines"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>
            {isHindi ? 'दवाओं पर वापस जाएं' : 'Back to Medicines'}
          </span>
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(medicine.id);

  // ---------------------------------------------------------
  // Copy reference
  // ---------------------------------------------------------

  const handleCopyReference = () => {
    const text = isHindi
      ? `सीएचसी झकनावदा दवा त्वरित-संदर्भ
[#${medicine.id}] ${medicineName} ${
          alternativeName ? `(${alternativeName})` : ''
        }
जोखिम श्रेणी: ${medicine.riskCategory}
बाल चिकित्सा खुराक: ${pediatricDose}
सीएचसी स्टॉक: ${dosageForm} - ${availableStrength}
सुरक्षा / सावधानियां:
- गर्भावस्था: ${
          pregnancyPrecautions || 'संदर्भ में कोई विशेष चेतावनी नहीं'
        }
- मधुमेह: ${
          diabetesPrecautions || 'संदर्भ में कोई विशेष चेतावनी नहीं'
        }
- उच्च रक्तचाप: ${
          hypertensionPrecautions || 'संदर्भ में कोई विशेष चेतावनी नहीं'
        }
- अन्य: ${
          otherPrecautions || 'मानक चिकित्सीय प्रशासन'
        }`
      : `CHC Jhaknawda Drug Quick-Reference
[#${medicine.id}] ${medicineName} ${
          alternativeName ? `(${alternativeName})` : ''
        }
Risk Category: ${medicine.riskCategory}
Pediatric Dose: ${pediatricDose}
CHC Stock: ${dosageForm} - ${availableStrength}
Safety / Precautions:
- Pregnancy: ${
          pregnancyPrecautions || 'No specific warning in PDF'
        }
- Diabetes: ${
          diabetesPrecautions || 'No specific warning in PDF'
        }
- HTN: ${
          hypertensionPrecautions || 'No specific warning in PDF'
        }
- Other: ${
          otherPrecautions || 'Standard clinical administration'
        }`;

    navigator.clipboard.writeText(text);
    setCopied(true);

    showToast(
      isHindi
        ? 'संदर्भ क्लिपबोर्ड पर कॉपी किया गया'
        : 'Reference copied to clipboard',
      'success'
    );

    setTimeout(() => setCopied(false), 2000);
  };

  // ---------------------------------------------------------
  // Share
  // ---------------------------------------------------------

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: isHindi
            ? `${medicineName} - सीएचसी झकनावदा बाल चिकित्सा दवा संदर्भ`
            : `${medicineName} - CHC Jhaknawda Pediatric Drug Reference`,
          text: isHindi
            ? `खुराक: ${pediatricDose} | स्टॉक: ${availableStrength}`
            : `Dose: ${pediatricDose} | Stock: ${availableStrength}`,
          url: window.location.href,
        });
      } catch {
        // Share cancelled
      }
    } else {
      handleCopyReference();
    }
  };

  // ---------------------------------------------------------
  // Print
  // ---------------------------------------------------------

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">

      {/* =====================================================
          TOP ACTION BAR
      ===================================================== */}

      <div className="flex items-center justify-between gap-3 no-print">

        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>{t.back}</span>
        </button>

        <div className="flex items-center gap-2">

          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(medicine.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              favorite
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                : 'bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800'
            }`}
          >
            <Star
              size={14}
              fill={favorite ? 'currentColor' : 'none'}
            />

            <span className="hidden sm:inline">
              {favorite
                ? t.removeFromFavorites
                : t.addToFavorites}
            </span>
          </button>

          {/* Copy */}
          <button
            onClick={handleCopyReference}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title={
              isHindi
                ? 'क्लिनिकल संदर्भ कॉपी करें'
                : 'Copy formatted clinical reference'
            }
          >
            {copied ? (
              <Check size={14} className="text-emerald-500" />
            ) : (
              <Copy size={14} />
            )}

            <span className="hidden sm:inline">
              {copied ? t.copied : t.copyReference}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title={t.share}
          >
            <Share2 size={15} />
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="p-2 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title={t.print}
          >
            <Printer size={15} />
          </button>
        </div>
      </div>

      {/* =====================================================
          MAIN MEDICINE HEADER
      ===================================================== */}

      <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-slate-600 dark:text-gray-400 bg-slate-100 dark:bg-gray-800 px-3 py-1 rounded-xl border border-slate-200 dark:border-gray-700">
              {isHindi ? 'प्रविष्टि #' : 'ENTRY #'}
              {medicine.id}
            </span>

            <RiskBadge
              category={medicine.riskCategory}
              size="md"
            />
          </div>

          {/* Routes */}
          <div className="flex flex-wrap gap-1.5">
            {routes.map((route, index) => (
              <span
                key={`${route}-${index}`}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800"
              >
                {route}
              </span>
            ))}
          </div>
        </div>

        {/* Medicine Name */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {medicineName}
          </h1>

          {alternativeName && (
            <p className="text-sm sm:text-base text-slate-500 dark:text-gray-400 font-medium mt-1">
              {isHindi
                ? 'वैकल्पिक / ब्रांड / साल्ट फॉर्मुलेशन: '
                : 'Alternative / Brand / Salt Formulation: '}

              <span className="font-bold text-slate-800 dark:text-gray-200">
                {alternativeName}
              </span>
            </p>
          )}
        </div>

        {/* CHC Stock */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-gray-800/80 border border-slate-200 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
              <Pill size={20} />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                {isHindi
                  ? 'सीएचसी स्टॉक फॉर्मुलेशन एवं उपलब्ध क्षमता'
                  : 'CHC Stock Formulation & Available Strength'}
              </div>

              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                <span className="text-sky-600 dark:text-sky-400">
                  {dosageForm}:
                </span>{' '}
                {availableStrength}
              </div>
            </div>
          </div>

          {medicine.calculator?.supported && (
            <Link
              href={`/dose-calculator?med=${medicine.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
            >
              <Calculator size={14} />

              <span>
                {isHindi
                  ? 'वजन के अनुसार खुराक की गणना करें'
                  : 'Calculate Dose for Weight'}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* =====================================================
          PEDIATRIC DOSE
      ===================================================== */}

      <section className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">

        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-gray-800">

          <Baby
            size={22}
            className="text-sky-600 dark:text-sky-400"
          />

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {isHindi
              ? 'बाल चिकित्सा खुराक संदर्भ'
              : 'Pediatric Dose Reference'}
          </h2>
        </div>

        {/* Dose */}
        <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200/70 dark:border-sky-800/60 text-slate-900 dark:text-slate-100 font-medium text-sm sm:text-base leading-relaxed">

          <span className="font-bold text-sky-800 dark:text-sky-300 block mb-1">
            {isHindi
              ? 'आधिकारिक CHC फॉर्मुलरी खुराक प्रोटोकॉल:'
              : 'Authoritative CHC Formulary Dose Protocol:'}
          </span>

          {pediatricDose}
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">

          {/* Age */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200/80 dark:border-gray-700/80">

            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 block">
              {isHindi
                ? 'आयु प्रतिबंध / मार्गदर्शन'
                : 'Age Restriction / Guidance'}
            </span>

            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-gray-200 mt-1 block">
              {ageRestriction ||
                (isHindi
                  ? 'मानक बाल चिकित्सा आयु के अनुसार'
                  : 'Standard pediatric age titration')}
            </span>
          </div>

          {/* Dosage form */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200/80 dark:border-gray-700/80">

            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 block">
              {isHindi
                ? 'खुराक का रूप'
                : 'Dosage Form'}
            </span>

            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-gray-200 mt-1 block">
              {dosageForm}
            </span>
          </div>

          {/* Strength */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200/80 dark:border-gray-700/80">

            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 block">
              {isHindi
                ? 'उपलब्ध CHC क्षमता'
                : 'Available CHC Strength'}
            </span>

            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-gray-200 mt-1 block truncate">
              {availableStrength}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          SAFETY & PRECAUTIONS
      ===================================================== */}

      <section className="space-y-4">

        <div className="flex items-center gap-2">

          <ShieldAlert
            size={20}
            className="text-slate-700 dark:text-gray-300"
          />

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {isHindi
              ? 'सुरक्षा, निषेध एवं सावधानियां'
              : 'Safety, Contraindications & Precautions'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Pregnancy */}
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">

            <div className="flex items-center justify-between">

              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                {isHindi
                  ? 'गर्भावस्था एवं मातृ सुरक्षा'
                  : 'Pregnancy & Maternal Safety'}
              </span>

              <span className="text-base">🤰</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 dark:text-gray-200 leading-relaxed font-medium">
              {pregnancyPrecautions ||
                (isHindi
                  ? 'संदर्भ में कोई विशेष गर्भावस्था चेतावनी नहीं दी गई है।'
                  : 'Safe / acceptable when clinically indicated, or no specific pregnancy caution noted in PDF.')}
            </p>
          </div>

          {/* Diabetes */}
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">

            <div className="flex items-center justify-between">

              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                {isHindi
                  ? 'मधुमेह एवं रक्त शर्करा प्रभाव'
                  : 'Diabetes & Glycemic Impact'}
              </span>

              <span className="text-base">🩸</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 dark:text-gray-200 leading-relaxed font-medium">
              {diabetesPrecautions ||
                (isHindi
                  ? 'संदर्भ में मधुमेह संबंधी कोई विशेष निषेध नहीं दिया गया है।'
                  : 'No specific diabetic contraindication noted in reference.')}
            </p>
          </div>

          {/* Hypertension */}
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">

            <div className="flex items-center justify-between">

              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                {isHindi
                  ? 'उच्च रक्तचाप एवं हृदय संबंधी'
                  : 'Hypertension & Cardiovascular'}
              </span>

              <span className="text-base">🫀</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 dark:text-gray-200 leading-relaxed font-medium">
              {hypertensionPrecautions ||
                (isHindi
                  ? 'संदर्भ में उच्च रक्तचाप संबंधी कोई विशेष चेतावनी नहीं दी गई है।'
                  : 'No specific hypertension warning noted in reference.')}
            </p>
          </div>

          {/* Other */}
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">

            <div className="flex items-center justify-between">

              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                {isHindi
                  ? 'अन्य सावधानियां एवं निगरानी'
                  : 'Other Precautions & Monitoring'}
              </span>

              <span className="text-base">📋</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 dark:text-gray-200 leading-relaxed font-medium">
              {otherPrecautions ||
                (isHindi
                  ? 'मानक बाल चिकित्सा निगरानी लागू होती है।'
                  : 'Standard pediatric monitoring applies.')}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          VERIFICATION DISCLAIMER
      ===================================================== */}

      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-5 text-amber-900 dark:text-amber-200 text-xs sm:text-sm leading-relaxed space-y-1">

        <div className="font-bold flex items-center gap-2">

          <ShieldAlert
            size={16}
            className="text-amber-600 shrink-0"
          />

          <span>
            {isHindi
              ? 'क्लिनिकल सत्यापन आवश्यकता'
              : 'Clinical Verification Requirement'}
          </span>
        </div>

        <p>
          {t.disclaimerBanner}
        </p>
      </div>

      {/* =====================================================
          COMPARISON & NAVIGATION
      ===================================================== */}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-gray-800 no-print">

        <Link
          href={`/compare?med1=${medicine.id}`}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
        >
          <span>
            {isHindi
              ? `${medicineName} की तुलना किसी दूसरी दवा से करें`
              : `Compare ${medicineName} with another medicine`}
          </span>
        </Link>

        <div className="flex items-center gap-3">

          <Link
            href="/medicines"
            className="text-xs text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200"
          >
            {isHindi
              ? 'सभी 90 दवाएं देखें'
              : 'Browse all 90 medicines'}
          </Link>
        </div>
      </div>
    </div>
  );
}