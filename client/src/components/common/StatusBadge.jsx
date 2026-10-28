import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

/**
 * StatusBadge Component
 * Displays standardized verification status badges for SynapseForms audit pipeline.
 *
 * Supported statuses:
 * - VERIFIED: Green / CheckCircle2
 * - FLAGGED: Amber / AlertTriangle
 * - INVALID: Rose / XCircle
 * - PENDING: Sky / Clock
 *
 * @param {'VERIFIED' | 'FLAGGED' | 'INVALID' | 'PENDING' | string} status
 * @param {'sm' | 'md' | 'lg'} [size='sm']
 * @param {boolean} [showIcon=true]
 * @param {boolean} [pulse=false]
 * @param {string} [className='']
 * @param {React.ReactNode} [children]
 */
export default function StatusBadge({
  status = 'PENDING',
  size = 'sm',
  showIcon = true,
  pulse = false,
  className = '',
  children,
  ...props
}) {
  const normalized = String(status || '').trim().toUpperCase();

  const configs = {
    VERIFIED: {
      label: 'Verified',
      icon: CheckCircle2,
      styles:
        'bg-emerald-50 text-emerald-700 border-emerald-200/90 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
      dotColor: 'bg-emerald-500',
    },
    FLAGGED: {
      label: 'Flagged',
      icon: AlertTriangle,
      styles:
        'bg-amber-50 text-amber-700 border-amber-200/90 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
      dotColor: 'bg-amber-500',
    },
    INVALID: {
      label: 'Invalid',
      icon: XCircle,
      styles:
        'bg-rose-50 text-rose-700 border-rose-200/90 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
      dotColor: 'bg-rose-500',
    },
    PENDING: {
      label: 'Pending',
      icon: Clock,
      styles:
        'bg-sky-50 text-sky-700 border-sky-200/90 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
      dotColor: 'bg-sky-500',
    },
  };

  const config = configs[normalized] || configs.PENDING;
  const IconComponent = config.icon;
  const displayLabel = children || config.label;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs font-mono tracking-tight transition-colors duration-150 select-none ${
        sizeClasses[size] || sizeClasses.sm
      } ${config.styles} ${className}`}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 mr-0.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dotColor}`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${config.dotColor}`}
          />
        </span>
      )}

      {showIcon && !pulse && (
        <IconComponent
          className={`shrink-0 ${iconSizes[size] || iconSizes.sm}`}
          aria-hidden="true"
        />
      )}

      <span>{displayLabel}</span>
    </span>
  );
}
