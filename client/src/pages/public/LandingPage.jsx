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
  TableProperties,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
    <div className="flex flex-col gap-16 sm:gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 sm:pt-20 pb-8">
        {/* Subtle radial ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-gradient-to-tr from-indigo-500/15 via-sky-500/10 to-purple-500/15 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border/70 text-foreground text-xs font-semibold mb-6 shadow-2xs backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Intelligent Verification Platform • shadcn/ui Design</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
            Intelligent Dynamic Forms &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-600">
              Automated Submission Verification
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            SynapseForms bridges flexible dynamic form generation with automated master
            ledger validation and OCR-powered document inspection for bulletproof data integrity.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/admin/forms/create">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/25 h-10 px-5 text-sm font-semibold"
              >
                <span>Launch Form Builder</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-10 px-5 text-sm font-semibold border-border/80 bg-background/80 hover:bg-muted"
              >
                <Layers className="w-4 h-4 mr-1.5 text-muted-foreground" />
                <span>Admin Console</span>
              </Button>
            </Link>
          </div>

          {/* Emil-grade Interactive Preview Graphic */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="border-border/80 shadow-xl bg-card/95 backdrop-blur-xs p-1">
              <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-muted-foreground">
                    synapse://schema/preview/scholarship-2026
                  </span>
                </div>
                <Badge variant="success" dot className="text-[10px]">
                  Pipeline Active
                </Badge>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {/* Form Simulation Column */}
                <div className="md:col-span-2 rounded-lg bg-muted/30 p-4 border border-border/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">
                        Merit Scholarship Verification Form
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Schema #SF-8492 • 4 Field Rules
                      </p>
                    </div>
                    <Badge variant="purple" className="text-[10px]">
                      Live Schema
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="rounded-md bg-background p-2.5 border border-border/60">
                      <span className="text-muted-foreground block text-[10px] font-medium">Student Roll No</span>
                      <span className="font-semibold text-foreground">CS-2024-0419</span>
                    </div>
                    <div className="rounded-md bg-background p-2.5 border border-border/60">
                      <span className="text-muted-foreground block text-[10px] font-medium">Full Legal Name</span>
                      <span className="font-semibold text-foreground">Devansh Patel</span>
                    </div>
                  </div>

                  <div className="rounded-md bg-background p-3 border border-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                        <ScanText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          Fee_Receipt_Sem4.pdf
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          OCR extracted: Amount $1,450.00 • Timestamp verified
                        </p>
                      </div>
                    </div>
                    <Badge variant="success" className="text-[10px]">
                      OCR 98.4%
                    </Badge>
                  </div>
                </div>

                {/* Validation Simulation Column */}
                <div className="rounded-lg bg-slate-900 text-white p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono text-slate-400">VERIFY_MATRIX</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        Match Passed
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs">
                      <li className="flex items-center justify-between text-slate-300">
                        <span>Ledger ID Match</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </li>
                      <li className="flex items-center justify-between text-slate-300">
                        <span>Field Constraint</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </li>
                      <li className="flex items-center justify-between text-slate-300">
                        <span>Document Hash</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </li>
                      <li className="flex items-center justify-between text-slate-300">
                        <span>OCR Correlation</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Final Verdict</span>
                    <span className="font-bold text-xs text-emerald-400 font-mono">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="purple" className="text-xs font-semibold mb-2">
            Platform Capabilities
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Designed for High-Trust Digital Submissions
          </h2>
          <p className="mt-2 text-muted-foreground text-xs sm:text-sm">
            From flexible field generation to multi-source cross checking, SynapseForms
            ensures every recorded entry is authentic and auditable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={i}
                className="flex flex-col justify-between border-border/70 hover:shadow-md hover:border-border transition-all duration-200"
              >
                <CardHeader className="p-5 pb-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-indigo-950/60 dark:border-indigo-900 dark:text-indigo-400">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      {feature.tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-bold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Verification States Guide */}
      <section id="verification" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Card className="border-border/70 p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              Deterministic Logic
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1 tracking-tight">
              Standardized Verification States
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Submissions undergo continuous rule evaluation and are categorized into
              deterministic lifecycle states.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="rounded-lg border border-emerald-200/80 bg-emerald-50/50 p-4 dark:bg-emerald-950/20 dark:border-emerald-900">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-emerald-800 text-xs font-mono dark:text-emerald-300">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed dark:text-emerald-400">
                All mandatory checks, master ledger lookups, and OCR criteria satisfied.
              </p>
            </div>

            <div className="rounded-lg border border-amber-200/80 bg-amber-50/50 p-4 dark:bg-amber-950/20 dark:border-amber-900">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-amber-800 text-xs font-mono dark:text-amber-300">
                  FLAGGED
                </span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed dark:text-amber-400">
                Inconsistencies detected or OCR certainty is low. Assigned for admin audit.
              </p>
            </div>

            <div className="rounded-lg border border-rose-200/80 bg-rose-50/50 p-4 dark:bg-rose-950/20 dark:border-rose-900">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span className="font-bold text-rose-800 text-xs font-mono dark:text-rose-300">
                  INVALID
                </span>
              </div>
              <p className="text-xs text-rose-700 leading-relaxed dark:text-rose-400">
                One or more critical validation rules failed, or data not found in master ledger.
              </p>
            </div>

            <div className="rounded-lg border border-sky-200/80 bg-sky-50/50 p-4 dark:bg-sky-950/20 dark:border-sky-900">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-sky-600" />
                <span className="font-bold text-sky-800 text-xs font-mono dark:text-sky-300">
                  PENDING
                </span>
              </div>
              <p className="text-xs text-sky-700 leading-relaxed dark:text-sky-400">
                Document OCR processing or asynchronous ledger sync is in queue.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* How it Works / Workflow */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="purple" className="text-xs font-semibold mb-2">
            Pipeline Architecture
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            End-to-End Execution Flow
          </h2>
          <p className="mt-1 text-muted-foreground text-xs sm:text-sm">
            Four simple phases from raw schema design to authoritative verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {workflowSteps.map((step, idx) => (
            <Card
              key={idx}
              className="p-5 border-border/70 hover:border-border transition-colors duration-150"
            >
              <div className="text-xl font-black text-indigo-400 mb-2 font-mono">
                {step.number}
              </div>
              <h4 className="text-xs font-bold text-foreground mb-1.5">
                {step.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 text-center relative overflow-hidden shadow-lg border border-slate-800">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to explore SynapseForms?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Access the administrative console to inspect live dynamic forms, or open the
              builder to assemble your custom form schema.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/admin/dashboard">
                <Button size="default" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold shadow-xs">
                  Access Admin Dashboard
                </Button>
              </Link>
              <Link to="/admin/forms">
                <Button
                  variant="outline"
                  size="default"
                  className="text-white border-slate-700 hover:bg-slate-800/80 font-semibold"
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
