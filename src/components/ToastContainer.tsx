'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md text-sm animate-in slide-in-from-bottom-2 duration-200 ${
              isSuccess
                ? 'bg-emerald-900/90 text-white border-emerald-700'
                : isWarning
                ? 'bg-amber-900/90 text-white border-amber-700'
                : isError
                ? 'bg-red-900/90 text-white border-red-700'
                : 'bg-slate-900/90 text-white border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
              {isWarning && <AlertCircle size={18} className="text-amber-400 shrink-0" />}
              {isError && <AlertCircle size={18} className="text-red-400 shrink-0" />}
              {!isSuccess && !isWarning && !isError && <Info size={18} className="text-sky-400 shrink-0" />}
              <span className="font-medium text-xs md:text-sm">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-300 hover:text-white p-1 rounded-md transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
