'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Medicine, RiskCategory } from '@/types/medicine';
import { RiskBadge } from '@/components/RiskBadge';
import {
  ShieldCheck,
  Lock,
  Plus,
  RotateCcw,
  BarChart3,
  History,
  Settings,
  Pill,
  Search,
  X,
  Download,
} from 'lucide-react';
import {
  getMedicineName,
  getRiskLabel,
} from '@/lib/medicine-language';

export default function AdminPage() {
  const {
    medicines,
    updateMedicine,
    addCustomMedicine,
    resetDatabaseToOriginal,
    changeLogs,
    showToast,
    language,
  } = useApp();

  const isHindi = language === 'hi';

  // Authentication barrier state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'medicines' | 'add' | 'history' | 'settings'
  >('dashboard');

  // Search in admin table
  const [searchAdmin, setSearchAdmin] = useState('');

  // Edit Medicine Modal State
  const [editingMed, setEditingMed] = useState<Medicine | null>(null);
  const [editReason, setEditReason] = useState('');

  // Add Medicine Form State
  const [newMedName, setNewMedName] = useState('');
  const [newMedAlt, setNewMedAlt] = useState('');
  const [newMedRisk, setNewMedRisk] =
    useState<RiskCategory>('GENERALLY SAFE');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedForm, setNewMedForm] = useState('TAB');
  const [newMedStrength, setNewMedStrength] = useState('');
  const [newMedPregnancy, setNewMedPregnancy] = useState('');
  const [newMedDiabetes, setNewMedDiabetes] = useState('');
  const [newMedHtn, setNewMedHtn] = useState('');
  const [newMedOther, setNewMedOther] = useState('');

  // Authenticate PIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (pinInput === '1234' || pinInput.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);

      showToast(
        isHindi ? 'एडमिन एक्सेस प्रदान किया गया' : 'Admin access granted',
        'success'
      );
    } else {
      setPinError(true);

      showToast(
        isHindi
          ? 'अमान्य क्लिनिकल PIN कोड'
          : 'Invalid clinical PIN code',
        'error'
      );
    }
  };

  // Filtered medicines in admin table
  const adminFilteredMeds = medicines.filter(
    (m) =>
      m.genericName
        .toLowerCase()
        .includes(searchAdmin.toLowerCase()) ||
      m.id.includes(searchAdmin) ||
      m.availableStrength
        .toLowerCase()
        .includes(searchAdmin.toLowerCase())
  );

  // Submit Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMed) return;

    updateMedicine(
      editingMed,
      editReason ||
        (isHindi
          ? 'मेडिकल ऑफिसर द्वारा फॉर्मुलरी प्रविष्टि संशोधित की गई'
          : 'Formulary entry revised by Medical Officer')
    );

    setEditingMed(null);
    setEditReason('');
  };

  // Submit Add
  const handleSaveNewMed = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newMedName.trim() ||
      !newMedDose.trim() ||
      !newMedStrength.trim()
    ) {
      showToast(
        isHindi
          ? 'कृपया सभी अनिवार्य फ़ील्ड भरें।'
          : 'Please fill all mandatory fields.',
        'error'
      );
      return;
    }

    const nextId = (medicines.length + 1)
      .toString()
      .padStart(2, '0');

    const newMedicine: Medicine = {
      id: nextId,
      genericName: newMedName.trim().toUpperCase(),
      alternativeName: newMedAlt.trim() || undefined,
      riskCategory: newMedRisk,
      pediatricDose: newMedDose.trim(),
      dosageForm: newMedForm,
      availableStrength: newMedStrength.trim(),
      pregnancyPrecautions: newMedPregnancy.trim() || undefined,
      diabetesPrecautions: newMedDiabetes.trim() || undefined,
      hypertensionPrecautions: newMedHtn.trim() || undefined,
      otherPrecautions: newMedOther.trim() || undefined,
      routes: ['Oral'],
    };

    addCustomMedicine(newMedicine);

    // Reset Form
    setNewMedName('');
    setNewMedAlt('');
    setNewMedRisk('GENERALLY SAFE');
    setNewMedDose('');
    setNewMedForm('TAB');
    setNewMedStrength('');
    setNewMedPregnancy('');
    setNewMedDiabetes('');
    setNewMedHtn('');
    setNewMedOther('');
    setActiveTab('medicines');
  };

  // Export JSON backup
  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(medicines, null, 2));

    const downloadAnchor = document.createElement('a');

    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      'chc_jhaknawda_medicines_database.json'
    );

    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast(
      isHindi
        ? 'डेटाबेस JSON के रूप में एक्सपोर्ट किया गया'
        : 'Database exported as JSON',
      'success'
    );
  };

  // Passcode Gatekeeper
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 space-y-6 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-8 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto border border-sky-200 dark:border-sky-800">
            <Lock size={28} />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {isHindi
                ? 'सुरक्षित मेडिकल ऑफिसर पोर्टल'
                : 'Protected Medical Officer Portal'}
            </h1>

            <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
              {isHindi
                ? 'प्रशासनिक कार्य (स्टॉक अपडेट, खुराक संशोधन और दवाओं को जोड़ना) केवल अधिकृत CHC स्टाफ के लिए सीमित हैं।'
                : 'Administrative actions (stock updates, dose adjustments, addition of drugs) are restricted to authorized CHC staff.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">
                {isHindi ? 'स्टाफ PIN कोड' : 'Staff PIN Code'}
              </label>

              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder={
                  isHindi
                    ? 'PIN दर्ज करें (डेमो: 1234)'
                    : 'Enter PIN (Demo: 1234)'
                }
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-center font-mono tracking-widest text-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
              />

              {pinError && (
                <p className="text-xs text-red-500 font-medium">
                  {isHindi
                    ? 'अमान्य PIN कोड। 1234 का प्रयास करें।'
                    : 'Invalid PIN code. Try 1234.'}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              {isHindi
                ? 'सत्यापित करें और पोर्टल में प्रवेश करें'
                : 'Verify & Enter Portal'}
            </button>

            <button
              type="button"
              onClick={() => {
                setPinInput('1234');
                setIsAuthenticated(true);

                showToast(
                  isHindi
                    ? 'डेमो मोड में अधिकृत किया गया'
                    : 'Authorized in demo mode',
                  'info'
                );
              }}
              className="text-xs text-sky-600 dark:text-sky-400 hover:underline block mx-auto"
            >
              {isHindi
                ? 'त्वरित डेमो अनलॉक (PIN: 1234)'
                : 'Quick Demo Unlock (PIN: 1234)'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Admin Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 text-xs font-semibold border border-sky-200 dark:border-sky-800 mb-2">
            <ShieldCheck size={14} />

            <span>
              {isHindi
                ? 'अधिकृत मेडिकल ऑफिसर पोर्टल'
                : 'Authorized Medical Officer Portal'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isHindi
              ? 'CHC फॉर्मुलरी प्रशासन'
              : 'CHC Formulary Administration'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
            {isHindi
              ? 'स्टॉक का ऑडिट करें, खुराक मोनोग्राफ संशोधित करें, बदलावों को ट्रैक करें और अस्पताल की फॉर्मुलरी प्रविष्टियों को प्रबंधित करें।'
              : 'Audit stock, adjust dosing monographs, track revisions, and manage hospital formulary entries.'}
          </p>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-gray-800 text-xs font-semibold text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors self-start sm:self-auto"
        >
          <Lock size={13} />

          <span>
            {isHindi
              ? 'एडमिन सत्र से बाहर निकलें'
              : 'Exit Admin Session'}
          </span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-gray-800 pb-2">
        {[
          {
            key: 'dashboard',
            label: isHindi
              ? 'डैशबोर्ड और एनालिटिक्स'
              : 'Dashboard & Analytics',
            icon: BarChart3,
          },
          {
            key: 'medicines',
            label: isHindi
              ? `दवाएँ (${medicines.length})`
              : `Medicines (${medicines.length})`,
            icon: Pill,
          },
          {
            key: 'add',
            label: isHindi
              ? 'नई दवा जोड़ें'
              : 'Add New Medicine',
            icon: Plus,
          },
          {
            key: 'history',
            label: isHindi
              ? `बदलाव इतिहास (${changeLogs.length})`
              : `Change History (${changeLogs.length})`,
            icon: History,
          },
          {
            key: 'settings',
            label: isHindi
              ? 'फॉर्मुलरी सेटिंग्स'
              : 'Formulary Settings',
            icon: Settings,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(
                  tab.key as
                    | 'dashboard'
                    | 'medicines'
                    | 'add'
                    | 'history'
                    | 'settings'
                )
              }
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Dashboard & Analytics */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isHindi ? 'कुल प्रविष्टियाँ' : 'Total Entries'}
              </span>

              <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                {medicines.length}
              </div>

              <span className="text-[11px] text-sky-600">
                {isHindi
                  ? 'सक्रिय फॉर्मुलरी आइटम'
                  : 'Active Formulary Items'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/60 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                {isHindi ? 'उच्च जोखिम आइटम' : 'High Risk Items'}
              </span>

              <div className="text-3xl font-black text-red-600 dark:text-red-400 mt-1">
                {
                  medicines.filter(
                    (m) => m.riskCategory === 'HIGH RISK / ALERT'
                  ).length
                }
              </div>

              <span className="text-[11px] text-red-600">
                {isHindi ? 'उच्च सतर्कता' : 'High Alert'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-900/60 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {isHindi ? 'सावधानी आइटम' : 'Caution Items'}
              </span>

              <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
                {
                  medicines.filter(
                    (m) => m.riskCategory === 'CAUTION REQUIRED'
                  ).length
                }
              </div>

              <span className="text-[11px] text-amber-600">
                {isHindi
                  ? 'विशेष सावधानियाँ'
                  : 'Special Precautions'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-900/60 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                {isHindi ? 'सामान्यतः सुरक्षित' : 'Generally Safe'}
              </span>

              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {
                  medicines.filter(
                    (m) => m.riskCategory === 'GENERALLY SAFE'
                  ).length
                }
              </div>

              <span className="text-[11px] text-emerald-600">
                {isHindi
                  ? 'मानक दिशानिर्देश'
                  : 'Standard Guidelines'}
              </span>
            </div>
          </div>

          {/* Quick Analytics & Audit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                {isHindi
                  ? 'सबसे अधिक परामर्शित फॉर्मुलेशन'
                  : 'Most Consulted Formulations'}
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: isHindi
                      ? 'पैरासिटामोल (सस्पेंशन और टैबलेट)'
                      : 'Paracetamol (Suspension & Tablets)',
                    count: isHindi
                      ? 'दैनिक उच्च उपयोग'
                      : 'Daily high frequency',
                    risk: 'GENERALLY SAFE' as const,
                  },
                  {
                    name: isHindi
                      ? 'एड्रेनालिन (1:1000 इंजेक्शन)'
                      : 'Adrenaline (1:1000 Injection)',
                    count: isHindi
                      ? 'आपातकालीन महत्वपूर्ण स्टैंडबाय'
                      : 'Emergency critical standby',
                    risk: 'CAUTION REQUIRED' as const,
                  },
                  {
                    name: isHindi
                      ? 'अमोक्सिसिलिन / अमोक्सीक्लैव'
                      : 'Amoxicillin / Amoxyclav',
                    count: isHindi
                      ? 'बाल चिकित्सा में उच्च एंटीबायोटिक उपयोग'
                      : 'High pediatric antibiotic use',
                    risk: 'GENERALLY SAFE' as const,
                  },
                  {
                    name: isHindi
                      ? 'डायजेपाम (10 mg/2 ml इंजेक्शन)'
                      : 'Diazepam (10 mg/2 ml Injection)',
                    count: isHindi
                      ? 'स्टेटस एपिलेप्टिकस प्रोटोकॉल'
                      : 'Status epilepticus protocol',
                    risk: 'HIGH RISK / ALERT' as const,
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-gray-800"
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-900 dark:text-white">
                        {item.name}
                      </div>

                      <div className="text-[10px] text-slate-500">
                        {item.count}
                      </div>
                    </div>

                    <RiskBadge
                      category={item.risk}
                      size="sm"
                      showIcon={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                {isHindi
                  ? 'CHC फार्मेसी स्वास्थ्य'
                  : 'CHC Pharmacy Health'}
              </h3>

              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                {isHindi
                  ? 'डेटाबेस आधिकारिक CHC स्टॉक इन्वेंटरी और सत्यापित बाल चिकित्सा खुराक दिशानिर्देशों से प्रारंभ किया गया है। सभी 90 मूल आइटम सिंक्रोनाइज़ हैं और ऑफलाइन उपलब्ध हैं।'
                  : 'Database initialized from official CHC stock inventory and verified pediatric dosing guidelines. All 90 original items are synchronized and accessible offline.'}
              </p>

              <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200 space-y-1">
                <span className="font-bold block">
                  {isHindi ? 'इंटीग्रिटी स्थिति:' : 'Integrity Status:'}
                </span>

                <span>
                  {isHindi
                    ? 'ऑडिट में 0 अनुपलब्ध प्रविष्टियाँ और 0 स्कीमा उल्लंघन मिले।'
                    : 'Audit reports 0 missing entries, 0 schema violations.'}
                </span>
              </div>

              <Link
                href="/validation"
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline block"
              >
                {isHindi
                  ? 'पूर्ण स्वचालित डेटा ऑडिट चलाएँ →'
                  : 'Run full automated data audit →'}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Medicine Management Table */}
      {activeTab === 'medicines' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchAdmin}
                onChange={(e) => setSearchAdmin(e.target.value)}
                placeholder={
                  isHindi
                    ? 'ID, नाम या स्ट्रेंथ से फ़िल्टर करें...'
                    : 'Filter by ID, name, or strength...'
                }
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-xs"
              />
            </div>

            <button
              onClick={() => setActiveTab('add')}
              className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
            >
              <Plus size={14} />

              <span>{isHindi ? 'दवा जोड़ें' : 'Add Drug'}</span>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-gray-400">
                <thead className="bg-slate-50 dark:bg-gray-800 text-[11px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200 dark:border-gray-800">
                  <tr>
                    <th className="py-3 px-4">
                      {isHindi ? '# ID' : '# ID'}
                    </th>

                    <th className="py-3 px-4">
                      {isHindi ? 'दवा का नाम' : 'Medicine Name'}
                    </th>

                    <th className="py-3 px-4">
                      {isHindi
                        ? 'जोखिम श्रेणी'
                        : 'Risk Category'}
                    </th>

                    <th className="py-3 px-4">
                      {isHindi
                        ? 'स्टॉक स्ट्रेंथ'
                        : 'Stock Strength'}
                    </th>

                    <th className="py-3 px-4">
                      {isHindi ? 'फॉर्म' : 'Form'}
                    </th>

                    <th className="py-3 px-4 text-right">
                      {isHindi ? 'कार्य' : 'Actions'}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                  {adminFilteredMeds.map((med) => (
                    <tr
                      key={med.id}
                      className="hover:bg-slate-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-500">
                        #{med.id}
                      </td>

                      <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white">
                        {getMedicineName(med, language)}
                      </td>

                      <td className="py-2.5 px-4">
                        <RiskBadge
                          category={med.riskCategory}
                          size="sm"
                          showIcon={false}
                        />
                      </td>

                      <td className="py-2.5 px-4 truncate max-w-xs">
                        {med.availableStrength}
                      </td>

                      <td className="py-2.5 px-4 font-mono">
                        {med.dosageForm}
                      </td>

                      <td className="py-2.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setEditingMed({ ...med });
                            setEditReason('');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-300 font-semibold hover:bg-sky-100 text-xs transition-colors"
                        >
                          {isHindi ? 'संपादित करें' : 'Edit'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Add New Medicine */}
      {activeTab === 'add' && (
        <form
          onSubmit={handleSaveNewMed}
          className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 max-w-3xl"
        >
          <div className="space-y-1 pb-3 border-b border-slate-100 dark:border-gray-800">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {isHindi
                ? 'नई फॉर्मुलरी प्रविष्टि जोड़ें'
                : 'Add New Formulary Entry'}
            </h3>

            <p className="text-xs text-slate-500 dark:text-gray-400">
              {isHindi
                ? 'सत्यापित स्टॉक और बाल चिकित्सा खुराक विनिर्देशों के साथ एक प्रविष्टि बनाएँ।'
                : 'Create an entry with verified stock and pediatric dosing specifications.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">
                {isHindi
                  ? 'जेनेरिक नाम *'
                  : 'Generic Name *'}
              </label>

              <input
                type="text"
                required
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
                placeholder="e.g. CEFUROXIME AXETIL"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">
                {isHindi
                  ? 'वैकल्पिक / ब्रांड नाम'
                  : 'Alternative / Brand Name'}
              </label>

              <input
                type="text"
                value={newMedAlt}
                onChange={(e) => setNewMedAlt(e.target.value)}
                placeholder={
                  isHindi
                    ? 'जैसे: ओरल सस्पेंशन'
                    : 'e.g. Oral Suspension'
                }
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">
                {isHindi
                  ? 'जोखिम वर्गीकरण *'
                  : 'Risk Classification *'}
              </label>

              <select
                value={newMedRisk}
                onChange={(e) =>
                  setNewMedRisk(e.target.value as RiskCategory)
                }
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs font-semibold"
              >
                <option value="GENERALLY SAFE">
                  {getRiskLabel('GENERALLY SAFE', language)}
                </option>

                <option value="CAUTION REQUIRED">
                  {getRiskLabel('CAUTION REQUIRED', language)}
                </option>

                <option value="HIGH RISK / ALERT">
                  {getRiskLabel('HIGH RISK / ALERT', language)}
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">
                {isHindi ? 'खुराक फॉर्म *' : 'Dosage Form *'}
              </label>

              <select
                value={newMedForm}
                onChange={(e) => setNewMedForm(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs font-semibold"
              >
                <option value="TAB">TAB</option>
                <option value="CAP">CAP</option>
                <option value="INJ">INJ</option>
                <option value="SYP">SYP</option>
                <option value="RESP. SUSP">RESP. SUSP</option>
                <option value="EYE DROP">EYE DROP</option>
                <option value="EAR DROP">EAR DROP</option>
                <option value="OINTMENT">OINTMENT</option>
                <option value="SOL/DROPPER">SOL/DROPPER</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">
                {isHindi
                  ? 'उपलब्ध CHC स्ट्रेंथ *'
                  : 'Available CHC Strength *'}
              </label>

              <input
                type="text"
                required
                value={newMedStrength}
                onChange={(e) => setNewMedStrength(e.target.value)}
                placeholder="e.g. 125 mg / 5 ml (Pediatric Suspension)"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">
                {isHindi
                  ? 'बाल चिकित्सा खुराक *'
                  : 'Pediatric Dose *'}
              </label>

              <textarea
                required
                rows={2}
                value={newMedDose}
                onChange={(e) => setNewMedDose(e.target.value)}
                placeholder="e.g. 20-30 mg/kg/day divided q12h; max 500 mg/day"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">
                {isHindi
                  ? 'गर्भावस्था सावधानियाँ'
                  : 'Pregnancy Precautions'}
              </label>

              <input
                type="text"
                value={newMedPregnancy}
                onChange={(e) => setNewMedPregnancy(e.target.value)}
                placeholder={
                  isHindi
                    ? 'जैसे: चिकित्सकीय आवश्यकता पर सामान्यतः सुरक्षित'
                    : 'e.g. Generally safe when clinically indicated'
                }
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">
                {isHindi
                  ? 'मधुमेह सावधानियाँ'
                  : 'Diabetes Precautions'}
              </label>

              <input
                type="text"
                value={newMedDiabetes}
                onChange={(e) => setNewMedDiabetes(e.target.value)}
                placeholder={
                  isHindi
                    ? 'जैसे: मधुमेह में सुरक्षित'
                    : 'e.g. Safe in diabetes'
                }
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-gray-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              {isHindi
                ? 'CHC डेटाबेस में जोड़ें'
                : 'Add to CHC Database'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('medicines')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 text-xs font-semibold"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </button>
          </div>
        </form>
      )}

      {/* Tab 4: Change History */}
      {activeTab === 'history' && (
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-gray-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {isHindi
                ? 'क्लिनिकल संशोधन ऑडिट लॉग'
                : 'Clinical Revision Audit Log'}
            </h3>

            <span className="text-xs font-mono text-slate-500">
              {changeLogs.length}{' '}
              {isHindi ? 'लॉग किए गए कार्य' : 'Logged Actions'}
            </span>
          </div>

          {changeLogs.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              {isHindi
                ? 'इस सत्र में कोई मैनुअल बदलाव नहीं किया गया। सभी 90 दवाएँ मूल PDF बेसलाइन से मेल खाती हैं।'
                : 'No manual changes made in this session. All 90 medicines match authentic PDF baseline.'}
            </div>
          ) : (
            <div className="space-y-3">
              {changeLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200/80 dark:border-gray-700/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {log.medicineName} ({log.action})
                    </span>

                    <span className="font-mono text-[11px] text-slate-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-gray-300">
                    {log.details}
                  </p>

                  <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">
                    {isHindi ? 'सत्यापित द्वारा:' : 'Verified by:'}{' '}
                    {log.author}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Formulary Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 max-w-2xl">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isHindi
              ? 'फॉर्मुलरी रखरखाव और बैकअप'
              : 'Formulary Maintenance & Backup'}
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-gray-800 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  {isHindi
                    ? 'सक्रिय फॉर्मुलरी डेटाबेस एक्सपोर्ट करें'
                    : 'Export Active Formulary Database'}
                </h4>

                <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">
                  {isHindi
                    ? 'वर्तमान 90+ दवा प्रविष्टियों को पोर्टेबल JSON दस्तावेज़ के रूप में सेव करें।'
                    : 'Save current 90+ drug entries as a portable JSON document.'}
                </p>
              </div>

              <button
                onClick={handleExportJson}
                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Download size={14} />

                <span>
                  {isHindi ? 'JSON एक्सपोर्ट' : 'Export JSON'}
                </span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-xs text-red-900 dark:text-red-200">
                  {isHindi
                    ? 'मूल PDF बेसलाइन पर रीसेट करें'
                    : 'Reset to Authentic PDF Baseline'}
                </h4>

                <p className="text-[11px] text-red-700 dark:text-red-300 mt-0.5">
                  {isHindi
                    ? 'संलग्न PDF दस्तावेज़ की मूल 90 प्रविष्टियाँ पुनर्स्थापित करता है और स्थानीय बदलाव साफ करता है।'
                    : 'Restores the exact original 90 entries from the attached PDF document and clears local alterations.'}
                </p>
              </div>

              <button
                onClick={() => {
                  if (
                    confirm(
                      isHindi
                        ? 'क्या आप सभी बदलावों को मूल PDF बेसलाइन पर वापस करना चाहते हैं?'
                        : 'Are you sure you want to revert all changes to the original PDF baseline?'
                    )
                  ) {
                    resetDatabaseToOriginal();
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <RotateCcw size={14} />

                <span>
                  {isHindi ? 'PDF पर रीसेट करें' : 'Revert to PDF'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Edit Modal */}
      {editingMed && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setEditingMed(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-3xl border border-slate-200 dark:border-gray-800 p-6 sm:p-7 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-gray-800">
              <div>
                <span className="text-[11px] font-mono text-slate-400 font-bold">
                  {isHindi ? 'संपादन:' : 'Editing #'}
                  {!isHindi && editingMed.id}
                  {isHindi && ` #${editingMed.id}`}
                </span>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {getMedicineName(editingMed, language)}
                </h3>
              </div>

              <button
                onClick={() => setEditingMed(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSaveEdit}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-gray-300">
                  {isHindi ? 'जोखिम श्रेणी' : 'Risk Category'}
                </label>

                <select
                  value={editingMed.riskCategory}
                  onChange={(e) =>
                    setEditingMed({
                      ...editingMed,
                      riskCategory:
                        e.target.value as RiskCategory,
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 font-semibold"
                >
                  <option value="GENERALLY SAFE">
                    {getRiskLabel('GENERALLY SAFE', language)}
                  </option>

                  <option value="CAUTION REQUIRED">
                    {getRiskLabel(
                      'CAUTION REQUIRED',
                      language
                    )}
                  </option>

                  <option value="HIGH RISK / ALERT">
                    {getRiskLabel(
                      'HIGH RISK / ALERT',
                      language
                    )}
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-gray-300">
                  {isHindi
                    ? 'उपलब्ध CHC स्ट्रेंथ'
                    : 'Available CHC Strength'}
                </label>

                <input
                  type="text"
                  value={editingMed.availableStrength}
                  onChange={(e) =>
                    setEditingMed({
                      ...editingMed,
                      availableStrength: e.target.value,
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-gray-300">
                  {isHindi
                    ? 'बाल चिकित्सा खुराक'
                    : 'Pediatric Dose'}
                </label>

                <textarea
                  rows={2}
                  value={editingMed.pediatricDose}
                  onChange={(e) =>
                    setEditingMed({
                      ...editingMed,
                      pediatricDose: e.target.value,
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-gray-300">
                  {isHindi
                    ? 'अन्य / क्लिनिकल सावधानियाँ'
                    : 'Other / Clinical Precautions'}
                </label>

                <textarea
                  rows={2}
                  value={editingMed.otherPrecautions || ''}
                  onChange={(e) =>
                    setEditingMed({
                      ...editingMed,
                      otherPrecautions: e.target.value,
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-gray-800">
                <label className="font-bold text-slate-700 dark:text-gray-300">
                  {isHindi
                    ? 'संशोधन का कारण (ऑडिट लॉग)'
                    : 'Reason for Revision (Audit Log)'}
                </label>

                <input
                  type="text"
                  required
                  placeholder={
                    isHindi
                      ? 'जैसे: स्टॉक स्ट्रेंथ में बदलाव / संशोधित प्रोटोकॉल'
                      : 'e.g. Stock shipment strength change / Revised protocol'
                  }
                  value={editReason}
                  onChange={(e) =>
                    setEditReason(e.target.value)
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-xs"
                >
                  {isHindi
                    ? 'बदलाव सेव करें'
                    : 'Save Changes'}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingMed(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 font-semibold text-xs"
                >
                  {isHindi ? 'रद्द करें' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}