import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Common Button Component
 * Part of SynapseForms Design System.
 *
 * Supports:
 * - Variants: Primary, Secondary, Outline, Danger, Success, Ghost
 * - States: Default, Hover, Active, Disabled, Loading
 * - Sizes: sm, md, lg
 * - Full width option
 * - Prefix/suffix icons
 *
 * @param {'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'success'} [variant='primary']
 * @param {'sm' | 'md' | 'lg'} [size='md']
 * @param {boolean} [loading=false]
 * @param {boolean} [disabled=false]
 * @param {React.ReactNode} [icon=null]
 * @param {'left' | 'right'} [iconPosition='left']
 * @param {boolean} [fullWidth=false]
 * @param {string} [className='']
 * @param {'button' | 'submit' | 'reset'} [type='button']
 * @param {React.ReactNode} children
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon = null,
    iconPosition = 'left',
    fullWidth = false,
    className = '',
    type = 'button',
    onClick,
    ...props
  },
  ref
) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs hover:shadow-xs focus-visible:ring-indigo-500 active:bg-indigo-800',
    secondary:
      'bg-secondary hover:bg-secondary/80 text-foreground border border-border/80 focus-visible:ring-ring active:bg-secondary/60',
    outline:
      'bg-transparent hover:bg-muted/60 text-foreground border border-border/80 focus-visible:ring-indigo-500',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-2xs focus-visible:ring-rose-500 active:bg-rose-800',
    success:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs focus-visible:ring-emerald-500 active:bg-emerald-800',
    ghost:
      'bg-transparent hover:bg-muted/60 text-muted-foreground hover:text-foreground focus-visible:ring-ring',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${widthStyle} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : icon && iconPosition === 'left' ? (
        <span className="shrink-0">{icon}</span>
      ) : null}

      {children && <span>{children}</span>}

      {!loading && icon && iconPosition === 'right' ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
    </button>
  );
});

export default Button;
