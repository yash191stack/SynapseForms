import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Database,
  Inbox,
  Layers,
  ExternalLink,
  LogOut,
  X,
  Code2,
} from 'lucide-react';
import Badge from '../common/Badge';

export default function Sidebar({ isOpen, onClose }) {
  const primaryNavItems = [
    {
      name: 'Dashboard',
      to: '/admin/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Forms Directory',
      to: '/admin/forms',
      icon: FileText,
      badge: '5 Active',
    },
    {
      name: 'Create New Form',
      to: '/admin/forms/create',
      icon: PlusCircle,
      badge: 'Builder',
    },
  ];

  const sharedNavItems = [
    {
      name: 'Master Ledger',
      to: '/admin/ledger',
      icon: Database,
      badge: 'Gauri',
      badgeVariant: 'warning',
    },
    {
      name: 'Submissions',
      to: '/admin/submissions',
      icon: Inbox,
      badge: 'Gauri',
      badgeVariant: 'warning',
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                Synapse<span className="text-indigo-600">Forms</span>
              </span>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Admin Console
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex flex-1 flex-col overflow-y-auto px-3.5 py-4 space-y-6">
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Form Management
            </p>
            <nav className="mt-2 space-y-1">
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-slate-700" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="purple" size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="flex items-center justify-between px-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Verification & Data
              </p>
              <span className="text-[10px] text-slate-400 font-mono">Shared</span>
            </div>
            <nav className="mt-2 space-y-1">
              {sharedNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-slate-500" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <Badge variant={item.badgeVariant || 'neutral'} size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              System & Navigation
            </p>
            <nav className="mt-2 space-y-1">
              <NavLink
                to="/"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="h-4 w-4 shrink-0 text-slate-500" />
                  <span>Public Landing Page</span>
                </div>
              </NavLink>
              <NavLink
                to="/admin/login"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <LogOut className="h-4 w-4 shrink-0 text-slate-500" />
                  <span>Sign In Screen</span>
                </div>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="border-t border-slate-200 p-3.5 bg-slate-50/50">
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Code2 className="h-3.5 w-3.5 text-indigo-600" />
              <span className="text-xs font-semibold text-slate-800">
                Frontend Foundation
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Assigned: Shresht Soni<br />
              Partner: Gauri Upadhyay
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
