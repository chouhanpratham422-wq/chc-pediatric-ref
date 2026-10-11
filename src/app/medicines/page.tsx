'use client';

import { useMemo, useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Filter,
  ShieldCheck,
  Baby,
  AlertTriangle,
} from 'lucide-react';

import type { RiskCategory, Medicine } from '@/types/medicine';
import { useApp } from '@/context/AppContext';
import { MedicineCard } from '@/components/MedicineCard';

import {
  getMedicineName,
  getAlternativeName,
  getMedicineDose,
  getAgeRestriction,
  getDosageForm,
  getAvailableStrength,
  getRoutes,
  getRiskLabel,
} from '@/lib/medicine-language';

type SortOption =
  | 'default'
  | 'name-asc'
  | 'name-desc'
  | 'risk';

type FilterState = {
  riskCategories: RiskCategory[];
  dosageForms: string[];
  routes: string[];
  ageGroups: string[];
  pregnancySafe: boolean;
  diabetesSafe: boolean;
  hypertensionSafe: boolean;
};

const INITIAL_FILTERS: FilterState = {
  riskCategories: [],
  dosageForms: [],
  routes: [],
  ageGroups: [],
  pregnancySafe: false,
  diabetesSafe: false,
  hypertensionSafe: false,
};

const AGE_GROUPS = [
  'Neonates / Birth',
  'Infants (<1 yr)',
  'Older Children / >5 yrs',
];

function medicineMatchesAgeGroup(
  medicine: Medicine,
  ageGroup: string
): boolean {
  const doseText =
    medicine.pediatricDose?.toLowerCase() || '';

  const restriction =
    medicine.ageRestriction?.toLowerCase() || '';

  const text = `${doseText} ${restriction}`;

  if (ageGroup === 'Neonates / Birth') {
    return (
      text.includes('neonate') ||
      text.includes('newborn') ||
      text.includes('birth') ||
      text.includes('0 day') ||
      text.includes('0–') ||
      text.includes('0-')
    );
  }

  if (ageGroup === 'Infants (<1 yr)') {
    return (
      text.includes('infant') ||
      text.includes('<1') ||
      text.includes('< 1') ||
      text.includes('under 1') ||
      text.includes('1 year')
    );
  }

  if (ageGroup === 'Older Children / >5 yrs') {
    return (
      text.includes('>5') ||
      text.includes('> 5') ||
      text.includes('older child') ||
      text.includes('child') ||
      text.includes('children')
    );
  }

  return true;
}

function hasNoContraindication(
  value?: string
): boolean {
  if (!value) return true;

  const text = value.toLowerCase().trim();

  return (
    text === 'none' ||
    text === 'no contraindication' ||
    text === 'no known contraindication' ||
    text === 'not applicable' ||
    text === 'n/a' ||
    text === 'na' ||
    text.includes('no contraindication') ||
    text.includes('none known')
  );
}

