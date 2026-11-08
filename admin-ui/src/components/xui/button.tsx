import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'danger' | 'dangerSolid'
export type ButtonSize = 'sm' | 'xs' | 'icon' | 'iconXs'

const PILL = 'inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'

const SURFACE: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:opacity-90 font-medium',
  outline: 'border border-input text-foreground hover:bg-secondary hover:border-muted-foreground font-medium',
  ghost: 'text-muted-foreground hover:text-foreground font-medium',
  danger: 'border border-destructive/40 text-destructive hover:bg-destructive/10 font-medium',
  dangerSolid: 'bg-destructive text-destructive-foreground hover:opacity-90 font-medium',
}

const METRIC: Record<ButtonSize, string> = {
  sm: 'h-8 px-4 text-[14px]',
  xs: 'h-6 px-3 text-[12px]',
  icon: 'size-8 p-0',
  iconXs: 'size-6 p-0',
}

/** The single loud element: a jet-ink pill. Everything else is ghost/outline. */
export function Button({
  variant = 'default',
  size = 'sm',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button className={`${PILL} ${METRIC[size]} ${SURFACE[variant]}${className ? ' ' + className : ''}`} {...props} />
}
