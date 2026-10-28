import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Loader Component
 * Part of SynapseForms Design System.
 * Supports spinner, size variations, textual loading states, inline, and card/screen overlay modes.
 *
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [size='md']
 * @param {'primary' | 'neutral' | 'white'} [variant='primary']
 * @param {string} [label]
 * @param {string} [subtext]
 * @param {boolean} [overlay=false]
 * @param {boolean} [fullScreen=false]
 * @param {boolean} [inline=false]
 * @param {string} [className='']
 */
export default function Loader({
  size = 'md',
  variant = 'primary',
  label,
  subtext,
  overlay = false,
  fullScreen = false,
  inline = false,
  className = '',
  ...props
}) {
  const sizeMap = {
    xs: { icon: 'w-3.5 h-3.5', text: 'text-xs', sub: 'text-[10px]' },
    sm: { icon: 'w-4 h-4', text: 'text-xs', sub: 'text-[11px]' },
    md: { icon: 'w-6 h-6', text: 'text-sm', sub: 'text-xs' },
    lg: { icon: 'w-8 h-8', text: 'text-base', sub: 'text-xs' },
    xl: { icon: 'w-12 h-12', text: 'text-lg', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const variantStyles = {
    primary: 'text-indigo-600',
    neutral: 'text-slate-600 dark:text-slate-300',
    white: 'text-white',
  };

  const content = (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center text-center gap-2 select-none ${
        inline ? 'inline-flex flex-row items-center gap-2' : ''
      } ${className}`}
      {...props}
    >
      <Loader2
        className={`animate-spin shrink-0 ${currentSize.icon} ${
          variantStyles[variant] || variantStyles.primary
        }`}
      />

      {(label || subtext) && (
        <div className={inline ? 'text-left' : 'space-y-0.5'}>
          {label && (
            <p
              className={`font-semibold tracking-tight text-foreground ${currentSize.text}`}
            >
              {label}
            </p>
          )}
          {subtext && (
            <p
              className={`text-muted-foreground ${currentSize.sub}`}
            >
              {subtext}
            </p>
          )}
        </div>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        {content}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/70 backdrop-blur-xs rounded-xl p-4">
        {content}
      </div>
    );
  }

  return content;
}
