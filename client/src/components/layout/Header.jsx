import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Layers,
  Menu,
  Bell,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Command,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Header({
  variant = 'admin',
  onMenuToggle,
  title,
}) {
  const location = useLocation();

  if (variant === 'public') {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-8.5 w-8.5 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 active:scale-95 transition-transform duration-200">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-foreground">
                Synapse<span className="text-indigo-600">Forms</span>
              </span>
              <Badge variant="purple" className="text-[10px] px-1.5 py-0 font-semibold tracking-wider uppercase">
                v1.0
              </Badge>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
            <a
              href="#features"
              className="hover:text-foreground transition-colors duration-150 py-1"
            >
              Capabilities
            </a>
            <a
              href="#architecture"
              className="hover:text-foreground transition-colors duration-150 py-1"
            >
              Architecture
            </a>
            <a
              href="#verification"
              className="hover:text-foreground transition-colors duration-150 py-1"
            >
              Verification Pipeline
            </a>
            <Link
              to="/admin/forms"
              className="hover:text-foreground transition-colors duration-150 py-1"
            >
              Forms Catalog
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link to="/admin/login">
              <Button variant="ghost" size="sm" className="text-xs h-8">
                Admin Sign In
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button size="sm" className="text-xs h-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs">
                <span>Console</span>
                <ExternalLink className="w-3 h-3 ml-1" />
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
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border/70 bg-background/80 px-4 sm:px-6 backdrop-blur-md transition-colors">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onMenuToggle}
          className="lg:hidden text-muted-foreground"
          aria-label="Toggle menu"
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Breadcrumb Hierarchy */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link
            to="/admin/dashboard"
            className="hover:text-foreground font-medium transition-colors"
          >
            Admin
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <span className="font-semibold text-foreground capitalize tracking-tight">
            {title || currentSection.replace('-', ' ')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Telemetry pill */}
        <div className="hidden sm:flex items-center gap-2">
          <Badge variant="purple" dot className="font-mono text-[10px]">
            Frontend Foundation
          </Badge>
          <Badge variant="success" dot className="font-mono text-[10px]">
            Active
          </Badge>
        </div>

        {/* Quick Public View */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/"
              target="_blank"
              className="hidden md:inline-flex items-center"
            >
              <Button variant="ghost" size="sm" className="text-xs h-7.5 px-2 text-muted-foreground hover:text-foreground">
                <ExternalLink className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
                <span>Site Preview</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Open live public landing view in new tab
          </TooltipContent>
        </Tooltip>

        {/* Notifications */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="relative text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-indigo-600 ring-2 ring-background" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            System Alerts & OCR Queue
          </TooltipContent>
        </Tooltip>

        {/* User profile with DropdownMenu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-2 pl-1 pr-2 hover:bg-muted/60">
              <Avatar className="h-6 w-6 ring-1 ring-border">
                <AvatarFallback className="bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white text-[10px] font-bold">
                  SS
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground leading-none">
                  Shresht Soni
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  Frontend
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 text-xs">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs font-semibold text-foreground">Shresht Soni</p>
                <p className="text-[11px] text-muted-foreground truncate">
                  shresht@synapseforms.org
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin/dashboard" className="cursor-pointer">
                <Layers className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                <span>Admin Console</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/forms/create" className="cursor-pointer">
                <Settings className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                <span>Form Builder</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 cursor-pointer">
              <Link to="/admin/login">
                <LogOut className="mr-2 h-3.5 w-3.5" />
                <span>Sign Out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
