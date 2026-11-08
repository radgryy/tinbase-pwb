import { useEffect, useState } from 'react'
import { api, ApiError, clearKey, getKey } from './api'
import { AdvisorHost } from './components/advisor'
import { CommandPalette, Header, Login, Sidebar } from './components/layout'
import { Toaster } from './components/ui'
import { navigate, useRoute } from './lib/router'
import { Authentication } from './pages/authentication'
import { Automations } from './pages/automations'
import { DatabaseSection } from './pages/database'
import { EdgeFunctions } from './pages/edge-functions'
import { HomePage } from './pages/home/home-x'
import { LogsPage } from './pages/logs'
import { RealtimePage } from './pages/realtime'
import { SettingsPage } from './pages/settings'
import { SqlEditor } from './pages/sql-editor'
import { StoragePage } from './pages/storage'
import { TableEditor } from './pages/table-editor'

/**
 * Root studio component. Gates on the presence of a valid service_role key —
 * rendering the login screen when unauthenticated — and otherwise renders the
 * header, sidebar, command palette, and the page matching the active route.
 */
export function App() {
  const [authed, setAuthed] = useState(!!getKey())
  const { tab } = useRoute()

  useEffect(() => {
    if (!getKey()) return
    // Only drop the stored key when the server actively rejects it (401/403).
    // A transient failure (server restarting, network blip) keeps the session.
    api.ping().catch((e) => {
      if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
        clearKey()
        setAuthed(false)
      }
    })
  }, [])

  if (!authed)
    return (
      <>
        <Login onOk={() => setAuthed(true)} />
        <Toaster />
      </>
    )

  return (
    <div className="flex h-full flex-col">
      <Toaster />
      <CommandPalette />
      <AdvisorHost />
      <Header
        onLogout={() => {
          clearKey()
          setAuthed(false)
        }}
      />
      <div className="flex min-h-0 flex-1">
        <Sidebar tab={tab} onTab={(t) => navigate(t)} />
        <main className="relative min-w-0 flex-1 overflow-hidden">
          {/* xAI atmosphere: one decorative coral orb, blurred 64px, behind content */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 right-0 z-0 size-[420px] rounded-full opacity-60 blur-[64px]"
            style={{ background: 'radial-gradient(circle, rgba(255,136,104,0.55), transparent 70%)' }}
          />
          {tab === 'home' && <HomePage />}
          {tab === 'table' && <TableEditor />}
          {tab === 'sql' && <SqlEditor />}
          {tab === 'database' && <DatabaseSection />}
          {tab === 'auth' && <Authentication />}
          {tab === 'storage' && <StoragePage />}
          {tab === 'functions' && <EdgeFunctions />}
          {tab === 'realtime' && <RealtimePage />}
          {tab === 'automations' && <Automations />}
          {tab === 'logs' && <LogsPage />}
          {tab === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  )
}
