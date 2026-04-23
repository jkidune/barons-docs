import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/phase-7')({
  component: Phase7Page,
})

function Phase7Page() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Build Phases
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Phase 7 — Domain Configuration
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Point your domain to Vercel or Cloudflare Pages.
        </p>
      </div>

      <h2 id="subdomain" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        Hostinger — Create the cms Subdomain
      </h2>
      <ol style={{ paddingLeft: '1.4rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          hPanel &rarr; <strong style={{ color: 'var(--text)' }}>Domains &rarr; Subdomains</strong> &rarr; create <code>cms.yourdomain.com</code>
        </li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          WordPress &rarr; <strong style={{ color: 'var(--text)' }}>Settings &rarr; General</strong>:
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>WordPress Address:</strong> <code>https://cms.yourdomain.com</code></li>
            <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Site Address:</strong> <code>https://yourdomain.com</code></li>
          </ul>
        </li>
      </ol>

      <div className="callout callout-error">
        <span className="callout-icon">!</span>
        <p>
          Change both WordPress Address and Site Address at the same time. If you only change one, you can lock yourself out of wp-admin entirely.
        </p>
      </div>

      <h2 id="vercel-domain" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Vercel — Add Custom Domain
      </h2>
      <ol style={{ paddingLeft: '1.4rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <li style={{ color: 'var(--muted)' }}>Vercel project &rarr; <strong style={{ color: 'var(--text)' }}>Settings &rarr; Domains &rarr; Add Domain</strong></li>
        <li style={{ color: 'var(--muted)' }}>Enter <code>yourdomain.com</code></li>
        <li style={{ color: 'var(--muted)' }}>Add the DNS records Vercel shows you in your Hostinger DNS settings</li>
      </ol>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Record Type</th><th>Name</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>A</td><td><code>@</code></td><td><code>76.76.21.21</code></td></tr>
            <tr><td>CNAME</td><td><code>www</code></td><td><code>cname.vercel-dns.com</code></td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="cloudflare-domain" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Cloudflare Pages — Alternative
      </h2>
      <pre><code>{`# Build settings in Cloudflare Pages:
# Framework preset:   None (or Next.js via @cloudflare/next-on-pages)
# Build command:      pnpm build
# Build output:       .next
# Node.js version:    18

# DNS records for Cloudflare Pages:
# CNAME  @    your-project.pages.dev
# CNAME  www  your-project.pages.dev`}</code></pre>

      <h2 id="vercel-json" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        vercel.json — WordPress Admin Redirect
      </h2>
      <pre><code>{`// vercel.json (in Next.js project root)
{
  "redirects": [
    {
      "source": "/wp-admin",
      "destination": "https://cms.yourdomain.com/wp-admin",
      "permanent": true
    },
    {
      "source": "/wp-login.php",
      "destination": "https://cms.yourdomain.com/wp-login.php",
      "permanent": true
    }
  ]
}`}</code></pre>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          DNS propagation can take up to 48 hours. Check propagation status at <strong style={{ color: 'var(--text)' }}>dnschecker.org</strong> or run <code>dig yourdomain.com</code> in your terminal.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/phase-6"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Phase 6 — Go Headless</span>
        </Link>
        <Link
          to="/phase-8"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Phase 8 — SEO</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
