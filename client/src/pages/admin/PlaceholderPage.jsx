import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Inbox, FileText, Sparkles, ArrowLeft, Layers, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function PlaceholderPage({ title, description, moduleName, assignedTo = 'Gauri Upadhyay' }) {
  const location = useLocation();

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="text-center p-8 border-dashed border-2 border-border/80 bg-card/60">
        <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3.5">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="flex justify-center mb-2">
          <Badge variant="warning" className="text-xs">
            Assigned to: {assignedTo}
          </Badge>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          {title || 'Upcoming Module'}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {description ||
            'This page is part of the second frontend phase (UI Design System & Ledger/Submission workflows) assigned to Gauri Upadhyay.'}
        </p>

        <div className="mt-6 p-4 rounded-lg bg-muted/40 border border-border/60 text-left max-w-md mx-auto space-y-2 text-xs">
          <div className="flex items-center justify-between text-muted-foreground font-mono">
            <span>Route Path:</span>
            <span className="font-semibold text-foreground">{location.pathname}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground font-mono">
            <span>Design System:</span>
            <span className="text-indigo-600 font-semibold">shadcn/ui + Emil Tokens Ready</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground font-mono">
            <span>Backend Integration:</span>
            <span className="text-emerald-600 font-semibold">Ready (`server/` endpoints)</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2.5">
          <Link to="/admin/dashboard">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <Link to="/admin/forms">
            <Button variant="outline" size="sm" className="text-xs h-8">
              <span>View Active Forms</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
