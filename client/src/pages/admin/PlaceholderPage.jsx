import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Inbox, FileText, Sparkles, ArrowLeft, Layers, ShieldAlert } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export default function PlaceholderPage({ title, description, moduleName, assignedTo = 'Gauri Upadhyay' }) {
  const location = useLocation();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card className="text-center p-8 border-dashed border-2 border-slate-300">
        <div className="h-14 w-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-7 h-7" />
        </div>

        <Badge variant="warning" size="md" className="mb-3">
          Assigned to: {assignedTo}
        </Badge>

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {title || 'Upcoming Module'}
        </h2>

        <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          {description ||
            'This page is part of the second frontend phase (UI Design System & Ledger/Submission workflows) assigned to Gauri Upadhyay.'}
        </p>

        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-500 font-mono">
            <span>Route Path:</span>
            <span className="font-semibold text-slate-800">{location.pathname}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500 font-mono">
            <span>Design System:</span>
            <span className="text-indigo-600 font-semibold">Shared Common Components Ready</span>
          </div>
          <div className="flex items-center justify-between text-slate-500 font-mono">
            <span>Backend Integration:</span>
            <span className="text-emerald-600 font-semibold">Ready (`server/` endpoints)</span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/admin/dashboard">
            <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/admin/forms">
            <Button variant="outline">
              View Active Forms
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
