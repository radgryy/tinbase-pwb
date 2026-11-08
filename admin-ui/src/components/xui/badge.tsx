import type { ReactNode } from 'react'

export type BadgeVariant = 'neutral' | 'brand' | 'amber' | 'red' | 'blue' | 'outline'

const WASH: Record<BadgeVariant, string> = {
  neutral: 'bg-secondary text-muted-foreground',
  brand: 'bg-secondary text-foreground',
  amber: 'bg-secondary text-warning',
  red: 'bg-destructive/10 text-destructive',
  blue: 'bg-secondary text-info',
  outline: 'bg-transparent text-muted-foreground ring-1 ring-inset ring-input',
}

/** The Beta-tag pill: sand wash, 9999px, 12px weight 500. */
export function Badge({
  variant = 'neutral',
  className,
  children,
}: {
  variant?: BadgeVariant
  className?: string
  children: ReactNode
}) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium leading-none ${WASH[variant]}${className ? ' ' + className : ''}`}>
      {children}
    </span>
  )
}
