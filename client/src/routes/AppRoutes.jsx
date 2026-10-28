import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public pages
import LandingPage from '../pages/public/LandingPage';
import PublicFormPage from '../pages/public/PublicFormPage';

// Admin pages
import LoginPage from '../pages/admin/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import FormsPage from '../pages/admin/FormsPage';
import FormBuilderPage from '../pages/admin/FormBuilderPage';
import MasterLedgerPage from '../pages/admin/MasterLedgerPage';
import SubmissionsPage from '../pages/admin/SubmissionsPage';
import SubmissionDetailsPage from '../pages/admin/SubmissionDetailsPage';
import ComponentShowcasePage from '../pages/admin/ComponentShowcasePage';

// 404 NotFound
import { Button } from '@/components/ui/button';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background text-foreground">
      <div className="text-6xl font-black text-indigo-600 font-mono mb-2">404</div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Page Not Found</h1>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mb-6">
        The route you requested does not exist in the SynapseForms application.
      </p>
      <Link to="/">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Return to Homepage</Button>
      </Link>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Layout Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        {/* Support both /form/:formId and legacy /forms/:formId */}
        <Route path="/form/:formId" element={<PublicFormPage />} />
        <Route path="/forms/:formId" element={<PublicFormPage />} />
        <Route path="/showcase" element={<ComponentShowcasePage />} />
      </Route>

      {/* Standalone Admin Auth Route */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Admin Dashboard Protected Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="forms/create" element={<FormBuilderPage />} />

        {/* Master Ledger and Submissions routes (Assigned to Gauri Upadhyay) */}
        <Route path="ledger" element={<MasterLedgerPage />} />
        <Route path="submissions" element={<SubmissionsPage />} />
        <Route path="submissions/:id" element={<SubmissionDetailsPage />} />

        {/* UI Design System Showcase */}
        <Route path="showcase" element={<ComponentShowcasePage />} />
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
