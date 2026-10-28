import React from 'react';

/**
 * Common Card Component
 * Part of SynapseForms Design System.
 * Supports both props-based and compound sub-components.
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
 * @param {React.ReactNode} children
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
      className={`rounded-xl border border-border/80 bg-card text-card-foreground shadow-2xs transition-all duration-200 ${
        hover ? 'hover:shadow-md hover:border-border' : ''
      } ${className}`}
      {...props}
    >
      {hasHeader && (
        <div
          className={`flex items-start justify-between border-b border-border/70 px-5 sm:px-6 py-4 ${headerClassName}`}
        >
          <div>
            {title && (
              <h3 className="text-sm sm:text-base font-semibold text-foreground tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {action && <div className="ml-4 shrink-0">{action}</div>}
        </div>
      )}

      {hasHeader || footer ? (
        <div className={`p-5 sm:p-6 ${bodyClassName}`}>{children}</div>
      ) : (
        children
      )}

      {footer && (
        <div
          className={`border-t border-border/70 bg-muted/20 px-5 sm:px-6 py-3.5 rounded-b-xl ${footerClassName}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

// Compound component attachments
Card.Header = function CardHeader({ children, className = '', ...props }) {
  return (
    <div
      className={`flex items-start justify-between border-b border-border/70 px-5 sm:px-6 py-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ children, className = '', ...props }) {
  return (
    <h3
      className={`text-sm sm:text-base font-semibold text-foreground tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

Card.Description = function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`mt-0.5 text-xs text-muted-foreground ${className}`} {...props}>
      {children}
    </p>
  );
};

Card.Content = function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-5 sm:p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className = '', ...props }) {
  return (
    <div
      className={`border-t border-border/70 bg-muted/20 px-5 sm:px-6 py-3.5 rounded-b-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
