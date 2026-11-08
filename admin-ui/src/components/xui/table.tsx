import clsx from 'clsx'
import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return <table className={clsx('w-full border-collapse text-[13px]', className)}>{children}</table>
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="sticky top-0 z-10 bg-background">{children}</thead>
}

export function Th({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={clsx(
        'whitespace-nowrap border-b border-border px-3 py-2 text-left font-mono text-[11px] font-normal uppercase tracking-wider text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

export function TRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={clsx('group border-b border-border/60 transition-colors hover:bg-secondary/60', className)} {...props} />
}

export function Td({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={clsx('px-3 py-1.5 align-middle', className)} {...props} />
}