function MedicinesContent() {
  const { medicines, language } = useApp();

  const isHindi = language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');

  const [sortBy, setSortBy] =
    useState<SortOption>('default');

  const [showFilters, setShowFilters] =
    useState(false);

  const [filters, setFilters] =
    useState<FilterState>(INITIAL_FILTERS);

  /*
   * Unique dosage forms
   */
  const uniqueForms = useMemo(() => {
    const set = new Set<string>();

    medicines.forEach((medicine) => {
      if (medicine.dosageForm) {
        set.add(medicine.dosageForm);
      }
    });

    return Array.from(set).sort();
  }, [medicines]);

  /*
   * Unique routes
   */
  const uniqueRoutes = useMemo(() => {
    const set = new Set<string>();

    medicines.forEach((medicine) => {
      medicine.routes.forEach((route) => {
        set.add(route);
      });
    });

    return Array.from(set).sort();
  }, [medicines]);

  /*
   * Display translation maps
   */
  const formDisplayMap = useMemo(() => {
    const map = new Map<string, string>();

    medicines.forEach((medicine) => {
      if (!medicine.dosageForm) return;

      const translated = getDosageForm(
        medicine,
        language
      );

      if (!map.has(medicine.dosageForm)) {
        map.set(
          medicine.dosageForm,
          translated || medicine.dosageForm
        );
      }
    });

    return map;
  }, [medicines, language]);

  const routeDisplayMap = useMemo(() => {
    const map = new Map<string, string>();

    medicines.forEach((medicine) => {
      const originalRoutes =
        medicine.routes || [];

      const translatedRoutes = getRoutes(
        medicine,
        language
      );

      originalRoutes.forEach(
        (originalRoute, index) => {
          if (!map.has(originalRoute)) {
            map.set(
              originalRoute,
              translatedRoutes[index] ||
                originalRoute
            );
          }
        }
      );
    });

    return map;
  }, [medicines, language]);

  const getDisplayForm = (
    form: string
  ) => {
    if (language === 'en') return form;

    return (
      formDisplayMap.get(form) ||
      form
    );
  };

  const getDisplayRoute = (
    route: string
  ) => {
    if (language === 'en') return route;

    return (
      routeDisplayMap.get(route) ||
      route
    );
  };

  /*
   * Search + filtering + sorting
   */
  const filteredMedicines = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    const result = medicines.filter(
      (medicine) => {
        /*
         * Search
         */
        if (query) {
          const searchableValues = [
            medicine.genericName,
            medicine.alternativeName,
            medicine.availableStrength,
            medicine.pediatricDose,
            medicine.ageRestriction,
            medicine.id,

            getMedicineName(
              medicine,
              language
            ),

            getAlternativeName(
              medicine,
              language
            ),

            getAvailableStrength(
              medicine,
              language
            ),

            getMedicineDose(
              medicine,
              language
            ),

            getAgeRestriction(
              medicine,
              language
            ),
          ]
            .filter(Boolean)
            .map((value) =>
              String(value).toLowerCase()
            );

          const matchesSearch =
            searchableValues.some(
              (value) =>
                value.includes(query)
            );

          if (!matchesSearch) {
            return false;
          }
        }

        /*
         * Risk
         */
        if (
          filters.riskCategories
            .length > 0 &&
          !filters.riskCategories.includes(
            medicine.riskCategory
          )
        ) {
          return false;
        }

        /*
         * Dosage form
         */
        if (
          filters.dosageForms.length > 0 &&
          !filters.dosageForms.includes(
            medicine.dosageForm
          )
        ) {
          return false;
        }

        /*
         * Route
         */
        if (filters.routes.length > 0) {
          const hasMatchingRoute =
            medicine.routes.some(
              (route) =>
                filters.routes.includes(
                  route
                )
            );

          if (!hasMatchingRoute) {
            return false;
          }
        }

        /*
         * Age
         */
        if (
          filters.ageGroups.length > 0
        ) {
          const matchesAnyAgeGroup =
            filters.ageGroups.some(
              (ageGroup) =>
                medicineMatchesAgeGroup(
                  medicine,
                  ageGroup
                )
            );

          if (!matchesAnyAgeGroup) {
            return false;
          }
        }

        /*
         * Pregnancy
         */
        if (
          filters.pregnancySafe &&
          !hasNoContraindication(
            medicine.pregnancyPrecautions
          )
        ) {
          return false;
        }

        /*
         * Diabetes
         */
        if (
          filters.diabetesSafe &&
          !hasNoContraindication(
            medicine.diabetesPrecautions
          )
        ) {
          return false;
        }

        /*
         * Hypertension
         */
        if (
          filters.hypertensionSafe &&
          !hasNoContraindication(
            medicine.hypertensionPrecautions
          )
        ) {
          return false;
        }

        return true;
      }
    );

    /*
     * Sorting
     */
    return result.sort((a, b) => {
      /*
       * DEFAULT:
       * #01 → #02 → #03 ... #90
       */
      if (sortBy === 'default') {
        return (
          Number(a.id) -
          Number(b.id)
        );
      }

      /*
       * NAME A-Z
       */
      if (sortBy === 'name-asc') {
        return getMedicineName(
          a,
          language
        ).localeCompare(
          getMedicineName(
            b,
            language
          )
        );
      }

      /*
       * NAME Z-A
       */
      if (sortBy === 'name-desc') {
        return getMedicineName(
          b,
          language
        ).localeCompare(
          getMedicineName(
            a,
            language
          )
        );
      }

      /*
       * Risk sorting is kept internally
       * for compatibility, but it is NOT
       * shown in the Sort Medicines UI.
       */
      const riskOrder: Record<
        RiskCategory,
        number
      > = {
        'HIGH RISK / ALERT': 1,
        'CAUTION REQUIRED': 2,
        'GENERALLY SAFE': 3,
      };

      const riskDifference =
        riskOrder[a.riskCategory] -
        riskOrder[b.riskCategory];

      if (riskDifference === 0) {
        return (
          Number(a.id) -
          Number(b.id)
        );
      }

      return riskDifference;
    });
  }, [
    medicines,
    searchQuery,
    filters,
    sortBy,
    language,
  ]);

  /*
   * FILTER HELPERS
   */

  const toggleRisk = (
    risk: RiskCategory
  ) => {
    setFilters((previous) => ({
      ...previous,

      riskCategories:
        previous.riskCategories.includes(
          risk
        )
          ? previous.riskCategories.filter(
              (item) => item !== risk
            )
          : [
              ...previous.riskCategories,
              risk,
            ],
    }));
  };

  const toggleForm = (
    form: string
  ) => {
    setFilters((previous) => ({
      ...previous,

      dosageForms:
        previous.dosageForms.includes(
          form
        )
          ? previous.dosageForms.filter(
              (item) => item !== form
            )
          : [
              ...previous.dosageForms,
              form,
            ],
    }));
  };

  const toggleRoute = (
    route: string
  ) => {
    setFilters((previous) => ({
      ...previous,

      routes:
        previous.routes.includes(route)
          ? previous.routes.filter(
              (item) => item !== route
            )
          : [
              ...previous.routes,
              route,
            ],
    }));
  };

  const toggleAgeGroup = (
    ageGroup: string
  ) => {
    setFilters((previous) => ({
      ...previous,

      ageGroups:
        previous.ageGroups.includes(
          ageGroup
        )
          ? previous.ageGroups.filter(
              (item) =>
                item !== ageGroup
            )
          : [
              ...previous.ageGroups,
              ageGroup,
            ],
    }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSortBy('default');
  };

  const activeFilterCount =
    filters.riskCategories.length +
    filters.dosageForms.length +
    filters.routes.length +
    filters.ageGroups.length +
    (filters.pregnancySafe ? 1 : 0) +
    (filters.diabetesSafe ? 1 : 0) +
    (filters.hypertensionSafe ? 1 : 0);

  /*
   * LABELS
   */

  const labels = {
    title: isHindi
      ? 'दवाओं की निर्देशिका'
      : 'Medicines Directory',

    subtitle: isHindi
      ? 'बाल रोगियों के लिए उपलब्ध दवाओं की पूरी सूची'
      : 'Complete formulary of available pediatric medicines',

    showing: isHindi
      ? 'दिखाया जा रहा है'
      : 'Showing',

    of: isHindi
      ? 'में से'
      : 'of',

    medicines: isHindi
      ? 'दवाएँ'
      : 'Medicines',

    searchPlaceholder: isHindi
      ? 'दवा का नाम, साल्ट या संकेत खोजें...'
      : 'Search medicine name, salt, or indication...',

    filters: isHindi
      ? 'फ़िल्टर और क्रम'
      : 'Filter & Sort',

    activeFilters: isHindi
      ? 'सक्रिय फ़िल्टर'
      : 'Active filters',

    query: isHindi
      ? 'खोज'
      : 'Query',

    form: isHindi
      ? 'फॉर्म'
      : 'Form',

    route: isHindi
      ? 'मार्ग'
      : 'Route',

    age: isHindi
      ? 'आयु'
      : 'Age',

    pregnancy: isHindi
      ? 'गर्भावस्था: केवल सुरक्षित'
      : 'Pregnancy: Safe Only',

    diabetes: isHindi
      ? 'मधुमेह: केवल सुरक्षित'
      : 'Diabetes: Safe Only',

    hypertension: isHindi
      ? 'उच्च रक्तचाप: केवल सुरक्षित'
      : 'HTN: Safe Only',

    reset: isHindi
      ? 'रीसेट'
      : 'Reset',

    riskCategory: isHindi
      ? 'जोखिम श्रेणी'
      : 'Risk Category',

    dosageForm: isHindi
      ? 'दवा का रूप'
      : 'Dosage Form',

    routeTitle: isHindi
      ? 'दवा देने का मार्ग'
      : 'Route',

    ageGroup: isHindi
      ? 'आयु समूह'
      : 'Age Group',

    neonates: isHindi
      ? 'नवजात / जन्म'
      : 'Neonates / Birth',

    infants: isHindi
      ? 'शिशु (<1 वर्ष)'
      : 'Infants (<1 yr)',

    olderChildren: isHindi
      ? 'बड़े बच्चे / >5 वर्ष'
      : 'Older Children / >5 yrs',

    safetyScreening: isHindi
      ? 'सुरक्षा जाँच'
      : 'Safety Screening',

    pregnancySafe: isHindi
      ? 'गर्भावस्था: कोई निषेध नहीं'
      : 'Pregnancy: No Contraindication',

    diabetesSafe: isHindi
      ? 'मधुमेह: कोई निषेध नहीं'
      : 'Diabetes: No Contraindication',

    hypertensionSafe: isHindi
      ? 'उच्च रक्तचाप: कोई निषेध नहीं'
      : 'Hypertension: No Contraindication',

    noResults: isHindi
      ? 'आपके फ़िल्टर से कोई दवा मेल नहीं खाती'
      : 'No medicines match your filters',

    tryClearing: isHindi
      ? 'कुछ फ़िल्टर हटाने या खोज बदलने का प्रयास करें।'
      : 'Try clearing some filters or changing your search.',

    clearAllFilters: isHindi
      ? 'सभी फ़िल्टर हटाएँ'
      : 'Clear All Filters',

    filterCriteria: isHindi
      ? 'फ़िल्टर और क्रम'
      : 'Filters & Sort',

    clearAll: isHindi
      ? 'सभी हटाएँ'
      : 'Clear All',

    applyFilters: isHindi
      ? 'लागू करें'
      : 'Apply',

    defaultOrder: isHindi
      ? 'मूल क्रम (#01–#90)'
      : 'Default Order (#01–#90)',

    nameAZ: isHindi
      ? 'नाम: अ से ज्ञ'
      : 'Name: A–Z',

    nameZA: isHindi
      ? 'नाम: ज्ञ से अ'
      : 'Name: Z–A',

    riskFirst: isHindi
      ? 'जोखिम पहले'
      : 'Risk First',
  };

  /*
   * ALL THREE RISK CATEGORIES
   */
  const riskOptions: RiskCategory[] = [
    'HIGH RISK / ALERT',
    'CAUTION REQUIRED',
    'GENERALLY SAFE',
  ];

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
                <Baby className="h-4 w-4" />

                {isHindi
                  ? 'बाल चिकित्सा संदर्भ'
                  : 'Pediatric Reference'}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {labels.title}
              </h1>

              <p className="mt-2 max-w-2xl text-slate-600">
                {labels.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                <div className="text-2xl font-bold text-slate-900">
                  {medicines.length}
                </div>

                <div className="text-xs text-slate-500">
                  {isHindi
                    ? 'कुल दवाएँ'
                    : 'Total Medicines'}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* SEARCH + FILTER */}
        <div className="mb-6 flex flex-col gap-3 lg:flex-row">

          {/* FILTER & SORT — LEFT */}
          <button
            type="button"
            onClick={() =>
              setShowFilters(true)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <SlidersHorizontal className="h-4 w-4 text-blue-600" />

            {labels.filters}

            {(activeFilterCount > 0 ||
              sortBy !== 'default') && (
              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                {activeFilterCount +
                  (sortBy !== 'default'
                    ? 1
                    : 0)}
              </span>
            )}
          </button>

          {/* SEARCH */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value
                )
              }
              placeholder={
                labels.searchPlaceholder
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-10 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() =>
                  setSearchQuery('')
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label={
                  isHindi
                    ? 'खोज साफ़ करें'
                    : 'Clear search'
                }
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

        </div>

        {/* ACTIVE FILTERS */}
        {(searchQuery ||
          activeFilterCount > 0 ||
          sortBy !== 'default') && (
          <div className="mb-5 flex flex-wrap items-center gap-2">

            <span className="mr-1 text-sm font-medium text-slate-500">
              {labels.activeFilters}:
            </span>

            {searchQuery && (
              <button
                type="button"
                onClick={() =>
                  setSearchQuery('')
                }
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
              >
                {labels.query}: {searchQuery}

                <X className="h-3 w-3" />
              </button>
            )}

            {sortBy !== 'default' && (
              <button
                type="button"
                onClick={() =>
                  setSortBy('default')
                }
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                {sortBy === 'name-asc'
                  ? labels.nameAZ
                  : labels.nameZA}

                <X className="h-3 w-3" />
              </button>
            )}

            {filters.riskCategories.map(
              (risk) => (
                <button
                  key={risk}
                  type="button"
                  onClick={() =>
                    toggleRisk(risk)
                  }
                  className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700"
                >
                  {getRiskLabel(
                    risk,
                    language
                  )}

                  <X className="h-3 w-3" />
                </button>
              )
            )}

            {filters.dosageForms.map(
              (form) => (
                <button
                  key={form}
                  type="button"
                  onClick={() =>
                    toggleForm(form)
                  }
                  className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700"
                >
                  {labels.form}:{' '}
                  {getDisplayForm(form)}

                  <X className="h-3 w-3" />
                </button>
              )
            )}

            {filters.routes.map(
              (route) => (
                <button
                  key={route}
                  type="button"
                  onClick={() =>
                    toggleRoute(route)
                  }
                  className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700"
                >
                  {labels.route}:{' '}
                  {getDisplayRoute(route)}

                  <X className="h-3 w-3" />
                </button>
              )
            )}

            {filters.ageGroups.map(
              (ageGroup) => (
                <button
                  key={ageGroup}
                  type="button"
                  onClick={() =>
                    toggleAgeGroup(
                      ageGroup
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700"
                >
                  {ageGroup ===
                  'Neonates / Birth'
                    ? labels.neonates
                    : ageGroup ===
                        'Infants (<1 yr)'
                      ? labels.infants
                      : labels.olderChildren}

                  <X className="h-3 w-3" />
                </button>
              )
            )}

            {filters.pregnancySafe && (
              <button
                type="button"
                onClick={() =>
                  setFilters(
                    (previous) => ({
                      ...previous,
                      pregnancySafe:
                        false,
                    })
                  )
                }
                className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-700"
              >
                {labels.pregnancy}

                <X className="h-3 w-3" />
              </button>
            )}

            {filters.diabetesSafe && (
              <button
                type="button"
                onClick={() =>
                  setFilters(
                    (previous) => ({
                      ...previous,
                      diabetesSafe:
                        false,
                    })
                  )
                }
                className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700"
              >
                {labels.diabetes}

                <X className="h-3 w-3" />
              </button>
            )}

            {filters.hypertensionSafe && (
              <button
                type="button"
                onClick={() =>
                  setFilters(
                    (previous) => ({
                      ...previous,
                      hypertensionSafe:
                        false,
                    })
                  )
                }
                className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
              >
                {labels.hypertension}

                <X className="h-3 w-3" />
              </button>
            )}

            {(activeFilterCount > 0 ||
              sortBy !== 'default') && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-900"
              >
                <RotateCcw className="h-3 w-3" />

                {labels.reset}
              </button>
            )}

          </div>
        )}

        {/* RESULT COUNT */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {labels.showing}{' '}

            <span className="font-semibold text-slate-800">
              {filteredMedicines.length}
            </span>{' '}

            {labels.of}{' '}

            <span className="font-semibold text-slate-800">
              {medicines.length}
            </span>{' '}

            {labels.medicines}
          </p>
        </div>

        {/* MEDICINE GRID */}
        {filteredMedicines.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredMedicines.map(
              (medicine) => (
                <MedicineCard
                  key={medicine.id}
                  medicine={medicine}
                />
              )
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Search className="h-6 w-6 text-slate-400" />
            </div>

            <h3 className="text-lg font-semibold text-slate-900">
              {labels.noResults}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              {labels.tryClearing}
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                resetFilters();
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <RotateCcw className="h-4 w-4" />

              {labels.clearAllFilters}
            </button>

          </div>
        )}
      </div>

      {/* LEFT FILTER DRAWER */}
      {showFilters && (
        <div className="fixed inset-0 z-50">

          {/* Overlay */}
          <button
            type="button"
            aria-label={
              isHindi
                ? 'फ़िल्टर बंद करें'
                : 'Close filters'
            }
            className="absolute inset-0 bg-slate-900/40"
            onClick={() =>
              setShowFilters(false)
            }
          />

          {/* Drawer */}
          <aside className="absolute right-0 top-0 flex h-full w-[88vw] max-w-md flex-col bg-white shadow-2xl">

            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b bg-white px-5 py-4">

              <div className="flex items-center gap-2">

                <div className="rounded-lg bg-blue-50 p-2">
                  <Filter className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {labels.filterCriteria}
                  </h2>

                  <p className="text-xs text-slate-500">
                    {isHindi
                      ? 'अपनी खोज को आसानी से अनुकूलित करें'
                      : 'Customize your medicine search'}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">

              {/* SORT MEDICINES */}
              <section className="mb-7">

                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  {isHindi
                    ? 'दवाओं का क्रम'
                    : 'Sort Medicines'}
                </h3>

                <div className="relative">

                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target
                          .value as SortOption
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="default">
                      {labels.defaultOrder}
                    </option>

                    <option value="name-asc">
                      {labels.nameAZ}
                    </option>

                    <option value="name-desc">
                      {labels.nameZA}
                    </option>

                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                </div>

              </section>

              {/* RISK */}
              <section className="mb-7">

                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  {labels.riskCategory}
                </h3>

                <div className="space-y-2">

                  {riskOptions.map(
                    (risk) => {
                      const checked =
                        filters.riskCategories.includes(
                          risk
                        );

                      return (
                        <label
                          key={risk}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/50"
                        >

                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              toggleRisk(
                                risk
                              )
                            }
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />

                          <span className="text-sm text-slate-700">
                            {getRiskLabel(
                              risk,
                              language
                            )}
                          </span>

                        </label>
                      );
                    }
                  )}

                </div>

              </section>

              {/* DOSAGE FORM */}
              <section className="mb-7">

                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  {labels.dosageForm}
                </h3>

                <div className="space-y-2">

                  {uniqueForms.map(
                    (form) => {
                      const checked =
                        filters.dosageForms.includes(
                          form
                        );

                      return (
                        <label
                          key={form}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/50"
                        >

                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              toggleForm(
                                form
                              )
                            }
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />

                          <span className="text-sm text-slate-700">
                            {getDisplayForm(
                              form
                            )}
                          </span>

                        </label>
                      );
                    }
                  )}

                </div>

              </section>

              {/* ROUTES */}
              <section className="mb-7">

                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  {labels.routeTitle}
                </h3>

                <div className="space-y-2">

                  {uniqueRoutes.map(
                    (route) => {
                      const checked =
                        filters.routes.includes(
                          route
                        );

                      return (
                        <label
                          key={route}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/50"
                        >

                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              toggleRoute(
                                route
                              )
                            }
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />

                          <span className="text-sm text-slate-700">
                            {getDisplayRoute(
                              route
                            )}
                          </span>

                        </label>
                      );
                    }
                  )}

                </div>

              </section>

              {/* AGE */}
              <section className="mb-7">

                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  {labels.ageGroup}
                </h3>

                <div className="space-y-2">

                  {AGE_GROUPS.map(
                    (ageGroup) => {
                      const checked =
                        filters.ageGroups.includes(
                          ageGroup
                        );

                      let displayAge =
                        ageGroup;

                      if (
                        ageGroup ===
                        'Neonates / Birth'
                      ) {
                        displayAge =
                          labels.neonates;
                      } else if (
                        ageGroup ===
                        'Infants (<1 yr)'
                      ) {
                        displayAge =
                          labels.infants;
                      } else if (
                        ageGroup ===
                        'Older Children / >5 yrs'
                      ) {
                        displayAge =
                          labels.olderChildren;
                      }

                      return (
                        <label
                          key={ageGroup}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/50"
                        >

                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              toggleAgeGroup(
                                ageGroup
                              )
                            }
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />

                          <span className="text-sm text-slate-700">
                            {displayAge}
                          </span>

                        </label>
                      );
                    }
                  )}

                </div>

              </section>

              {/* SAFETY */}
              <section className="mb-7">

                <div className="mb-3 flex items-center gap-2">

                  <ShieldCheck className="h-4 w-4 text-green-600" />

                  <h3 className="text-sm font-semibold text-slate-900">
                    {labels.safetyScreening}
                  </h3>

                </div>

                <div className="space-y-2">

                  {/* Pregnancy */}
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/50">

                    <input
                      type="checkbox"
                      checked={
                        filters.pregnancySafe
                      }
                      onChange={(event) =>
                        setFilters(
                          (previous) => ({
                            ...previous,
                            pregnancySafe:
                              event.target
                                .checked,
                          })
                        )
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <span className="text-sm text-slate-700">
                      {labels.pregnancySafe}
                    </span>

                  </label>

                  {/* Diabetes */}
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/50">

                    <input
                      type="checkbox"
                      checked={
                        filters.diabetesSafe
                      }
                      onChange={(event) =>
                        setFilters(
                          (previous) => ({
                            ...previous,
                            diabetesSafe:
                              event.target
                                .checked,
                          })
                        )
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <span className="text-sm text-slate-700">
                      {labels.diabetesSafe}
                    </span>

                  </label>

                  {/* Hypertension */}
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/50">

                    <input
                      type="checkbox"
                      checked={
                        filters.hypertensionSafe
                      }
                      onChange={(event) =>
                        setFilters(
                          (previous) => ({
                            ...previous,
                            hypertensionSafe:
                              event.target
                                .checked,
                          })
                        )
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <span className="text-sm text-slate-700">
                      {
                        labels.hypertensionSafe
                      }
                    </span>

                  </label>

                </div>

              </section>

              {/* WARNING */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

                <div className="flex gap-3">

                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                  <p className="text-xs leading-5 text-amber-800">
                    {isHindi
                      ? 'यह फ़िल्टर केवल त्वरित संदर्भ के लिए हैं। दवा देने से पहले स्थानीय प्रोटोकॉल और चिकित्सकीय निर्देश देखें।'
                      : 'These filters are for quick reference only. Check local protocols and clinical guidance before administering medicines.'}
                  </p>

                </div>

              </div>

            </div>

            {/* DRAWER FOOTER */}
            <div className="border-t bg-white p-4">

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <RotateCcw className="h-4 w-4" />

                    {labels.clearAll}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowFilters(false)
                  }
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  {labels.applyFilters}
                </button>

              </div>

            </div>

          </aside>
        </div>
      )}

    </main>
  );
}

export default function MedicinesPage() {
  return <MedicinesContent />;
}