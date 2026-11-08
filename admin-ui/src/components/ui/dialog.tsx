import * as RadixDialog from '@radix-ui/react-dialog'
import { AlertTriangle, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from './button'

/**
 * Centered modal: paper canvas, 16px card radius (the "cards" radius from the
 * guide), a single hairline ring instead of a shadow stack, and an ink title.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  wide,
  width,
}: {
  open: boolean
  onClose: () => void
  title: ReactNode
  children: ReactNode
  wide?: boolean
  /** width classes overriding the presets, e.g. `w-235` for diff layouts */
  width?: string
}) {
  return (
    <RadixDialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[8px] animate-[fade-in_.15s_ease-out]" />
        <RadixDialog.Content
          className={
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-popover shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_18px_40px_-24px_rgba(15,23,42,0.18)] ' +
            'max-h-[85vh] max-w-[92vw] overflow-auto focus:outline-none ' +
            (width ?? (wide ? 'w-160' : 'w-110'))
          }
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <RadixDialog.Title className="text-[14px] font-medium tracking-[-0.01em]">{title}</RadixDialog.Title>
            <RadixDialog.Close className="flex size-6 items-center justify-center rounded-full text-muted-foreground/80 transition-colors hover:text-foreground">
              <X size={15} />
            </RadixDialog.Close>
          </div>
          <div className="p-5">{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

/**
 * Declarative confirmation dialog built on {@link Dialog}. Callers hold the open state.
 *
 * @example
 * {dropping && (
 *   <ConfirmDialog open danger title="Drop policy?" confirmLabel="Drop"
 *     onConfirm={() => void doDrop(dropping)} onClose={() => setDropping(null)} />
 * )}
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger,
  onConfirm,
  onClose,
}: {
  open: boolean
  title: string
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  /** red confirm button for destructive actions */
  danger?: boolean
  onConfirm: () => void
  onClose: () => void
}) {
  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <div className="flex items-start gap-3">
        {danger && (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle size={15} className="text-destructive" />
          </div>
        )}
        <p className="min-w-0 text-[14px] leading-relaxed text-muted-foreground">{description ?? 'Are you sure?'}</p>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          variant={danger ? 'dangerSolid' : 'default'}
          autoFocus
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  )
}
