import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Layers,
  Menu,
  Bell,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function Header({
  variant = 'admin',
  onMenuToggle,
  title,
}) {
  const location = useLocation();

  if (variant === 'public') {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Synapse<span className="text-indigo-600">Forms</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                v1.0-alpha
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Platform Features
            </a>
            <a href="#architecture" className="hover:text-indigo-600 transition-colors">
              Architecture
            </a>
            <a href="#verification" className="hover:text-indigo-600 transition-colors">
              Verification Engine
            </a>
            <Link to="/admin/forms" className="hover:text-indigo-600 transition-colors">
              Explore Forms
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/admin/login">
              <Button variant="ghost" size="sm">
                Admin Sign In
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button variant="primary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />} iconPosition="right">
                Admin Console
              </Button>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // Admin Header Variant
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSection = pathParts[1] || 'dashboard';

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link
            to="/admin/dashboard"
            className="hover:text-indigo-600 font-medium transition-colors"
          >
            Admin
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 capitalize">
            {title || currentSection.replace('-', ' ')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2">
          <Badge variant="purple" size="sm" dot>
            Standalone Frontend
          </Badge>
          <Badge variant="success" size="sm">
            Mock Mode
          </Badge>
        </div>

        {/* Action icons */}
        <Link
          to="/"
          target="_blank"
          title="Open Public Portal"
          className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-medium py-1 px-2.5 rounded-md hover:bg-slate-100 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Site</span>
        </Link>

        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>

        {/* User profile capsule */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            SS
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-none">
              Shresht Soni
            </p>
            <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
              Frontend Lead
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
