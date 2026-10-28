import React, { useState } from 'react';
import {
  Database,
  Upload,
  FileSpreadsheet,
  Search,
  Download,
  Eye,
  RefreshCw,
  Plus,
  ShieldCheck,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import { Button, Input, Card, Badge, Modal, Table, StatusBadge } from '@/components/common';

export default function MasterLedgerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sample Master Ledgers Registry
  const masterLedgers = [
    {
      id: 'ldg-001',
      name: 'Collegiate Student Merit Registry 2026',
      filename: 'Student_Merit_Registry_2026.csv',
      category: 'Academic',
      primaryKey: 'roll_number',
      recordsCount: 12450,
      attachedFormsCount: 2,
      attachedForms: ['Merit Scholarship Application 2026', 'Annual Campus Hostel Grant'],
      status: 'VERIFIED',
      lastSynced: '24 mins ago',
      checksum: 'sha256:4f8e...92a1',
      sampleHeaders: ['roll_number', 'full_name', 'department', 'cgpa', 'income_category'],
      sampleData: [
        {
          id: 1,
          roll_number: '2023-CS-0412',
          full_name: 'Aarav Sharma',
          department: 'Computer Science',
          cgpa: '9.42',
          income_category: 'EWS Category A',
        },
        {
          id: 2,
          roll_number: '2023-EE-0189',
          full_name: 'Priya Sundaram',
          department: 'Electrical Eng.',
          cgpa: '8.95',
          income_category: 'General Merit',
        },
        {
          id: 3,
          roll_number: '2023-ME-0310',
          full_name: 'Rohan Deshmukh',
          department: 'Mechanical Eng.',
          cgpa: '9.10',
          income_category: 'OBC Non-Creamy',
        },
        {
          id: 4,
          roll_number: '2023-BT-0054',
          full_name: 'Ananya Verma',
          department: 'Biotechnology',
          cgpa: '9.65',
          income_category: 'General Merit',
        },
        {
          id: 5,
          roll_number: '2023-CV-0221',
          full_name: 'Vikramaditya Rao',
          department: 'Civil Eng.',
          cgpa: '8.78',
          income_category: 'State Quota B',
        },
      ],
    },
    {
      id: 'ldg-002',
      name: 'GSTN Procurement & Vendor Master File',
      filename: 'Approved_Vendors_Master.xlsx',
      category: 'Procurement',
      primaryKey: 'gstin_number',
      recordsCount: 3820,
      attachedFormsCount: 1,
      attachedForms: ['Vendor Onboarding & GST Validation'],
      status: 'VERIFIED',
      lastSynced: '2 hours ago',
      checksum: 'sha256:7c11...bb44',
      sampleHeaders: ['gstin_number', 'legal_entity_name', 'tax_bracket', 'pan_number', 'compliance_status'],
      sampleData: [
        {
          id: 1,
          gstin_number: '07AAAAA0000A1Z5',
          legal_entity_name: 'Apex Infotech Solutions LLP',
          tax_bracket: '18% Standard',
          pan_number: 'AAAAA0000A',
          compliance_status: 'Compliant',
        },
        {
          id: 2,
          gstin_number: '27AABCT2345B1ZC',
          legal_entity_name: 'Western Precision Tools Ltd',
          tax_bracket: '12% Industrial',
          pan_number: 'AABCT2345B',
          compliance_status: 'Compliant',
        },
        {
          id: 3,
          gstin_number: '29AAECS9876C1Z1',
          legal_entity_name: 'Karnataka Logistics Freight Corp',
          tax_bracket: '18% Transport',
          pan_number: 'AAECS9876C',
          compliance_status: 'Under Review',
        },
      ],
    },
    {
      id: 'ldg-003',
      name: 'Corporate Payroll & Faculty Master Database',
      filename: 'HR_Employee_Database.csv',
      category: 'Human Resources',
      primaryKey: 'employee_id',
      recordsCount: 1640,
      attachedFormsCount: 1,
      attachedForms: ['Employee Travel Expense Reimbursement'],
      status: 'VERIFIED',
      lastSynced: '1 day ago',
      checksum: 'sha256:99de...187c',
      sampleHeaders: ['employee_id', 'official_name', 'cost_center', 'designation', 'currency'],
      sampleData: [
        {
          id: 1,
          employee_id: 'EMP-9021',
          official_name: 'Dr. Siddharth Mehta',
          cost_center: 'R&D Lab 4',
          designation: 'Principal Architect',
          currency: 'INR',
        },
        {
          id: 2,
          employee_id: 'EMP-8842',
          official_name: 'Meenakshi Iyer',
          cost_center: 'Operations & Legal',
          designation: 'Director of Compliance',
          currency: 'INR',
        },
      ],
    },
    {
      id: 'ldg-004',
      name: 'International Embassy Sponsorship Clearance',
      filename: 'Consular_Grant_Roster_2026.csv',
      category: 'Academic',
      primaryKey: 'passport_number',
      recordsCount: 540,
      attachedFormsCount: 0,
      attachedForms: ['International Student Visa Clearance (Draft)'],
      status: 'PENDING',
      lastSynced: 'Pending Indexing',
      checksum: 'Pending computation',
      sampleHeaders: ['passport_number', 'holder_name', 'country_origin', 'sponsorship_code', 'clearance_date'],
      sampleData: [],
    },
  ];

  // Filtered Ledgers
  const filteredLedgers = masterLedgers.filter((ldg) => {
    const matchesSearch =
      ldg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ldg.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ldg.primaryKey.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'ALL') return matchesSearch;
    return matchesSearch && ldg.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleInspect = (ledger) => {
    setSelectedLedger(ledger);
    setIsInspectModalOpen(true);
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  // Table columns definition for Table component
  const columns = [
    {
      key: 'name',
      header: 'Master Dataset',
      render: (_, row) => (
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
            <FileSpreadsheet className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="font-semibold text-foreground hover:text-indigo-600 transition-colors">
              {row.name}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-[10px] text-muted-foreground">{row.filename}</span>
              <span className="text-muted-foreground/40">•</span>
              <Badge variant="neutral" size="sm" className="text-[10px] py-0 px-1.5">
                {row.category}
              </Badge>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'primaryKey',
      header: 'Primary Match Key',
      render: (val) => (
        <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-muted/60 border border-border/80 text-foreground font-medium">
          {val}
        </span>
      ),
    },
    {
      key: 'recordsCount',
      header: 'Indexed Records',
      render: (val) => (
        <div className="font-mono text-xs font-semibold text-foreground">
          {val.toLocaleString()} rows
        </div>
      ),
    },
    {
      key: 'attachedForms',
      header: 'Attached Schemas',
      render: (_, row) => (
        <div className="text-xs">
          <span className="font-medium text-foreground">{row.attachedFormsCount} active form(s)</span>
          <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">
            {row.attachedForms.join(', ') || 'None assigned'}
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Sync Status',
      render: (val, row) => (
        <div className="space-y-1">
          <StatusBadge status={val} size="sm" />
          <p className="text-[10px] text-muted-foreground font-mono">{row.lastSynced}</p>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Operations',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleInspect(row)}
            icon={<Eye className="w-3.5 h-3.5" />}
            className="text-xs h-7.5 px-2.5"
          >
            Inspect
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            className="text-xs h-7.5 w-7.5 p-0 text-muted-foreground hover:text-foreground"
            title="Download CSV reference"
          />
        </div>
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
              Master Ledger Directory
            </h1>
            <Badge variant="purple" className="text-[10px] font-mono">
              Ground Truth
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl leading-relaxed">
            Institutional reference datasets used by the SynapseForms engine to reconcile user inputs
            and OCR extracted text against authoritative records.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSyncAll}
            loading={isSyncing}
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />}
            className="text-xs h-8"
          >
            Re-index Ledgers
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsUploadModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
            className="text-xs h-8"
          >
            Upload New Ledger
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-border/80">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Ledgers</span>
            <Database className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground font-mono">4</div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            <span className="text-emerald-600 font-medium">3 verified</span> • 1 pending indexing
          </p>
        </Card>

        <Card className="p-4 border-border/80">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Indexed Records</span>
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground font-mono">18,450</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Across all registered CSV/Excel files</p>
        </Card>

        <Card className="p-4 border-border/80">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Match Accuracy</span>
            <ShieldCheck className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground font-mono">98.4%</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Automated OCR ground-truth validation</p>
        </Card>

        <Card className="p-4 border-border/80">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Primary Match Keys</span>
            <FileCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground font-mono">14 Keys</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Deterministic roll/ID/GST mappings</p>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="w-full sm:w-96">
          <Input
            placeholder="Search by dataset title, filename, or match key..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4 text-muted-foreground" />}
            className="text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'All Ledgers' },
            { id: 'Academic', label: 'Academic' },
            { id: 'Procurement', label: 'Procurement' },
            { id: 'Human Resources', label: 'HR & Faculty' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-secondary text-foreground font-semibold shadow-2xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Master Ledgers Data Table */}
      <Table
        columns={columns}
        data={filteredLedgers}
        emptyTitle="No master ledgers match your criteria"
        emptyMessage="Try adjusting your search terms or upload a new CSV/Excel reference dataset."
      />

      {/* Schema Verification Architecture Card */}
      <Card
        title="Automated Ledger Verification Engine"
        subtitle="How SynapseForms matches dynamic form submissions with Ground-Truth Ledgers"
        className="bg-muted/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
          <div className="p-3.5 rounded-lg border border-border/70 bg-card space-y-1.5">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                1
              </span>
              <span>Deterministic Primary Key Match</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Submissions first resolve against indexed primary keys (e.g. <code className="text-indigo-600 font-mono">roll_number</code> or <code className="text-indigo-600 font-mono">gstin_number</code>) to pinpoint the exact ledger row.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-border/70 bg-card space-y-1.5">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                2
              </span>
              <span>Tesseract OCR Token Alignment</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Extracted tokens from uploaded student certificates or invoices are compared against the master ledger record with Levenshtein distance tolerance.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-border/70 bg-card space-y-1.5">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                3
              </span>
              <span>Autonomous Status Triage</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              If confidence ≥90%, submission auto-marks <span className="text-emerald-600 font-semibold">VERIFIED</span>. Borderline matches (70–89%) trigger <span className="text-amber-600 font-semibold">FLAGGED</span> triage.
            </p>
          </div>
        </div>
      </Card>

      {/* Upload New Ledger Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload & Register Master Ledger"
        description="Attach an authoritative CSV or Excel reference dataset to ground verification rules."
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsUploadModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsUploadModalOpen(false);
              }}
            >
              Import & Index Dataset
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Dataset Display Name"
            placeholder="e.g. Collegiate Merit Roll 2026-27"
            helperText="Clear institutional identifier for administrative audits"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Match Key"
              placeholder="e.g. roll_number or gstin"
              helperText="Column header in your CSV used for exact lookups"
              required
            />
            <Input
              label="Department / Category"
              placeholder="e.g. Academic, Financial, HR"
              helperText="Grouping tag for organization"
            />
          </div>

          {/* Drag & Drop File Upload Placeholder */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground/80 tracking-wide select-none">
              Source File (.CSV, .XLSX) <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="border-2 border-dashed border-border/80 rounded-xl p-6 text-center hover:bg-muted/30 transition-colors cursor-pointer bg-muted/10">
              <Upload className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-foreground">
                Click to browse or drag and drop reference dataset
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Supports CSV, TSV, or Excel (.xlsx) up to 25MB (max 50,000 rows)
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Privacy & Encryption Notice</p>
              <p className="text-[11px] mt-0.5 leading-relaxed">
                Uploaded reference datasets are encrypted at rest with AES-256 and only queried during live verification audits.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Inspect Records Modal */}
      <Modal
        isOpen={isInspectModalOpen}
        onClose={() => setIsInspectModalOpen(false)}
        title={selectedLedger ? `Inspect: ${selectedLedger.name}` : 'Ledger Sample'}
        description={
          selectedLedger
            ? `Previewing top indexed records in ${selectedLedger.filename} (Primary Key: ${selectedLedger.primaryKey})`
            : ''
        }
        size="xl"
        footer={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsInspectModalOpen(false)}
          >
            Close Inspector
          </Button>
        }
      >
        {selectedLedger && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-muted/40 border border-border/60 text-xs">
              <div>
                <span className="text-muted-foreground">Checksum: </span>
                <span className="font-mono text-foreground font-semibold">
                  {selectedLedger.checksum}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Ingested: </span>
                <span className="font-mono text-indigo-600 font-semibold">
                  {selectedLedger.recordsCount.toLocaleString()} rows
                </span>
              </div>
            </div>

            {selectedLedger.sampleData && selectedLedger.sampleData.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-border/70">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-muted/60 border-b border-border/70 text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      {selectedLedger.sampleHeaders.map((hdr) => (
                        <th key={hdr} className="px-3.5 py-2.5 font-mono">
                          {hdr}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {selectedLedger.sampleData.map((row) => (
                      <tr key={row.id} className="hover:bg-muted/30 font-mono text-[11px]">
                        {selectedLedger.sampleHeaders.map((hdr) => (
                          <td key={hdr} className="px-3.5 py-2 text-foreground">
                            {row[hdr] ?? '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center border-dashed border-2 border-border/70 rounded-xl bg-card">
                <Database className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <h4 className="text-xs font-semibold text-foreground">
                  Dataset Indexing In Progress
                </h4>
                <p className="text-[11px] text-muted-foreground mt-1 max-w-xs mx-auto">
                  Records are queued for schema extraction. Once ingestion completes, sampled records will render here.
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
