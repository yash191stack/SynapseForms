import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

/**
 * Modal Component
 * Part of SynapseForms Design System.
 *
 * @param {boolean} isOpen - Controls visibility
 * @param {() => void} onClose - Callback when close requested
 * @param {React.ReactNode} [title] - Header title
 * @param {React.ReactNode} [description] - Header subtitle
 * @param {React.ReactNode} [footer] - Action buttons
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'} [size='md']
 * @param {boolean} [closeOnOverlayClick=true]
 * @param {boolean} [closeOnEsc=true]
 * @param {boolean} [showCloseButton=true]
 * @param {string} [className='']
 * @param {React.ReactNode} children
 */
export default function Modal({
  isOpen = false,
  open, // alternative prop name
  onClose,
  title,
  description,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
  children,
}) {
  const visible = isOpen ?? open ?? false;

  // Handle ESC key
  const handleKeyDown = useCallback(
    (e) => {
      if (closeOnEsc && e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [visible, handleKeyDown]);

  if (!visible) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
    '2xl': 'max-w-5xl',
    full: 'max-w-[95vw]',
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && onClose) {
      onClose();
    }
  };

  const hasHeader = Boolean(title || description || showCloseButton);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-foreground/20 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
    >
      <div
        className={`relative w-full ${
          sizeClasses[size] || sizeClasses.md
        } rounded-xl sm:rounded-2xl border border-border/80 bg-card text-card-foreground shadow-2xl transition-all max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {hasHeader && (
          <div className="flex items-start justify-between border-b border-border/70 px-5 sm:px-6 py-4 shrink-0 bg-muted/20">
            <div>
              {title && (
                <h3
                  id="modal-title"
                  className="text-base sm:text-lg font-bold text-foreground tracking-tight"
                >
                  {title}
                </h3>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="mt-0.5 text-xs text-muted-foreground leading-relaxed"
                >
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="ml-3 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-2.5 border-t border-border/70 px-5 sm:px-6 py-3.5 bg-muted/30 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-components for flexible composition
Modal.Header = function ModalHeader({ children, className = '' }) {
  return (
    <div
      className={`border-b border-border/70 px-5 sm:px-6 py-4 shrink-0 bg-muted/20 ${className}`}
    >
      {children}
    </div>
  );
};

Modal.Body = function ModalBody({ children, className = '' }) {
  return (
    <div className={`p-5 sm:px-6 overflow-y-auto flex-1 ${className}`}>
      {children}
    </div>
  );
};

Modal.Footer = function ModalFooter({ children, className = '' }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-end gap-2.5 border-t border-border/70 px-5 sm:px-6 py-3.5 bg-muted/30 shrink-0 ${className}`}
    >
      {children}
    </div>
  );
};
