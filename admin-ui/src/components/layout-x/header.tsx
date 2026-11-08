import { Check, Copy, LogOut, Plug, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { api, getKey } from "../../api";
import { apiUrl, inProcessSnippet } from "../../lib/snippet";
import { AdvisorButton } from "../advisor";
import { Badge, Button, CodeBlock, CopyButton, Dialog, Input, Kbd, KeyField, Label, useCopy } from "../xui";
import { Logo } from "../xui-logo";

/**
 * Sticky glass top bar: logo mark, mono API URL with copy, pill actions.
 * Backdrop blur + hairline bottom border per the style guide's sticky header.
 */
export function Header({ onLogout }: { onLogout: () => void }) {
  const [connect, setConnect] = useState(false);
  const url = apiUrl();
  const urlCopy = useCopy(url, "API URL");

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 bg-transparent px-4 backdrop-blur-[12px]">
      <div className="flex items-center gap-2.5">
        <Logo size={40} variant="icon" />
        <Badge>studio</Badge>
      </div>
      <span className="text-border">/</span>
      <button
        onClick={urlCopy.copy}
        title={urlCopy.copied ? "Copied!" : "Copy API URL"}
        className="group flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        {url.replace(/^https?:\/\//, "")}
        {urlCopy.copied ? <Check size={11} /> : <Copy size={11} className="opacity-0 transition-opacity group-hover:opacity-100" />}
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
          className="flex h-8 items-center gap-2 rounded-full border border-input bg-field px-3 text-xs text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
          title="Search (Ctrl+K)"
        >
          <Search size={12} />
          Search…
          <Kbd>⌘K</Kbd>
        </button>
        <Button size="sm" onClick={() => setConnect(true)}>
          <Plug size={13} /> Connect
        </Button>
        <AdvisorButton />
        <Button variant="ghost" size="icon" title="Log out" onClick={onLogout}>
          <LogOut size={14} />
        </Button>
      </div>

      <ConnectDialog open={connect} onClose={() => setConnect(false)} />
    </header>
  );
}

function ConnectDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const url = apiUrl();
  const serviceKey = getKey();
  const [anonKey, setAnonKey] = useState("");

  useEffect(() => {
    if (!open) return;
    api.keys().then(
      (k) => setAnonKey(k.anonKey ?? ""),
      () => setAnonKey(""),
    );
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} title="Connect" wide>
      <div className="space-y-5">
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          One process, all services — <span className="text-foreground">REST, Auth, Storage, Realtime</span> speak the
          Supabase wire protocols, so <span className="font-mono text-[13px] text-foreground">supabase-js</span> connects
          unchanged.
        </p>
        <div>
          <Label>API URL</Label>
          <div className="flex items-center gap-2">
            <Input mono readOnly value={url} />
            <CopyButton value={url} label="API URL" variant="outline" size="icon" iconSize={13} />
          </div>
        </div>
        <KeyField label="anon key" hint="safe for browsers — RLS applies" value={anonKey} />
        <KeyField label="service_role key" hint="server-side only — bypasses RLS" value={serviceKey} danger />
        <div>
          <Label>Get started</Label>
          <CodeBlock code={inProcessSnippet()} lang="js" />
        </div>
      </div>
    </Dialog>
  );
}
