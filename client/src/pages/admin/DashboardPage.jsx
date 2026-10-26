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
  RefreshCw,
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
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function DashboardPage() {
  const stats = [
    {
      label: 'Active Dynamic Forms',
      value: '5',
      change: '+2 this month',
      trend: 'up',
      icon: FileText,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100 dark:bg-indigo-950/50 dark:border-indigo-900 dark:text-indigo-400',
    },
    {
      label: 'Total Submissions',
      value: '1,482',
      change: '+18.4% vs last cycle',
      trend: 'up',
      icon: Inbox,
      color: 'text-sky-600 bg-sky-50 border-sky-100 dark:bg-sky-950/50 dark:border-sky-900 dark:text-sky-400',
    },
    {
      label: 'Verified Submissions',
      value: '1,120',
      change: '75.6% auto-approved',
      trend: 'up',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/50 dark:border-emerald-900 dark:text-emerald-400',
    },
    {
      label: 'Flagged for Audit',
      value: '184',
      change: 'Requires manual review',
      trend: 'warning',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/50 dark:border-amber-900 dark:text-amber-400',
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
      form: 'Employee Travel Expense',
      applicant: 'Vikram Joshi (EMP-4102)',
      date: '3 hours ago',
      status: 'PENDING',
      ocrConfidence: 'Extracting...',
      ledgerMatch: 'Ledger Linked',
    },
  ];

  const handleRefresh = () => {
    toast.success('Telemetry updated to latest snapshot');
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Verification Telemetry & Overview
            </h1>
            <Badge variant="purple" className="text-[10px]">
              Live
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time pipeline telemetry on dynamic forms, ledger correlations, and automated verification states.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="text-xs h-8"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
            <span>Sync</span>
          </Button>

          <Link to="/admin/forms">
            <Button variant="outline" size="sm" className="text-xs h-8">
              <FileText className="w-3.5 h-3.5 mr-1" />
              <span>Forms Directory</span>
            </Button>
          </Link>
          <Link to="/admin/forms/create">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8 shadow-xs">
              <PlusCircle className="w-3.5 h-3.5 mr-1" />
              <span>New Form</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card
              key={idx}
              className="p-4 border-border/70 hover:shadow-sm hover:border-border transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </span>
                <div
                  className={`h-8 w-8 rounded-lg border flex items-center justify-center ${stat.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-foreground font-mono tracking-tight">
                  {stat.value}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground font-medium">
                  {stat.change}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Verification Health & Quick Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Verification Status Distribution */}
        <Card className="lg:col-span-1 border-border/70 p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-sm font-bold text-foreground">
              Verification Outcomes
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Lifecycle status breakdown across all submissions
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 space-y-3.5">
            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED (1,120)
                </span>
                <span className="font-semibold text-foreground">75.6%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" /> FLAGGED (184)
                </span>
                <span className="font-semibold text-foreground">12.4%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '12.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                  <XCircle className="w-3.5 h-3.5" /> INVALID (142)
                </span>
                <span className="font-semibold text-foreground">9.6%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '9.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-sky-700 dark:text-sky-400">
                  <Clock className="w-3.5 h-3.5" /> PENDING (36)
                </span>
                <span className="font-semibold text-foreground">2.4%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '2.4%' }} />
              </div>
            </div>

            <Separator className="my-2" />

            <Link
              to="/admin/submissions"
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center justify-between pt-1"
            >
              <span>Explore Submissions Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </CardContent>
        </Card>

        {/* Subsystem Architecture & Modules */}
        <Card className="lg:col-span-2 border-border/70 p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-sm font-bold text-foreground">
              Module Architecture & Verification Pipelines
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Integrated form management, reference datasets, and automated verification services
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="rounded-lg border border-border/70 bg-card p-3.5 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-foreground">
                    Dynamic Form Engine
                  </span>
                  <Badge variant="purple" className="text-[10px]">
                    Core
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Dynamic schema configuration, field-level constraints, and interactive builder.
                </p>
                <div className="flex gap-2">
                  <Link to="/admin/forms">
                    <Button variant="outline" size="sm" className="text-xs h-7.5">
                      Open Forms
                    </Button>
                  </Link>
                  <Link to="/admin/forms/create">
                    <Button size="sm" className="text-xs h-7.5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs">
                      Open Builder
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-lg border border-border/70 bg-card p-3.5 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-foreground">
                    Master Data & Ledger
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    Phase 2
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Reference dataset matching, OCR extraction verification, and submission audits.
                </p>
                <div className="flex gap-2">
                  <Link to="/admin/ledger">
                    <Button variant="outline" size="sm" className="text-xs h-7.5">
                      Master Ledger
                    </Button>
                  </Link>
                  <Link to="/admin/submissions">
                    <Button variant="outline" size="sm" className="text-xs h-7.5">
                      Submissions
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Backend Services: Node.js Express REST API & MongoDB Database
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                API Base: /api
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions Table with shadcn Table component */}
      <Card className="border-border/70 overflow-hidden">
        <CardHeader className="p-5 pb-3 border-b border-border/70 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold text-foreground">
              Live Submissions Telemetry
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Recent incoming applications passing through OCR and master ledger matching
            </CardDescription>
          </div>
          <Link to="/admin/submissions">
            <Button variant="ghost" size="sm" className="text-xs h-7.5 text-muted-foreground hover:text-foreground">
              <span>View All</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/70">
                <TableHead className="text-xs font-semibold">Tracking ID</TableHead>
                <TableHead className="text-xs font-semibold">Form Name</TableHead>
                <TableHead className="text-xs font-semibold">Applicant / Record</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
                <TableHead className="text-xs font-semibold">OCR Confidence</TableHead>
                <TableHead className="text-xs font-semibold">Ledger Result</TableHead>
                <TableHead className="text-xs font-semibold text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSubmissions.map((sub) => (
                <TableRow key={sub.id} className="hover:bg-muted/40 transition-colors duration-150 border-border/60">
                  <TableCell className="font-mono font-semibold text-xs text-foreground">
                    {sub.id}
                  </TableCell>
                  <TableCell className="font-medium text-xs text-foreground">
                    {sub.form}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {sub.applicant}
                  </TableCell>
                  <TableCell>
                    <Badge dot className="text-[10px]">
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {sub.ocrConfidence}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {sub.ledgerMatch}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground font-mono">
                    {sub.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
