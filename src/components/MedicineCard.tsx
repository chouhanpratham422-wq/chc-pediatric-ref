'use client';

import React from 'react';
import Link from 'next/link';
import { Medicine } from '@/types/medicine';
import { RiskBadge } from '@/components/RiskBadge';
import { useApp } from '@/context/AppContext';
import {
  getMedicineName,
  getAlternativeName,
  getAvailableStrength,
  getMedicineDose,
  getAgeRestriction,
  getRoutes,
} from '@/lib/medicine-language';
import { Star, ArrowRight, Pill } from 'lucide-react';

interface MedicineCardProps {
  medicine: Medicine;
  onSelect?: () => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onSelect,
}) => {
  const {
    isFavorite,
    toggleFavorite,
    t,
    language,
  } = useApp();

  const favorite = isFavorite(medicine.id);

  // Medicine content - English source data remains unchanged.
  // Hindi is loaded from medicine-translations-hi.ts
  const medicineName = getMedicineName(medicine, language);

  const alternativeName = getAlternativeName(
    medicine,
    language
  );

  const availableStrength = getAvailableStrength(
    medicine,
    language
  );

  const pediatricDose = getMedicineDose(
    medicine,
    language
  );

  const ageRestriction = getAgeRestriction(
    medicine,
    language
  );

  const routes = getRoutes(
    medicine,
    language
  );

  return (
    <div
      className="
        group relative min-w-0 w-full
        bg-white dark:bg-gray-900
        border border-slate-200 dark:border-gray-800
        rounded-2xl p-5
        shadow-xs
        hover:shadow-md
        hover:border-sky-300 dark:hover:border-sky-600
        transition-all duration-200
        flex flex-col justify-between
        overflow-hidden
      "
    >
      <div className="min-w-0 w-full">

        {/* Top bar: ID + Badge + Favorite */}
        <div className="flex items-start justify-between gap-2 mb-3 min-w-0">

          <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
            <span
              className="
                inline-flex shrink-0
                items-center justify-center
                font-mono text-xs font-bold
                text-slate-500 dark:text-gray-400
                bg-slate-100 dark:bg-gray-800
                rounded-md px-2 py-0.5
                border border-slate-200 dark:border-gray-700
              "
            >
              #{medicine.id}
            </span>

            <div className="min-w-0 max-w-full">
              <RiskBadge
                category={medicine.riskCategory}
                size="sm"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(medicine.id);
            }}
            aria-label={
              favorite
                ? t.removeFromFavorites
                : t.addToFavorites
            }
            className={`
              shrink-0
              p-1.5 rounded-lg
              transition-colors
              ${
                favorite
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100'
                  : 'text-slate-400 dark:text-gray-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-gray-800'
              }
            `}
          >
            <Star
              size={18}
              fill={favorite ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        {/* Medicine Title & Alternative Name */}
        <Link
          href={`/medicines/${medicine.id}`}
          onClick={onSelect}
          className="block min-w-0 focus:outline-hidden"
        >
          <h3
            className="
              min-w-0
              text-base md:text-lg
              font-bold
              text-slate-900 dark:text-white
              group-hover:text-sky-600
              dark:group-hover:text-sky-400
              transition-colors
              leading-snug
              break-words
            "
          >
            {medicineName}
          </h3>

          {alternativeName && (
            <p
              className="
                min-w-0
                text-xs
                text-slate-500 dark:text-gray-400
                font-medium
                mt-0.5
                break-words
              "
            >
              ({alternativeName})
            </p>
          )}
        </Link>

        {/* CHC Stock Strength Box */}
        <div
          className="
            mt-3.5
            flex items-center
            gap-1.5
            min-w-0 w-full
            text-xs font-medium
            bg-slate-50 dark:bg-gray-800/80
            text-slate-700 dark:text-gray-300
            px-2.5 py-1.5
            rounded-lg
            border border-slate-200/80 dark:border-gray-700/80
          "
        >
          <Pill
            size={14}
            className="text-sky-600 dark:text-sky-400 shrink-0"
          />

          <span
            className="
              font-semibold
              text-slate-500 dark:text-gray-400
              shrink-0
            "
          >
            {language === 'hi'
              ? 'सीएचसी स्टॉक:'
              : 'CHC Stock:'}
          </span>

          <span
            className="
              min-w-0
              flex-1
              truncate
            "
            title={availableStrength}
          >
            {availableStrength}
          </span>
        </div>

        {/* Pediatric Dose Preview */}
        <div
          className="
            mt-3
            min-w-0
            w-full
            text-xs
            text-slate-600 dark:text-gray-300
            line-clamp-2
            leading-relaxed
            break-words
            overflow-hidden
          "
        >
          <span
            className="
              font-semibold
              text-slate-700 dark:text-gray-200
            "
          >
            {language === 'hi'
              ? 'खुराक: '
              : 'Dose: '}
          </span>

          {pediatricDose}
        </div>

        {/* Age Restriction */}
        {ageRestriction && (
          <div
            className="
              mt-2
              min-w-0 w-full
              text-[11px]
              text-amber-700 dark:text-amber-400
              bg-amber-50/70 dark:bg-amber-950/30
              px-2 py-1
              rounded
              border border-amber-200/60
              dark:border-amber-800/40
              break-words
              overflow-hidden
            "
          >
            ⚠️ {ageRestriction}
          </div>
        )}
      </div>

      {/* Footer action */}
      <div
        className="
          mt-4 pt-3
          border-t border-slate-100 dark:border-gray-800
          flex flex-wrap
          items-center
          justify-between
          gap-2
          min-w-0
          text-xs
        "
      >
        <div
          className="
            flex flex-wrap
            items-center
            gap-1
            min-w-0
            flex-1
          "
        >
          {routes.map((route, i) => (
            <span
              key={i}
              className="
                shrink-0
                text-[10px]
                font-medium
                px-1.5 py-0.5
                rounded
                bg-slate-100 dark:bg-gray-800
                text-slate-600 dark:text-gray-400
              "
            >
              {route}
            </span>
          ))}
        </div>

        <Link
          href={`/medicines/${medicine.id}`}
          onClick={onSelect}
          className="
            shrink-0
            inline-flex
            items-center
            gap-1
            font-semibold
            text-sky-600 dark:text-sky-400
            hover:text-sky-700
            dark:hover:text-sky-300
            transition-colors
            whitespace-nowrap
          "
        >
          <span>{t.viewDetails}</span>

          <ArrowRight
            size={13}
            className="
              group-hover:translate-x-0.5
              transition-transform
              shrink-0
            "
          />
        </Link>
      </div>
    </div>
  );
};