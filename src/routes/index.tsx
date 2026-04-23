import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IntroPage,
})

function IntroPage() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Getting Started
        </p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Headless WordPress + Next.js
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '60ch', marginBottom: '1.25rem', lineHeight: 1.7 }}>
          A complete developer guide for building modern, production-grade websites using WordPress as a headless CMS and Next.js as the frontend.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['Junior Developers', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'April 2026'].map((chip) => (
            <span key={chip} style={{ fontSize: '0.75rem', color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', padding: '0.2rem 0.65rem', borderRadius: 999 }}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      <h2 id="what-is-headless" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        What is Headless WordPress?
      </h2>
      <p style={{ marginBottom: '1rem', color: 'var(--muted)', maxWidth: '68ch', lineHeight: 1.7 }}>
        In a <strong style={{ color: 'var(--text)' }}>traditional WordPress</strong> site, WordPress handles everything — it stores the content and renders the HTML pages visitors see. Your theme controls how everything looks.
      </p>
      <p style={{ marginBottom: '1.5rem', color: 'var(--muted)', maxWidth: '68ch', lineHeight: 1.7 }}>
        In a <strong style={{ color: 'var(--text)' }}>headless WordPress</strong> setup, you cut off the head. WordPress becomes a pure <strong style={{ color: 'var(--text)' }}>Content Management System</strong> — it stores content but never renders pages. Your Next.js frontend fetches content via the REST API and renders pages itself.
      </p>

      <h2 id="why-do-this" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Why do this?
      </h2>
      <ul style={{ paddingLeft: '1.4rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <li style={{ color: 'var(--muted)' }}>Build with modern tools: React, TypeScript, Framer Motion, Tailwind CSS</li>
        <li style={{ color: 'var(--muted)' }}>Faster performance — static generation and CDN delivery</li>
        <li style={{ color: 'var(--muted)' }}>Full design freedom — no theme limitations</li>
        <li style={{ color: 'var(--muted)' }}>Better SEO with fine-grained metadata control</li>
        <li style={{ color: 'var(--muted)' }}>Keep the WordPress admin your clients already know</li>
        <li style={{ color: 'var(--muted)' }}>Scale the frontend and backend independently</li>
      </ul>

      <div className="callout callout-warn">
        <span className="callout-icon">⚠️</span>
        <p>
          <strong style={{ color: 'var(--text)' }}>The trade-off:</strong> More initial setup. You manage two systems instead of one. This guide walks you through every step.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/architecture"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span>
            <span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>
            Architecture Overview
          </span>
        </Link>
      </div>
    </div>
  )
}
