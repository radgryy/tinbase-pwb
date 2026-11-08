import clsx from 'clsx'
import type { TextareaHTMLAttributes } from 'react'

/** Monospace textarea: 6px radius, hairline ring, jet focus border. */
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        'w-full rounded-[6px] border border-input bg-field p-3 font-mono text-[13px] leading-relaxed text-foreground',
        'placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}
