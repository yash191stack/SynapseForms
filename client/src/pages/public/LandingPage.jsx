import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ShieldCheck,
  Cpu,
  Database,
  ScanText,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Sparkles,
  Layers,
  Settings,
  Table,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export default function LandingPage() {
  const features = [
    {
      title: 'Dynamic Form Builder',
      description:
        'Create adaptable, configurable forms with custom fields, validation constraints, and file upload requirements in seconds.',
      icon: FileText,
      tag: 'Core Engine',
    },
    {
      title: 'Master Ledger Integration',
      description:
        'Import CSV and Excel reference datasets to cross-examine and validate submitted details directly against authoritative records.',
      icon: Database,
      tag: 'Ledger Matching',
    },
    {
      title: 'OCR Document Intelligence',
      description:
        'Extract text and receipts automatically from uploaded supporting documents using integrated Tesseract.js optical character recognition.',
      icon: ScanText,
      tag: 'Document OCR',
    },
    {
      title: 'Rule-Based Verification',
      description:
        'Consolidated multi-point verification engine automatically triages submissions into Verified, Flagged, Invalid, or Pending states.',
      icon: ShieldCheck,
      tag: 'Automated Logic',
    },
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'Design Schema & Form',
      description:
        'Admins configure form fields, input types, and attach required verification criteria.',
    },
    {
      number: '02',
      title: 'Connect Reference Ledger',
      description:
        'Upload verified student, employee, or vendor ledgers against which submissions will be cross-referenced.',
    },
    {
      number: '03',
      title: 'Submit & Extract',
      description:
        'Users fill public forms and upload documents. OCR processes receipts and IDs seamlessly.',
    },
    {
      number: '04',
      title: 'Evaluate & Review',
      description:
        'The verification engine calculates match certainty and flags discrepancies for human audit.',
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-12">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-200/40 via-sky-200/30 to-purple-200/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Frontend Foundation Ready • SynapseForms v1.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
            Intelligent Dynamic Forms &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-600">
              Automated Submission Verification
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            SynapseForms bridges flexible dynamic form generation with automated master
            ledger validation and OCR-powered document inspection for bulletproof data integrity.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/admin/forms/create">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full sm:w-auto shadow-md shadow-indigo-600/20"
              >
                Launch Form Builder
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button
                variant="outline"
                size="lg"
                icon={<Layers className="w-4 h-4" />}
                className="w-full sm:w-auto bg-white/80 backdrop-blur-xs"
              >
                Open Admin Dashboard
              </Button>
            </Link>
          </div>

          {/* Interactive Hero Preview Graphic */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-3 sm:p-5 shadow-2xl backdrop-blur-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    synapse://form-engine/preview/scholarship-2026
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success" dot>
                    Verification Engine: Active
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {/* Form Simulation Column */}
                <div className="md:col-span-2 rounded-xl bg-slate-50 p-4 border border-slate-200/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Merit Scholarship Verification Form
                      </h4>
                      <p className="text-xs text-slate-500">
                        Dynamic Schema #SF-8492 • 4 Field Rules
                      </p>
                    </div>
                    <Badge variant="purple">Live Schema</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                      <span className="text-slate-400 block font-medium">Student Roll No</span>
                      <span className="font-semibold text-slate-800">CS-2024-0419</span>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                      <span className="text-slate-400 block font-medium">Full Legal Name</span>
                      <span className="font-semibold text-slate-800">Devansh Patel</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-3 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded bg-indigo-50 text-indigo-600">
                        <ScanText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          Fee_Receipt_Sem4.pdf
                        </p>
                        <p className="text-[11px] text-slate-400">
                          OCR extracted: Amount $1,450.00 • Timestamp verified
                        </p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">
                      OCR 98.4%
                    </Badge>
                  </div>
                </div>

                {/* Validation Simulation Column */}
                <div className="rounded-xl bg-slate-900 text-white p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-slate-400">VERIFY_MATRIX</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        Match Passed
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs">
                      <li className="flex items-center justify-between text-slate-300">
                        <span>Ledger ID Match</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </li>
                      <li className="flex items-center justify-between text-slate-300">
                        <span>Field Boundary Check</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </li>
                      <li className="flex items-center justify-between text-slate-300">
                        <span>Document Hash</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </li>
                      <li className="flex items-center justify-between text-slate-300">
                        <span>OCR Amount Correlation</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Final Verdict</span>
                    <span className="font-bold text-sm text-emerald-400 font-mono">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="purple" size="md">
            Capabilities
          </Badge>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
            Everything Required for High-Trust Digital Submissions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            From flexible field generation to multi-source cross checking, SynapseForms
            ensures every recorded entry is authentic and auditable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={i}
                hover
                className="flex flex-col justify-between border-slate-200/90"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="neutral" size="sm">
                      {feature.tag}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Verification States Guide */}
      <section id="verification" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Engine Mechanics
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              Standardized Verification States
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Submissions undergo continuous rule evaluation and are categorized into
              deterministic lifecycle states.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-emerald-800 text-sm font-mono">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                All mandatory checks, master ledger lookups, and OCR criteria satisfied.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-amber-800 text-sm font-mono">
                  FLAGGED
                </span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Inconsistencies detected or OCR certainty is low. Assigned for admin audit.
              </p>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span className="font-bold text-rose-800 text-sm font-mono">
                  INVALID
                </span>
              </div>
              <p className="text-xs text-rose-700 leading-relaxed">
                One or more critical validation rules failed, or data not found in master ledger.
              </p>
            </div>

            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-sky-600" />
                <span className="font-bold text-sky-800 text-sm font-mono">
                  PENDING
                </span>
              </div>
              <p className="text-xs text-sky-700 leading-relaxed">
                Document OCR processing or asynchronous ledger sync is in queue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Workflow */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="purple" size="md">
            Workflow
          </Badge>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 tracking-tight">
            How SynapseForms Operates
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Four simple phases from raw schema design to authoritative verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-xs"
            >
              <div className="text-2xl font-black text-indigo-200 mb-3 font-mono">
                {step.number}
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                {step.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to explore SynapseForms?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Access the administrative dashboard to inspect live dynamic forms, or open the
              builder to assemble your custom form schema.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="primary" size="lg">
                  Access Admin Dashboard
                </Button>
              </Link>
              <Link to="/admin/forms">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-slate-700 hover:bg-slate-800"
                >
                  View Active Forms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
