import * as RadixDialog from '@radix-ui/react-dialog'
import { AlertTriangle, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Button } from './button'

const RING = 'shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_18px_40px_-24px_rgba(15,23,42,0.18)]'

/** Centered modal: paper canvas, 16px radius, single hairline elevation. */
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
  width?: string
}) {
  return (
    <RadixDialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[8px] animate-[fade-in_.15s_ease-out]" />
        <RadixDialog.Content
          className={`fixed left-1/2 top-1/2 z-50 max-h-[85vh] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl border border-border bg-popover focus:outline-none ${RING} ${width ?? (wide ? 'w-160' : 'w-110')}`}
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

/** Declarative confirm dialog; `danger` switches the confirm pill to ember. */
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

/** Right slide-over panel detached from the viewport edges, 16px radius. */
export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  actions,
  flush,
  hideHeader,
  width = 'w-[500px]',
}: {
  open: boolean
  onClose: () => void
  title: ReactNode
  children: ReactNode
  footer?: ReactNode
  actions?: ReactNode
  flush?: boolean
  hideHeader?: boolean
  width?: string
}) {
  const [visible, setVisible] = useState(open)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    if (open) setVisible(true)
    return () => clearTimeout(timer.current)
  }, [open])
  const requestClose = () => {
    if (!visible) return
    setVisible(false)
    timer.current = setTimeout(onClose, 200)
  }
  return (
    <RadixDialog.Root open={visible} onOpenChange={(o) => !o && requestClose()}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-[fade-in_.15s_ease-out] data-[state=closed]:animate-[fade-out_.2s_ease-in]" />
        <RadixDialog.Content
          className={`fixed inset-y-0 right-0 z-50 my-2 mr-2 flex max-w-[92vw] flex-col rounded-2xl border border-border bg-background ${RING} transition-[width] duration-300 data-[state=open]:animate-[sheet-in_.25s_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[sheet-out_.2s_ease-in] focus:outline-none ${width}`}
        >
          {hideHeader ? (
            <RadixDialog.Title className="sr-only">{title}</RadixDialog.Title>
          ) : (
            <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3.5">
              <RadixDialog.Title className="text-[14px] font-medium text-foreground">{title}</RadixDialog.Title>
              <div className="flex items-center gap-1">
                {actions}
                <RadixDialog.Close className="flex size-7 items-center justify-center rounded-full text-muted-foreground/80 transition-colors hover:text-foreground">
                  <X size={16} />
                </RadixDialog.Close>
              </div>
            </div>
          )}
          <div className={`min-h-0 flex-1 ${flush ? 'overflow-hidden' : 'overflow-y-auto px-5 py-4'}`}>{children}</div>
          {footer && <div className="flex shrink-0 items-center gap-2 border-t border-border bg-card px-5 py-3">{footer}</div>}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

export const SheetClose = RadixDialog.Close

/** Lightweight controlled popover: click-away overlay + 16px panel below. */
export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  align = 'start',
  className,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: ReactNode
  children: ReactNode
  align?: 'start' | 'end'
  className?: string
}) {
  return (
    <div className="relative">
      {trigger}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => onOpenChange(false)} />
          <div
            className={`absolute top-full z-50 mt-1 rounded-2xl border border-border bg-popover ${RING} animate-[fade-in_.1s_ease-out] ${
              align === 'start' ? 'left-0' : 'right-0'
            }${className ? ' ' + className : ''}`}
          >
            {children}
          </div>
        </>
      )}
    </div>
  )
}
