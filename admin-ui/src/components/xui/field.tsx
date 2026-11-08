import { Eye, EyeOff } from 'lucide-react'
import { Button } from './button'
import { useState, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
export { Button } from './button'

const FIELD =
  'w-full rounded-[6px] border border-input bg-field text-[14px] text-foreground transition-colors duration-150 placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none disabled:opacity-50'

/** Text input: 6px radius, the one hairline ring, jet focus border. */
export function Input({
  className,
  mono,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { mono?: boolean }) {
  return (
    <input
      className={`${FIELD} h-8 px-3 ${mono ? 'font-mono text-[13px]' : ''}${className ? ' ' + className : ''}`}
      {...props}
    />
  )
}

/** Monospace textarea on the same field surface. */
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${FIELD} p-3 font-mono text-[13px] leading-relaxed${className ? ' ' + className : ''}`} {...props} />
}

/** Form label: 12px weight 500 fog. */
export function Label({ children }: { children: ReactNode }) {
  return <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{children}</label>
}

/** Read-only credential field with eye toggle and hairline copy pill. */
export function KeyField({
  label,
  hint,
  value,
  danger,
  bare,
}: {
  label: string
  hint: string
  value: string
  danger?: boolean
  bare?: boolean
}) {
  const [visible, setVisible] = useState(!danger)
  return (
    <div>
      {!bare && (
        <Label>
          {label}{' '}
          <span className={`ml-1 font-normal font-mono text-[11px] ${danger ? 'text-destructive/80' : 'text-muted-foreground/70'}`}>
            {hint}
          </span>
        </Label>
      )}
      <div className="flex items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <Input mono readOnly type={visible ? 'text' : 'password'} value={value || 'unavailable'} className="pr-9" />
          <button
            type="button"
            title={visible ? 'Hide key' : 'Reveal key'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/80 transition-colors hover:text-foreground"
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <Button variant="outline" size="icon" title={`Copy ${label}`} disabled={!value} onClick={() => void navigator.clipboard.writeText(value)}>
          <CopyIcon />
        </Button>
      </div>
    </div>
  )
}

import { Check, Copy } from 'lucide-react'
import { useEffect, useRef } from 'react'
function CopyIcon() {
  return <Copy size={13} />
}

/** Copy-state hook (kept here so fields share one clipboard implementation). */
export function useCopyFeedback(ms = 1800) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const mark = () => {
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), ms)
  }
  return { copied, mark }
}
