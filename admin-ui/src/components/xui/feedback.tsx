import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Toaster as SonnerToaster, toast as sonner } from 'sonner'

export type ToastKind = 'info' | 'success' | 'error'

const ICONS: Record<ToastKind, typeof Info> = { info: Info, success: CheckCircle2, error: AlertCircle }
const TINT: Record<ToastKind, string> = { info: 'text-info', success: 'text-sprout', error: 'text-destructive' }

function Toast({ id, kind, msg }: { id: string | number; kind: ToastKind; msg: string }) {
  const Icon = ICONS[kind]
  return (
    <div className="group pointer-events-auto relative flex w-[360px] items-start gap-2.5 rounded-2xl border border-border bg-popover py-3 pl-3.5 pr-9 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_18px_40px_-24px_rgba(15,23,42,0.18)]">
      <Icon size={15} className={`mt-px shrink-0 ${TINT[kind]}`} />
      <p className="min-w-0 flex-1 break-words text-[13px] leading-snug text-foreground">{msg}</p>
      <button
        onClick={() => sonner.dismiss(id)}
        aria-label="Dismiss"
        className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full text-muted-foreground/80 opacity-0 transition-all hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export function toast(msg: string, kind: ToastKind = 'info') {
  return sonner.custom((id) => <Toast id={id} kind={kind} msg={msg} />, {
    duration: kind === 'error' ? 6000 : 3500,
  })
}
toast.error = (msg: string) => toast(msg, 'error')
toast.success = (msg: string) => toast(msg, 'success')

export function Toaster() {
  return <SonnerToaster position="bottom-right" gap={8} offset={16} />
}

/** Hairline-track loading spinner. */
export function Spinner() {
  return (
    <div className="flex items-center justify-center py-16 text-foreground">
      <div className="size-5 animate-spin rounded-full border-2 border-border border-t-foreground" />
    </div>
  )
}

/** Quiet mono placeholder — no surface, no border. */
export function Empty({ children }: { children: ReactNode }) {
  return <div className="py-16 text-center font-mono text-[13px] text-muted-foreground/80">{children}</div>
}

/** Ember banner for failed loads — distinguished from a true empty state. */
export function LoadError({ message }: { message: string }) {
  return (
    <div className="m-4 flex items-start gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-[12px] text-destructive">
      <AlertCircle size={14} className="mt-0.5 shrink-0" />
      <div>
        <span className="font-medium">Couldn't load this view.</span> {message}
      </div>
    </div>
  )
}
