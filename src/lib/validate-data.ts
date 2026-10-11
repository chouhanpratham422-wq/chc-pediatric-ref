import { MEDICINES_DATA } from '@/data/medicines';

export interface ValidationReport {
  totalEntries: number;
  expectedEntries: number;
  isValid: boolean;
  missingNames: string[];
  missingRiskCategories: string[];
  missingDoseFields: string[];
  missingStockFields: string[];
  riskCounts: {
    highRisk: number;
    caution: number;
    generallySafe: number;
  };
  formCounts: Record<string, number>;
  calculatorSupportedCount: number;
}

export function validateMedicineDatabase(): ValidationReport {
  const missingNames: string[] = [];
  const missingRiskCategories: string[] = [];
  const missingDoseFields: string[] = [];
  const missingStockFields: string[] = [];

  let highRisk = 0;
  let caution = 0;
  let generallySafe = 0;
  let calculatorSupported = 0;
  const formCounts: Record<string, number> = {};

  MEDICINES_DATA.forEach((med) => {
    if (!med.genericName || med.genericName.trim() === '') {
      missingNames.push(med.id);
    }
    if (!med.riskCategory) {
      missingRiskCategories.push(med.id);
    } else {
      if (med.riskCategory === 'HIGH RISK / ALERT') highRisk++;
      else if (med.riskCategory === 'CAUTION REQUIRED') caution++;
      else if (med.riskCategory === 'GENERALLY SAFE') generallySafe++;
    }

    if (!med.pediatricDose || med.pediatricDose.trim() === '') {
      missingDoseFields.push(med.id);
    }

    if (!med.availableStrength || med.availableStrength.trim() === '') {
      missingStockFields.push(med.id);
    }

    const form = med.dosageForm || 'UNKNOWN';
    formCounts[form] = (formCounts[form] || 0) + 1;

    if (med.calculator?.supported) {
      calculatorSupported++;
    }
  });

  const isValid =
    MEDICINES_DATA.length === 90 &&
    missingNames.length === 0 &&
    missingRiskCategories.length === 0 &&
    missingDoseFields.length === 0 &&
    missingStockFields.length === 0;

  return {
    totalEntries: MEDICINES_DATA.length,
    expectedEntries: 90,
    isValid,
    missingNames,
    missingRiskCategories,
    missingDoseFields,
    missingStockFields,
    riskCounts: {
      highRisk,
      caution,
      generallySafe,
    },
    formCounts,
    calculatorSupportedCount: calculatorSupported,
  };
}
