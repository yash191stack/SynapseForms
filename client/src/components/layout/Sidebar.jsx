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
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
      badgeVariant: 'secondary',
    },
    {
      name: 'Create New Form',
      to: '/admin/forms/create',
      icon: PlusCircle,
      badge: 'Builder',
      badgeVariant: 'purple',
    },
  ];

  const sharedNavItems = [
    {
      name: 'Master Ledger',
      to: '/admin/ledger',
      icon: Database,
      badge: 'Ledger',
      badgeVariant: 'secondary',
    },
    {
      name: 'Submissions',
      to: '/admin/submissions',
      icon: Inbox,
      badge: 'Audit',
      badgeVariant: 'secondary',
    },
    {
      name: 'UI Showcase',
      to: '/admin/showcase',
      icon: Sparkles,
      badge: 'Showcase',
      badgeVariant: 'purple',
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-border/70 bg-card/95 backdrop-blur-md transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="flex h-14 items-center justify-between border-b border-border/70 px-4">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-xs shadow-indigo-500/20 group-hover:scale-105 active:scale-95 transition-transform duration-150">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-sm font-bold text-foreground tracking-tight">
                Synapse<span className="text-indigo-600">Forms</span>
              </span>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                Admin Console
              </p>
            </div>
          </NavLink>

          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="lg:hidden text-muted-foreground"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation list */}
        <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <div className="px-2.5 pb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Core Form Management
              </span>
            </div>
            <nav className="space-y-1">
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
                      `flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-150 active:scale-[0.98] ${
                        isActive
                          ? 'bg-secondary text-foreground font-semibold shadow-2xs'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <Badge variant={item.badgeVariant || 'secondary'} className="text-[10px] h-4.5 px-1.5">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-2.5 pb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Verification & Data
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">Shared</span>
            </div>
            <nav className="space-y-1">
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
                      `flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-150 active:scale-[0.98] ${
                        isActive
                          ? 'bg-secondary text-foreground font-semibold shadow-2xs'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <Badge variant={item.badgeVariant || 'warning'} className="text-[10px] h-4.5 px-1.5">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-2.5 pb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                External & Session
              </span>
            </div>
            <nav className="space-y-1">
              <NavLink
                to="/"
                className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all duration-150 active:scale-[0.98]"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  <span>Public Landing View</span>
                </div>
              </NavLink>
              <NavLink
                to="/admin/login"
                className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-150 active:scale-[0.98]"
              >
                <div className="flex items-center gap-2.5">
                  <LogOut className="h-3.5 w-3.5 shrink-0" />
                  <span>Sign In Screen</span>
                </div>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Sidebar footer badge */}
        <div className="p-3 border-t border-border/70">
          <div className="rounded-lg border border-border/70 bg-card p-3 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5 text-indigo-600" />
                <span className="text-xs font-semibold text-foreground">
                  SynapseForms
                </span>
              </div>
              <Badge variant="purple" className="text-[9px] px-1 h-4">
                shadcn
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Verification Engine v1.0<br />
              Status: Operational
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
