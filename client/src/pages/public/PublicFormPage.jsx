import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  Upload,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  Clock,
  ArrowRight,
  Info,
  Copy,
  Lock,
} from 'lucide-react';
import { Button, Input, Card, Badge, Modal, StatusBadge } from '@/components/common';

export default function PublicFormPage() {
  const { formId } = useParams();

  // Form definition lookup or placeholder
  const formPresets = {
    'form-101': {
      title: 'Collegiate Merit Scholarship Application 2026',
      description:
        'Official application portal for academic excellence grants. Submitted documents will be verified automatically against the Collegiate Master Roll.',
      category: 'Academic Affairs',
      primaryKeyLabel: 'Student Roll Number',
      primaryKeyPlaceholder: 'e.g. 2023-CS-0412',
      documentLabel: 'Latest Semester Official Mark Sheet',
      ledger: 'Collegiate Student Merit Registry 2026.csv',
    },
    'form-102': {
      title: 'Vendor Onboarding & GST Clearance',
      description:
        'Procurement validation portal for contracted institutional vendors. GSTIN and tax certificates are matched directly against the Approved Vendors Registry.',
      category: 'Procurement',
      primaryKeyLabel: 'GSTIN / Corporate Tax ID',
      primaryKeyPlaceholder: 'e.g. 07AAAAA0000A1Z5',
      documentLabel: 'GST Registration Certificate (Form REG-06)',
      ledger: 'Approved_Vendors_Master.xlsx',
    },
    'form-103': {
      title: 'Annual Campus Residential Hostel Grant',
      description:
        'Residential facility allocation and fee waiver assessment portal. Matched against student housing eligibility datasets.',
      category: 'Student Welfare',
      primaryKeyLabel: 'Student Registration Number',
      primaryKeyPlaceholder: 'e.g. REG-8841-2026',
      documentLabel: 'Family Income Certificate / BPL Card',
      ledger: 'Hostel_Eligibility_List.csv',
    },
  };

  const activeForm = formPresets[formId] || {
    title: formId ? `Application Form #${formId}` : 'Institutional Verification Portal',
    description:
      'Standardized form submission interface with integrated OCR verification against authoritative Master Ledgers.',
    category: 'Public Services',
    primaryKeyLabel: 'Primary Identification / Roll ID',
    primaryKeyPlaceholder: 'e.g. ID-2026-XXXX',
    documentLabel: 'Verification Document / Proof',
    ledger: 'Standard Institutional Master Ledger',
  };

  // Local Form State
  const [formData, setFormData] = useState({
    fullName: '',
    primaryKey: '',
    email: '',
    department: '',
    phone: '',
    notes: '',
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSimulateUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type || 'application/pdf',
      });
    } else {
      // simulated fallback file if user clicks without selection
      setUploadedFile({
        name: 'Official_Academic_MarkSheet_Sem4.pdf',
        size: '1.42 MB',
        type: 'application/pdf',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedSubId = `SUB-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedId(generatedSubId);
      setIsSuccessModalOpen(true);
    }, 1200);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Institutional Breadcrumb & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors font-medium">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Public Forms</span>
          <span>/</span>
          <span className="font-mono text-indigo-600">{formId || 'form-101'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="purple" size="sm" className="text-[10px] font-medium">
            {activeForm.category}
          </Badge>
          <Badge variant="success" size="sm" dot className="text-[10px]">
            Submissions Open
          </Badge>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="space-y-6">
        {/* Form Title Card */}
        <Card className="border-border/80 shadow-xs">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {activeForm.title}
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeForm.description}
                </p>
              </div>
              <div className="hidden sm:flex h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verification Ground Truth:</span>
                <span className="font-mono text-foreground font-semibold">{activeForm.ledger}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Avg. Verification Time: ~30 seconds</span>
              </div>
            </div>
          </div>
        </Card>

        {/* The Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Identity & Credentials */}
          <Card
            title="1. Identity & Record Credentials"
            subtitle="Enter the exact personal credentials registered on institutional records."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Legal Name"
                placeholder="e.g. Aarav Sharma"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
                helperText="Must match your official certificate name"
              />

              <Input
                label={activeForm.primaryKeyLabel}
                placeholder={activeForm.primaryKeyPlaceholder}
                value={formData.primaryKey}
                onChange={(e) => handleInputChange('primaryKey', e.target.value)}
                required
                helperText="Primary key used for master ledger matching"
              />

              <Input
                type="email"
                label="Institutional / Contact Email"
                placeholder="e.g. applicant@university.edu"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                helperText="Status notifications will be dispatched here"
              />

              <Input
                label="Academic Department / Business Unit"
                placeholder="e.g. Computer Science & Engineering"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
              />
            </div>
          </Card>

          {/* Section 2: Document Upload & OCR Ingestion */}
          <Card
            title="2. Document Upload for Automated OCR"
            subtitle="Upload original documents. Our OCR engine extracts fields to cross-reference with the master registry."
          >
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-border/80 bg-muted/15 p-6 sm:p-8 text-center hover:bg-muted/30 transition-colors relative cursor-pointer">
                <input
                  type="file"
                  id="document-upload"
                  onChange={handleSimulateUpload}
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center justify-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-foreground">
                    {uploadedFile ? uploadedFile.name : `Click or drag & drop ${activeForm.documentLabel}`}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1 max-w-sm mx-auto">
                    Supports high-resolution PDF, JPG, or PNG (up to 10MB). Ensure primary keys and numbers are clearly visible without glare.
                  </p>
                </div>
              </div>

              {uploadedFile && (
                <div className="p-3.5 rounded-lg border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <FileCheck2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{uploadedFile.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {uploadedFile.size} • Ready for Tesseract OCR pipeline
                      </p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">
                    Attached
                  </Badge>
                </div>
              )}

              <div className="p-3 rounded-lg bg-muted/40 border border-border/70 flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Verification Note:</strong> Our automated OCR pipeline extracts the primary identifier and grades directly from this document. If discrepancies occur, the submission will be flagged for secondary human administrator audit.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 3: Declarations & Agreement */}
          <Card className="bg-card">
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-border/80 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  required
                />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I solemnly declare that all personal credentials and certificates submitted above are accurate and genuine. I authorize SynapseForms to perform automated OCR document parsing and programmatic cross-verification against institutional master records.
                </span>
              </label>

              <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-bit encrypted submission endpoint</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setFormData({
                        fullName: '',
                        primaryKey: '',
                        email: '',
                        department: '',
                        phone: '',
                        notes: '',
                      });
                      setUploadedFile(null);
                      setAgreedToTerms(false);
                    }}
                    className="flex-1 sm:flex-none text-xs"
                  >
                    Clear Form
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={isSubmitting}
                    disabled={!agreedToTerms || isSubmitting}
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                    className="flex-1 sm:flex-none text-xs"
                  >
                    Submit for Verification
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </form>
      </div>

      {/* Submission Confirmation Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Application Submitted Successfully"
        description="Your submission has been securely ingested into the SynapseForms verification pipeline."
        size="md"
        footer={
          <>
            <Link to="/">
              <Button variant="outline" size="sm">
                Return to Homepage
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Done
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-center py-2">
          <div className="h-14 w-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Unique Reference Tracking ID
            </span>
            <div className="mt-1 font-mono text-lg font-bold text-foreground bg-muted/50 p-2.5 rounded-lg border border-border/80 inline-flex items-center gap-2">
              <span>{submittedId}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                title="Copy Reference ID"
                onClick={() => alert(`Copied ${submittedId} to clipboard`)}
              >
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-muted/30 border border-border/70 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Current Status:</span>
              <StatusBadge status="PENDING" size="sm" pulse />
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Assigned Ledger:</span>
              <span className="font-semibold text-foreground font-mono truncate max-w-[200px]">
                {activeForm.ledger}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Pipeline Stage:</span>
              <span className="text-indigo-600 font-medium">OCR Extraction & Field Comparison</span>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Please keep your tracking reference safe. Institutional administrators can audit this submission at <code className="text-foreground font-mono">/admin/submissions/{submittedId}</code>.
          </p>
        </div>
      </Modal>
    </div>
  );
}

