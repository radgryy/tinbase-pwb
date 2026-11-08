import type { ReactNode } from 'react'

/** Quiet centered placeholder — fog mono copy on bare paper, no surface. */
export function Empty({ children }: { children: ReactNode }) {
  return <div className="py-16 text-center font-mono text-[13px] text-muted-foreground/80">{children}</div>
}
