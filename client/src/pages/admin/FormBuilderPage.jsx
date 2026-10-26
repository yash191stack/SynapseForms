import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Trash2,
  MoveUp,
  MoveDown,
  Layers,
  Save,
  Eye,
  Settings2,
  FileText,
  ScanText,
  Database,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Sliders,
  Type,
  Hash,
  AtSign,
  Calendar,
  ListFilter,
  UploadCloud,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function FormBuilderPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('BUILDER');
  const [isSaving, setIsSaving] = useState(false);

  // Form Metadata
  const [formTitle, setFormTitle] = useState('Student Fee Exemption & Grant');
  const [formDescription, setFormDescription] = useState(
    'Dynamic submission for academic fee concessions validated directly against semester enrollment records and fee receipts.'
  );
  const [selectedLedger, setSelectedLedger] = useState('Student_Merit_Registry_2026.csv');
  const [ledgerMatchKey, setLedgerMatchKey] = useState('roll_number');
  const [ocrEnabled, setOcrEnabled] = useState(true);

  // Dynamic Fields
  const [fields, setFields] = useState([
    {
      id: 'f-1',
      label: 'Student Registration / Roll Number',
      type: 'text',
      placeholder: 'e.g. CS-2024-0419',
      required: true,
      validationRule: 'LEDGER_LOOKUP',
      helpText: 'Validated against master roll database in real-time.',
    },
    {
      id: 'f-2',
      label: 'Full Legal Name',
      type: 'text',
      placeholder: 'As printed on University ID',
      required: true,
      validationRule: 'EXACT_MATCH',
      helpText: 'Cross-matched against ledger student name.',
    },
    {
      id: 'f-3',
      label: 'Registered Academic Email',
      type: 'email',
      placeholder: 'student@university.edu',
      required: true,
      validationRule: 'REGEX_EMAIL',
      helpText: 'Official institutional email address.',
    },
    {
      id: 'f-4',
      label: 'Fee Exemption Category',
      type: 'select',
      options: ['Merit-Based (Above 9.0 GPA)', 'Economically Weaker Section (EWS)', 'Sports & Cultural Excellence'],
      required: true,
      validationRule: 'NONE',
      helpText: 'Select category for quota evaluation.',
    },
    {
      id: 'f-5',
      label: 'Fee Receipt / Bank Challan (PDF or Image)',
      type: 'file',
      placeholder: 'Upload official bank voucher',
      required: true,
      validationRule: 'OCR_EXTRACT',
      helpText: 'Document OCR will extract date, bank reference, and amount.',
    },
  ]);

  const addField = (fieldType) => {
    const newId = `f-${Date.now()}`;
    const typeDefaults = {
      text: { label: 'New Text Field', placeholder: 'Enter text...', validationRule: 'NONE' },
      number: { label: 'Numeric Amount / ID', placeholder: '0.00', validationRule: 'NUMERIC' },
      email: { label: 'Contact Email Address', placeholder: 'user@domain.com', validationRule: 'REGEX_EMAIL' },
      date: { label: 'Verification Date', placeholder: 'YYYY-MM-DD', validationRule: 'DATE_RANGE' },
      select: {
        label: 'Dropdown Selection',
        options: ['Option A', 'Option B', 'Option C'],
        validationRule: 'NONE',
      },
      file: {
        label: 'Supporting Document / Receipt',
        placeholder: 'Upload document',
        validationRule: 'OCR_EXTRACT',
      },
    };

    const def = typeDefaults[fieldType] || typeDefaults.text;

    setFields([
      ...fields,
      {
        id: newId,
        type: fieldType,
        label: def.label,
        placeholder: def.placeholder || '',
        options: def.options || [],
        required: true,
        validationRule: def.validationRule,
        helpText: 'Dynamic field added to schema.',
      },
    ]);

    toast.success(`Added ${def.label} to form schema`);
  };

  const removeField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
    toast.info('Field removed from schema');
  };

  const moveField = (index, direction) => {
    const newFields = [...fields];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newFields.length) return;
    const temp = newFields[index];
    newFields[index] = newFields[targetIndex];
    newFields[targetIndex] = temp;
    setFields(newFields);
  };

  const updateField = (id, key, value) => {
    setFields(
      fields.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    );
  };

  const handleSaveSchema = () => {
    setIsSaving(true);
    toast.loading('Saving schema configuration...', { id: 'save-schema' });
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Form schema saved successfully!', { id: 'save-schema' });
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/admin/forms">
            <Button variant="ghost" size="sm" className="text-xs h-8">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Back</span>
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Interactive Form Builder
              </h1>
              <Badge variant="purple" className="text-[10px]">
                Draft v1
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Configure dynamic fields, attach master ledger validation rules, and activate OCR pipelines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* shadcn Tabs for Mode Switcher */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-8 p-1">
              <TabsTrigger value="BUILDER" className="text-xs px-2.5">
                <Settings2 className="w-3 h-3 mr-1" />
                <span>Schema</span>
              </TabsTrigger>
              <TabsTrigger value="PREVIEW" className="text-xs px-2.5">
                <Eye className="w-3 h-3 mr-1" />
                <span>Live Preview</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            size="sm"
            disabled={isSaving}
            onClick={handleSaveSchema}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8 shadow-xs"
          >
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>Save Schema</span>
          </Button>
        </div>
      </div>

      {activeTab === 'BUILDER' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left 2 Cols: Form Metadata & Configured Fields */}
          <div className="lg:col-span-2 space-y-5">
            {/* Form General Settings */}
            <Card className="border-border/70 p-5">
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-sm font-bold text-foreground">
                  Form Overview & Identity
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Core metadata displayed to applicants in the public view
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-foreground uppercase tracking-wider block">
                    Form Title
                  </label>
                  <Input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Merit Scholarship Application 2026"
                    className="h-8.5 text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-foreground uppercase tracking-wider block">
                    Form Description & Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Provide detailed instructions to users..."
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Fields List */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Configured Dynamic Fields ({fields.length})
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Order fields and assign validation rules for the verification pipeline.
                  </p>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  {fields.length} Active
                </Badge>
              </div>

              {fields.map((field, idx) => (
                <Card
                  key={field.id}
                  className="border-border/70 hover:border-border transition-all duration-150 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-5 w-5 rounded-md bg-muted text-foreground font-mono text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {field.type}
                      </span>
                      {field.required && (
                        <Badge variant="destructive" className="text-[9px] px-1 h-4">
                          Required
                        </Badge>
                      )}
                      {field.validationRule !== 'NONE' && (
                        <Badge variant="purple" className="text-[9px] px-1 h-4">
                          {field.validationRule}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => moveField(idx, -1)}
                        disabled={idx === 0}
                        className="text-muted-foreground hover:text-foreground"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => moveField(idx, 1)}
                        disabled={idx === fields.length - 1}
                        className="text-muted-foreground hover:text-foreground"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => removeField(field.id)}
                        className="text-destructive hover:bg-destructive/10"
                        title="Delete Field"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block">
                        Field Label
                      </label>
                      <Input
                        value={field.label}
                        onChange={(e) => updateField(field.id, 'label', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block">
                        Placeholder Text
                      </label>
                      <Input
                        value={field.placeholder || ''}
                        onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-border/50">
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block">
                        Validation Constraint
                      </label>
                      <select
                        value={field.validationRule}
                        onChange={(e) => updateField(field.id, 'validationRule', e.target.value)}
                        className="w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-xs text-foreground focus:border-ring focus:outline-none"
                      >
                        <option value="NONE" className="bg-background">Standard Input</option>
                        <option value="LEDGER_LOOKUP" className="bg-background">Master Ledger Match</option>
                        <option value="EXACT_MATCH" className="bg-background">Exact Record Value Match</option>
                        <option value="OCR_EXTRACT" className="bg-background">OCR Extraction & Cross-Check</option>
                        <option value="REGEX_EMAIL" className="bg-background">Institutional Email Regex</option>
                        <option value="NUMERIC" className="bg-background">Numeric Range Check</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground select-none">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                          className="rounded border-border text-indigo-600 focus:ring-ring"
                        />
                        <span className="text-[11px]">Field is Mandatory</span>
                      </label>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column: Palette & Validation Settings */}
          <div className="space-y-5">
            {/* Field Palette */}
            <Card className="border-border/70 p-5">
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-sm font-bold text-foreground">
                  Add Field to Schema
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Click any field type to append to your dynamic form
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addField('text')}
                    className="justify-start text-xs h-8"
                  >
                    <Type className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                    <span>Text Field</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addField('number')}
                    className="justify-start text-xs h-8"
                  >
                    <Hash className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                    <span>Number</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addField('email')}
                    className="justify-start text-xs h-8"
                  >
                    <AtSign className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                    <span>Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addField('date')}
                    className="justify-start text-xs h-8"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                    <span>Date Picker</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addField('select')}
                    className="justify-start text-xs h-8"
                  >
                    <ListFilter className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                    <span>Dropdown</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addField('file')}
                    className="justify-start text-xs h-8"
                  >
                    <UploadCloud className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                    <span>OCR Upload</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Master Ledger Linkage */}
            <Card className="border-border/70 p-5">
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-sm font-bold text-foreground">
                  Master Ledger Cross-Check
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Connect schema to authoritative reference dataset
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-foreground uppercase tracking-wider block text-[10px] mb-1">
                    Select Reference Dataset
                  </label>
                  <select
                    value={selectedLedger}
                    onChange={(e) => setSelectedLedger(e.target.value)}
                    className="w-full rounded-md border border-input bg-transparent p-2 text-xs font-medium text-foreground"
                  >
                    <option value="Student_Merit_Registry_2026.csv" className="bg-background">
                      Student_Merit_Registry_2026.csv (4,500 records)
                    </option>
                    <option value="Approved_Vendors_Master.xlsx" className="bg-background">
                      Approved_Vendors_Master.xlsx (820 records)
                    </option>
                    <option value="Hostel_Eligibility_List.csv" className="bg-background">
                      Hostel_Eligibility_List.csv (1,200 records)
                    </option>
                    <option value="NONE" className="bg-background">None (Stand-alone form)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground uppercase tracking-wider block text-[10px] mb-1">
                    Primary Match Key Column
                  </label>
                  <Input
                    value={ledgerMatchKey}
                    onChange={(e) => setLedgerMatchKey(e.target.value)}
                    placeholder="e.g. roll_number or vendor_tax_id"
                    className="h-8 text-xs"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Submissions query this key in the master dataset.
                  </p>
                </div>

                <Separator />

                <Link
                  to="/admin/ledger"
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1.5 pt-0.5"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Manage Datasets (Gauri's module)</span>
                </Link>
              </CardContent>
            </Card>

            {/* OCR Engine Integration */}
            <Card className="border-border/70 p-5">
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-sm font-bold text-foreground">
                  OCR Document Engine
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Tesseract.js automated text extraction
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-foreground select-none">
                  <input
                    type="checkbox"
                    checked={ocrEnabled}
                    onChange={(e) => setOcrEnabled(e.target.checked)}
                    className="rounded border-border text-indigo-600 focus:ring-ring"
                  />
                  <span className="text-[11px]">Enable Document OCR Extraction</span>
                </label>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Extracts raw text, dates, currency amounts, and stamps from vouchers for automatic verification.
                </p>
                <Badge variant="purple" className="text-[10px]">
                  Powered by Tesseract.js Backend
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Live Form Preview Tab */
        <div className="max-w-2xl mx-auto">
          <Card className="border-border/80 shadow-md">
            <CardHeader className="p-6 border-b border-border/70">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-foreground">
                    {formTitle}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    {formDescription}
                  </CardDescription>
                </div>
                <Badge variant="success" dot className="text-[10px]">
                  Preview
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {fields.map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    {field.type === 'select' ? (
                      <div>
                        <label className="text-[11px] font-semibold text-foreground uppercase tracking-wider flex items-center gap-1 mb-1">
                          {field.label}
                          {field.required && <span className="text-destructive">*</span>}
                        </label>
                        <select className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs text-foreground">
                          {field.options &&
                            field.options.map((opt, i) => (
                              <option key={i} value={opt} className="bg-background">
                                {opt}
                              </option>
                            ))}
                        </select>
                      </div>
                    ) : field.type === 'file' ? (
                      <div>
                        <label className="text-[11px] font-semibold text-foreground uppercase tracking-wider flex items-center gap-1 mb-1">
                          {field.label}
                          {field.required && <span className="text-destructive">*</span>}
                        </label>
                        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-muted/30 transition-colors">
                          <UploadCloud className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                          <p className="text-xs font-semibold text-foreground">
                            Click to upload receipt document or drag and drop
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-1">
                            PNG, JPG, or PDF up to 10MB • Auto OCR Enabled
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-foreground uppercase tracking-wider flex items-center gap-1">
                          {field.label}
                          {field.required && <span className="text-destructive">*</span>}
                        </label>
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="h-9 text-xs"
                        />
                        {field.helpText && (
                          <p className="text-[10px] text-muted-foreground">{field.helpText}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('BUILDER')}
                    className="text-xs h-8"
                  >
                    Return to Schema Editor
                  </Button>
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8 shadow-xs"
                    onClick={() => toast.success('Mock submission verified successfully!')}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    <span>Simulate Submit & Verify</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
