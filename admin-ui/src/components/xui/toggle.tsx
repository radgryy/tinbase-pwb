import { Check, Minus } from 'lucide-react'
import type { MouseEvent } from 'react'

/** Tri-state checkbox rendered as a button; checked = jet-ink fill. */
export function Checkbox({
  checked,
  indeterminate,
  onChange,
  disabled,
  title,
  className,
}: {
  checked: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean, e: MouseEvent) => void
  disabled?: boolean
  title?: string
  className?: string
}) {
  const on = checked || indeterminate
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      disabled={disabled}
      title={title}
      onClick={(e) => {
        e.stopPropagation()
        onChange?.(!checked, e)
      }}
      className={`flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
        on ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground bg-transparent hover:border-foreground'
      }${disabled ? ' pointer-events-none opacity-40' : ''}${className ? ' ' + className : ''}`}
    >
      {indeterminate ? <Minus size={11} strokeWidth={3} /> : checked ? <Check size={11} strokeWidth={3} /> : null}
    </button>
  )
}

/** Toggle switch; on-state fills jet ink. */
export function Switch({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-4.5 w-8 shrink-0 rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-border'
      }${disabled ? ' pointer-events-none opacity-40' : ''}`}
    >
      <span
        className={`absolute left-0 top-0.5 size-3.5 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}
