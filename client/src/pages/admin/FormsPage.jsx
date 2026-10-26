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
  ScanText,
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

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

  const handleCopyLink = (formId) => {
    toast.success(`Copied public link for ${formId}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Forms Directory
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your dynamic schemas, attach master datasets, and configure verification pipelines.
          </p>
        </div>

        <Link to="/admin/forms/create">
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8 shadow-xs">
            <PlusCircle className="w-3.5 h-3.5 mr-1" />
            <span>Create New Form</span>
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:flex-1 relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search forms by title, ledger dataset, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        {/* shadcn Tabs for status filter */}
        <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="self-start sm:self-auto">
          <TabsList className="h-9 p-1">
            <TabsTrigger value="ALL" className="text-xs px-3">
              All Forms
            </TabsTrigger>
            <TabsTrigger value="ACTIVE" className="text-xs px-3">
              Active ({initialForms.filter((f) => f.status === 'Active').length})
            </TabsTrigger>
            <TabsTrigger value="DRAFT" className="text-xs px-3">
              Drafts ({initialForms.filter((f) => f.status === 'Draft').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredForms.map((form) => (
          <Card
            key={form.id}
            className="flex flex-col justify-between border-border/70 hover:shadow-md hover:border-border transition-all duration-200"
          >
            <div>
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between mb-1">
                  <Badge
                    variant={form.status === 'Active' ? 'success' : 'secondary'}
                    dot={form.status === 'Active'}
                    className="text-[10px]"
                  >
                    {form.status}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {form.lastUpdated}
                  </span>
                </div>
                <CardTitle className="text-sm font-bold text-foreground leading-snug line-clamp-1">
                  {form.title}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-1">
                  {form.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 pt-2">
                <div className="space-y-2 pt-2 border-t border-border/60 text-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px]">Fields</span>
                    <span className="font-semibold text-foreground">{form.fieldsCount} dynamic fields</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px]">Submissions</span>
                    <span className="font-semibold text-foreground font-mono">{form.submissionsCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px]">Ledger Dataset</span>
                    <span className="font-medium text-indigo-600 truncate max-w-[170px]" title={form.ledger}>
                      {form.ledger}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px]">OCR Engine</span>
                    <span className="font-medium text-foreground">
                      {form.ocrRequired ? 'Enabled (Tesseract)' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>

            <CardFooter className="p-5 pt-0 border-t border-border/60 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyLink(form.id)}
                className="text-xs h-7.5 px-2 text-muted-foreground hover:text-foreground"
              >
                <Copy className="w-3 h-3 mr-1" />
                <span>Link</span>
              </Button>

              <div className="flex items-center gap-2">
                <Link to={`/admin/forms/create?edit=${form.id}`}>
                  <Button variant="outline" size="sm" className="text-xs h-7.5 px-2.5">
                    <Edit3 className="w-3 h-3 mr-1" />
                    <span>Edit</span>
                  </Button>
                </Link>
                <Link to="/admin/submissions">
                  <Button variant="secondary" size="sm" className="text-xs h-7.5 px-2.5">
                    Submissions
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <Card className="border-dashed border-2 border-border p-12 text-center bg-card/50">
          <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-foreground">No forms match your search</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search query or reset the filter to view all available dynamic forms.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 text-xs h-8"
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('ALL');
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  );
}
