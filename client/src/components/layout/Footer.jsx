import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, CheckCircle2, AlertTriangle, XCircle, Clock, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/60 text-muted-foreground transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand and Description */}
          <div className="md:col-span-2 space-y-3.5">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-7.5 w-7.5 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-2xs group-hover:scale-105 active:scale-95 transition-transform duration-150">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-foreground tracking-tight">
                Synapse<span className="text-indigo-600">Forms</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
              Intelligent Dynamic Forms & Submission Verification Platform. Combining customizable schemas, rule-based field validation, master ledger record matching, and OCR-powered document processing.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <Badge variant="success" dot className="text-[10px]">
                VERIFIED
              </Badge>
              <Badge variant="warning" dot className="text-[10px]">
                FLAGGED
              </Badge>
              <Badge variant="destructive" dot className="text-[10px]">
                INVALID
              </Badge>
              <Badge variant="info" dot className="text-[10px]">
                PENDING
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Application Routes
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors duration-150">
                  Landing Overview
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-foreground transition-colors duration-150">
                  Admin Sign In
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-foreground transition-colors duration-150">
                  Dashboard Telemetry
                </Link>
              </li>
              <li>
                <Link to="/admin/forms" className="hover:text-foreground transition-colors duration-150">
                  Forms Directory
                </Link>
              </li>
              <li>
                <Link to="/admin/forms/create" className="hover:text-foreground transition-colors duration-150">
                  Interactive Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture / Team */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Technical Stack
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
              <li>UI: React 19 + shadcn + Tailwind</li>
              <li>Motion: Emil Kowalski Guidelines</li>
              <li>Backend: Node.js + Express</li>
              <li>OCR Engine: Tesseract.js</li>
              <li>Storage: MongoDB Atlas</li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 opacity-60" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
          <p>© {new Date().getFullYear()} SynapseForms. Built for robust verification.</p>
          <p className="flex items-center gap-1.5 text-[11px]">
            <span>Crafted with</span>
            <span className="font-semibold text-foreground">shadcn/ui</span>
            <span>&</span>
            <span className="font-semibold text-indigo-600">Emil Kowalski Design Principles</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
