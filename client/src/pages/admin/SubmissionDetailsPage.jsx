import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  XCircle,
  FileText,
  RotateCw,
  Download,
  Check,
} from 'lucide-react';
import { Button, Input, Card, Badge, Modal, StatusBadge } from '@/components/common';

export default function SubmissionDetailsPage() {
  const { id } = useParams();
  const submissionId = id || 'SUB-2026-8941';

  const [currentStatus, setCurrentStatus] = useState(
    submissionId === 'SUB-2026-8943' ? 'FLAGGED' : submissionId === 'SUB-2026-8945' ? 'INVALID' : 'VERIFIED'
  );
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState('approve');
  const [adminNote, setAdminNote] = useState('');
  const [isReRunningOCR, setIsReRunningOCR] = useState(false);

  // Submission sample data
  const submissionData = {
    id: submissionId,
    applicantName: submissionId === 'SUB-2026-8943' ? 'Priya Sundaram' : 'Aarav Sharma',
    primaryKey: submissionId === 'SUB-2026-8943' ? '2023-EE-0189' : '2023-CS-0412',
    email: submissionId === 'SUB-2026-8943' ? 'priya.s@university.edu' : 'aarav.sharma@university.edu',
    formTitle: 'Collegiate Merit Scholarship Application 2026',
    formId: 'form-101',
    submittedAt: 'Oct 28, 2026 • 10:48 AM',
    ledgerName: 'Collegiate Student Merit Registry 2026.csv',
    documentName: 'Aarav_MarkSheet_Sem4.pdf',
    documentSize: '1.42 MB',
    overallOcrScore: submissionId === 'SUB-2026-8943' ? 78 : 98,

    // Tri-pane comparison fields
    comparisonFields: [
      {
        field: 'Student Full Name',
        userInput: 'Aarav Sharma',
        ocrExtracted: 'Aarav Sharma',
        ledgerValue: 'Aarav Sharma',
        matchStatus: 'EXACT',
        confidence: 99,
      },
      {
        field: 'Roll / Registration Number',
        userInput: '2023-CS-0412',
        ocrExtracted: '2023-CS-0412',
        ledgerValue: '2023-CS-0412',
        matchStatus: 'EXACT',
        confidence: 98,
      },
      {
        field: 'Academic Department',
        userInput: 'Computer Science',
        ocrExtracted: 'Dept. of Comp Science & Engg',
        ledgerValue: 'Computer Science',
        matchStatus: 'FUZZY',
        confidence: 94,
      },
      {
        field: 'Cumulative GPA (CGPA)',
        userInput: '9.42',
        ocrExtracted: submissionId === 'SUB-2026-8943' ? '8.65' : '9.42',
        ledgerValue: '9.42',
        matchStatus: submissionId === 'SUB-2026-8943' ? 'DISCREPANCY' : 'EXACT',
        confidence: submissionId === 'SUB-2026-8943' ? 72 : 97,
      },
      {
        field: 'Income Category',
        userInput: 'EWS Category A',
        ocrExtracted: 'EWS Category A (Govt Cert #901)',
        ledgerValue: 'EWS Category A',
        matchStatus: 'EXACT',
        confidence: 96,
      },
    ],

    // Audit Log
    auditHistory: [
      {
        time: '10:48:02 AM',
        title: 'Submission Received',
        description: 'Applicant submitted form data and encrypted PDF certificate payload.',
        type: 'info',
      },
      {
        time: '10:48:14 AM',
        title: 'Tesseract OCR Pipeline Ingested',
        description: 'Parsed 5 key tokens with 98% median optical character confidence.',
        type: 'info',
      },
      {
        time: '10:48:19 AM',
        title: 'Master Ledger Ground-Truth Reconciliation',
        description: 'Matched primary key 2023-CS-0412 in Student_Merit_Registry_2026.csv.',
        type: 'success',
      },
      {
        time: '10:48:22 AM',
        title: 'Status Triage Evaluated',
        description: 'Auto-verification threshold exceeded (≥90%). Verified badge issued.',
        type: 'success',
      },
    ],
  };

  const handleActionClick = (type) => {
    setPendingAction(type);
    setIsActionModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (pendingAction === 'approve') setCurrentStatus('VERIFIED');
    else if (pendingAction === 'flag') setCurrentStatus('FLAGGED');
    else if (pendingAction === 'reject') setCurrentStatus('INVALID');
    setIsActionModalOpen(false);
  };

  const handleReRunOCR = () => {
    setIsReRunningOCR(true);
    setTimeout(() => {
      setIsReRunningOCR(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/admin/submissions">
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowLeft className="w-3.5 h-3.5" />}
              className="text-xs h-8 px-2.5"
            >
              Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-mono">
                {submissionData.id}
              </h1>
              <StatusBadge status={currentStatus} size="sm" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Applicant: <span className="text-foreground font-semibold">{submissionData.applicantName}</span> • Submitted {submissionData.submittedAt}
            </p>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReRunOCR}
            loading={isReRunningOCR}
            icon={<RotateCw className={`w-3.5 h-3.5 ${isReRunningOCR ? 'animate-spin' : ''}`} />}
            className="text-xs h-8"
          >
            Re-run OCR
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleActionClick('flag')}
            icon={<AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
            className="text-xs h-8"
          >
            Flag for Review
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => handleActionClick('reject')}
            icon={<XCircle className="w-3.5 h-3.5" />}
            className="text-xs h-8"
          >
            Reject
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleActionClick('approve')}
            icon={<Check className="w-3.5 h-3.5" />}
            className="text-xs h-8"
          >
            Approve & Verify
          </Button>
        </div>
      </div>

      {/* Meta Information Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-border/80">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Applicant Primary Key
          </div>
          <div className="mt-1 text-base font-bold text-foreground font-mono">
            {submissionData.primaryKey}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{submissionData.email}</p>
        </Card>

        <Card className="p-4 border-border/80">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            OCR Median Confidence
          </div>
          <div className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {submissionData.overallOcrScore}% High Confidence
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">Tesseract v5.3 engine</p>
        </Card>

        <Card className="p-4 border-border/80">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Master Ledger Ground Truth
          </div>
          <div className="mt-1 text-xs font-bold text-foreground font-mono truncate" title={submissionData.ledgerName}>
            {submissionData.ledgerName}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">Exact primary key row matched</p>
        </Card>

        <Card className="p-4 border-border/80">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Attached Document
          </div>
          <div className="mt-1 text-xs font-bold text-indigo-600 font-mono truncate">
            {submissionData.documentName}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">{submissionData.documentSize} • PDF format</p>
        </Card>
      </div>

      {/* Tri-Pane Audit Comparison Section (The Core Intelligence View) */}
      <Card
        title="Tri-Pane Audit Comparison Engine"
        subtitle="Side-by-side reconciliation of User Form Input, OCR Extracted Tokens, and Master Ledger Ground-Truth."
        action={
          <Badge variant="purple" className="text-[10px] font-mono">
            Deterministic Reconciliation
          </Badge>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-muted/40 border-b border-border/70 text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">Audit Field</th>
                <th className="px-4 py-3 bg-muted/20">1. User Form Input</th>
                <th className="px-4 py-3 bg-indigo-50/30 dark:bg-indigo-950/20">2. OCR Extracted Text</th>
                <th className="px-4 py-3 bg-emerald-50/30 dark:bg-emerald-950/20">3. Master Ledger Row</th>
                <th className="px-4 py-3 text-right">Match Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {submissionData.comparisonFields.map((field, idx) => {
                const isExact = field.matchStatus === 'EXACT';
                const isFuzzy = field.matchStatus === 'FUZZY';
                const isMismatch = field.matchStatus === 'DISCREPANCY';

                return (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3.5 font-semibold text-foreground">
                      {field.field}
                    </td>

                    {/* User Form Input */}
                    <td className="px-4 py-3.5 font-mono text-muted-foreground bg-muted/10">
                      {field.userInput}
                    </td>

                    {/* OCR Extracted Text */}
                    <td className="px-4 py-3.5 font-mono bg-indigo-50/20 dark:bg-indigo-950/10">
                      <div className="flex items-center justify-between gap-2">
                        <span className={isMismatch ? 'text-rose-600 font-bold' : 'text-foreground'}>
                          {field.ocrExtracted}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {field.confidence}%
                        </span>
                      </div>
                    </td>

                    {/* Master Ledger Row */}
                    <td className="px-4 py-3.5 font-mono text-foreground font-medium bg-emerald-50/20 dark:bg-emerald-950/10">
                      {field.ledgerValue}
                    </td>

                    {/* Verdict */}
                    <td className="px-4 py-3.5 text-right">
                      {isExact && (
                        <Badge variant="success" size="sm" className="font-mono text-[10px]">
                          Exact Match
                        </Badge>
                      )}
                      {isFuzzy && (
                        <Badge variant="warning" size="sm" className="font-mono text-[10px]">
                          Fuzzy (Lev. &le; 2)
                        </Badge>
                      )}
                      {isMismatch && (
                        <Badge variant="danger" size="sm" className="font-mono text-[10px]">
                          Discrepancy
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Grid: Document Inspector & Audit Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Artifact Inspector */}
        <Card
          title="Uploaded Document Artifact"
          subtitle={`Inspecting ${submissionData.documentName} with OCR bounding annotations`}
          action={
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
              className="text-xs h-7.5"
              onClick={() => alert(`Downloading ${submissionData.documentName}`)}
            >
              Download
            </Button>
          }
        >
          <div className="space-y-3">
            {/* Mock Document Preview Box */}
            <div className="h-72 rounded-lg border border-border/80 bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-hidden relative flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  {submissionData.documentName}
                </span>
                <span>Page 1 of 1 • 300 DPI</span>
              </div>

              {/* Simulated Document Body with OCR boxes */}
              <div className="space-y-3 py-3 text-[11px] text-slate-300">
                <div className="text-center border-b border-slate-800 pb-2">
                  <p className="font-bold text-slate-100 text-xs">COLLEGIATE COUNCIL OF EXAMINATIONS</p>
                  <p className="text-[10px] text-slate-400">OFFICIAL SEMESTER GRADE REPORT & ACADEMIC TRANSCRIPT</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-1.5 rounded bg-indigo-950/60 border border-indigo-700/60">
                    <span className="text-indigo-400">OCR_MATCH_TOKEN: </span>
                    <span className="font-bold text-white">Aarav Sharma</span>
                  </div>
                  <div className="p-1.5 rounded bg-indigo-950/60 border border-indigo-700/60">
                    <span className="text-indigo-400">OCR_KEY_TOKEN: </span>
                    <span className="font-bold text-white">2023-CS-0412</span>
                  </div>
                </div>

                <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-[10px]">
                  <p className="text-emerald-400 font-semibold">CUMULATIVE GRADE POINT AVERAGE: 9.42 / 10.00</p>
                  <p className="text-slate-400">STATUS: FIRST CLASS WITH DISTINCTION</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>Digital Signature Verified: REGISTRAR_ACADEMICS</span>
                <span className="text-emerald-400 font-semibold">Tesseract Pass (100%)</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span>Security Hash: <code className="text-foreground font-mono">e3b0c44298...</code></span>
              <span className="text-emerald-600 font-medium">Virus Scanned • Clean</span>
            </div>
          </div>
        </Card>

        {/* Audit Trail & Event Timeline */}
        <Card
          title="Verification Pipeline Audit Trail"
          subtitle="Chronological event log of automated checks and human triage actions"
        >
          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/80">
            {submissionData.auditHistory.map((item, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-6 top-1 h-3 w-3 rounded-full border-2 border-background bg-indigo-600 ring-2 ring-indigo-500/20" />
                <div className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{item.title}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="mt-0.5 text-muted-foreground text-[11px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border/60">
            <label className="text-xs font-semibold text-foreground block mb-1.5">
              Reviewer Notes
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Add audit comment or discrepancy rationale..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                className="text-xs"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (adminNote) {
                    alert(`Note saved: "${adminNote}"`);
                    setAdminNote('');
                  }
                }}
                className="text-xs shrink-0"
              >
                Save
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Confirmation Modal */}
      <Modal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        title={
          pendingAction === 'approve'
            ? 'Confirm Submission Verification'
            : pendingAction === 'flag'
            ? 'Flag Submission for Manual Review'
            : 'Reject Submission'
        }
        description={`This action will update ${submissionData.id} status in both database and applicant notification queue.`}
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsActionModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={
                pendingAction === 'approve'
                  ? 'success'
                  : pendingAction === 'reject'
                  ? 'danger'
                  : 'primary'
              }
              size="sm"
              onClick={handleConfirmAction}
            >
              Confirm Status Update
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <p className="text-muted-foreground leading-relaxed">
            Please confirm your administrative action for applicant{' '}
            <strong className="text-foreground">{submissionData.applicantName}</strong> (
            <code className="text-indigo-600 font-mono">{submissionData.primaryKey}</code>):
          </p>
          <div className="p-3 rounded-lg bg-muted/40 border border-border/70 space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Target Status:</span>
              <span className="font-bold text-foreground capitalize">{pendingAction}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Confidence Score:</span>
              <span className="font-mono text-foreground font-semibold">{submissionData.overallOcrScore}%</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
