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
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export default function FormBuilderPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('BUILDER'); // 'BUILDER' | 'PREVIEW'
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

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
  };

  const removeField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
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
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/admin/forms">
            <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Forms
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Interactive Form Builder
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Configure dynamic fields, attach master ledger validation rules, and activate OCR pipelines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('BUILDER')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'BUILDER'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Schema Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('PREVIEW')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'PREVIEW'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Form Preview</span>
            </button>
          </div>

          <Button
            variant="primary"
            loading={isSaving}
            onClick={handleSaveSchema}
            icon={saveSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          >
            {saveSuccess ? 'Saved to State!' : 'Save Schema'}
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Dynamic schema draft saved successfully. Ready for master ledger validation.</span>
          </div>
          <Badge variant="success">Saved</Badge>
        </div>
      )}

      {activeTab === 'BUILDER' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Form Metadata & Configured Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form General Settings */}
            <Card title="Form Overview & Identity" subtitle="Core metadata displayed to applicants">
              <div className="space-y-4">
                <Input
                  label="Form Title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Merit Scholarship Application 2026"
                  required
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Form Description & Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Provide detailed instructions to users..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </Card>

            {/* Dynamic Fields List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Configured Dynamic Fields ({fields.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Drag or order fields and assign validation rules for the verification pipeline.
                  </p>
                </div>
                <Badge variant="purple">{fields.length} Active</Badge>
              </div>

              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-slate-300 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-slate-100 text-slate-600 font-mono text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Type: {field.type.toUpperCase()}
                      </span>
                      {field.required && (
                        <Badge variant="danger" size="sm">
                          Required
                        </Badge>
                      )}
                      {field.validationRule !== 'NONE' && (
                        <Badge variant="purple" size="sm">
                          Rule: {field.validationRule}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveField(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveField(idx, 1)}
                        disabled={idx === fields.length - 1}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeField(field.id)}
                        className="p-1 rounded text-rose-500 hover:bg-rose-50 cursor-pointer ml-1"
                        title="Delete Field"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Field Label"
                      value={field.label}
                      onChange={(e) => updateField(field.id, 'label', e.target.value)}
                    />

                    <Input
                      label="Placeholder Text"
                      value={field.placeholder || ''}
                      onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Attached Verification Rule
                      </label>
                      <select
                        value={field.validationRule}
                        onChange={(e) => updateField(field.id, 'validationRule', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      >
                        <option value="NONE">Standard Input (No external check)</option>
                        <option value="LEDGER_LOOKUP">Master Ledger Match (Must exist in dataset)</option>
                        <option value="EXACT_MATCH">Exact Ledger Record Value Match</option>
                        <option value="OCR_EXTRACT">OCR Extraction & Cross-Check</option>
                        <option value="REGEX_EMAIL">Institutional Email Regex</option>
                        <option value="NUMERIC">Numeric Range Validation</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4 pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Field is Mandatory</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Palette & Validation Settings */}
          <div className="space-y-6">
            {/* Field Palette */}
            <Card title="Add Field to Schema" subtitle="Click any type to append to your dynamic form">
              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addField('text')}
                  icon={<Type className="w-3.5 h-3.5 text-indigo-600" />}
                  className="justify-start"
                >
                  Text Field
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addField('number')}
                  icon={<Hash className="w-3.5 h-3.5 text-indigo-600" />}
                  className="justify-start"
                >
                  Number
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addField('email')}
                  icon={<AtSign className="w-3.5 h-3.5 text-indigo-600" />}
                  className="justify-start"
                >
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addField('date')}
                  icon={<Calendar className="w-3.5 h-3.5 text-indigo-600" />}
                  className="justify-start"
                >
                  Date Picker
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addField('select')}
                  icon={<ListFilter className="w-3.5 h-3.5 text-indigo-600" />}
                  className="justify-start"
                >
                  Dropdown
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addField('file')}
                  icon={<UploadCloud className="w-3.5 h-3.5 text-indigo-600" />}
                  className="justify-start"
                >
                  OCR Upload
                </Button>
              </div>
            </Card>

            {/* Master Ledger Linkage */}
            <Card
              title="Master Ledger Cross-Check"
              subtitle="Link this form schema to reference datasets"
            >
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Select Reference Dataset
                  </label>
                  <select
                    value={selectedLedger}
                    onChange={(e) => setSelectedLedger(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-medium text-slate-800"
                  >
                    <option value="Student_Merit_Registry_2026.csv">
                      Student_Merit_Registry_2026.csv (4,500 records)
                    </option>
                    <option value="Approved_Vendors_Master.xlsx">
                      Approved_Vendors_Master.xlsx (820 records)
                    </option>
                    <option value="Hostel_Eligibility_List.csv">
                      Hostel_Eligibility_List.csv (1,200 records)
                    </option>
                    <option value="NONE">None (Stand-alone form)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Primary Match Key Column
                  </label>
                  <Input
                    value={ledgerMatchKey}
                    onChange={(e) => setLedgerMatchKey(e.target.value)}
                    placeholder="e.g. roll_number or vendor_tax_id"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Submissions will query this column in the master dataset.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-indigo-600 font-medium">
                  <Link to="/admin/ledger" className="hover:underline flex items-center gap-1">
                    <Database className="w-3.5 h-3.5" />
                    <span>Manage Ledgers (Gauri's module)</span>
                  </Link>
                </div>
              </div>
            </Card>

            {/* OCR Engine Integration */}
            <Card
              title="OCR Document Engine"
              subtitle="Tesseract.js automated text extraction"
            >
              <div className="space-y-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800 select-none">
                  <input
                    type="checkbox"
                    checked={ocrEnabled}
                    onChange={(e) => setOcrEnabled(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Enable Document OCR Text Extraction</span>
                </label>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Extracts raw text, dates, currency amounts, and stamps from PDF and image vouchers for automatic verification.
                </p>
                <Badge variant="purple" size="sm">
                  Powered by Tesseract.js Backend
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* Live Form Preview Tab */
        <div className="max-w-2xl mx-auto">
          <Card
            className="shadow-md border-slate-200"
            headerClassName="bg-slate-50/70"
            title={
              <div className="flex items-center justify-between w-full">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{formTitle}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{formDescription}</p>
                </div>
                <Badge variant="success" dot>
                  Preview Mode
                </Badge>
              </div>
            }
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              {fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  {field.type === 'select' ? (
                    <div>
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1 mb-1">
                        {field.label}
                        {field.required && <span className="text-rose-500 font-bold">*</span>}
                      </label>
                      <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                        {field.options &&
                          field.options.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                      </select>
                    </div>
                  ) : field.type === 'file' ? (
                    <div>
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1 mb-1">
                        {field.label}
                        {field.required && <span className="text-rose-500 font-bold">*</span>}
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                        <UploadCloud className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-slate-800">
                          Click to upload receipt document or drag and drop
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          PNG, JPG, or PDF up to 10MB • Auto OCR Enabled
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Input
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      helperText={field.helpText}
                    />
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('BUILDER')}
                >
                  Return to Schema Editor
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  icon={<ShieldCheck className="w-4 h-4" />}
                >
                  Simulate Submit & Verify
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
