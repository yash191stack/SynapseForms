import React from 'react';

/**
 * Common Input Component
 * Designed for ease of extension by Gauri Upadhyay's UI Design System.
 *
 * @param {string} [label]
 * @param {string} [error]
 * @param {string} [helperText]
 * @param {React.ReactNode} [icon]
 * @param {boolean} [required=false]
 * @param {string} [id]
 * @param {string} [className='']
 */
export default function Input({
  label,
  error,
  helperText,
  icon = null,
  required = false,
  id,
  className = '',
  disabled = false,
  ...props
}) {
  const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={generatedId}
          className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1"
        >
          {label}
          {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 pointer-events-none text-slate-400">
            {icon}
          </div>
        )}

        <input
          id={generatedId}
          disabled={disabled}
          className={`w-full rounded-lg border bg-white px-3.5 py-2 text-sm text-slate-900 transition-colors duration-150 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
              : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 hover:border-slate-400'
          }`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
