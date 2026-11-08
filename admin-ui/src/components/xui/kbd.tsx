import type { ReactNode } from 'react'

/** Keyboard-key badge: hairline pill, GeistMono 10px, fog text. */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full border border-input bg-transparent px-1.5 font-mono text-[10px] leading-none text-muted-foreground">
      {children}
    </kbd>
  )
}
