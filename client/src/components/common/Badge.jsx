import React from 'react';

/**
 * Common Badge Component
 * Part of SynapseForms Design System.
 * Supports Success, Warning, Danger, Neutral, Info, Purple, and Default variants.
 *
 * @param {'default' | 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'purple'} [variant='default']
 * @param {'sm' | 'md' | 'lg'} [size='sm']
 * @param {boolean} [dot=false]
 * @param {React.ReactNode} [icon=null]
 * @param {string} [className='']
 * @param {React.ReactNode} children
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  icon = null,
  className = '',
  ...props
}) {
  let normalizedVariant = variant;
  if (typeof children === 'string') {
    const textUpper = children.toUpperCase();
    if (textUpper === 'VERIFIED') normalizedVariant = 'success';
    else if (textUpper === 'FLAGGED') normalizedVariant = 'warning';
    else if (textUpper === 'INVALID') normalizedVariant = 'danger';
    else if (textUpper === 'PENDING') normalizedVariant = 'info';
  }

  const variantStyles = {
    default:
      'bg-muted/70 text-muted-foreground border-border/80 dark:bg-muted/40',
    neutral:
      'bg-slate-100 text-slate-700 border-slate-200/90 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700',
    success:
      'bg-emerald-50 text-emerald-700 border-emerald-200/90 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    warning:
      'bg-amber-50 text-amber-800 border-amber-200/90 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    danger:
      'bg-rose-50 text-rose-700 border-rose-200/90 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    info:
      'bg-sky-50 text-sky-700 border-sky-200/90 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
    purple:
      'bg-indigo-50 text-indigo-700 border-indigo-200/90 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
  };

  const dotColors = {
    default: 'bg-muted-foreground',
    neutral: 'bg-slate-400',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    purple: 'bg-indigo-500',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const resolvedVariant = variantStyles[normalizedVariant] || variantStyles.default;
  const resolvedDot = dotColors[normalizedVariant] || dotColors.default;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border select-none transition-colors duration-150 ${
        sizeStyles[size] || sizeStyles.sm
      } ${resolvedVariant} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${resolvedDot}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
