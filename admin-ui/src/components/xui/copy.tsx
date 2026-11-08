import { Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { copyText } from '../../lib/clipboard'
import { Button, type ButtonSize, type ButtonVariant } from './button'

/** Copy hook with transient copied state; `value` may be lazy. */
export function useCopy(value: string | (() => string), label?: string) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = () => {
    const v = typeof value === 'function' ? value() : value
    void copyText(v, label).then((ok) => {
      if (!ok) return
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1800)
    })
  }
  return { copied, copy }
}

/** Icon pill that copies `value`; feedback flips the icon to an ink check. */
export function CopyButton({
  value,
  label = 'Value',
  variant = 'ghost',
  size = 'iconXs',
  iconSize = 12,
  className,
  disabled,
  children,
}: {
  value: string | (() => string)
  label?: string
  variant?: ButtonVariant
  size?: ButtonSize
  iconSize?: number
  className?: string
  disabled?: boolean
  children?: ReactNode
}) {
  const { copied, copy } = useCopy(value, label)
  return (
    <Button variant={variant} size={size} className={className} disabled={disabled} title={copied ? 'Copied!' : `Copy ${label}`} onClick={copy}>
      {copied ? <Check size={iconSize} /> : <Copy size={iconSize} />}
      {children}
    </Button>
  )
}
