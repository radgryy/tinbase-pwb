import type { InputHTMLAttributes } from 'react'

/**
 * Text input per the style guide: 6px radius, the one hairline ring #d5d9e2,
 * fog placeholder, focus expressed as a 1px jet ring — no glow.
 */
export function Input({
  className,
  mono,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { mono?: boolean }) {
  return (
    <input
      className={
        'h-8 w-full rounded-[6px] border border-input bg-field px-3 text-[14px] text-foreground transition-colors duration-150 ' +
        'placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none disabled:opacity-50 ' +
        (mono ? 'font-mono text-[13px] ' : '') +
        (className ?? '')
      }
      {...props}
    />
  )
}
