import { Medicine, RiskCategory } from '@/types/medicine';
import { Language } from '@/lib/translations';
import { MEDICINE_TRANSLATIONS_HI } from '@/data/medicine-translations-hi';
import {
  MEDICINE_CALCULATOR_TRANSLATIONS_HI,
  HindiCalculatorTranslation,
} from '@/data/medicine-calculator-translations-hi';

function getHindiTranslation(medicine: Medicine) {
  const id = String(medicine.id);

  return (
    MEDICINE_TRANSLATIONS_HI[id] ??
    MEDICINE_TRANSLATIONS_HI[id.padStart(2, '0')]
  );
}

export function getCalculatorTranslation(
  medicine: Medicine,
  language: Language
): HindiCalculatorTranslation | undefined {
  if (language !== 'hi') {
    return undefined;
  }

  const id = String(medicine.id);

  return (
    MEDICINE_CALCULATOR_TRANSLATIONS_HI[id] ??
    MEDICINE_CALCULATOR_TRANSLATIONS_HI[id.padStart(2, '0')]
  );
}

export function getMedicineName(
  medicine: Medicine,
  language: Language
): string {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.genericName ||
      medicine.genericName
    );
  }

  return medicine.genericName;
}

export function getAlternativeName(
  medicine: Medicine,
  language: Language
): string | undefined {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.alternativeName ||
      medicine.alternativeName
    );
  }

  return medicine.alternativeName;
}

export function getRiskLabel(
  risk: RiskCategory,
  language: Language
): string {
  if (language === 'hi') {
    switch (risk) {
      case 'HIGH RISK / ALERT':
        return 'उच्च जोखिम / सतर्कता';

      case 'CAUTION REQUIRED':
        return 'सावधानी आवश्यक';

      case 'GENERALLY SAFE':
        return 'सामान्यतः सुरक्षित';

      default:
        return risk;
    }
  }

  return risk;
}

export function getMedicineDose(
  medicine: Medicine,
  language: Language
): string {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.pediatricDose ||
      medicine.pediatricDose
    );
  }

  return medicine.pediatricDose;
}

export function getAgeRestriction(
  medicine: Medicine,
  language: Language
): string | undefined {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.ageRestriction ||
      medicine.ageRestriction
    );
  }

  return medicine.ageRestriction;
}

export function getDosageForm(
  medicine: Medicine,
  language: Language
): string {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.dosageForm ||
      medicine.dosageForm
    );
  }

  return medicine.dosageForm;
}

export function getAvailableStrength(
  medicine: Medicine,
  language: Language
): string {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.availableStrength ||
      medicine.availableStrength
    );
  }

  return medicine.availableStrength;
}

export function getPregnancyPrecautions(
  medicine: Medicine,
  language: Language
): string | undefined {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.pregnancyPrecautions ||
      medicine.pregnancyPrecautions
    );
  }

  return medicine.pregnancyPrecautions;
}

export function getDiabetesPrecautions(
  medicine: Medicine,
  language: Language
): string | undefined {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.diabetesPrecautions ||
      medicine.diabetesPrecautions
    );
  }

  return medicine.diabetesPrecautions;
}

export function getHypertensionPrecautions(
  medicine: Medicine,
  language: Language
): string | undefined {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.hypertensionPrecautions ||
      medicine.hypertensionPrecautions
    );
  }

  return medicine.hypertensionPrecautions;
}

export function getOtherPrecautions(
  medicine: Medicine,
  language: Language
): string | undefined {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.otherPrecautions ||
      medicine.otherPrecautions
    );
  }

  return medicine.otherPrecautions;
}

export function getRoutes(
  medicine: Medicine,
  language: Language
): string[] {
  if (language === 'hi') {
    return (
      getHindiTranslation(medicine)?.routes ||
      medicine.routes
    );
  }

  return medicine.routes;
}