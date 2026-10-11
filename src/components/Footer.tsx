'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Building2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { language } = useApp();

  const isHindi = language === 'hi';

  return (
    <footer className="w-full bg-slate-100 dark:bg-gray-950 border-t border-slate-200 dark:border-gray-800 py-10 px-4 sm:px-6 lg:px-8 mt-16 transition-colors text-slate-600 dark:text-gray-400 text-xs pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Medical Safety Disclaimer */}
        <div className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 sm:p-5 text-amber-900 dark:text-amber-200 flex items-start gap-3.5 shadow-2xs">
          <ShieldAlert
            size={22}
            className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
          />

          <div className="space-y-1">
            <h4 className="font-bold text-xs sm:text-sm tracking-tight text-amber-950 dark:text-amber-100">
              {isHindi
                ? 'अनिवार्य नैदानिक संदर्भ सूचना'
                : 'Mandatory Clinical Reference Notice'}
            </h4>

            <p className="text-xs leading-relaxed text-amber-900/90 dark:text-amber-200/90">
              {isHindi
                ? 'केवल नैदानिक संदर्भ हेतु। यह एप्लिकेशन पेशेवर चिकित्सीय निर्णय, आधिकारिक प्रिस्क्रिप्शन जानकारी या स्थानीय क्लिनिकल प्रोटोकॉल का विकल्प नहीं है। दवा देने से पहले मूल प्रिस्क्रिप्शन मोनोग्राफ और CHC स्टॉक की पुष्टि करें। गणना की गई खुराक केवल गणितीय सहायता हैं।'
                : 'Clinical reference only. This application is not a substitute for professional medical judgment, official prescribing information, or local clinical protocols. Verify the original prescribing monograph and CHC stock before dispensing. Calculated doses are strictly mathematical aids.'}
            </p>
          </div>
        </div>

        {/* Footer Links & Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* About */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <Building2
                size={18}
                className="text-sky-600 dark:text-sky-400"
              />

              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {isHindi
                  ? 'सीएचसी झकनावदा (सामुदायिक स्वास्थ्य केन्द्र)'
                  : 'CHC Jhaknawda (Community Health Centre)'}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
              {isHindi
                ? 'बाल चिकित्सा दवा त्वरित संदर्भ और स्टॉक इन्वेंटरी प्रणाली। आधिकारिक CHC स्टॉक इन्वेंटरी और सत्यापित बाल चिकित्सा खुराक दिशानिर्देशों से संकलित। इसमें 90 सक्रिय फॉर्म्युलरी प्रविष्टियां हैं।'
                : 'Pediatric Drug Quick-Reference and Stock Inventory System. Compiled from the official CHC stock inventory and verified pediatric dosing guidelines. Contains 90 active formulary entries.'}
            </p>

            <div className="pt-2 text-[11px] text-slate-400 dark:text-gray-500">
              {isHindi
                ? 'डेटाबेस संस्करण: 2026.1 • 90 प्रविष्टियां ऑडिट की गईं'
                : 'Database Version: 2026.1 • 90 Entries Audited'}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              {isHindi ? 'त्वरित लिंक' : 'Quick Links'}
            </h5>

            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  href="/medicines"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {isHindi
                    ? 'दवा निर्देशिका (01-90)'
                    : 'Medicines Directory (01-90)'}
                </Link>
              </li>

              <li>
                <Link
                  href="/dose-calculator"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {isHindi
                    ? 'बाल चिकित्सा खुराक कैलकुलेटर'
                    : 'Pediatric Dose Calculator'}
                </Link>
              </li>

              <li>
                <Link
                  href="/emergency"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {isHindi
                    ? 'आपातकालीन संदर्भ और एंटीडोट'
                    : 'Emergency Reference & Antidotes'}
                </Link>
              </li>

              <li>
                <Link
                  href="/compare"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {isHindi
                    ? 'दवा तुलना'
                    : 'Side-by-side Drug Comparison'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Administration & Data */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              {isHindi
                ? 'प्रशासन और डेटा'
                : 'Administration & Data'}
            </h5>

            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  href="/admin"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {isHindi
                    ? 'एडमिन और फॉर्म्युलरी प्रबंधन'
                    : 'Admin & Formulary Management'}
                </Link>
              </li>

              <li>
                <Link
                  href="/validation"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {isHindi
                    ? 'डेटासेट अखंडता ऑडिट'
                    : 'Dataset Integrity Audit'}
                </Link>
              </li>

              <li>
                <Link
                  href="/favorites"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {isHindi
                    ? 'सहेजी गई पसंदीदा दवाएं'
                    : 'Saved Favorites'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-gray-500">
          <p>
            © {new Date().getFullYear()}{' '}
            {isHindi
              ? 'सीएचसी झकनावदा • बाल चिकित्सा त्वरित संदर्भ'
              : 'CHC Jhaknawda • Pediatric Drug Quick-Reference'}
          </p>

          <div className="flex items-center gap-4">
            <span>
              {isHindi
                ? 'ऑफलाइन सक्षम PWA'
                : 'Offline Capable PWA'}
            </span>

            <span>•</span>

            <span>
              {isHindi
                ? 'W3C सुलभ'
                : 'W3C Accessible'}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};