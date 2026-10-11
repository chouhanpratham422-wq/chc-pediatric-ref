'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeftRight,
  Check,
  ChevronDown,
  Pill,
  Search,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

import { useApp } from '@/context/AppContext';
import type { Medicine } from '@/types/medicine';

import {
  getMedicineName,
  getAlternativeName,
  getRiskLabel,
  getMedicineDose,
  getAgeRestriction,
  getDosageForm,
  getAvailableStrength,
  getPregnancyPrecautions,
  getDiabetesPrecautions,
  getHypertensionPrecautions,
  getRoutes,
} from '@/lib/medicine-language';

function CompareContent() {
  const {
    medicines,
    t,
    language,
  } = useApp();

  const searchParams = useSearchParams();

  const isHindi = language === 'hi';

  /*
   * IMPORTANT:
   * Medicine A and Medicine B have completely separate state.
   * This prevents selecting A from automatically filling B.
   */
  const [medicineAId, setMedicineAId] = useState(
    searchParams.get('med1') || ''
  );

  const [medicineBId, setMedicineBId] = useState(
    searchParams.get('med2') || ''
  );

  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');

  const [openSelector, setOpenSelector] = useState<'A' | 'B' | null>(
    null
  );

  /*
   * Keep URL values in sync when user opens a comparison link.
   */
  useEffect(() => {
    const urlA = searchParams.get('med1') || '';
    const urlB = searchParams.get('med2') || '';

    setMedicineAId(urlA);
    setMedicineBId(urlB);
  }, [searchParams]);

  const medicineA = useMemo(
    () =>
      medicines.find(
        (medicine) => String(medicine.id) === String(medicineAId)
      ),
    [medicines, medicineAId]
  );

  const medicineB = useMemo(
    () =>
      medicines.find(
        (medicine) => String(medicine.id) === String(medicineBId)
      ),
    [medicines, medicineBId]
  );

  /*
   * Searchable medicine lists.
   * Search works with:
   * - medicine name
   * - alternative name
   * - medicine ID
   */
  const filteredA = useMemo(() => {
    const query = searchA.trim().toLowerCase();

    if (!query) {
      return medicines;
    }

    return medicines.filter((medicine) => {
      const values = [
        medicine.id,
        medicine.genericName,
        medicine.alternativeName,
        getMedicineName(medicine, language),
        getAlternativeName(medicine, language),
      ]
        .filter(Boolean)
        .map((value) => String(value).toLowerCase());

      return values.some((value) => value.includes(query));
    });
  }, [medicines, searchA, language]);

  const filteredB = useMemo(() => {
    const query = searchB.trim().toLowerCase();

    if (!query) {
      return medicines;
    }

    return medicines.filter((medicine) => {
      const values = [
        medicine.id,
        medicine.genericName,
        medicine.alternativeName,
        getMedicineName(medicine, language),
        getAlternativeName(medicine, language),
      ]
        .filter(Boolean)
        .map((value) => String(value).toLowerCase());

      return values.some((value) => value.includes(query));
    });
  }, [medicines, searchB, language]);

  /*
   * Select Medicine A
   */
  const handleSelectA = (medicine: Medicine) => {
    /*
     * Do not allow same medicine in A and B.
     */
    if (medicineBId === String(medicine.id)) {
      return;
    }

    setMedicineAId(String(medicine.id));
    setSearchA('');
    setOpenSelector(null);
  };

  /*
   * Select Medicine B
   */
  const handleSelectB = (medicine: Medicine) => {
    /*
     * Do not allow same medicine in A and B.
     */
    if (medicineAId === String(medicine.id)) {
      return;
    }

    setMedicineBId(String(medicine.id));
    setSearchB('');
    setOpenSelector(null);
  };

  /*
   * Swap A and B.
   */
  const handleSwap = () => {
    setMedicineAId(medicineBId);
    setMedicineBId(medicineAId);
    setSearchA('');
    setSearchB('');
  };

  /*
   * Display helpers.
   */
  const getValue = (
    medicine: Medicine | undefined,
    type:
      | 'risk'
      | 'dose'
      | 'age'
      | 'form'
      | 'strength'
      | 'pregnancy'
      | 'diabetes'
      | 'hypertension'
      | 'routes'
  ) => {
    if (!medicine) {
      return '—';
    }

    switch (type) {
      case 'risk':
        return getRiskLabel(
          medicine.riskCategory,
          language
        );

      case 'dose':
        return getMedicineDose(
          medicine,
          language
        );

      case 'age':
        return (
          getAgeRestriction(
            medicine,
            language
          ) || '—'
        );

      case 'form':
        return getDosageForm(
          medicine,
          language
        );

      case 'strength':
        return getAvailableStrength(
          medicine,
          language
        );

      case 'pregnancy':
        return (
          getPregnancyPrecautions(
            medicine,
            language
          ) || '—'
        );

      case 'diabetes':
        return (
          getDiabetesPrecautions(
            medicine,
            language
          ) || '—'
        );

      case 'hypertension':
        return (
          getHypertensionPrecautions(
            medicine,
            language
          ) || '—'
        );

      case 'routes':
        return getRoutes(
          medicine,
          language
        ).join(', ') || '—';

      default:
        return '—';
    }
  };

  /*
   * Comparison rows.
   */
  const comparisonRows = [
    {
      key: 'risk',
      label: isHindi ? 'जोखिम श्रेणी' : 'Risk Category',
      type: 'risk' as const,
    },
    {
      key: 'dose',
      label: isHindi ? 'बाल चिकित्सा खुराक' : 'Pediatric Dose',
      type: 'dose' as const,
    },
    {
      key: 'age',
      label: isHindi ? 'आयु प्रतिबंध' : 'Age Restrictions',
      type: 'age' as const,
    },
    {
      key: 'form',
      label: isHindi ? 'दवा का रूप' : 'Dosage Form',
      type: 'form' as const,
    },
    {
      key: 'strength',
      label: isHindi ? 'सीएचसी उपलब्ध शक्ति' : 'CHC Strength',
      type: 'strength' as const,
    },
    {
      key: 'routes',
      label: isHindi ? 'प्रशासन मार्ग' : 'Administration Route',
      type: 'routes' as const,
    },
    {
      key: 'pregnancy',
      label: isHindi ? 'गर्भावस्था सावधानी' : 'Pregnancy Precautions',
      type: 'pregnancy' as const,
    },
    {
      key: 'diabetes',
      label: isHindi ? 'मधुमेह सावधानी' : 'Diabetes Precautions',
      type: 'diabetes' as const,
    },
    {
      key: 'hypertension',
      label: isHindi
        ? 'उच्च रक्तचाप सावधानी'
        : 'Hypertension Precautions',
      type: 'hypertension' as const,
    },
  ];

  const hasComparison =
    Boolean(medicineA) && Boolean(medicineB);

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              {t.compareTitle || 'Medicine Comparison'}
            </h1>

            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-gray-400">
              {t.compareSubtitle ||
                'Compare pediatric dosing, routes, strengths, and precautions between two medicines.'}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MEDICINE SELECTORS
      ====================================================== */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
          {/* ================= MEDICINE A ================= */}
          <MedicineSelector
            title={
              t.medicineA ||
              (isHindi ? 'दवा A' : 'Medicine A')
            }
            medicine={medicineA}
            medicines={filteredA}
            search={searchA}
            setSearch={setSearchA}
            open={openSelector === 'A'}
            onOpen={() => setOpenSelector('A')}
            onClose={() => setOpenSelector(null)}
            onSelect={handleSelectA}
            disabledId={medicineBId}
            language={language}
            isHindi={isHindi}
          />

          {/* ================= SWAP ================= */}
          <button
            type="button"
            onClick={handleSwap}
            disabled={!medicineA && !medicineB}
            className="mx-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-sky-700 dark:hover:bg-sky-950/30 dark:hover:text-sky-400 lg:mb-0"
          >
            <ArrowLeftRight className="h-4 w-4" />

            <span>
              {t.swapPosition ||
                (isHindi ? 'स्थान बदलें' : 'Swap Position')}
            </span>
          </button>

          {/* ================= MEDICINE B ================= */}
          <MedicineSelector
            title={
              t.medicineB ||
              (isHindi ? 'दवा B' : 'Medicine B')
            }
            medicine={medicineB}
            medicines={filteredB}
            search={searchB}
            setSearch={setSearchB}
            open={openSelector === 'B'}
            onOpen={() => setOpenSelector('B')}
            onClose={() => setOpenSelector(null)}
            onSelect={handleSelectB}
            disabledId={medicineAId}
            language={language}
            isHindi={isHindi}
          />
        </div>

        {/* Selection helper */}
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3 py-2.5 text-xs leading-5 text-sky-800 dark:border-sky-900/50 dark:bg-sky-950/20 dark:text-sky-300">
          <Pill className="mt-0.5 h-4 w-4 shrink-0" />

          <span>
            {isHindi
              ? 'दो अलग-अलग दवाएं चुनें। नीचे प्रत्येक जानकारी को A और B के बीच सीधे compare किया जाएगा।'
              : 'Select two different medicines. Each reference field below is shown directly side-by-side so the differences are easy to understand.'}
          </span>
        </div>
      </section>

      {/* =====================================================
          EMPTY STATE
      ====================================================== */}
      {!hasComparison && (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900/50">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm dark:bg-gray-800 dark:text-gray-500">
            <ArrowLeftRight className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-base font-bold text-slate-800 dark:text-white">
            {isHindi
              ? 'तुलना शुरू करें'
              : 'Start the comparison'}
          </h2>

          <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500 dark:text-gray-400">
            {isHindi
              ? 'ऊपर Medicine A और Medicine B में दो अलग-अलग दवाएं चुनें।'
              : 'Choose one medicine in Medicine A and another medicine in Medicine B above.'}
          </p>
        </section>
      )}

      {/* =====================================================
          COMPARISON
      ====================================================== */}
      {hasComparison && medicineA && medicineB && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {/* Comparison header */}
          <div className="border-b border-slate-200 bg-slate-50 p-4 dark:border-gray-800 dark:bg-gray-950/50 sm:p-5">
            <div className="grid grid-cols-2 gap-3">
              {/* A */}
              <MedicineHeader
                medicine={medicineA}
                label={
                  t.medicineA ||
                  (isHindi ? 'दवा A' : 'Medicine A')
                }
                language={language}
              />

              {/* B */}
              <MedicineHeader
                medicine={medicineB}
                label={
                  t.medicineB ||
                  (isHindi ? 'दवा B' : 'Medicine B')
                }
                language={language}
              />
            </div>
          </div>

          {/* Comparison rows */}
          <div>
            {comparisonRows.map((row) => {
              const valueA = getValue(
                medicineA,
                row.type
              );

              const valueB = getValue(
                medicineB,
                row.type
              );

              const isDifferent =
                valueA.trim().toLowerCase() !==
                valueB.trim().toLowerCase();

              return (
                <div
                  key={row.key}
                  className="border-b border-slate-100 last:border-b-0 dark:border-gray-800"
                >
                  {/* Label */}
                  <div className="bg-slate-50 px-4 py-2.5 dark:bg-gray-950/40 sm:px-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-gray-400">
                        {row.label}
                      </span>

                      {isDifferent ? (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                          {isHindi ? 'अंतर' : 'Different'}
                        </span>
                      ) : (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                          {isHindi ? 'समान' : 'Same'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* A / B values */}
                  <div className="grid grid-cols-2 gap-px bg-slate-200 dark:bg-gray-800">
                    <ComparisonValue
                      value={valueA}
                      different={isDifferent}
                    />

                    <ComparisonValue
                      value={valueB}
                      different={isDifferent}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================
          SAFETY NOTE
      ====================================================== */}
      {hasComparison && (
        <section className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />

          <p className="text-xs leading-5 text-amber-800 dark:text-amber-300">
            {isHindi
              ? 'यह तुलना उपलब्ध संदर्भ डेटाबेस की जानकारी को साथ-साथ दिखाती है। यह अपने आप में उपचार या prescribing recommendation नहीं है। Clinical use से पहले मूल संदर्भ और professional judgment से सत्यापन करें।'
              : 'This comparison places information from the reference database side-by-side. It is not a treatment or prescribing recommendation. Verify the original reference and use professional clinical judgment before clinical use.'}
          </p>
        </section>
      )}
    </div>
  );
}

/* =========================================================
   MEDICINE SELECTOR
========================================================= */

interface MedicineSelectorProps {
  title: string;
  medicine?: Medicine;
  medicines: Medicine[];
  search: string;
  setSearch: (value: string) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (medicine: Medicine) => void;
  disabledId: string;
  language: 'en' | 'hi';
  isHindi: boolean;
}

function MedicineSelector({
  title,
  medicine,
  medicines,
  search,
  setSearch,
  open,
  onOpen,
  onClose,
  onSelect,
  disabledId,
  language,
  isHindi,
}: MedicineSelectorProps) {
  const selectedName = medicine
    ? getMedicineName(medicine, language)
    : '';

  return (
    <div className="relative min-w-0">
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
        {title}
      </label>

      {/* Selected medicine display */}
      <button
        type="button"
        onClick={() => {
          if (open) {
            onClose();
          } else {
            onOpen();
          }
        }}
        className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-3 text-left transition ${
          open
            ? 'border-sky-400 bg-white ring-2 ring-sky-100 dark:border-sky-600 dark:bg-gray-900 dark:ring-sky-950/50'
            : 'border-slate-300 bg-white hover:border-sky-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-sky-700'
        }`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
            <Pill className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            {medicine ? (
              <>
                <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                  #{medicine.id} {selectedName}
                </p>

                {getAlternativeName(
                  medicine,
                  language
                ) && (
                  <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-gray-400">
                    {getAlternativeName(
                      medicine,
                      language
                    )}
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs font-semibold text-slate-400 dark:text-gray-500">
                {tSafeSelect(isHindi)}
              </p>
            )}
          </div>
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
          {/* Search */}
          <div className="border-b border-slate-200 p-2.5 dark:border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onClick={(event) =>
                  event.stopPropagation()
                }
                autoFocus
                autoComplete="off"
                placeholder={
                  isHindi
                    ? 'दवा खोजें...'
                    : 'Search medicine...'
                }
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-medium text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-sky-600 dark:focus:ring-sky-950/40"
              />
            </div>
          </div>

          {/* Medicine list */}
          <div className="max-h-64 overflow-y-auto overscroll-contain p-1.5">
            {medicines.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-slate-500 dark:text-gray-400">
                {isHindi
                  ? 'कोई दवा नहीं मिली।'
                  : 'No medicines found.'}
              </div>
            ) : (
              medicines.map((item) => {
                const isDisabled =
                  String(item.id) ===
                  String(disabledId);

                const itemName =
                  getMedicineName(
                    item,
                    language
                  );

                const itemAlternative =
                  getAlternativeName(
                    item,
                    language
                  );

                const isSelected =
                  medicine?.id === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      if (!isDisabled) {
                        onSelect(item);
                      }
                    }}
                    className={`flex min-h-11 w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition ${
                      isDisabled
                        ? 'cursor-not-allowed opacity-35'
                        : isSelected
                        ? 'bg-sky-100 text-sky-900 dark:bg-sky-950/50 dark:text-sky-200'
                        : 'hover:bg-slate-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="w-7 shrink-0 font-mono text-[10px] font-bold text-slate-400 dark:text-gray-500">
                      #{item.id}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold text-slate-800 dark:text-gray-200">
                        {itemName}
                      </span>

                      {itemAlternative && (
                        <span className="mt-0.5 block truncate text-[10px] text-slate-400 dark:text-gray-500">
                          {itemAlternative}
                        </span>
                      )}
                    </span>

                    {isSelected && (
                      <Check className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MEDICINE HEADER
========================================================= */

interface MedicineHeaderProps {
  medicine: Medicine;
  label: string;
  language: 'en' | 'hi';
}

function MedicineHeader({
  medicine,
  label,
  language,
}: MedicineHeaderProps) {
  const medicineName = getMedicineName(
    medicine,
    language
  );

  const alternativeName =
    getAlternativeName(
      medicine,
      language
    );

  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">
          {label}
        </span>

        <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] font-bold text-slate-500 dark:bg-gray-800 dark:text-gray-400">
          #{medicine.id}
        </span>
      </div>

      <div className="flex min-w-0 items-start gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
          <Pill className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <h2 className="break-words text-sm font-bold leading-5 text-slate-900 dark:text-white sm:text-base">
            {medicineName}
          </h2>

          {alternativeName && (
            <p className="mt-0.5 break-words text-[10px] text-slate-500 dark:text-gray-400">
              {alternativeName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMPARISON VALUE
========================================================= */

interface ComparisonValueProps {
  value: string;
  different: boolean;
}

function ComparisonValue({
  value,
  different,
}: ComparisonValueProps) {
  return (
    <div
      className={`min-w-0 p-3 sm:p-4 ${
        different
          ? 'bg-amber-50/70 dark:bg-amber-950/10'
          : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className="flex items-start gap-2">
        {different && (
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
        )}

        <p
          className={`whitespace-pre-wrap break-words text-xs leading-5 ${
            different
              ? 'font-semibold text-slate-800 dark:text-gray-200'
              : 'text-slate-600 dark:text-gray-300'
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SAFE SELECT TEXT
========================================================= */

function tSafeSelect(isHindi: boolean) {
  return isHindi
    ? 'दवा चुनें...'
    : 'Select medicine...';
}

/* =========================================================
   PAGE WRAPPER
========================================================= */

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          Loading comparison...
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}