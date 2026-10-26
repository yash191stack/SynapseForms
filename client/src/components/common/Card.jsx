import React from 'react';

/**
 * Common Card Component
 * Designed for ease of extension by Gauri Upadhyay's UI Design System.
 *
 * @param {React.ReactNode} [title]
 * @param {React.ReactNode} [subtitle]
 * @param {React.ReactNode} [action]
 * @param {React.ReactNode} [footer]
 * @param {boolean} [hover=false]
 * @param {string} [className='']
 * @param {string} [headerClassName='']
 * @param {string} [bodyClassName='']
 * @param {string} [footerClassName='']
 */
export default function Card({
  title,
  subtitle,
  action,
  children,
  footer,
  hover = false,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  ...props
}) {
  const hasHeader = title || subtitle || action;

  return (
    <div
      className={`rounded-xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 ${
        hover ? 'hover:shadow-md hover:border-slate-300' : ''
      } ${className}`}
      {...props}
    >
      {hasHeader && (
        <div
          className={`flex items-start justify-between border-b border-slate-100 px-6 py-4.5 ${headerClassName}`}
        >
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          {action && <div className="ml-4 shrink-0">{action}</div>}
        </div>
      )}

      <div className={`p-6 ${bodyClassName}`}>{children}</div>

      {footer && (
        <div
          className={`border-t border-slate-100 bg-slate-50/60 px-6 py-3.5 rounded-b-xl ${footerClassName}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
