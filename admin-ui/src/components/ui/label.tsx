import type { ReactNode } from 'react'

/** Form label: 12px, weight 500, fog. */
export function Label({ children }: { children: ReactNode }) {
  return <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{children}</label>
}
