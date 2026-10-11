'use client';

import React from 'react';
import { RiskCategory } from '@/types/medicine';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface RiskBadgeProps {
  category: RiskCategory;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  category,
  size = 'md',
  showIcon = true,
}) => {
  const { language } = useApp();

  const isHighRisk = category === 'HIGH RISK / ALERT';
  const isCaution = category === 'CAUTION REQUIRED';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs md:text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-sm md:text-base px-3.5 py-1.5 gap-2 font-semibold',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 18,
  };

  if (isHighRisk) {
    return (
      <span
        className={`inline-flex items-center rounded-full font-semibold border transition-colors shadow-xs ${sizeClasses[size]} bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800/80`}
        title={
          language === 'hi'
            ? 'उच्च जोखिम / सतर्कता: अतिरिक्त सावधानी और सत्यापन आवश्यक'
            : 'High Risk / Alert: Extra vigilance and verification required'
        }
      >
        {showIcon && (
          <AlertTriangle
            size={iconSizes[size]}
            className="shrink-0 text-red-600 dark:text-red-400"
          />
        )}

        <span>
          {language === 'hi'
            ? 'उच्च जोखिम / सतर्कता'
            : 'HIGH RISK / ALERT'}
        </span>
      </span>
    );
  }

  if (isCaution) {
    return (
      <span
        className={`inline-flex items-center rounded-full font-semibold border transition-colors shadow-xs ${sizeClasses[size]} bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/80`}
        title={
          language === 'hi'
            ? 'सावधानी आवश्यक: सावधानियों और अंगों पर प्रभाव पर विशेष ध्यान दें'
            : 'Caution Required: Pay specific attention to precautions & organ load'
        }
      >
        {showIcon && (
          <AlertCircle
            size={iconSizes[size]}
            className="shrink-0 text-amber-600 dark:text-amber-400"
          />
        )}

        <span>
          {language === 'hi'
            ? 'सावधानी आवश्यक'
            : 'CAUTION REQUIRED'}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold border transition-colors shadow-xs ${sizeClasses[size]} bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/80`}
      title={
        language === 'hi'
          ? 'सामान्यतः सुरक्षित: मानक बाल चिकित्सा प्रोटोकॉल लागू होते हैं'
          : 'Generally Safe: Standard pediatric protocols apply'
      }
    >
      {showIcon && (
        <CheckCircle2
          size={iconSizes[size]}
          className="shrink-0 text-emerald-600 dark:text-emerald-400"
        />
      )}

      <span>
        {language === 'hi'
          ? 'सामान्यतः सुरक्षित'
          : 'GENERALLY SAFE'}
      </span>
    </span>
  );
};