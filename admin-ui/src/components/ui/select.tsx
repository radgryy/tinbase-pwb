import * as RadixSelect from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

export interface SelectOption {
  value: string
  /** defaults to the value itself */
  label?: ReactNode
  disabled?: boolean
}

const EMPTY = '__select-empty__'
const toRadix = (v: string) => (v === '' ? EMPTY : v)
const fromRadix = (v: string) => (v === EMPTY ? '' : v)

/**
 * Dropdown built on Radix — trigger is the 6px input surface (hairline ring,
 * jet focus), the panel is a 16px card with pill rows. An empty `value` is
 * mapped through an internal sentinel so callers keep using `''`.
 */
export function Select({
  value,
  onValueChange,
  options,
  placeholder = 'Select…',
  disabled,
  autoFocus,
  mono,
  size = 'sm',
  className = 'w-full',
}: {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: ReactNode
  disabled?: boolean
  autoFocus?: boolean
  mono?: boolean
  /** `sm` (h-8, default) for forms; `xs` (h-6) to sit flush next to xs buttons in toolbars. */
  size?: 'sm' | 'xs'
  /** Sizing classes for the trigger — defaults to `w-full`; pass e.g. `w-36 shrink-0` for toolbar use. */
  className?: string
}) {
  return (
    <RadixSelect.Root value={toRadix(value)} onValueChange={(v) => onValueChange(fromRadix(v))} disabled={disabled}>
      <RadixSelect.Trigger
        autoFocus={autoFocus}
        className={
          'flex cursor-pointer items-center gap-1.5 rounded-[6px] border border-input bg-field text-left text-[14px] text-foreground transition-colors duration-150 ' +
          (size === 'xs' ? 'h-6 px-2 text-[12px] ' : 'h-8 px-3 ') +
          'hover:border-muted-foreground focus:border-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-placeholder:text-muted-foreground/70 ' +
          (mono ? 'font-mono text-[13px] ' : '') +
          className
        }
      >
        <span className="min-w-0 flex-1 truncate">
          <RadixSelect.Value placeholder={placeholder} />
        </span>
        <RadixSelect.Icon>
          <ChevronDown size={13} className="shrink-0 text-muted-foreground/80" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className="z-90 max-h-64 min-w-(--radix-select-trigger-width) overflow-hidden rounded-2xl border border-border bg-popover shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_18px_40px_-24px_rgba(15,23,42,0.18)] animate-[fade-in_.1s_ease-out]"
        >
          <RadixSelect.Viewport className="p-1.5">
            {options.map((o) => (
              <RadixSelect.Item
                key={o.value}
                value={toRadix(o.value)}
                disabled={o.disabled}
                className={
                  'flex cursor-pointer select-none items-center gap-2 rounded-full px-3 py-1.5 text-[13px] text-foreground outline-none transition-colors data-highlighted:bg-secondary data-disabled:pointer-events-none data-disabled:opacity-40 ' +
                  (mono ? 'font-mono' : '')
                }
              >
                <span className="min-w-0 flex-1 truncate">
                  <RadixSelect.ItemText>{o.label ?? o.value}</RadixSelect.ItemText>
                </span>
                <RadixSelect.ItemIndicator>
                  <Check size={12} className="shrink-0 text-foreground" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
