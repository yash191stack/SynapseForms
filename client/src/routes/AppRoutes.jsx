import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public pages
import LandingPage from '../pages/public/LandingPage';

// Admin pages
import LoginPage from '../pages/admin/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import FormsPage from '../pages/admin/FormsPage';
import FormBuilderPage from '../pages/admin/FormBuilderPage';
import PlaceholderPage from '../pages/admin/PlaceholderPage';

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
        <Route
          path="/forms/:formId"
          element={
            <PlaceholderPage
              title="Public Form View"
              description="End-user responsive form answering and document upload interface. Assigned to Gauri Upadhyay."
              moduleName="Public Form"
            />
          }
        />
      </Route>

      {/* Standalone Admin Auth Route */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Admin Dashboard Protected Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="forms/create" element={<FormBuilderPage />} />

        {/* Coordination with Gauri: Ledger and Submissions routes */}
        <Route
          path="ledger"
          element={
            <PlaceholderPage
              title="Master Ledger Module"
              description="CSV / Excel reference dataset management, record mapping, and schema matching engine. Assigned to Gauri Upadhyay."
              moduleName="Master Ledger"
            />
          }
        />
        <Route
          path="submissions"
          element={
            <PlaceholderPage
              title="Submissions Listing & Review"
              description="Full verification queue with OCR confidence filtering, status triage, and batch approval. Assigned to Gauri Upadhyay."
              moduleName="Submissions Listing"
            />
          }
        />
        <Route
          path="submissions/:id"
          element={
            <PlaceholderPage
              title="Submission Audit Details"
              description="Deep-dive comparison between form inputs, OCR extracted tokens, and master ledger rows. Assigned to Gauri Upadhyay."
              moduleName="Submission Details"
            />
          }
        />
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
