/** Centered loading spinner — hairline track, ink head. */
export function Spinner() {
  return (
    <div className="flex items-center justify-center py-16 text-foreground">
      <div className="size-5 animate-spin rounded-full border-2 border-border border-t-foreground" />
    </div>
  )
}
