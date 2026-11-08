import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

/** Root wrapper for a dropdown menu. */
export const Menu = Dropdown.Root
/** Element that toggles the menu open. */
export const MenuTrigger = Dropdown.Trigger
/** Wrapper for a nested submenu. */
export const MenuSub = Dropdown.Sub

const PANEL =
  'z-50 min-w-[180px] rounded-2xl border border-border bg-popover p-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_18px_40px_-24px_rgba(15,23,42,0.18)] animate-[fade-in_.1s_ease-out]'

/** Portalled dropdown menu panel that holds menu items. */
export function MenuContent({
  children,
  align = 'start',
  className,
}: {
  children: ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
}) {
  return (
    <Dropdown.Portal>
      <Dropdown.Content align={align} sideOffset={6} className={PANEL + (className ? ' ' + className : '')}>
        {children}
      </Dropdown.Content>
    </Dropdown.Portal>
  )
}

/** Selectable menu row: ghost by default, fog → ink; danger echoes ember. */
export function MenuItem({
  children,
  onSelect,
  danger,
  disabled,
  shortcut,
}: {
  children: ReactNode
  onSelect?: () => void
  danger?: boolean
  disabled?: boolean
  shortcut?: ReactNode
}) {
  return (
    <Dropdown.Item
      disabled={disabled}
      onSelect={onSelect}
      className={
        'flex cursor-pointer select-none items-center gap-2 rounded-full px-3 py-1.5 text-[13px] outline-none transition-colors ' +
        (danger
          ? 'text-destructive data-[highlighted]:bg-destructive/10'
          : 'text-foreground data-[highlighted]:bg-secondary') +
        (disabled ? ' pointer-events-none opacity-40' : '')
      }
    >
      {children}
      {shortcut !== undefined && (
        <span className="ml-auto pl-4 font-mono text-[11px] text-muted-foreground/80">{shortcut}</span>
      )}
    </Dropdown.Item>
  )
}

/** Menu row that opens a nested submenu. */
export function MenuSubTrigger({ children }: { children: ReactNode }) {
  return (
    <Dropdown.SubTrigger className="flex cursor-pointer select-none items-center gap-2 rounded-full px-3 py-1.5 text-[13px] text-foreground outline-none transition-colors data-[highlighted]:bg-secondary data-[state=open]:bg-secondary">
      {children}
      <ChevronRight size={12} className="ml-auto text-muted-foreground/80" />
    </Dropdown.SubTrigger>
  )
}

/** Portalled panel for a nested submenu's items. */
export function MenuSubContent({ children }: { children: ReactNode }) {
  return (
    <Dropdown.Portal>
      <Dropdown.SubContent sideOffset={6} className={PANEL}>
        {children}
      </Dropdown.SubContent>
    </Dropdown.Portal>
  )
}

/** Hairline divider between groups of menu items. */
export function MenuSeparator() {
  return <Dropdown.Separator className="my-1.5 h-px bg-border" />
}

/** Non-interactive mono heading for a menu section. */
export function MenuLabel({ children }: { children: ReactNode }) {
  return (
    <Dropdown.Label className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
      {children}
    </Dropdown.Label>
  )
}
