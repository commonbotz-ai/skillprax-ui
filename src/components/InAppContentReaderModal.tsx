import React from 'react';
import { X, BookOpen, ExternalLink, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export interface InAppDocContent {
  id?: string;
  title: string;
  source: string;
  sourceUrl?: string;
  badge?: string;
  corePrinciple60s: string;
  executionSteps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  misconceptions: {
    flawedMentalModel: string;
    accurateAxiom: string;
  }[];
  officialReferenceNote: string;
}

export interface InAppContentReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  doc: InAppDocContent | null;
  onMarkAsRead?: (docId: string) => void;
}

export const InAppContentReaderModal: React.FC<InAppContentReaderModalProps> = ({
  isOpen,
  onClose,
  doc,
  onMarkAsRead,
}) => {
  if (!isOpen || !doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-sky-50/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7]">
                Canonical Knowledge Brief
              </span>
              <p className="text-xs text-slate-500 font-medium">{doc.source}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors"
            aria-label="Close Reader"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Structured Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
          {/* Title & Tag */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100/70 text-[#0284C7] mb-2 border border-sky-200">
              <Zap className="w-3 h-3" />
              <span>{doc.badge || 'Axiomatic Standard'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {doc.title}
            </h2>
          </div>

          {/* Section 1: Core Principle in 60 Seconds */}
          <div className="rounded-2xl bg-gradient-to-br from-sky-50/60 via-white to-blue-50/40 border border-sky-200/80 p-5">
            <div className="flex items-center gap-2 mb-2 text-[#0284C7]">
              <Zap className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                1. Core Principle in 60 Seconds
              </h3>
            </div>
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              {doc.corePrinciple60s}
            </p>
          </div>

          {/* Section 2: Key Mechanics & Step-by-Step Execution */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Key Mechanics & Execution Sequence
            </h3>
            <div className="space-y-2.5">
              {doc.executionSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Common Misconceptions & Edge Traps */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              3. Common Misconceptions & Edge Traps
            </h3>
            <div className="space-y-2.5">
              {doc.misconceptions.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-amber-200/90 bg-amber-50/50 p-4 space-y-2"
                >
                  <div className="flex items-start gap-2 text-xs text-rose-700 font-semibold">
                    <span className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-rose-700 font-black">
                      ✕
                    </span>
                    <span>Flawed Assumption: {item.flawedMentalModel}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-emerald-800 font-medium pl-6">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Axiomatic Correction: {item.accurateAxiom}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Official Source Link Reference */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              <span className="font-semibold text-slate-700">Official Source Reference: </span>
              <span>{doc.officialReferenceNote}</span>
            </div>
            {doc.sourceUrl && (
              <a
                href={doc.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors shrink-0"
              >
                <span>Canonical Web Index</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <span className="text-xs text-slate-500">Structured AI Synthesis • 100% Fact-Checked</span>
          <div className="flex items-center gap-3">
            {onMarkAsRead && doc.id && (
              <button
                onClick={() => {
                  onMarkAsRead(doc.id!);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
              >
                Mark Concept Verified ✓
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InAppContentReaderModal;
