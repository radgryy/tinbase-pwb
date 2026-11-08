/**
 * xAI-style button system, written fresh.
 *
 * One black pill is the only loud element on any screen; every other action is
 * ghost or outlined. Radius is the system's signature 9999px pill, weights are
 * 500/400 only, and depth is a single hairline ring — never a shadow stack.
 */
export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'danger' | 'dangerSolid'
export type ButtonSize = 'sm' | 'xs' | 'icon' | 'iconXs'

export function Button({
  variant = 'default',
  size = 'sm',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  const surface: Record<ButtonVariant, string> = {
    // the single filled conversion element: jet ink, no border, no shadow
    default:
      'bg-primary text-primary-foreground hover:opacity-90 font-medium',
    // soft alternative: paper surface, hairline ring, ring deepens on hover
    outline:
      'border border-input text-foreground hover:bg-secondary hover:border-muted-foreground font-medium',
    // tertiary: text only, hover lifts to ink
    ghost: 'text-muted-foreground hover:text-foreground font-medium',
    // destructive pair
    danger: 'border border-destructive/40 text-destructive hover:bg-destructive/10 font-medium',
    dangerSolid: 'bg-destructive text-destructive-foreground hover:opacity-90 font-medium',
  }
  const metrics: Record<ButtonSize, string> = {
    sm: 'h-8 px-4 text-[14px]',
    xs: 'h-6 px-3 text-[12px]',
    icon: 'size-8 p-0',
    iconXs: 'size-6 p-0',
  }
  return (
    <button
      className={
        'inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ' +
        metrics[size] +
        ' ' +
        surface[variant] +
        (className ? ' ' + className : '')
      }
      {...props}
    />
  )
}
