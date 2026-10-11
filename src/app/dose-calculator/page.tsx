'use client';

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  AlertTriangle,
  Calculator,
  ChevronDown,
  Info,
  Scale,
  Syringe,
} from 'lucide-react';

import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Medicine } from '@/types/medicine';

import {
  getAgeRestriction,
  getAlternativeName,
  getAvailableStrength,
  getCalculatorTranslation,
  getDosageForm,
  getMedicineDose,
  getMedicineName,
  getOtherPrecautions,
  getRiskLabel,
  getRoutes,
} from '@/lib/medicine-language';

function DoseCalculatorContent() {
  const searchParams = useSearchParams();
  const { medicines, language } = useApp();

  const isHindi = language === 'hi';

  const initialMedicineId =
    searchParams.get('med') || medicines[0]?.id || '';

  const [selectedMedId, setSelectedMedId] =
    useState<string>(String(initialMedicineId));

  const [medicineSearch, setMedicineSearch] =
    useState('');

  const [isMedicineDropdownOpen, setIsMedicineDropdownOpen] =
    useState(false);

  const [weightKg, setWeightKg] = useState('12');

  // Age = 0 to 100
  const [ageYears, setAgeYears] = useState('2');

  // Months = 1 to 12
  const [ageMonths, setAgeMonths] = useState('1');

  const [calculated, setCalculated] = useState(false);

  /*
   * Keep selected medicine in sync when medicines
   * become available or URL changes.
   */
  useEffect(() => {
    if (!selectedMedId && medicines.length > 0) {
      setSelectedMedId(String(medicines[0].id));
    }
  }, [medicines, selectedMedId]);

  const selectedMedicine = useMemo<Medicine | undefined>(() => {
    return medicines.find(
      (medicine) =>
        String(medicine.id) === String(selectedMedId)
    );
  }, [medicines, selectedMedId]);

  /*
   * Show the currently selected medicine name
   * inside the searchable medicine field.
   */
  useEffect(() => {
    if (selectedMedicine) {
      setMedicineSearch(
        getMedicineName(
          selectedMedicine,
          language
        )
      );
    }
  }, [selectedMedicine, language]);

  const medicineName = selectedMedicine
    ? getMedicineName(selectedMedicine, language)
    : '';

  const alternativeName = selectedMedicine
    ? getAlternativeName(
        selectedMedicine,
        language
      )
    : undefined;

  const medicineDose = selectedMedicine
    ? getMedicineDose(
        selectedMedicine,
        language
      )
    : '';

  const ageRestriction = selectedMedicine
    ? getAgeRestriction(
        selectedMedicine,
        language
      )
    : undefined;

  const dosageForm = selectedMedicine
    ? getDosageForm(
        selectedMedicine,
        language
      )
    : '';

  const availableStrength = selectedMedicine
    ? getAvailableStrength(
        selectedMedicine,
        language
      )
    : '';

  const routes = selectedMedicine
    ? getRoutes(
        selectedMedicine,
        language
      )
    : [];

  const riskLabel = selectedMedicine
    ? getRiskLabel(
        selectedMedicine.riskCategory,
        language
      )
    : '';

  const otherPrecautions = selectedMedicine
    ? getOtherPrecautions(
        selectedMedicine,
        language
      )
    : undefined;

  const calculatorTranslation = selectedMedicine
    ? getCalculatorTranslation(
        selectedMedicine,
        language
      )
    : undefined;

  /*
   * Filter medicines according to the text entered
   * in the medicine search field.
   */
  const filteredMedicines = useMemo(() => {
    const search = medicineSearch
      .trim()
      .toLowerCase();

    if (!search) {
      return medicines;
    }

    return medicines.filter((medicine) => {
      const name = getMedicineName(
        medicine,
        language
      ).toLowerCase();

      const alternative =
        getAlternativeName(
          medicine,
          language
        )?.toLowerCase() || '';

      const id = String(medicine.id).toLowerCase();

      return (
        name.includes(search) ||
        alternative.includes(search) ||
        id.includes(search)
      );
    });
  }, [
    medicines,
    medicineSearch,
    language,
  ]);

  const handleMedicineSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setMedicineSearch(value);
    setIsMedicineDropdownOpen(true);

    const matchedMedicine = medicines.find(
      (medicine) => {
        const name = getMedicineName(
          medicine,
          language
        );

        const alternative =
          getAlternativeName(
            medicine,
            language
          );

        return (
          name.toLowerCase() ===
            value.toLowerCase() ||
          alternative?.toLowerCase() ===
            value.toLowerCase() ||
          String(medicine.id) === value
        );
      }
    );

    if (matchedMedicine) {
      setSelectedMedId(
        String(matchedMedicine.id)
      );
      setCalculated(false);
    }
  };

  const handleMedicineSelect = (
    medicine: Medicine
  ) => {
    setSelectedMedId(String(medicine.id));

    setMedicineSearch(
      getMedicineName(
        medicine,
        language
      )
    );

    setCalculated(false);
    setIsMedicineDropdownOpen(false);
  };

  const handleWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (value === '') {
      setWeightKg('');
      setCalculated(false);
      return;
    }

    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    const numericValue = Number(value);

    if (
      numericValue >= 0 &&
      numericValue <= 200
    ) {
      setWeightKg(value);
      setCalculated(false);
    }
  };

  const handleAgeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (value === '') {
      setAgeYears('');
      setCalculated(false);
      return;
    }

    if (!/^\d+$/.test(value)) {
      return;
    }

    const numericValue = Number(value);

    if (
      numericValue >= 0 &&
      numericValue <= 100
    ) {
      setAgeYears(String(numericValue));
      setCalculated(false);
    }
  };

  const handleAgeKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Tab',
      'Home',
      'End',
    ];

    if (
      allowedKeys.includes(event.key) ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleAgePaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const pastedText =
      event.clipboardData
        .getData('text')
        .trim();

    if (!/^\d+$/.test(pastedText)) {
      event.preventDefault();
      return;
    }

    const pastedNumber = Number(pastedText);

    if (
      pastedNumber < 0 ||
      pastedNumber > 100
    ) {
      event.preventDefault();
    }
  };

  const handleAgeBlur = () => {
    const numericValue = Number(ageYears);

    if (
      ageYears === '' ||
      !Number.isInteger(numericValue) ||
      numericValue < 0 ||
      numericValue > 100
    ) {
      setAgeYears('0');
    }
  };

  const handleMonthsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (value === '') {
      setAgeMonths('');
      setCalculated(false);
      return;
    }

    if (!/^\d+$/.test(value)) {
      return;
    }

    const numericValue = Number(value);

    if (
      numericValue >= 1 &&
      numericValue <= 12
    ) {
      setAgeMonths(String(numericValue));
      setCalculated(false);
    }
  };

  const handleMonthsKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Tab',
      'Home',
      'End',
    ];

    if (
      allowedKeys.includes(event.key) ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleMonthsPaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const pastedText =
      event.clipboardData
        .getData('text')
        .trim();

    if (!/^\d+$/.test(pastedText)) {
      event.preventDefault();
      return;
    }

    const pastedNumber = Number(pastedText);

    if (
      pastedNumber < 1 ||
      pastedNumber > 12
    ) {
      event.preventDefault();
    }
  };

  const handleMonthsBlur = () => {
    const numericValue = Number(ageMonths);

    if (
      ageMonths === '' ||
      !Number.isInteger(numericValue) ||
      numericValue < 1 ||
      numericValue > 12
    ) {
      setAgeMonths('1');
    }
  };

  const formatNumber = (value: number) => {
    if (!Number.isFinite(value)) {
      return '0';
    }

    return Number.isInteger(value)
      ? String(value)
      : value
          .toFixed(2)
          .replace(/\.?0+$/, '');
  };

  const calculationResult = useMemo(() => {
    if (!selectedMedicine?.calculator?.supported) {
      return null;
    }

    const calculator =
      selectedMedicine.calculator;

    const weight = Number(weightKg);

    if (
      !Number.isFinite(weight) ||
      weight <= 0
    ) {
      return null;
    }

    const minDose =
      calculator.minDosePerKg !== undefined
        ? weight *
          calculator.minDosePerKg
        : undefined;

    const maxDose =
      calculator.maxDosePerKg !== undefined
        ? weight *
          calculator.maxDosePerKg
        : undefined;

    let finalMinDose = minDose;
    let finalMaxDose = maxDose;

    if (
      calculator.maxSingleDose !== undefined
    ) {
      const numericMaxSingleDose =
        typeof calculator.maxSingleDose === 'number'
          ? calculator.maxSingleDose
          : parseFloat(calculator.maxSingleDose);

      if (!Number.isNaN(numericMaxSingleDose)) {
        if (
          finalMinDose !== undefined &&
          finalMinDose > numericMaxSingleDose
        ) {
          finalMinDose = numericMaxSingleDose;
        }

        if (
          finalMaxDose !== undefined &&
          finalMaxDose > numericMaxSingleDose
        ) {
          finalMaxDose = numericMaxSingleDose;
        }
      }
    }

    let volumeMin:
      | number
      | undefined;

    let volumeMax:
      | number
      | undefined;

    if (
      calculator.concentrationMgPerMl &&
      calculator.concentrationMgPerMl > 0
    ) {
      if (finalMinDose !== undefined) {
        volumeMin =
          finalMinDose /
          calculator.concentrationMgPerMl;
      }

      if (finalMaxDose !== undefined) {
        volumeMax =
          finalMaxDose /
          calculator.concentrationMgPerMl;
      }
    }

    return {
      minDose: finalMinDose,
      maxDose: finalMaxDose,
      unit: calculator.unit,
      doseFrequency:
        calculator.doseFrequency,
      maxDailyDose:
        calculator.maxDailyDose,
      maxSingleDose:
        calculator.maxSingleDose,
      concentrationMgPerMl:
        calculator.concentrationMgPerMl,
      volumeMin,
      volumeMax,
      notes: calculator.notes,
      fixedDose: calculator.fixedDose,
    };
  }, [
    selectedMedicine,
    weightKg,
  ]);

  const handleCalculate = () => {
    const age = Number(ageYears);
    const months = Number(ageMonths);
    const weight = Number(weightKg);

    if (
      !Number.isInteger(age) ||
      age < 0 ||
      age > 100
    ) {
      return;
    }

    if (
      !Number.isInteger(months) ||
      months < 1 ||
      months > 12
    ) {
      return;
    }

    if (
      !Number.isFinite(weight) ||
      weight <= 0
    ) {
      return;
    }

    setCalculated(true);
  };

  const isWeightValid =
    weightKg !== '' &&
    Number(weightKg) > 0 &&
    Number(weightKg) <= 200;

  const isAgeValid =
    ageYears !== '' &&
    Number.isInteger(Number(ageYears)) &&
    Number(ageYears) >= 0 &&
    Number(ageYears) <= 100;

  const isMonthsValid =
    ageMonths !== '' &&
    Number.isInteger(Number(ageMonths)) &&
    Number(ageMonths) >= 1 &&
    Number(ageMonths) <= 12;

  const canCalculate =
    Boolean(selectedMedicine) &&
    isWeightValid &&
    isAgeValid &&
    isMonthsValid;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl min-w-0">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Calculator className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {isHindi
                  ? 'खुराक कैलकुलेटर'
                  : 'Dose Calculator'}
              </h1>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isHindi
                  ? 'बच्चे के वजन और आयु के आधार पर खुराक की गणना करें'
                  : 'Calculate pediatric dose based on weight and age'}
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Layout */}
        <div className="grid min-w-0 gap-6 lg:grid-cols-3">

          {/* LEFT: Calculator Form */}
          <div className="min-w-0 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              {/* Medicine */}
              <div className="mb-6 min-w-0">
                <label
                  htmlFor="medicine"
                  className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  {isHindi
                    ? 'दवा चुनें'
                    : 'Select Medicine'}
                </label>

                {/* Custom Medicine Selector */}
                <div className="relative min-w-0">

                  <div className="relative">
                    <input
                      id="medicine"
                      value={medicineSearch}
                      onChange={handleMedicineSearch}
                      onFocus={() =>
                        setIsMedicineDropdownOpen(true)
                      }
                      placeholder={
                        isHindi
                          ? 'दवा खोजें या चुनें...'
                          : 'Search or select medicine...'
                      }
                      autoComplete="off"
                      className="
                        block w-full min-w-0
                        rounded-xl
                        border border-slate-300
                        bg-white
                        px-4 py-3 pr-12
                        text-sm
                        text-slate-900
                        outline-none
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                        dark:border-slate-700
                        dark:bg-slate-950
                        dark:text-white
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setIsMedicineDropdownOpen(
                          (previous) => !previous
                        )
                      }
                      className="
                        absolute
                        right-2
                        top-1/2
                        flex
                        h-9
                        w-9
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-500
                        transition
                        hover:bg-slate-100
                        hover:text-slate-700
                        dark:text-slate-400
                        dark:hover:bg-slate-800
                        dark:hover:text-slate-200
                      "
                      aria-label={
                        isHindi
                          ? 'दवाओं की सूची खोलें'
                          : 'Open medicine list'
                      }
                      aria-expanded={
                        isMedicineDropdownOpen
                      }
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          isMedicineDropdownOpen
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>
                  </div>

                  {isMedicineDropdownOpen && (
                    <div
                      className="
                        absolute
                        left-0
                        right-0
                        z-50
                        mt-2
                        max-h-80
                        overflow-y-auto
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-1
                        shadow-xl
                        dark:border-slate-700
                        dark:bg-slate-900
                      "
                    >
                      {filteredMedicines.map(
                        (medicine) => {
                          const name =
                            getMedicineName(
                              medicine,
                              language
                            );

                          const alternative =
                            getAlternativeName(
                              medicine,
                              language
                            );

                          const isSelected =
                            String(
                              medicine.id
                            ) ===
                            String(
                              selectedMedId
                            );

                          return (
                            <button
                              key={medicine.id}
                              type="button"
                              onClick={() =>
                                handleMedicineSelect(
                                  medicine
                                )
                              }
                              className={`
                                flex
                                w-full
                                items-start
                                gap-3
                                rounded-lg
                                px-3
                                py-3
                                text-left
                                transition
                                ${
                                  isSelected
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                                    : 'text-slate-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                                }
                              `}
                            >
                              <span className="mt-0.5 shrink-0 text-xs font-semibold text-slate-400">
                                #
                                {String(
                                  medicine.id
                                ).padStart(2, '0')}
                              </span>

                              <span className="min-w-0">
                                <span className="block break-words text-sm font-semibold">
                                  {name}
                                </span>

                                {alternative && (
                                  <span className="mt-0.5 block break-words text-xs text-slate-500 dark:text-slate-400">
                                    {alternative}
                                  </span>
                                )}
                              </span>
                            </button>
                          );
                        }
                      )}

                      {filteredMedicines.length ===
                        0 && (
                        <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          {isHindi
                            ? 'कोई दवा नहीं मिली'
                            : 'No medicine found'}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {isHindi
                    ? 'दवा का नाम लिखकर खोजें या सूची से चुनें'
                    : 'Type a medicine name to search or select from the list'}
                </p>
              </div>

              {/* Weight */}
              <div className="mb-6">
                <label
                  htmlFor="weight"
                  className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  {isHindi
                    ? 'वजन (kg)'
                    : 'Weight (kg)'}
                </label>

                <div className="relative">
                  <Scale className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="weight"
                    type="text"
                    inputMode="decimal"
                    value={weightKg}
                    onChange={handleWeightChange}
                    className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder={
                      isHindi
                        ? 'वजन दर्ज करें'
                        : 'Enter weight'
                    }
                    aria-label={
                      isHindi
                        ? 'वजन किलोग्राम में'
                        : 'Weight in kilograms'
                    }
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {isHindi
                    ? 'किलोग्राम में वजन दर्ज करें'
                    : 'Enter weight in kilograms'}
                </p>
              </div>

              {/* Age */}
              <div className="mb-6">
                <label
                  htmlFor="age"
                  className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  {isHindi
                    ? 'आयु'
                    : 'Age'}
                </label>

                <input
                  id="age"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={3}
                  value={ageYears}
                  onKeyDown={handleAgeKeyDown}
                  onChange={handleAgeChange}
                  onBlur={handleAgeBlur}
                  onPaste={handleAgePaste}
                  className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder={
                    isHindi
                      ? 'आयु दर्ज करें'
                      : 'Enter age'
                  }
                  aria-label={
                    isHindi
                      ? 'आयु, 0 से 100'
                      : 'Age, 0 to 100'
                  }
                />

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {isHindi
                    ? 'आयु 0 से 100 तक दर्ज करें'
                    : 'Valid age range: 0 to 100'}
                </p>
              </div>

              {/* Months */}
              <div className="mb-6">
                <label
                  htmlFor="months"
                  className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  {isHindi
                    ? 'महीने'
                    : 'Months'}
                </label>

                <input
                  id="months"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={ageMonths}
                  onKeyDown={handleMonthsKeyDown}
                  onChange={handleMonthsChange}
                  onBlur={handleMonthsBlur}
                  onPaste={handleMonthsPaste}
                  className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder={
                    isHindi
                      ? '1–12 महीने'
                      : '1–12 months'
                  }
                  aria-label={
                    isHindi
                      ? 'आयु महीने, 1 से 12'
                      : 'Age in months, 1 to 12'
                  }
                />

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {isHindi
                    ? 'मान्य महीना सीमा: 1 से 12'
                    : 'Valid month range: 1 to 12'}
                </p>
              </div>

              {/* Calculate Button */}
              <button
                type="button"
                onClick={handleCalculate}
                disabled={!canCalculate}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Calculator className="h-4 w-4" />

                {isHindi
                  ? 'खुराक की गणना करें'
                  : 'Calculate Dose'}
              </button>
            </div>
          </div>

          {/* RIGHT / MOBILE BELOW FORM */}
          <div className="min-w-0 space-y-6">

            {/* Calculation Result */}
            {calculated && selectedMedicine && (
              <div>
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/30">

                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <Calculator className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {isHindi
                          ? 'गणना का परिणाम'
                          : 'Calculation Result'}
                      </h2>

                      <p className="break-words text-sm text-slate-600 dark:text-slate-400">
                        {medicineName}
                      </p>
                    </div>
                  </div>

                  {calculationResult ? (
                    <div className="space-y-4">

                      {/* Fixed Dose */}
                      {calculationResult.fixedDose && (
                        <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {isHindi
                              ? 'निश्चित खुराक'
                              : 'Fixed dose'}
                          </p>

                          <p className="mt-1 break-words text-xl font-bold text-blue-700 dark:text-blue-400">
                            {isHindi
                              ? calculatorTranslation?.fixedDose ||
                                calculationResult.fixedDose
                              : calculationResult.fixedDose}
                          </p>
                        </div>
                      )}

                      {/* Recommended Dose */}
                      {(calculationResult.minDose !==
                        undefined ||
                        calculationResult.maxDose !==
                          undefined) && (
                        <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {isHindi
                              ? 'अनुशंसित खुराक'
                              : 'Recommended dose'}
                          </p>

                          <p className="mt-1 break-words text-2xl font-bold text-blue-700 dark:text-blue-400">
                            {calculationResult.minDose !==
                              undefined &&
                            calculationResult.maxDose !==
                              undefined
                              ? `${formatNumber(
                                  calculationResult.minDose
                                )}–${formatNumber(
                                  calculationResult.maxDose
                                )} ${calculationResult.unit}`
                              : calculationResult.minDose !==
                                undefined
                              ? `${formatNumber(
                                  calculationResult.minDose
                                )} ${calculationResult.unit}`
                              : `${formatNumber(
                                  calculationResult.maxDose ||
                                    0
                                )} ${calculationResult.unit}`}
                          </p>

                          {calculationResult.volumeMin !==
                            undefined &&
                            calculationResult.volumeMax !==
                              undefined && (
                              <p className="mt-2 break-words text-sm text-slate-600 dark:text-slate-400">
                                {isHindi
                                  ? `मात्रा: ${formatNumber(
                                      calculationResult.volumeMin
                                    )}–${formatNumber(
                                      calculationResult.volumeMax
                                    )} mL प्रति खुराक`
                                  : `Volume: ${formatNumber(
                                      calculationResult.volumeMin
                                    )}–${formatNumber(
                                      calculationResult.volumeMax
                                    )} mL per dose`}
                              </p>
                            )}
                        </div>
                      )}

                      {/* Dose Frequency */}
                      {calculationResult.doseFrequency && (
                        <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {isHindi
                              ? 'खुराक की आवृत्ति'
                              : 'Dose frequency'}
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold text-slate-900 dark:text-white">
                            {isHindi
                              ? calculatorTranslation?.doseFrequency ||
                                calculationResult.doseFrequency
                              : calculationResult.doseFrequency}
                          </p>
                        </div>
                      )}

                      {/* Maximum Single Dose */}
                      {calculationResult.maxSingleDose !==
                        undefined && (
                        <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {isHindi
                              ? 'अधिकतम एकल खुराक'
                              : 'Maximum single dose'}
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold text-slate-900 dark:text-white">
                            {isHindi
                              ? calculatorTranslation?.maxSingleDose ||
                                `${calculationResult.maxSingleDose} ${calculationResult.unit}`
                              : `${calculationResult.maxSingleDose} ${calculationResult.unit}`}
                          </p>
                        </div>
                      )}

                      {/* Maximum Daily Dose */}
                      {calculationResult.maxDailyDose && (
                        <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {isHindi
                              ? 'अधिकतम दैनिक खुराक'
                              : 'Maximum daily dose'}
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold text-slate-900 dark:text-white">
                            {isHindi
                              ? calculatorTranslation?.maxDailyDose ||
                                calculationResult.maxDailyDose
                              : calculationResult.maxDailyDose}
                          </p>
                        </div>
                      )}

                      {/* Notes */}
                      {calculationResult.notes && (
                        <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {isHindi
                              ? 'नोट'
                              : 'Notes'}
                          </p>

                          <p className="mt-1 break-words text-sm leading-6 text-slate-700 dark:text-slate-300">
                            {isHindi
                              ? calculatorTranslation?.notes ||
                                calculationResult.notes
                              : calculationResult.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-xl bg-white p-5 dark:bg-slate-900">
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {isHindi
                          ? 'इस दवा के लिए कैलकुलेटर उपलब्ध नहीं है।'
                          : 'Calculator is not available for this medicine.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Medicine Information */}
            {selectedMedicine && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                    <Syringe className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="break-words font-bold text-slate-900 dark:text-white">
                      {medicineName}
                    </h2>

                    {alternativeName && (
                      <p className="mt-1 break-words text-xs text-slate-500 dark:text-slate-400">
                        {alternativeName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <InfoRow
                    label={
                      isHindi
                        ? 'जोखिम'
                        : 'Risk'
                    }
                    value={riskLabel}
                  />

                  <InfoRow
                    label={
                      isHindi
                        ? 'दवा का रूप'
                        : 'Dosage form'
                    }
                    value={dosageForm}
                  />

                  <InfoRow
                    label={
                      isHindi
                        ? 'उपलब्ध शक्ति'
                        : 'Available strength'
                    }
                    value={availableStrength}
                  />

                  <InfoRow
                    label={
                      isHindi
                        ? 'मार्ग'
                        : 'Route'
                    }
                    value={routes.join(', ')}
                  />

                  <InfoRow
                    label={
                      isHindi
                        ? 'बाल खुराक'
                        : 'Pediatric dose'
                    }
                    value={medicineDose}
                  />

                  {ageRestriction && (
                    <InfoRow
                      label={
                        isHindi
                          ? 'आयु प्रतिबंध'
                          : 'Age restriction'
                      }
                      value={ageRestriction}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Important Warning */}
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/20">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />

            <div className="min-w-0">
              <h3 className="font-semibold text-amber-900 dark:text-amber-300">
                {isHindi
                  ? 'महत्वपूर्ण चेतावनी'
                  : 'Important Warning'}
              </h3>

              <p className="mt-1 break-words text-sm leading-6 text-amber-800 dark:text-amber-200">
                {isHindi
                  ? 'यह कैलकुलेटर केवल त्वरित संदर्भ के लिए है। अंतिम दवा और खुराक का निर्णय बच्चे की नैदानिक स्थिति, स्थानीय प्रोटोकॉल और योग्य स्वास्थ्यकर्मी के निर्णय के अनुसार करें।'
                  : 'This calculator is for quick reference only. Final medicine and dose decisions should be based on the child’s clinical condition, local protocols, and qualified healthcare professional judgment.'}
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
              <Info className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isHindi
                ? 'यह कैसे काम करता है'
                : 'How It Works'}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
              <div className="mb-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                1
              </div>

              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                {isHindi
                  ? 'दवा, वजन और आयु दर्ज करें।'
                  : 'Select the medicine and enter weight and age.'}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
              <div className="mb-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                2
              </div>

              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                {isHindi
                  ? 'कैलकुलेटर उपलब्ध दवा प्रोटोकॉल के आधार पर गणना करता है।'
                  : 'The calculator uses the available medicine dosing configuration.'}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
              <div className="mb-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                3
              </div>

              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                {isHindi
                  ? 'परिणाम को स्थानीय प्रोटोकॉल और नैदानिक निर्णय के साथ देखें।'
                  : 'Review the result together with local protocol and clinical judgment.'}
              </p>
            </div>
          </div>
        </div>

        {/* Precautions */}
        {otherPrecautions && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
              {isHindi
                ? 'सावधानियाँ'
                : 'Precautions'}
            </h2>

            <p className="break-words text-sm leading-6 text-slate-600 dark:text-slate-400">
              {otherPrecautions}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}

export default function DoseCalculatorPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </main>
      }
    >
      <DoseCalculatorContent />
    </Suspense>
  );
}