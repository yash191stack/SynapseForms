import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Database,
  ShieldCheck,
  MoreVertical,
  Copy,
  Trash2,
  Edit3,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export default function FormsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const initialForms = [
    {
      id: 'form-101',
      title: 'Merit Scholarship Application 2026',
      description:
        'Verification of collegiate academic merit, income certificates, and bank fee receipts against master roll sheets.',
      status: 'Active',
      fieldsCount: 8,
      submissionsCount: 642,
      ledger: 'Student_Merit_Registry_2026.csv',
      ocrRequired: true,
      lastUpdated: 'Oct 24, 2026',
    },
    {
      id: 'form-102',
      title: 'Vendor Onboarding & GST Validation',
      description:
        'Procurement onboarding form with dynamic GST verification and automated tax clearance document extraction.',
      status: 'Active',
      fieldsCount: 12,
      submissionsCount: 189,
      ledger: 'Approved_Vendors_Master.xlsx',
      ocrRequired: true,
      lastUpdated: 'Oct 22, 2026',
    },
    {
      id: 'form-103',
      title: 'Annual Campus Hostel Grant',
      description:
        'Room allocation and financial aid application for residential campus students.',
      status: 'Active',
      fieldsCount: 6,
      submissionsCount: 421,
      ledger: 'Hostel_Eligibility_List.csv',
      ocrRequired: false,
      lastUpdated: 'Oct 19, 2026',
    },
    {
      id: 'form-104',
      title: 'Employee Travel Expense Reimbursement',
      description:
        'Internal company expense claim with receipt invoice OCR matching against corporate credit statements.',
      status: 'Active',
      fieldsCount: 7,
      submissionsCount: 230,
      ledger: 'HR_Employee_Database.csv',
      ocrRequired: true,
      lastUpdated: 'Oct 15, 2026',
    },
    {
      id: 'form-105',
      title: 'International Student Visa Clearance',
      description:
        'Draft schema for foreign student passport verification and embassy sponsorship clearance.',
      status: 'Draft',
      fieldsCount: 5,
      submissionsCount: 0,
      ledger: 'Pending Configuration',
      ocrRequired: true,
      lastUpdated: 'Yesterday',
    },
  ];

  const filteredForms = initialForms.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.ledger.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === 'ALL') return matchesSearch;
    if (selectedFilter === 'ACTIVE') return matchesSearch && f.status === 'Active';
    if (selectedFilter === 'DRAFT') return matchesSearch && f.status === 'Draft';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Forms Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your dynamic schemas, attach master datasets, and configure verification pipelines.
          </p>
        </div>

        <Link to="/admin/forms/create">
          <Button
            variant="primary"
            icon={<PlusCircle className="w-4 h-4" />}
          >
            Create New Form
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:flex-1">
          <Input
            placeholder="Search forms by title, ledger dataset, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-lg border border-slate-200">
          {['ALL', 'ACTIVE', 'DRAFT'].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredForms.map((form) => (
          <Card
            key={form.id}
            hover
            className="flex flex-col justify-between"
            headerClassName="pb-3"
            title={
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-slate-900 text-sm line-clamp-1">
                  {form.title}
                </span>
              </div>
            }
            action={
              <Badge
                variant={form.status === 'Active' ? 'success' : 'neutral'}
                dot={form.status === 'Active'}
              >
                {form.status}
              </Badge>
            }
            footer={
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Updated {form.lastUpdated}</span>
                <div className="flex items-center gap-2">
                  <Link to={`/admin/forms/create?edit=${form.id}`}>
                    <Button variant="ghost" size="sm" icon={<Edit3 className="w-3 h-3" />}>
                      Edit
                    </Button>
                  </Link>
                  <Link to="/admin/submissions">
                    <Button variant="outline" size="sm">
                      Submissions
                    </Button>
                  </Link>
                </div>
              </div>
            }
          >
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
              {form.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Configured Fields</span>
                <span className="font-semibold text-slate-800">{form.fieldsCount} dynamic fields</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Submissions</span>
                <span className="font-semibold text-slate-800 font-mono">{form.submissionsCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Ledger Reference</span>
                <span className="font-medium text-indigo-600 truncate max-w-[180px]" title={form.ledger}>
                  {form.ledger}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">OCR Processing</span>
                <span className="font-medium text-slate-700">
                  {form.ocrRequired ? 'Enabled (Tesseract)' : 'Disabled'}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center bg-white">
          <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">No forms match your search</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or reset the filter to view all available forms.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('ALL');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
