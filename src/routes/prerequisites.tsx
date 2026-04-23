import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/prerequisites')({
  component: PrerequisitesPage,
})

function PrerequisitesPage() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Getting Started
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Prerequisites & Tools
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Everything you need before writing a single line of code.
        </p>
      </div>

      <h2 id="knowledge" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        Knowledge Required
      </h2>
      <ul style={{ paddingLeft: '1.4rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <li style={{ color: 'var(--muted)' }}>Basic React (components, props, hooks)</li>
        <li style={{ color: 'var(--muted)' }}>Basic Next.js (App Router, pages, layouts)</li>
        <li style={{ color: 'var(--muted)' }}>Familiarity with <code>fetch()</code> or Axios</li>
        <li style={{ color: 'var(--muted)' }}>Basic TypeScript (types and interfaces)</li>
        <li style={{ color: 'var(--muted)' }}>Basic terminal / CLI usage</li>
      </ul>

      <h2 id="install" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Install Locally
      </h2>
      <pre><code>{`# Node.js v18 or higher — download from nodejs.org
node --version    # Should print v18+
npm --version     # Should print 9+

# Install pnpm (faster than npm)
npm install -g pnpm`}</code></pre>

      <h2 id="vscode" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Recommended VS Code Extensions
      </h2>
      <ul style={{ paddingLeft: '1.4rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>ESLint</strong> — catches errors as you type</li>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Prettier</strong> — auto-formats your code</li>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Tailwind CSS IntelliSense</strong> — Tailwind class autocomplete</li>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>REST Client</strong> — test API endpoints inside VS Code</li>
      </ul>

      <h2 id="accounts" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Accounts to Create
      </h2>
      <ol style={{ paddingLeft: '1.4rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>GitHub</strong> — version control (github.com)</li>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Vercel</strong> — frontend deployment (vercel.com) — connect to GitHub</li>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Cloudflare</strong> — optional alternative (cloudflare.com)</li>
      </ol>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          <strong style={{ color: 'var(--text)' }}>Using TRAE IDE?</strong> All the same extensions are available. The terminal commands are identical across VS Code and TRAE.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/cost"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Cost Breakdown</span>
        </Link>
        <Link
          to="/phase-0"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Phase 0 — WordPress</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
