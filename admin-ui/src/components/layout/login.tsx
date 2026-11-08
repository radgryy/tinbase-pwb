import { useState } from 'react'
import { BASE, api, clearKey, setKey } from '../../api'
import { Button, Input } from '../ui'
import { Logo } from './logo'

/**
 * Sign-in screen in the editorial-hero style: a quiet oversized headline on
 * paper white, GeistMono hint copy, and a single jet-black pill CTA — the one
 * high-contrast element on the page. First sign-in creates the admin account
 * (username + password, min. 4 chars each); a raw service_role key paste still
 * works as a fallback.
 *
 * @param props.onOk - Invoked once the credentials validate successfully.
 */
export function Login({ onOk }: { onOk: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [key, setKeyInput] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit() {
    setBusy(true)
    setErr('')
    try {
      if (key.trim()) {
        setKey(key.trim())
      } else {
        const res = await fetch(`${BASE}/admin/v1/studio-login`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ username: username.trim(), password }),
        })
        const body = await res.json()
        if (!res.ok) throw new Error(body?.error ?? `HTTP ${res.status}`)
        setKey(String(body.key))
      }
      await api.ping()
      onOk()
    } catch (e) {
      clearKey()
      setErr('Sign-in failed: ' + (e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const disabled = busy || (!key.trim() && (username.trim().length < 4 || password.length < 4))

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-background">
      {/* coral orb atmosphere, behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 size-[480px] -translate-x-1/2 rounded-full opacity-60 blur-[64px]"
        style={{ background: 'radial-gradient(circle, rgba(255,136,104,0.55), transparent 70%)' }}
      />
      <div className="relative z-10 w-full max-w-100 text-center">
        <div className="mb-8 flex justify-center text-foreground">
          <Logo size={56} />
        </div>
        <h1
          className="text-[48px] font-normal leading-none text-foreground"
          style={{ letterSpacing: '-0.025em' }}
        >
          pwb studio
        </h1>
        <p className="mt-4 font-mono text-[13px] text-muted-foreground">
          first run? any credentials (min. 4 chars) create the admin account
        </p>
        <div className="mx-auto mt-10 max-w-80 space-y-3 text-left">
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
          <details className="text-xs text-muted-foreground/70">
            <summary className="cursor-pointer select-none hover:text-foreground">
              or paste a service_role key
            </summary>
            <div className="mt-3">
              <Input
                mono
                type="password"
                placeholder="eyJ…"
                value={key}
                onChange={(e) => setKeyInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
              />
            </div>
          </details>
          <Button className="h-10 w-full text-[14px]" onClick={submit} disabled={disabled}>
            {busy ? 'Checking…' : 'Continue'}
          </Button>
          {err && <p className="text-xs text-destructive">{err}</p>}
        </div>
      </div>
    </div>
  )
}
