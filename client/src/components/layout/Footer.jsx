import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand and Description */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
                <Layers className="h-4.5 w-4.5" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Synapse<span className="text-indigo-600">Forms</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              Intelligent Dynamic Forms & Submission Verification Platform.
              Combining customizable dynamic forms, rule-based field validation,
              master ledger matching, and OCR-powered document processing.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                <AlertTriangle className="w-3 h-3" /> FLAGGED
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                <XCircle className="w-3 h-3" /> INVALID
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                <Clock className="w-3 h-3" /> PENDING
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Application Pages
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-600 transition-colors">
                  Public Landing Page
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-indigo-600 transition-colors">
                  Admin Sign In
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-indigo-600 transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/forms" className="hover:text-indigo-600 transition-colors">
                  Active Forms Directory
                </Link>
              </li>
              <li>
                <Link to="/admin/forms/create" className="hover:text-indigo-600 transition-colors">
                  Interactive Form Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture / Team */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              System Architecture
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 font-mono">
              <li>Client: React 19 + Vite + Tailwind</li>
              <li>Backend: Node.js + Express</li>
              <li>Validation: Rules & Master Ledger</li>
              <li>OCR Engine: Tesseract.js</li>
              <li>Storage: MongoDB Atlas</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SynapseForms. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Engineered with pair collaboration</span>
            <span>•</span>
            <span className="text-indigo-600 font-medium">Frontend Foundation</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
