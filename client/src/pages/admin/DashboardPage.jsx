import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  PlusCircle,
  Inbox,
  Database,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  ScanText,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export default function DashboardPage() {
  const stats = [
    {
      label: 'Active Dynamic Forms',
      value: '5',
      change: '+2 this month',
      trend: 'up',
      icon: FileText,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      label: 'Total Submissions',
      value: '1,482',
      change: '+18.4% vs last cycle',
      trend: 'up',
      icon: Inbox,
      color: 'text-sky-600 bg-sky-50 border-sky-100',
    },
    {
      label: 'Verified Submissions',
      value: '1,120',
      change: '75.6% auto-approved',
      trend: 'up',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      label: 'Flagged for Audit',
      value: '184',
      change: 'Requires manual review',
      trend: 'warning',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
  ];

  const recentSubmissions = [
    {
      id: 'SUB-9401',
      form: 'Merit Scholarship 2026',
      applicant: 'Devansh Patel (CS-2024-0419)',
      date: '10 mins ago',
      status: 'VERIFIED',
      ocrConfidence: '98.5%',
      ledgerMatch: 'Exact Match',
    },
    {
      id: 'SUB-9400',
      form: 'Vendor Registration & GST',
      applicant: 'Apex Logistics LLP (GST-29AAACA)',
      date: '28 mins ago',
      status: 'FLAGGED',
      ocrConfidence: '72.1%',
      ledgerMatch: 'Partial Match (Name mismatch)',
    },
    {
      id: 'SUB-9399',
      form: 'Annual Hostel Grant',
      applicant: 'Riya Sen (HS-2023-1102)',
      date: '1 hour ago',
      status: 'VERIFIED',
      ocrConfidence: '99.0%',
      ledgerMatch: 'Exact Match',
    },
    {
      id: 'SUB-9398',
      form: 'Merit Scholarship 2026',
      applicant: 'Arjun Verma (CS-2024-0991)',
      date: '2 hours ago',
      status: 'INVALID',
      ocrConfidence: '91.0%',
      ledgerMatch: 'Roll Number Not in Ledger',
    },
    {
      id: 'SUB-9397',
      form: 'Employee Travel Reimbursement',
      applicant: 'Vikram Joshi (EMP-4102)',
      date: '3 hours ago',
      status: 'PENDING',
      ocrConfidence: 'Extracting...',
      ledgerMatch: 'Ledger Linked',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System Overview & Verification Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time telemetry on dynamic forms, ledger correlations, and automated verification states.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/forms">
            <Button variant="outline" size="sm" icon={<FileText className="w-3.5 h-3.5" />}>
              All Forms
            </Button>
          </Link>
          <Link to="/admin/forms/create">
            <Button
              variant="primary"
              size="sm"
              icon={<PlusCircle className="w-3.5 h-3.5" />}
            >
              New Form
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} hover className="border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </span>
                <div
                  className={`h-9 w-9 rounded-lg border flex items-center justify-center ${stat.color}`}
                >
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  {stat.value}
                </div>
                <p className="mt-1 text-xs text-slate-500 font-medium">
                  {stat.change}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Verification Health & Quick Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Status Distribution */}
        <Card
          title="Verification Status Breakdown"
          subtitle="Distribution of current submission outcomes"
          className="lg:col-span-1"
        >
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED (1,120)
                </span>
                <span className="font-semibold text-slate-700">75.6%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-amber-700">
                  <AlertTriangle className="w-3.5 h-3.5" /> FLAGGED (184)
                </span>
                <span className="font-semibold text-slate-700">12.4%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '12.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-rose-700">
                  <XCircle className="w-3.5 h-3.5" /> INVALID (142)
                </span>
                <span className="font-semibold text-slate-700">9.6%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '9.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-sky-700">
                  <Clock className="w-3.5 h-3.5" /> PENDING (36)
                </span>
                <span className="font-semibold text-slate-700">2.4%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '2.4%' }} />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link to="/admin/submissions" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center justify-between">
                <span>View Full Submissions Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Card>

        {/* Quick Launch & Collaboration Roadmap */}
        <Card
          title="Subsystem Architecture & Team Roadmap"
          subtitle="Collaborative modules across Shresht, Yash, and Gauri"
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">
                  Frontend Foundation
                </span>
                <Badge variant="purple" size="sm">
                  Shresht Soni
                </Badge>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Landing, Login, Dashboard, Forms Directory, and Interactive Form Builder.
              </p>
              <div className="flex gap-2">
                <Link to="/admin/forms">
                  <Button variant="outline" size="sm">
                    Open Forms
                  </Button>
                </Link>
                <Link to="/admin/forms/create">
                  <Button variant="primary" size="sm">
                    Open Builder
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">
                  Design System & Review
                </span>
                <Badge variant="warning" size="sm">
                  Gauri Upadhyay
                </Badge>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Master Ledger, Public Form View, Submissions List & Audit Details.
              </p>
              <div className="flex gap-2">
                <Link to="/admin/ledger">
                  <Button variant="secondary" size="sm">
                    Master Ledger
                  </Button>
                </Link>
                <Link to="/admin/submissions">
                  <Button variant="secondary" size="sm">
                    Submissions
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Backend Foundation: Completed by Yash Sharma (`server/` Express + Mongo)
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              API Base: /api
            </span>
          </div>
        </Card>
      </div>

      {/* Recent Submissions Table */}
      <Card
        title="Live Submissions Telemetry"
        subtitle="Recent applications passing through OCR and master ledger matching"
        action={
          <Link to="/admin/submissions">
            <Button variant="ghost" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />} iconPosition="right">
              View All
            </Button>
          </Link>
        }
        bodyClassName="p-0 overflow-x-auto"
      >
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold">
              <th className="px-6 py-3">Tracking ID</th>
              <th className="px-6 py-3">Form Name</th>
              <th className="px-6 py-3">Applicant / Record</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">OCR Confidence</th>
              <th className="px-6 py-3">Ledger Result</th>
              <th className="px-6 py-3 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentSubmissions.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-3.5 font-mono font-semibold text-slate-800">
                  {sub.id}
                </td>
                <td className="px-6 py-3.5 font-medium text-slate-900">
                  {sub.form}
                </td>
                <td className="px-6 py-3.5 text-slate-600">
                  {sub.applicant}
                </td>
                <td className="px-6 py-3.5">
                  <Badge dot>{sub.status}</Badge>
                </td>
                <td className="px-6 py-3.5 font-mono text-slate-600">
                  {sub.ocrConfidence}
                </td>
                <td className="px-6 py-3.5 text-slate-600">
                  {sub.ledgerMatch}
                </td>
                <td className="px-6 py-3.5 text-right text-slate-400 font-mono">
                  {sub.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
