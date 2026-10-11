'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MedicineCard } from '@/components/MedicineCard';
import { Star, Search } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, medicines, t, language } = useApp();

  const isHindi = language === 'hi';

  const favoriteMeds = favorites
    .map((id) => medicines.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => m !== undefined);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800 mb-2">
            <Star size={14} fill="currentColor" />
            <span>
              {isHindi ? 'सहेजी गई संदर्भ दवाएँ' : 'Saved Reference Drugs'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isHindi ? 'पसंदीदा और बुकमार्क' : 'Favorites & Bookmarks'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mt-0.5">
            {isHindi
              ? 'अक्सर उपयोग की जाने वाली बाल चिकित्सा दवाओं की त्वरित-संदर्भ सूची।'
              : 'Quick-access list of frequently consulted pediatric medications.'}
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300">
          {favoriteMeds.length}{' '}
          {isHindi ? 'सहेजी गई' : 'Saved'}
        </span>
      </div>

      {/* Grid or Empty State */}
      {favoriteMeds.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto mt-8 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
            <Star size={28} />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.emptyFavorites}
            </h2>

            <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
              {isHindi
                ? 'किसी भी दवा कार्ड या विवरण पेज पर ⭐ स्टार आइकन दबाकर उसे यहाँ तुरंत ऑफलाइन उपयोग के लिए बुकमार्क करें।'
                : 'Click the star icon (⭐) on any medicine card or detail page to bookmark it here for instant offline access.'}
            </p>
          </div>

          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Search size={14} />
            <span>
              {isHindi
                ? 'दवा निर्देशिका देखें'
                : 'Browse Medicines Directory'}
            </span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteMeds.map((med) => (
            <MedicineCard key={med.id} medicine={med} />
          ))}
        </div>
      )}
    </div>
  );
}