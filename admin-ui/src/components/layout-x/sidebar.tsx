import { PanelLeftClose, PanelLeftOpen, Settings2, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useSidebarMode, type SidebarMode } from "../../lib/prefs";
import { Menu, MenuContent, MenuItem, MenuLabel, MenuTrigger } from "../xui";
import { NAV_SECTIONS, type Tab } from "../layout/nav";

const RAIL_W = 56;
const PANEL_W = 232;

const MODES: { id: SidebarMode; label: string }[] = [
  { id: "expanded", label: "Expanded" },
  { id: "collapsed", label: "Collapsed" },
  { id: "hover", label: "Expand on hover" },
];

/**
 * Collapsible cream side panel: top toggle (Expand/Collapse View), mono
 * section labels, ghost nav items (fog → ink), animated width transitions.
 */
export function Sidebar({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const [mode, setMode] = useSidebarMode();
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const open = hovered || menuOpen;
  const expanded = mode === "expanded" || (mode === "hover" && open);
  const overlaying = mode === "hover" && open;

  const pickMode = (m: SidebarMode) => {
    setMode(m);
    setHovered(false);
  };
  const enter = () => {
    if (mode !== "hover") return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setHovered(true), 60);
  };
  const leave = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setHovered(false), 120);
  };

  return (
    <aside
      className="relative shrink-0 transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ width: mode === "expanded" ? PANEL_W : RAIL_W }}
    >
      <div
        onMouseEnter={enter}
        onMouseLeave={leave}
        className={`absolute inset-y-0 left-0 z-40 flex flex-col overflow-hidden border-r border-border bg-sidebar transition-[width,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          overlaying ? "shadow-[12px_0_32px_rgba(0,0,0,0.10)]" : ""
        }`}
        style={{ width: expanded ? PANEL_W : RAIL_W }}
      >
        {/* panel header: expand/collapse toggle + behavior menu */}
        <div className="flex h-11 shrink-0 items-center justify-between px-2">
          <button
            onClick={() => setMode(expanded ? "collapsed" : "expanded")}
            title={expanded ? "Collapse View" : "Expand View"}
            aria-label={expanded ? "Collapse View" : "Expand View"}
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            {expanded ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          </button>
          <Menu open={menuOpen} onOpenChange={setMenuOpen}>
            <MenuTrigger asChild>
              <button
                title="Panel behavior"
                aria-label="Panel behavior"
                className={`flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground ${
                  expanded ? "" : "pointer-events-none absolute opacity-0"
                }`}
              >
                <Settings2 size={14} />
              </button>
            </MenuTrigger>
            <MenuContent align="start" className="w-48">
              <MenuLabel>sidebar control</MenuLabel>
              {MODES.map((m) => (
                <MenuItem key={m.id} onSelect={() => pickMode(m.id)}>
                  <span className={`size-1.5 shrink-0 rounded-full ${mode === m.id ? "bg-foreground" : "bg-transparent"}`} />
                  {m.label}
                </MenuItem>
              ))}
            </MenuContent>
          </Menu>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_SECTIONS.map((s, si) => (
            <div key={si}>
              {s.title && <SectionLabel title={s.title} expanded={expanded} />}
              {s.items.map((n) => (
                <NavLink key={n.id} icon={n.icon} label={n.label} active={tab === n.id} expanded={expanded} onClick={() => onTab(n.id)} />
              ))}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function SectionLabel({ title, expanded }: { title: string; expanded: boolean }) {
  return (
    <p
      className={`px-4 pb-1 pt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60 transition-opacity duration-200 ${
        expanded ? "opacity-100" : "pointer-events-none absolute opacity-0"
      }`}
    >
      {title}
    </p>
  );
}

/** Ghost nav link — no background; hierarchy through ink vs fog only. */
function NavLink({
  icon: Icon,
  label,
  active,
  expanded,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={expanded ? undefined : label}
      className={`mx-2 flex h-9 items-center gap-2.5 rounded-full px-2.5 text-[14px] transition-colors duration-150 ${
        active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
      style={{ width: "calc(100% - 16px)" }}
    >
      <Icon size={15} className={active ? "text-foreground" : ""} />
      <span
        className={`whitespace-nowrap transition-[opacity,transform] duration-200 ${
          expanded ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-2 opacity-0"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
