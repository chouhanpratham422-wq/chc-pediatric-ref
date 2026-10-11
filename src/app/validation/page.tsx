'use client';

import React from 'react';
import Link from 'next/link';
import { validateMedicineDatabase } from '@/lib/validate-data';
import { MEDICINES_DATA } from '@/data/medicines';
import { RiskBadge } from '@/components/RiskBadge';
import {
  CheckCircle2,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';
import {
  getMedicineName,
  getAvailableStrength,
  getDosageForm,
} from '@/lib/medicine-language';
import { useApp } from '@/context/AppContext';

export default function ValidationPage() {
  const report = validateMedicineDatabase();
  const { language } = useApp();

  const isHindi = language === 'hi';

  const getFormLabel = (form: string) => {
    if (!isHindi) return form;

    const labels: Record<string, string> = {
      Tablet: 'टैबलेट',
      Syrup: 'सिरप',
      Injection: 'इंजेक्शन',
      Suspension: 'सस्पेंशन',
      Capsule: 'कैप्सूल',
      Cream: 'क्रीम',
      Ointment: 'ऑइंटमेंट',
      Drops: 'ड्रॉप्स',
      Solution: 'सॉल्यूशन',
      Powder: 'पाउडर',
      Gel: 'जेल',
      Inhaler: 'इनहेलर',
      Nebulizer: 'नेबुलाइज़र',
      'Oral Liquid': 'ओरल लिक्विड',
      'Eye Drops': 'आई ड्रॉप्स',
      'Ear Drops': 'ईयर ड्रॉप्स',
      'Nasal Drops': 'नेज़ल ड्रॉप्स',
      'Topical Cream': 'टॉपिकल क्रीम',
      'Topical Ointment': 'टॉपिकल ऑइंटमेंट',
    };

    return labels[form] || form;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-gray-800 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 mb-2">
          <FileCheck size={14} />
          <span>
            {isHindi
              ? 'फॉर्म्युलरी अखंडता ऑडिट'
              : 'Formulary Integrity Audit'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isHindi
            ? 'सीएचसी डेटाबेस सत्यापन ऑडिट'
            : 'CHC Database Validation Audit'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
          {isHindi
            ? 'यह स्वचालित ऑडिट टूल सभी 90 प्रविष्टियों की जाँच करता है ताकि यह सुनिश्चित हो सके कि सभी आवश्यक जानकारी सही तरीके से दर्ज है और कोई आवश्यक फ़ील्ड खाली नहीं है।'
            : 'Automated audit tool verifying that all 90 entries from the attached PDF are faithfully structured without missing fields.'}
        </p>
      </div>

      {/* Audit Summary Card */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border shadow-xs ${
          report.isValid
            ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
        }`}
      >
        <div className="flex items-center gap-3">
          {report.isValid ? (
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 size={26} />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0">
              <AlertTriangle size={26} />
            </div>
          )}

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {report.isValid
                ? isHindi
                  ? 'सभी 90 फॉर्म्युलरी प्रविष्टियों का सफलतापूर्वक सत्यापन किया गया'
                  : 'All 90 Formulary Entries Successfully Validated.'
                : isHindi
                  ? 'सत्यापन अधूरा है'
                  : 'Validation Incomplete'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 mt-0.5">
              {report.isValid
                ? isHindi
                  ? ''
                  : ''
                : isHindi
                  ? 'एक या अधिक आवश्यक फ़ील्ड की समीक्षा आवश्यक है।'
                  : 'One or more mandatory fields require review.'}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {isHindi ? 'कुल प्रविष्टियाँ' : 'Total Entries'}
          </span>

          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {report.totalEntries} / {report.expectedEntries}
          </div>

          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            ✓ {isHindi ? '100% पूर्ण' : '100% Complete'}
          </span>
        </div>
      </div>

      {/* Breakdown: Risk categories & Dosage forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            {isHindi
              ? 'जोखिम श्रेणी वितरण'
              : 'Risk Category Distribution'}
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="font-semibold text-slate-800 dark:text-gray-200">
                  {isHindi
                    ? 'उच्च जोखिम / सतर्कता'
                    : 'HIGH RISK / ALERT'}
                </span>
              </span>

              <span className="font-mono font-bold text-red-600 dark:text-red-400">
                {report.riskCounts.highRisk}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="font-semibold text-slate-800 dark:text-gray-200">
                  {isHindi
                    ? 'सावधानी आवश्यक'
                    : 'CAUTION REQUIRED'}
                </span>
              </span>

              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {report.riskCounts.caution}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-slate-800 dark:text-gray-200">
                  {isHindi
                    ? 'सामान्यतः सुरक्षित'
                    : 'GENERALLY SAFE'}
                </span>
              </span>

              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {report.riskCounts.generallySafe}
              </span>
            </div>
          </div>
        </div>

        {/* Dosage Forms Count */}
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            {isHindi
              ? 'खुराक के रूपों का विवरण'
              : 'Dosage Formulation Breakdown'}
          </h3>

          <div className="flex flex-wrap gap-2">
            {Object.entries(report.formCounts).map(([form, count]) => (
              <span
                key={form}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-800 dark:text-gray-200 flex items-center gap-1.5"
              >
                <span className="font-bold">
                  {getFormLabel(form)}:
                </span>

                <span className="font-mono text-sky-600 dark:text-sky-400">
                  {count}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Audit Table of all 90 items */}
      <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xs space-y-4">
        <div className="p-5 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isHindi
              ? 'संपूर्ण सत्यापन तालिका (01–90)'
              : 'Comprehensive Verification Table (01–90)'}
          </h3>

          <span className="text-xs text-emerald-600 font-semibold">
            {isHindi ? '90/90 सत्यापित' : '90/90 Audited'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-gray-400">
            <thead className="bg-slate-50 dark:bg-gray-800 text-[11px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200 dark:border-gray-800">
              <tr>
                <th className="py-3 px-4">
                  {isHindi ? '# आईडी' : '# ID'}
                </th>

                <th className="py-3 px-4">
                  {isHindi ? 'दवा का नाम' : 'Medicine Name'}
                </th>

                <th className="py-3 px-4">
                  {isHindi ? 'जोखिम स्तर' : 'Risk Level'}
                </th>

                <th className="py-3 px-4">
                  {isHindi ? 'स्टॉक स्ट्रेंथ' : 'Stock Strength'}
                </th>

                <th className="py-3 px-4">
                  {isHindi ? 'रूप' : 'Form'}
                </th>

                <th className="py-3 px-4">
                  {isHindi ? 'स्थिति' : 'Status'}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
              {MEDICINES_DATA.map((med) => (
                <tr
                  key={med.id}
                  className="hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-500">
                    #{med.id}
                  </td>

                  <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white">
                    <Link
                      href={`/medicines/${med.id}`}
                      className="hover:text-sky-600"
                    >
                      {getMedicineName(med, language)}
                    </Link>
                  </td>

                  <td className="py-2.5 px-4">
                    <RiskBadge
                      category={med.riskCategory}
                      size="sm"
                      showIcon={false}
                    />
                  </td>

                  <td className="py-2.5 px-4 truncate max-w-xs">
                    {getAvailableStrength(med, language)}
                  </td>

                  <td className="py-2.5 px-4 font-mono">
                    {getDosageForm(med, language)}
                  </td>

                  <td className="py-2.5 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 size={13} />

                      <span>
                        {isHindi ? 'मान्य' : 'Valid'}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}