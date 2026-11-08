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
 * Root studio shell — full-height sidebar column on the left, and the content
 * column (glass header above the page) on the right. The navbar spans only
 * the content area, never the sidebar.
 */
export function App() {
  const [authed, setAuthed] = useState(!!getKey())
  const { tab } = useRoute()

  useEffect(() => {
    if (!getKey()) return
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
    <div className="flex h-full">
      <Toaster />
      <CommandPalette />
      <AdvisorHost />
      <div className="flex h-full min-h-0 shrink-0">
        <Sidebar tab={tab} onTab={(t) => navigate(t)} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* xAI atmosphere: coral orb bleeds over the transparent navbar */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-0 size-[460px] rounded-full opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(255,136,104,0.55), transparent 70%)' }}
        />
        <Header
          onLogout={() => {
            clearKey()
            setAuthed(false)
          }}
        />
        <main className="relative min-h-0 flex-1 overflow-hidden">
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
