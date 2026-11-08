import { Activity, Database, FileClock, KeyRound, ScrollText, ShieldAlert, Table2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { api, type LogEntry, type Stats, type TableInfo } from "../../api";
import { Badge, Spinner, Time } from "../../components/xui";
import { Finding, fetchFindings, openAdvisor } from "../../components/advisor";
import { navigate } from "../../lib/router";
import { apiUrl } from "../../lib/snippet";

interface Migration {
  version: string;
  name: string | null;
  applied_at: string;
}

/**
 * Project overview in the editorial style: a display headline, quiet stat
 * blocks without card wrappers, cream quick-link tiles, and a flat advisor
 * index. One ink pill is the only loud element.
 */
export function HomePage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [migrations, setMigrations] = useState<Migration[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [issues, setIssues] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);
  const url = apiUrl();

  useEffect(() => {
    Promise.allSettled([api.stats(), api.tables(), api.migrations(), api.logs(), fetchFindings()]).then(
      ([s, t, m, l, f]) => {
        if (s.status === "fulfilled") setStats(s.value);
        setTables(t.status === "fulfilled" ? t.value : []);
        if (m.status === "fulfilled") setMigrations(m.value);
        if (l.status === "fulfilled") setLogs(l.value);
        if (f.status === "fulfilled") setIssues(f.value);
        setLoading(false);
      },
    );
  }, []);

  if (loading) return <Spinner />;

  const totalRows = tables.reduce((s, t) => s + t.rowCount, 0);
  const lastMigration = migrations[migrations.length - 1];
  const errorCount = logs.filter((l) => l.level === "error").length;

  return (
    <div className="h-full overflow-y-auto">
      <div className="relative mx-auto max-w-[1200px] px-8 py-12">
        {/* coral orb atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 size-[380px] rounded-full opacity-50 blur-[64px]"
          style={{ background: "radial-gradient(circle, rgba(255,136,104,0.55), transparent 70%)" }}
        />

        {/* hero */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <h1 className="text-[48px] leading-none text-foreground" style={{ letterSpacing: "-0.025em" }}>
              overview
            </h1>
            <Badge variant="brand">
              <span className="inline-block size-1.5 rounded-full bg-sprout" /> healthy
            </Badge>
          </div>
          <button
            onClick={() => void navigator.clipboard.writeText(url)}
            title="Copy API URL"
            className="mt-3 flex items-center gap-2 font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {url}
          </button>
        </div>

        {/* stat blocks — no card wrapper, hierarchy through size alone */}
        <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-3">
          <Stat label="database size" value={stats?.dbSize ?? "—"} />
          <Stat label="postgres" value={stats?.version?.replace("PostgreSQL ", "") ?? "—"} />
          <Stat label="last migration" value={lastMigration ? (lastMigration.name ?? lastMigration.version) : "none"} sub={lastMigration ? <Time value={lastMigration.applied_at} /> : undefined} />
          <Stat label="tables" value={`${stats?.tables ?? 0}`} sub={`${totalRows.toLocaleString()} rows`} />
          <Stat label="auth users" value={`${stats?.users ?? 0}`} />
          <Stat label="storage" value={`${stats?.buckets ?? 0}`} sub={`${stats?.objects ?? 0} objects`} />
        </div>

        {/* quick index — cream tiles */}
        <Section title="at a glance">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Tile label="Table Editor" value={`${stats?.tables ?? 0}`} sub="tables" onClick={() => navigate("table")} icon={Table2} />
            <Tile label="Authentication" value={`${stats?.users ?? 0}`} sub="users" onClick={() => navigate("auth")} icon={KeyRound} />
            <Tile label="Storage" value={`${stats?.buckets ?? 0}`} sub="buckets" onClick={() => navigate("storage")} icon={Database} />
            <Tile label="Logs" value={`${logs.length}`} sub={errorCount > 0 ? `${errorCount} errors` : "no errors"} danger={errorCount > 0} onClick={() => navigate("logs")} icon={ScrollText} />
          </div>
        </Section>

        {/* advisor — flat index list */}
        <Section title="advisor" action={issues.length > 0 ? <button className="font-mono text-xs text-muted-foreground hover:text-foreground" onClick={openAdvisor}>view all {issues.length}</button> : undefined}>
          {issues.length === 0 ? (
            <p className="font-mono text-[13px] text-muted-foreground/80">no findings — all checks pass.</p>
          ) : (
            <div>
              {issues.slice(0, 6).map((f) => (
                <button
                  key={f.id}
                  onClick={openAdvisor}
                  className="flex w-full items-center gap-3 border-b border-border/60 py-2.5 text-left transition-colors last:border-0 hover:text-foreground"
                >
                  <ShieldAlert size={14} className={f.level === "critical" ? "shrink-0 text-destructive" : f.level === "warning" ? "shrink-0 text-warning" : "shrink-0 text-muted-foreground/70"} />
                  <span className="min-w-0 truncate text-[14px] text-muted-foreground">{f.title}</span>
                </button>
              ))}
            </div>
          )}
        </Section>

        {/* recent activity — mono terminal echo */}
        <Section title="recent activity">
          <div className="rounded-xl bg-[#151515] p-4 font-mono text-[12px] leading-relaxed text-[#d5d9e2]/80">
            {logs.slice(0, 8).map((l, i) => (
              <p key={i} className="truncate">
                <span className="text-[#858585]">{new Date(l.ts).toLocaleTimeString()}</span>{" "}
                <span className={l.level === "error" ? "text-[#ff5f57]" : l.level === "warn" ? "text-[#ffbd2e]" : "text-[#28c840]"}>{l.level}</span>{" "}
                {l.msg}
              </p>
            ))}
            {logs.length === 0 && <p className="text-[#858585]">no entries yet</p>}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: React.ReactNode }) {
  return (
    <div>
      <p className="text-[18px] font-normal text-foreground">{value}</p>
      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground/80">
        {label}
        {sub && <span className="ml-2 text-muted-foreground/60">{sub}</span>}
      </p>
    </div>
  );
}

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Tile({
  label,
  value,
  sub,
  danger,
  onClick,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub?: string;
  danger?: boolean;
  onClick: () => void;
  icon: typeof Table2;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-card p-5 text-left transition-colors hover:bg-secondary"
    >
      <Icon size={15} className={`mb-6 ${danger ? "text-destructive" : "text-muted-foreground"}`} />
      <p className="text-[18px] font-normal text-foreground">
        {value} <span className="text-[14px] text-muted-foreground">{label}</span>
      </p>
      {sub && <p className="mt-0.5 font-mono text-[11px] text-muted-foreground/70">{sub}</p>}
    </button>
  );
}
