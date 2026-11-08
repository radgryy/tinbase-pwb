/**
 * Language-tab pill strip from the style guide: 9999px pills, mono 13px.
 * Active = jet-ink fill with paper text; inactive = fog on transparent.
 */
export function Tabs({
  tabs,
  active,
  onSelect,
}: {
  tabs: { id: string; label: string }[]
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-2">
      {tabs.map((t) => {
        const on = active === t.id
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            aria-pressed={on}
            className={
              'rounded-full px-3 py-1.5 font-mono text-[13px] leading-none transition-colors duration-150 ' +
              (on
                ? 'bg-primary font-medium text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground')
            }
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
