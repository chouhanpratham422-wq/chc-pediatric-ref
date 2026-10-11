'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Home,
  Pill,
  Calculator,
  Star,
  MoreHorizontal,
  AlertOctagon,
  Scale,
  ShieldCheck,
  Search,
  CheckCircle,
  X,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { favorites, setIsCommandPaletteOpen } = useApp();
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);

  const tabs = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
    },
    {
      href: '/medicines',
      label: 'Medicines',
      icon: Pill,
    },
    {
      href: '/dose-calculator',
      label: 'Calculator',
      icon: Calculator,
    },
    {
      href: '/favorites',
      label: 'Favorites',
      icon: Star,
      badge:
        favorites.length > 0
          ? favorites.length
          : undefined,
    },
  ];

  return (
    <>
      {/* Bottom Floating Bar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-slate-200 dark:border-gray-800 px-1.5 py-1 shadow-lg">
        <div className="flex w-full items-center justify-between gap-0.5">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative min-w-0 flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[10px] font-medium transition-colors ${
                  isActive
                    ? 'text-sky-600 dark:text-sky-400 font-bold'
                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200'
                }`}
              >
                <div className="relative shrink-0">
                  <Icon size={20} />

                  {tab.badge !== undefined && (
                    <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span className="mt-1 truncate max-w-full">
                  {tab.label}
                </span>
              </Link>
            );
          })}

          {/* More Sheet Trigger */}
          <button
            type="button"
            onClick={() => setMoreSheetOpen(true)}
            className={`relative min-w-0 flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[10px] font-medium transition-colors ${
              moreSheetOpen ||
              pathname === '/emergency' ||
              pathname === '/compare' ||
              pathname === '/admin'
                ? 'text-sky-600 dark:text-sky-400 font-bold'
                : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200'
            }`}
          >
            <MoreHorizontal
              size={20}
              className="shrink-0"
            />

            <span className="mt-1">
              More
            </span>
          </button>
        </div>
      </nav>

      {/* More Options Modal Sheet for Mobile */}
      {moreSheetOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-200"
          onClick={() => setMoreSheetOpen(false)}
        >
          <div
            className="w-full bg-white dark:bg-gray-900 rounded-t-3xl border-t border-slate-200 dark:border-gray-800 p-6 pb-8 shadow-2xl space-y-4 max-h-[75vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-gray-800">
              <span className="font-bold text-base text-slate-900 dark:text-white">
                Quick Navigation
              </span>

              <button
                type="button"
                onClick={() =>
                  setMoreSheetOpen(false)
                }
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Navigation Options */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/emergency"
                onClick={() =>
                  setMoreSheetOpen(false)
                }
                className="flex flex-col p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-300 gap-1.5"
              >
                <AlertOctagon
                  size={22}
                  className="text-red-600 dark:text-red-400"
                />

                <span className="font-bold text-xs">
                  Emergency Alert
                </span>

                <span className="text-[10px] text-red-700 dark:text-red-400">
                  High Risk & Stat Dosing
                </span>
              </Link>

              <Link
                href="/compare"
                onClick={() =>
                  setMoreSheetOpen(false)
                }
                className="flex flex-col p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-indigo-900 dark:text-indigo-300 gap-1.5"
              >
                <Scale
                  size={22}
                  className="text-indigo-600 dark:text-indigo-400"
                />

                <span className="font-bold text-xs">
                  Drug Compare
                </span>

                <span className="text-[10px] text-indigo-700 dark:text-indigo-400">
                  Side-by-side Matrix
                </span>
              </Link>

              <Link
                href="/admin"
                onClick={() =>
                  setMoreSheetOpen(false)
                }
                className="flex flex-col p-3 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white gap-1.5"
              >
                <ShieldCheck
                  size={22}
                  className="text-sky-600 dark:text-sky-400"
                />

                <span className="font-bold text-xs">
                  Admin Portal
                </span>

                <span className="text-[10px] text-slate-500 dark:text-gray-400">
                  Clinical stock updates
                </span>
              </Link>

              <Link
                href="/validation"
                onClick={() =>
                  setMoreSheetOpen(false)
                }
                className="flex flex-col p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-300 gap-1.5"
              >
                <CheckCircle
                  size={22}
                  className="text-emerald-600 dark:text-emerald-400"
                />

                <span className="font-bold text-xs">
                  Data Validation
                </span>

                <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
                  90 Items Verified
                </span>
              </Link>
            </div>

            {/* Global Search */}
            <button
              type="button"
              onClick={() => {
                setMoreSheetOpen(false);
                setIsCommandPaletteOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-sky-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Search size={16} />

              <span>
                Open Global Search
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};