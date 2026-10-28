import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Download,
} from 'lucide-react';
import { Button, Input, Card, Badge, Modal, Table, StatusBadge } from '@/components/common';

export default function SubmissionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [formFilter] = useState('ALL');
  const [confidenceFilter, setConfidenceFilter] = useState('ALL');
  const [selectedRows, setSelectedRows] = useState([]);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchActionType, setBatchActionType] = useState('approve');

  // Realistic mock submissions queue
  const initialSubmissions = [
    {
      id: 'SUB-2026-8941',
      applicantName: 'Aarav Sharma',
      primaryKey: '2023-CS-0412',
      formTitle: 'Collegiate Merit Scholarship Application 2026',
      formId: 'form-101',
      status: 'VERIFIED',
      confidenceScore: 98,
      submittedAt: '14 mins ago',
      documentName: 'Aarav_MarkSheet_Sem4.pdf',
      ledgerMatch: 'Exact Match (Collegiate Student Merit Registry)',
    },
    {
      id: 'SUB-2026-8942',
      applicantName: 'Western Precision Tools Ltd',
      primaryKey: '27AABCT2345B1ZC',
      formTitle: 'Vendor Onboarding & GST Validation',
      formId: 'form-102',
      status: 'VERIFIED',
      confidenceScore: 95,
      submittedAt: '38 mins ago',
      documentName: 'GST_Reg_Certificate_Western.pdf',
      ledgerMatch: 'Exact Match (Approved Vendors Master)',
    },
    {
      id: 'SUB-2026-8943',
      applicantName: 'Priya Sundaram',
      primaryKey: '2023-EE-0189',
      formTitle: 'Collegiate Merit Scholarship Application 2026',
      formId: 'form-101',
      status: 'FLAGGED',
      confidenceScore: 78,
      submittedAt: '1 hour ago',
      documentName: 'Priya_Transcript_GradeSheet.png',
      ledgerMatch: 'Discrepancy in extracted CGPA (8.95 vs 8.65)',
    },
    {
      id: 'SUB-2026-8944',
      applicantName: 'Karnataka Logistics Freight Corp',
      primaryKey: '29AAECS9876C1Z1',
      formTitle: 'Vendor Onboarding & GST Validation',
      formId: 'form-102',
      status: 'FLAGGED',
      confidenceScore: 72,
      submittedAt: '2 hours ago',
      documentName: 'KLFC_Tax_Invoice_2026.pdf',
      ledgerMatch: 'Vendor under audit status in Master Ledger',
    },
    {
      id: 'SUB-2026-8945',
      applicantName: 'Rahul K. Meena',
      primaryKey: '2023-ME-9999',
      formTitle: 'Collegiate Merit Scholarship Application 2026',
      formId: 'form-101',
      status: 'INVALID',
      confidenceScore: 36,
      submittedAt: '3 hours ago',
      documentName: 'Scanned_Doc_Unreadable.jpg',
      ledgerMatch: 'Primary Key not found in Master Roll dataset',
    },
    {
      id: 'SUB-2026-8946',
      applicantName: 'Ananya Verma',
      primaryKey: '2023-BT-0054',
      formTitle: 'Collegiate Merit Scholarship Application 2026',
      formId: 'form-101',
      status: 'VERIFIED',
      confidenceScore: 99,
      submittedAt: '4 hours ago',
      documentName: 'Ananya_Verma_Official_Roll.pdf',
      ledgerMatch: 'Exact Match (Collegiate Student Merit Registry)',
    },
    {
      id: 'SUB-2026-8947',
      applicantName: 'Sunita Joshi',
      primaryKey: 'REG-8841-2026',
      formTitle: 'Annual Campus Residential Hostel Grant',
      formId: 'form-103',
      status: 'PENDING',
      confidenceScore: 84,
      submittedAt: 'Just now',
      documentName: 'Income_Certificate_Joshi.pdf',
      ledgerMatch: 'Queued for OCR processing pipeline',
    },
    {
      id: 'SUB-2026-8948',
      applicantName: 'Global Cybernetics Inc',
      primaryKey: '33AAACG1111A1Z9',
      formTitle: 'Vendor Onboarding & GST Validation',
      formId: 'form-102',
      status: 'INVALID',
      confidenceScore: 41,
      submittedAt: '5 hours ago',
      documentName: 'Expired_Tax_Doc.pdf',
      ledgerMatch: 'GST certificate date expired over 180 days',
    },
  ];

  // Filtering Logic
  const filteredSubmissions = initialSubmissions.filter((sub) => {
    const matchesSearch =
      sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.primaryKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.formTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || sub.status === statusFilter;
    const matchesForm = formFilter === 'ALL' || sub.formId === formFilter;

    let matchesConfidence = true;
    if (confidenceFilter === 'HIGH') matchesConfidence = sub.confidenceScore >= 90;
    else if (confidenceFilter === 'MEDIUM')
      matchesConfidence = sub.confidenceScore >= 70 && sub.confidenceScore < 90;
    else if (confidenceFilter === 'LOW') matchesConfidence = sub.confidenceScore < 70;

    return matchesSearch && matchesStatus && matchesForm && matchesConfidence;
  });

  // Toggle selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredSubmissions.map((s) => s.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleToggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const triggerBatchAction = (type) => {
    setBatchActionType(type);
    setIsBatchModalOpen(true);
  };

  // Confidence color helper
  const getConfidenceBadge = (score) => {
    if (score >= 90) {
      return (
        <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {score}%
        </span>
      );
    }
    if (score >= 70) {
      return (
        <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {score}%
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
        {score}%
      </span>
    );
  };

  // Table Columns Definition
  const columns = [
    {
      key: 'select',
      header: (
        <input
          type="checkbox"
          checked={
            selectedRows.length > 0 &&
            selectedRows.length === filteredSubmissions.length
          }
          onChange={handleSelectAll}
          aria-label="Select all submissions"
          className="rounded border-border/80 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
      ),
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => handleToggleRow(row.id)}
          aria-label={`Select submission ${row.id}`}
          className="rounded border-border/80 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      className: 'w-10',
    },
    {
      key: 'id',
      header: 'Submission ID',
      render: (val, row) => (
        <div className="space-y-0.5">
          <Link
            to={`/admin/submissions/${row.id}`}
            className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            {val}
          </Link>
          <p className="text-[10px] text-muted-foreground font-mono">{row.submittedAt}</p>
        </div>
      ),
    },
    {
      key: 'applicant',
      header: 'Applicant & Primary Key',
      render: (_, row) => (
        <div>
          <span className="font-semibold text-foreground text-xs">{row.applicantName}</span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="font-mono text-[11px] text-muted-foreground bg-muted/60 px-1.5 py-0.2 rounded border border-border/60">
              {row.primaryKey}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'formTitle',
      header: 'Attached Form',
      render: (val) => (
        <span className="text-xs text-foreground font-medium line-clamp-1 max-w-[200px]" title={val}>
          {val}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Verification Status',
      render: (val) => <StatusBadge status={val} size="sm" />,
    },
    {
      key: 'confidenceScore',
      header: 'OCR Confidence',
      render: (val) => getConfidenceBadge(val),
    },
    {
      key: 'actions',
      header: 'Audit Action',
      align: 'right',
      render: (_, row) => (
        <Link to={`/admin/submissions/${row.id}`}>
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            className="text-xs h-7.5 px-2.5"
          >
            Inspect Audit
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Submissions Verification Queue
            </h1>
            <Badge variant="purple" className="text-[10px] font-mono">
              Live Queue
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl leading-relaxed">
            Review incoming form applications, monitor Tesseract OCR matching against authoritative
            master records, and triage flagged edge cases.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            className="text-xs h-8"
            onClick={() => alert('Exporting submissions CSV audit log...')}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card
          className={`p-4 border-border/80 cursor-pointer transition-all ${
            statusFilter === 'ALL' ? 'ring-2 ring-indigo-500 bg-indigo-50/10' : ''
          }`}
          onClick={() => setStatusFilter('ALL')}
        >
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Ingested
          </div>
          <div className="mt-1 text-2xl font-bold text-foreground font-mono">1,482</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Across all active forms</p>
        </Card>

        <Card
          className={`p-4 border-emerald-200/80 dark:border-emerald-800/80 cursor-pointer transition-all ${
            statusFilter === 'VERIFIED' ? 'ring-2 ring-emerald-500 bg-emerald-50/10' : ''
          }`}
          onClick={() => setStatusFilter('VERIFIED')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Auto-Verified
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-1 text-2xl font-bold text-foreground font-mono">1,120</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Confidence &gt; 90%</p>
        </Card>

        <Card
          className={`p-4 border-amber-200/80 dark:border-amber-800/80 cursor-pointer transition-all ${
            statusFilter === 'FLAGGED' ? 'ring-2 ring-amber-500 bg-amber-50/10' : ''
          }`}
          onClick={() => setStatusFilter('FLAGGED')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Flagged Triage
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-1 text-2xl font-bold text-foreground font-mono">238</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Manual review required</p>
        </Card>

        <Card
          className={`p-4 border-rose-200/80 dark:border-rose-800/80 cursor-pointer transition-all ${
            statusFilter === 'INVALID' ? 'ring-2 ring-rose-500 bg-rose-50/10' : ''
          }`}
          onClick={() => setStatusFilter('INVALID')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
              Invalid / Rejected
            </span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-1 text-2xl font-bold text-foreground font-mono">124</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Key or doc mismatch</p>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search by submission ID, applicant, or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-muted-foreground" />}
              className="text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Tabs */}
            <div className="flex items-center bg-muted/60 p-1 rounded-lg border border-border/80">
              {['ALL', 'VERIFIED', 'FLAGGED', 'INVALID', 'PENDING'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    statusFilter === status
                      ? 'bg-card text-foreground font-semibold shadow-2xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Confidence Dropdown Filter */}
            <select
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(e.target.value)}
              aria-label="Filter by OCR Confidence"
              className="h-8 rounded-lg border border-border/80 bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="ALL">All OCR Scores</option>
              <option value="HIGH">High (≥ 90%)</option>
              <option value="MEDIUM">Medium (70–89%)</option>
              <option value="LOW">Low (&lt; 70%)</option>
            </select>
          </div>
        </div>

        {/* Selected Batch Actions Bar */}
        {selectedRows.length > 0 && (
          <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <Badge variant="purple" size="sm" className="font-mono">
                {selectedRows.length} selected
              </Badge>
              <span className="text-foreground font-medium">Batch Triage Operations Available</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="success"
                size="sm"
                onClick={() => triggerBatchAction('approve')}
                icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                className="text-xs h-7.5 px-2.5"
              >
                Approve Batch
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => triggerBatchAction('flag')}
                icon={<AlertTriangle className="w-3.5 h-3.5" />}
                className="text-xs h-7.5 px-2.5"
              >
                Flag for Review
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRows([])}
                className="text-xs h-7.5 px-2"
              >
                Deselect All
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Submissions Table */}
      <Table
        columns={columns}
        data={filteredSubmissions}
        emptyTitle="No submissions match your filter"
        emptyMessage="Try clearing your search query or reset status filters to view the full verification queue."
        onRowClick={(row) => navigate(`/admin/submissions/${row.id}`)}
      />

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground pt-2">
        <div>
          Showing <span className="font-semibold text-foreground">{filteredSubmissions.length}</span> of{' '}
          <span className="font-semibold text-foreground">1,482</span> total submissions
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled className="text-xs h-7.5 px-3">
            Previous
          </Button>
          <span className="px-2 font-mono text-foreground font-semibold">1</span>
          <Button variant="outline" size="sm" className="text-xs h-7.5 px-3">
            Next
          </Button>
        </div>
      </div>

      {/* Batch Action Modal */}
      <Modal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        title={
          batchActionType === 'approve'
            ? `Batch Approve ${selectedRows.length} Submissions`
            : `Flag ${selectedRows.length} Submissions for Review`
        }
        description="This administrative decision will update status flags across all selected applicant records."
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBatchModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={batchActionType === 'approve' ? 'success' : 'primary'}
              size="sm"
              onClick={() => {
                alert(`Processed batch action on ${selectedRows.length} items`);
                setIsBatchModalOpen(false);
                setSelectedRows([]);
              }}
            >
              Confirm Batch Action
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            You are about to execute a status change on {selectedRows.length} submission(s):
          </p>
          <div className="max-h-32 overflow-y-auto p-2.5 rounded-lg bg-muted/40 border border-border/70 font-mono text-xs space-y-1">
            {selectedRows.map((id) => (
              <div key={id} className="text-foreground">
                • {id}
              </div>
            ))}
          </div>
          <Input
            label="Administrative Reason / Audit Note"
            placeholder="e.g. Batch verified against registrar certified roll"
            required
          />
        </div>
      </Modal>
    </div>
  );
}
