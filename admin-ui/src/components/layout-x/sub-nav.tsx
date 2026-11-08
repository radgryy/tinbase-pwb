import type { ReactNode } from "react";
import { ResizablePanel } from "../ui";
import type { SubNavGroup } from "../layout/sub-nav";

export type { SubNavGroup, SubNavItem } from "../layout/sub-nav";

/**
 * Second-level inner panel: mono uppercase group labels, ghost ghost links
 * (fog → ink), active item in ink weight 500 — no backgrounds.
 */
export function SubNav({
  title,
  groups,
  active,
  onSelect,
  footer,
}: {
  title: string
  groups: SubNavGroup[]
  active: string
  onSelect: (id: string) => void
  footer?: ReactNode
}) {
  return (
    <ResizablePanel id="sub-nav" side="left" defaultSize={224} min={176} max={340} className="flex flex-col border-r border-border bg-sidebar">
      <div className="px-4 pb-1 pt-4 text-[14px] font-medium tracking-[-0.01em] text-foreground">{title}</div>
      <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        {groups.map((g, gi) => (
          <div key={gi} className="pt-4 first:pt-2">
            {g.title && (
              <p className="px-2.5 pb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">{g.title}</p>
            )}
            {g.items.map((it) => (
              <button
                key={it.id}
                onClick={() => onSelect(it.id)}
                className={`flex h-8 w-full items-center justify-between rounded-full px-2.5 text-[13px] transition-colors ${
                  active === it.id ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="min-w-0 truncate">{it.label}</span>
                {it.badge}
              </button>
            ))}
          </div>
        ))}
      </nav>
      {footer && <div className="shrink-0 border-t border-border p-3">{footer}</div>}
    </ResizablePanel>
  );
}
