import ace from 'ace-builds'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-one_dark'
import { useEffect, useRef } from 'react'
import { useResolvedTheme } from '../../lib/prefs'
import { CopyButton } from './copy'

export type Lang = 'sql' | 'js'
const MODES: Record<Lang, string> = { js: 'ace/mode/javascript', sql: 'ace/mode/sql' }
type Editor = ReturnType<typeof ace.edit>

interface CodeViewProps {
  value: string
  lang: Lang
  onChange?: (v: string) => void
  readOnly?: boolean
  gutter?: boolean
  minLines?: number
  maxLines?: number
  placeholder?: string
  onCmdEnter?: () => void
  className?: string
}

/** Low-level Ace mount (GeistMono stack, 13px). */
export function CodeView({
  value,
  lang,
  onChange,
  readOnly,
  gutter = false,
  minLines,
  maxLines,
  placeholder,
  onCmdEnter,
  className,
}: CodeViewProps) {
  const elRef = useRef<HTMLDivElement | null>(null)
  const edRef = useRef<Editor | null>(null)
  const theme = useResolvedTheme()
  const cb = useRef({ onChange, onCmdEnter })
  cb.current = { onChange, onCmdEnter }

  useEffect(() => {
    const ed = ace.edit(elRef.current!, {
      mode: MODES[lang],
      theme: theme === 'dark' ? 'ace/theme/one_dark' : 'ace/theme/github',
      readOnly: !!readOnly,
      showGutter: gutter,
      minLines,
      maxLines,
      fontSize: 13,
      fontFamily: "'GeistMono', ui-monospace, 'SF Mono', Menlo, monospace",
      useWorker: false,
      showPrintMargin: false,
      highlightActiveLine: !readOnly,
      highlightGutterLine: !readOnly,
      tabSize: 2,
      useSoftTabs: true,
      placeholder,
      enableBasicAutocompletion: !readOnly,
      enableLiveAutocompletion: !readOnly,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    ed.setValue(value ?? '', -1)
    ed.on('change', () => cb.current.onChange?.(ed.getValue()))
    ed.commands.addCommand({
      name: 'cmd-enter',
      bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
      exec: () => cb.current.onCmdEnter?.(),
    })
    ed.renderer.setPadding(12)
    ed.renderer.setScrollMargin(8, 8, 0, 0)
    if (readOnly) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(ed.renderer as any).$cursorLayer.element.style.display = 'none'
    }
    edRef.current = ed
    return () => {
      ed.destroy()
      edRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, readOnly, gutter, minLines, maxLines, theme])

  useEffect(() => {
    const ed = edRef.current
    if (ed && ed.getValue() !== value) ed.setValue(value ?? '', -1)
  }, [value])

  return <div ref={elRef} className={`w-full${className ? ' ' + className : ''}`} />
}

/** Terminal mockup: charcoal surface, traffic lights, mono copy button. */
export function CodeBlock({ code, lang = 'js', gutter }: { code: string; lang?: Lang; gutter?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#151515]">
      <div className="flex items-center gap-1.5 px-3 pt-2.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#ffbd2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
      </div>
      <CodeView value={code} lang={lang} readOnly gutter={gutter} minLines={2} maxLines={80} />
      <CopyButton value={code} label="Snippet" className="absolute right-2 top-2 z-10" />
    </div>
  )
}

/** Editable code area on the 6px field surface. */
export function CodeEditor({
  value,
  onChange,
  lang,
  className,
  placeholder,
  onCmdEnter,
}: {
  value: string
  onChange: (v: string) => void
  lang: Lang
  className?: string
  placeholder?: string
  onCmdEnter?: () => void
}) {
  return (
    <div
      className={`overflow-hidden rounded-[6px] border border-input bg-field transition-colors focus-within:border-foreground${
        className ? ' ' + className : ''
      }`}
    >
      <CodeView value={value} onChange={onChange} lang={lang} gutter placeholder={placeholder} onCmdEnter={onCmdEnter} className="h-full" />
    </div>
  )
}
