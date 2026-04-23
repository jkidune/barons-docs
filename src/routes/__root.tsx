import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Link, useRouterState } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { useState, useEffect } from 'react'

// ── Navigation structure ──────────────────────────────
const NAV = [
  {
    label: 'Getting Started',
    links: [
      { to: '/', label: 'Introduction' },
      { to: '/architecture', label: 'Architecture' },
      { to: '/cost', label: 'Cost Breakdown' },
      { to: '/prerequisites', label: 'Prerequisites' },
    ],
  },
  {
    label: 'Build Phases',
    links: [
      { to: '/phase-0', label: 'Phase 0 — WordPress' },
      { to: '/phase-1', label: 'Phase 1 — Next.js Scaffold' },
      { to: '/phase-2', label: 'Phase 2 — API Layer' },
      { to: '/phase-3', label: 'Phase 3 — Dynamic Pages' },
      { to: '/phase-4', label: 'Phase 4 — Forms' },
      { to: '/phase-5', label: 'Phase 5 — ISR Webhooks' },
      { to: '/phase-6', label: 'Phase 6 — Go Headless' },
      { to: '/phase-7', label: 'Phase 7 — Domains' },
      { to: '/phase-8', label: 'Phase 8 — SEO' },
      { to: '/phase-9', label: 'Phase 9 — Deployment' },
    ],
  },
  {
    label: 'Reference',
    links: [
      { to: '/contact', label: 'Work With Us' },
      { to: '/hacks', label: 'Hacks & Gotchas' },
      { to: '/best-practices', label: 'Best Practices' },
      { to: '/troubleshooting', label: 'Troubleshooting' },
    ],
  },
]

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Headless WordPress + Next.js — Barons Digital Docs' },
    ],
    links: [{ rel: 'stylesheet', href: appCss },
    { rel: 'icon', href: '/Baronsfavicon.png' }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouterState()
  const currentPath = router.location.pathname

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [currentPath])

  // Body scroll-lock when sidebar is open on mobile
  useEffect(() => {
    document.body.classList.toggle('sidebar-open-lock', sidebarOpen)
    return () => document.body.classList.remove('sidebar-open-lock')
  }, [sidebarOpen])

  const filteredNav = NAV.map((section) => ({
    ...section,
    links: section.links.filter((l) =>
      l.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => s.links.length > 0)

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body style={{ margin: 0, background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>

        {/* ── MOBILE SIDEBAR OVERLAY ── */}
        {sidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* ── TOP NAV ── */}
        <header className="site-header">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mobile-menu-btn"
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <div className="site-logo">
            <img src="/barons-white-icon.svg" alt="Barons Digital" style={{ width: 28, height: 28 }} />
            <span className="logo-text">Barons Digital Docs</span>
          </div>

          {/* Search */}
          <div className="header-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search docs…"
              className="search-input"
            />
          </div>

          {/* Right — Edition badge */}
          <div className="header-right">
            <span className="edition-badge">Edition 1.0</span>
          </div>
        </header>

        {/* ── BODY GRID ── */}
        <div className="site-body">

          {/* ── LEFT SIDEBAR ── */}
          <aside className={`site-sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
            {/* Mobile search inside sidebar */}
            <div className="sidebar-search-mobile">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search docs…"
                className="search-input"
              />
            </div>

            {filteredNav.map((section) => (
              <div key={section.label} style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--faint)',
                  padding: '0.25rem 1.25rem 0.5rem',
                }}>
                  {section.label}
                </div>
                {section.links.map((link) => {
                  const isActive = currentPath === link.to
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      style={{
                        display: 'block',
                        padding: '0.45rem 1.25rem',
                        fontSize: '0.875rem',
                        color: isActive ? 'var(--accent)' : 'var(--muted)',
                        fontWeight: isActive ? 600 : 400,
                        background: isActive ? 'var(--accent-bg)' : 'none',
                        borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                        textDecoration: 'none',
                        transition: 'all 160ms ease',
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            ))}
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="site-main">
            <div style={{ maxWidth: '720px' }}>
              {children}
            </div>
          </main>

          {/* ── RIGHT TOC (populated per page via context) ── */}
          <aside className="site-toc">
            <div id="toc-portal" />
          </aside>
        </div>

        <Scripts />
      </body>
    </html>
  )
}