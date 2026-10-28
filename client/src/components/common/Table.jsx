import React from 'react';
import { Inbox } from 'lucide-react';
import Loader from './Loader';

/**
 * Table Component
 * Part of SynapseForms Design System.
 * Supports declarative columns/data or compound components, empty state, and responsive overflow.
 *
 * @param {Array<{ key: string, header: React.ReactNode, render?: (val: any, row: any, index: number) => React.ReactNode, align?: 'left'|'center'|'right', className?: string }>} [columns]
 * @param {Array<any>} [data]
 * @param {string} [keyField='id']
 * @param {boolean} [loading=false]
 * @param {React.ReactNode} [emptyState]
 * @param {string} [emptyTitle='No records found']
 * @param {string} [emptyMessage='There are no items to display at this time.']
 * @param {(row: any, index: number) => void} [onRowClick]
 * @param {string} [className='']
 * @param {React.ReactNode} [children]
 */
export default function Table({
  columns,
  data,
  keyField = 'id',
  loading = false,
  emptyState,
  emptyTitle = 'No records found',
  emptyMessage = 'There are no items to display in this view.',
  onRowClick,
  className = '',
  children,
  ...props
}) {
  // If children are provided, render as container for compound table components
  if (children) {
    return (
      <div className={`w-full overflow-hidden rounded-xl border border-border/80 bg-card shadow-2xs ${className}`}>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground border-collapse" {...props}>
            {children}
          </table>
        </div>
      </div>
    );
  }

  const isEmpty = !data || data.length === 0;

  return (
    <div className={`w-full overflow-hidden rounded-xl border border-border/80 bg-card shadow-2xs ${className}`}>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs text-foreground border-collapse" {...props}>
          {columns && (
            <thead className="bg-muted/40 border-b border-border/70 text-muted-foreground uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                {columns.map((col, idx) => {
                  const alignClass =
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left';

                  return (
                    <th
                      key={col.key || idx}
                      scope="col"
                      className={`px-4 sm:px-5 py-3 font-semibold select-none ${alignClass} ${col.className || ''}`}
                    >
                      {col.header}
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}

          <tbody className="divide-y divide-border/60 bg-card">
            {loading ? (
              <tr>
                <td
                  colSpan={columns?.length || 1}
                  className="px-6 py-12 text-center"
                >
                  <Loader
                    size="md"
                    label="Loading records..."
                    subtext="Synchronizing verification dataset"
                  />
                </td>
              </tr>
            ) : isEmpty ? (
              <tr>
                <td
                  colSpan={columns?.length || 1}
                  className="px-6 py-12 text-center"
                >
                  {emptyState || (
                    <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                      <div className="h-10 w-10 rounded-xl bg-muted/60 text-muted-foreground flex items-center justify-center mb-3">
                        <Inbox className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {emptyTitle}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {emptyMessage}
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => {
                const rowKey = row[keyField] ?? rowIdx;
                const isClickable = Boolean(onRowClick);

                return (
                  <tr
                    key={rowKey}
                    onClick={isClickable ? () => onRowClick(row, rowIdx) : undefined}
                    className={`transition-colors duration-150 ${
                      isClickable
                        ? 'cursor-pointer hover:bg-muted/50 active:bg-muted/70'
                        : 'hover:bg-muted/30'
                    }`}
                  >
                    {columns?.map((col, colIdx) => {
                      const alignClass =
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left';

                      const rawVal = row[col.key];
                      const rendered = col.render
                        ? col.render(rawVal, row, rowIdx)
                        : rawVal ?? '—';

                      return (
                        <td
                          key={col.key || colIdx}
                          className={`px-4 sm:px-5 py-3.5 align-middle ${alignClass} ${col.cellClassName || ''}`}
                        >
                          {rendered}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Compound components for custom table layouts
Table.Header = function TableHeader({ children, className = '' }) {
  return (
    <thead
      className={`bg-muted/40 border-b border-border/70 text-muted-foreground uppercase tracking-wider font-semibold text-[11px] ${className}`}
    >
      {children}
    </thead>
  );
};

Table.Head = function TableHead({ children, className = '', align = 'left', ...props }) {
  const alignClass =
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
  return (
    <th
      scope="col"
      className={`px-4 sm:px-5 py-3 font-semibold select-none ${alignClass} ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};

Table.Body = function TableBody({ children, className = '' }) {
  return (
    <tbody className={`divide-y divide-border/60 bg-card ${className}`}>
      {children}
    </tbody>
  );
};

Table.Row = function TableRow({ children, className = '', isClickable = false, ...props }) {
  return (
    <tr
      className={`transition-colors duration-150 ${
        isClickable ? 'cursor-pointer hover:bg-muted/50' : 'hover:bg-muted/30'
      } ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

Table.Cell = function TableCell({ children, className = '', align = 'left', ...props }) {
  const alignClass =
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
  return (
    <td
      className={`px-4 sm:px-5 py-3.5 align-middle ${alignClass} ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};

Table.Empty = function TableEmpty({
  title = 'No records found',
  message = 'There are no items to display at this time.',
  colSpan = 1,
  className = '',
}) {
  return (
    <tr>
      <td colSpan={colSpan} className={`px-6 py-12 text-center ${className}`}>
        <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto">
          <div className="h-10 w-10 rounded-xl bg-muted/60 text-muted-foreground flex items-center justify-center mb-3">
            <Inbox className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>
      </td>
    </tr>
  );
};
