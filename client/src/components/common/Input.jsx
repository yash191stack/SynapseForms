import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Common Input Component
 * Part of SynapseForms Design System.
 *
 * Supports:
 * - Types: text, email, password (with show/hide toggle), number, etc.
 * - Labels, required markers
 * - Helper text
 * - Error states
 * - Disabled states
 * - Leading icons
 *
 * @param {string} [label]
 * @param {string} [error]
 * @param {string} [helperText]
 * @param {React.ReactNode} [icon]
 * @param {boolean} [required=false]
 * @param {string} [type='text']
 * @param {string} [id]
 * @param {string} [className='']
 */
const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    icon = null,
    required = false,
    type = 'text',
    id,
    className = '',
    disabled = false,
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const generatedId =
    id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={generatedId}
          className="text-xs font-semibold text-foreground/80 tracking-wide flex items-center gap-1 select-none"
        >
          {label}
          {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 pointer-events-none text-muted-foreground flex items-center justify-center">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          id={generatedId}
          type={effectiveType}
          disabled={disabled}
          className={`w-full rounded-lg border bg-background px-3.5 py-2 text-xs sm:text-sm text-foreground transition-all duration-150 placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 disabled:bg-muted/50 disabled:text-muted-foreground disabled:cursor-not-allowed ${
            icon ? 'pl-9 sm:pl-10' : ''
          } ${isPassword ? 'pr-10' : ''} ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-border/80 hover:border-border focus:border-indigo-600 focus:ring-indigo-500/20 shadow-2xs'
          }`}
          {...props}
        />

        {isPassword && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 text-muted-foreground hover:text-foreground focus:outline-none transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Input;
