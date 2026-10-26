import React from 'react';

/**
 * Common Badge Component
 * Also supports SynapseForms verification states (VERIFIED, FLAGGED, INVALID, PENDING).
 * Designed for ease of extension by Gauri Upadhyay's UI Design System.
 *
 * @param {'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neutral'} [variant='default']
 * @param {'sm' | 'md'} [size='sm']
 * @param {boolean} [dot=false]
 * @param {React.ReactNode} [icon=null]
 * @param {string} [className='']
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
  // Normalize verification state names if passed as variant or content
  let normalizedVariant = variant;
  if (typeof children === 'string') {
    const textUpper = children.toUpperCase();
    if (textUpper === 'VERIFIED') normalizedVariant = 'success';
    else if (textUpper === 'FLAGGED') normalizedVariant = 'warning';
    else if (textUpper === 'INVALID') normalizedVariant = 'danger';
    else if (textUpper === 'PENDING') normalizedVariant = 'info';
  }

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    purple: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  const dotColors = {
    default: 'bg-slate-400',
    neutral: 'bg-slate-400',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    purple: 'bg-indigo-500',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-sm px-2.5 py-1 gap-1.5',
  };

  const resolvedVariant = variantStyles[normalizedVariant] || variantStyles.default;
  const resolvedDot = dotColors[normalizedVariant] || dotColors.default;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${resolvedVariant} ${
        sizeStyles[size] || sizeStyles.sm
      } ${className}`}
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
