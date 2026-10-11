export type RiskCategory =
  | 'HIGH RISK / ALERT'
  | 'CAUTION REQUIRED'
  | 'GENERALLY SAFE';

export type DosageForm =
  | 'Tablet'
  | 'Capsule'
  | 'Syrup'
  | 'Suspension'
  | 'Injection'
  | 'Drops'
  | 'Cream'
  | 'Ointment'
  | 'Inhaler'
  | 'Solution'
  | 'Powder'
  | 'Other';

export interface DoseCalculatorConfig {
  supported: boolean;
  minDosePerKg?: number;
  maxDosePerKg?: number;
  unit: string;
  doseFrequency: string;
  maxDailyDose?: string;
  maxSingleDose?: string | number;
  concentrationMgPerMl?: number;
  notes?: string;
  fixedDose?: string;
}

export interface Medicine {
  id: string;

  // English
  genericName: string;
  alternativeName?: string;

  // Hindi
  genericNameHi?: string;
  alternativeNameHi?: string;

  // Risk
  riskCategory: RiskCategory;
  riskCategoryHi?: string;

  // Dose & age
  pediatricDose: string;
  pediatricDoseHi?: string;

  ageRestriction?: string;
  ageRestrictionHi?: string;

  // Form & strength
  dosageForm: string;
  dosageFormHi?: string;

  availableStrength: string;
  availableStrengthHi?: string;

  // Precautions
  pregnancyPrecautions?: string;
  pregnancyPrecautionsHi?: string;

  diabetesPrecautions?: string;
  diabetesPrecautionsHi?: string;

  hypertensionPrecautions?: string;
  hypertensionPrecautionsHi?: string;

  otherPrecautions?: string;
  otherPrecautionsHi?: string;

  // Routes
  routes: string[];
  routesHi?: string[];

  popular?: boolean;
  emergencyRelevant?: boolean;

  calculator?: DoseCalculatorConfig;
}

export interface FilterState {
  search: string;
  riskCategory: RiskCategory | 'ALL';
  dosageForm: string | 'ALL';
  popularOnly: boolean;
}

export interface AdminChangeLog {
  id: string;
  medicineId: string;
  medicineName: string;
  action: string;
  details: string;
  author: string;
  timestamp: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  changedBy?: string;
  changedAt?: string;
}
