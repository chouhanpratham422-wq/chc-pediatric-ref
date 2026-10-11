'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MedicineCard } from '@/components/MedicineCard';
import { getMedicineName } from '@/lib/medicine-language';
import {
  AlertOctagon,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export default function EmergencyPage() {
  const { medicines, language } = useApp();
  const [filterMode, setFilterMode] = useState<
    'all' | 'high-risk' | 'resuscitation'
  >('all');

  const isHindi = language === 'hi';

  // Emergency resuscitation drugs
  const resuscitationMeds = medicines.filter(
    (m) =>
      m.emergencyRelevant ||
      ['02', '11', '19', '34', '50', '60', '79', '80', '82', '84'].includes(
        String(m.id).padStart(2, '0')
      )
  );

  // High Risk / Alert entries
  const highRiskMeds = medicines.filter(
    (m) => m.riskCategory === 'HIGH RISK / ALERT'
  );

  const allEmergencyMeds = Array.from(
    new Map(
      [...resuscitationMeds, ...highRiskMeds].map((medicine) => [
        medicine.id,
        medicine,
      ])
    ).values()
  );

  const displayedMeds =
    filterMode === 'resuscitation'
      ? resuscitationMeds
      : filterMode === 'high-risk'
      ? highRiskMeds
      : allEmergencyMeds;

  const adrenaline = medicines.find(
    (m) => String(m.id).padStart(2, '0') === '02'
  );

  const atropine = medicines.find(
    (m) => String(m.id).padStart(2, '0') === '11'
  );

  const diazepam = medicines.find(
    (m) => String(m.id).padStart(2, '0') === '34'
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-700 to-red-900 text-white p-6 sm:p-8 md:p-10 shadow-xl shadow-red-900/15">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-red-100 text-xs font-bold border border-white/25">
            <AlertOctagon
              size={16}
              className="text-white animate-pulse"
            />

            <span>
              {isHindi
                ? 'उच्च सतर्कता एवं आपातकालीन देखभाल संदर्भ'
                : 'High Vigilance & Acute Care Reference'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            {isHindi
              ? 'आपातकालीन एवं उच्च-जोखिम वाली दवाएँ'
              : 'Emergency & High-Risk Medications'}
          </h1>

          <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed font-normal">
            {isHindi
              ? 'उच्च-सतर्कता वाली दवाओं, ऑर्गेनोफॉस्फेट एंटीडोट्स (PAM, Atropine), स्टेटस एपिलेप्टिकस उपचार (Diazepam, Phenytoin) और तीव्र एनाफिलेक्सिस प्रोटोकॉल के लिए त्वरित संदर्भ।'
              : 'Rapid reference for High-Alert drugs, organophosphate antidotes (PAM, Atropine), status epilepticus therapies (Diazepam, Phenytoin), and acute anaphylaxis protocols.'}
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setFilterMode('all')}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-red-700 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isHindi
                ? `सभी आपातकालीन एवं अलर्ट (${allEmergencyMeds.length})`
                : `All Emergency & Alerts (${allEmergencyMeds.length})`}
            </button>

            <button
              onClick={() => setFilterMode('resuscitation')}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                filterMode === 'resuscitation'
                  ? 'bg-white text-red-700 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isHindi
                ? `तत्काल पुनर्जीवन एवं एंटीडोट्स (${resuscitationMeds.length})`
                : `Stat Resuscitation & Antidotes (${resuscitationMeds.length})`}
            </button>

            <button
              onClick={() => setFilterMode('high-risk')}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                filterMode === 'high-risk'
                  ? 'bg-white text-red-700 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isHindi
                ? `केवल उच्च जोखिम / अलर्ट (${highRiskMeds.length})`
                : `High Risk / Alert Only (${highRiskMeds.length})`}
            </button>
          </div>
        </div>

        {/* Background icon watermarks */}
        <AlertOctagon
          size={240}
          className="absolute -right-16 -bottom-16 text-white/10 pointer-events-none"
        />
      </div>

      {/* Prominent Safety & Non-Autonomous Warning */}
      <div className="bg-red-50 dark:bg-red-950/40 border-2 border-red-300 dark:border-red-800 rounded-2xl p-5 text-red-950 dark:text-red-200 text-xs sm:text-sm flex items-start gap-3.5 shadow-sm">
        <ShieldAlert
          size={22}
          className="text-red-600 shrink-0 mt-0.5"
        />

        <div className="space-y-1">
          <h2 className="font-extrabold tracking-tight text-red-900 dark:text-red-100">
            {isHindi
              ? 'आपातकालीन देखभाल सुरक्षा प्रोटोकॉल एवं क्लिनिकल प्राधिकरण'
              : 'Emergency Care Safety Protocol & Clinical Authority'}
          </h2>

          <p className="leading-relaxed">
            {isHindi
              ? 'यह एप्लिकेशन स्वचालित आपातकालीन उपचार प्रणाली या क्लिनिकल डायग्नोस्टिक टूल नहीं है। जीवन-घातक आपात स्थिति में तत्काल शारीरिक एयरवे प्रबंधन, श्वसन और परिसंचरण (PALS/APLS) सहायता को प्राथमिकता दी जाती है। दवा की गणना, सांद्रता और dilution नियमों को हमेशा वरिष्ठ चिकित्सक से दोबारा जाँचें।'
              : 'This application is NOT an autonomous emergency treatment system or clinical diagnostic tool. In life-threatening emergencies, immediate physical airway management, breathing, and circulation (PALS/APLS) support takes precedence. Always double-check drug calculations, concentrations, and dilution rules with a senior clinician.'}
          </p>
        </div>
      </div>

      {/* Quick Resuscitation Cheat Sheets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Adrenaline */}
        <div className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/60 rounded-2xl p-4 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-red-600 dark:text-red-400">
              #02{' '}
              {adrenaline
                ? getMedicineName(adrenaline, language).toUpperCase()
                : 'ADRENALINE'}
            </span>

            <span className="text-[10px] font-mono bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 px-2 py-0.5 rounded">
              INJ: 1 mg/ml (1:1000)
            </span>
          </div>

          <p className="text-xs text-slate-700 dark:text-gray-300">
            <strong className="text-slate-900 dark:text-white">
              {isHindi ? 'IM/SC:' : 'IM/SC:'}
            </strong>{' '}
            0.01 mg/kg (0.01 ml/kg of 1:1000), max 0.5 mg.
            <br />

            <strong className="text-slate-900 dark:text-white">
              {isHindi ? 'IV:' : 'IV:'}
            </strong>{' '}
            0.01 mg/kg of 1:10,000 solution.
          </p>

          <Link
            href="/medicines/02"
            className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
          >
            <span>
              {isHindi
                ? 'पूरा मोनोग्राफ देखें'
                : 'View Monograph'}
            </span>

            <ArrowRight size={11} />
          </Link>
        </div>

        {/* Atropine */}
        <div className="bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-4 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-amber-700 dark:text-amber-400">
              #11{' '}
              {atropine
                ? getMedicineName(atropine, language).toUpperCase()
                : 'ATROPINE SULPHATE'}
            </span>

            <span className="text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded">
              INJ: 0.6 mg/ml
            </span>
          </div>

          <p className="text-xs text-slate-700 dark:text-gray-300">
            <strong className="text-slate-900 dark:text-white">
              {isHindi ? 'खुराक:' : 'Dose:'}
            </strong>{' '}
            0.01-0.02 mg/kg IV/IM (minimum 0.1 mg, max 0.5 mg).
            <br />

            <strong className="text-slate-900 dark:text-white">
              {isHindi
                ? 'OP विषाक्तता:'
                : 'OP Poisoning:'}
            </strong>{' '}
            0.05-0.1 mg/kg q15m.
          </p>

          <Link
            href="/medicines/11"
            className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
          >
            <span>
              {isHindi
                ? 'पूरा मोनोग्राफ देखें'
                : 'View Monograph'}
            </span>

            <ArrowRight size={11} />
          </Link>
        </div>

        {/* Diazepam */}
        <div className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/60 rounded-2xl p-4 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-red-600 dark:text-red-400">
              #34{' '}
              {diazepam
                ? getMedicineName(diazepam, language).toUpperCase()
                : 'DIAZEPAM'}
            </span>

            <span className="text-[10px] font-mono bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 px-2 py-0.5 rounded">
              INJ: 10 mg / 2 ml
            </span>
          </div>

          <p className="text-xs text-slate-700 dark:text-gray-300">
            <strong className="text-slate-900 dark:text-white">
              {isHindi
                ? 'स्टेटस एपिलेप्टिकस:'
                : 'Status Epilepticus:'}
            </strong>{' '}
            0.2-0.3 mg/kg slow IV (max 5 mg in &lt;5y, 10 mg in &gt;5y).
            <br />

            <strong className="text-slate-900 dark:text-white">
              {isHindi ? 'रेक्टल:' : 'Rectal:'}
            </strong>{' '}
            0.5 mg/kg.
          </p>

          <Link
            href="/medicines/34"
            className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
          >
            <span>
              {isHindi
                ? 'पूरा मोनोग्राफ देखें'
                : 'View Monograph'}
            </span>

            <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* Medicine Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {isHindi
              ? `फॉर्म्युलरी प्रविष्टियाँ (${displayedMeds.length})`
              : `Formulary Entries (${displayedMeds.length})`}
          </h2>

          <span className="text-xs text-slate-500">
            {isHindi
              ? 'पूरी सावधानियाँ एवं खुराक देखने के लिए किसी भी प्रविष्टि पर क्लिक करें'
              : 'Click any entry to view full precautions & dosing'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedMeds.map((med) => (
            <MedicineCard
              key={med.id}
              medicine={med}
            />
          ))}
        </div>
      </section>
    </div>
  );
}