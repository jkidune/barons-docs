import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/architecture')({
  component: ArchitecturePage,
})

function ArchitecturePage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Getting Started
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Architecture Overview
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          How the two systems connect and communicate.
        </p>
      </div>

      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '68ch' }}>
        The system is split into two parts that communicate via the WordPress REST API.
      </p>

      {/* Diagram */}
      <h2 id="diagram" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        System Diagram
      </h2>
      <div className="arch-diagram">
        <pre><code>{`┌─────────────────────────────────┐      ┌──────────────────────────────────┐
│  WordPress (Headless CMS)       │      │  Next.js Frontend                │
│  cms.yourdomain.com             │      │  yourdomain.com                  │
│                                 │ REST │                                  │
│  wp-admin  ──────────────────────────► Pages & Components (React)         │
│  Posts, Pages, CPTs             │  API │  src/lib/wordpress.ts            │
│  Media Library                  │      │  (All API fetch functions)        │
│  WP REST API /wp-json/wp/v2/   │      │                                  │
│                                 │      │  Deployed on:                    │
│  Hosted on: Hostinger           │      │  Vercel / Cloudflare Pages       │
└─────────────────────────────────┘      └──────────────────────────────────┘
         ▲
         │  Webhook (fires on publish)
         └──────── triggers ISR revalidation in Next.js`}</code></pre>
      </div>

      {/* Data Flow */}
      <h2 id="data-flow" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Data Flow
      </h2>
      <ol style={{ paddingLeft: '1.4rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}>Editor publishes a post in <code>wp-admin</code></li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}>WordPress fires a webhook to your Next.js app</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}>Next.js revalidates only the affected cached pages</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}>Visitors always see fresh content — no full rebuild needed</li>
      </ol>

      {/* DNS Pattern */}
      <h2 id="dns-pattern" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        DNS Pattern
      </h2>
      <pre><code>{`yourdomain.com       →  Next.js frontend  (Vercel / Cloudflare Pages)
cms.yourdomain.com   →  WordPress backend (Hostinger)`}</code></pre>

      <div className="callout callout-tip">
        <span className="callout-icon">💡</span>
        <p>
          This DNS split means visitors only ever see your Next.js site. You manage content at <code>cms.yourdomain.com/wp-admin</code> as usual.
        </p>
      </div>

      {/* Page nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>
            <span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>
            Introduction
          </span>
        </Link>
        <Link
          to="/cost"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span>
            <span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>
            Cost Breakdown
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
