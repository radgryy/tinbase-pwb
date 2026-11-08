import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

/** Hover tooltip: ink fill, paper text — the single inverted-surface moment. */
export function Tooltip({
  content,
  children,
  side = 'top',
}: {
  content: ReactNode
  children: ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}) {
  return (
    <RadixTooltip.Provider delayDuration={250}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={6}
            className="z-[60] max-w-[300px] rounded-full bg-primary px-2.5 py-1 text-xs text-primary-foreground animate-[fade-in_.1s_ease-out]"
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
