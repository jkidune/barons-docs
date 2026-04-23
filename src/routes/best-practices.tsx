import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/best-practices')({
  component: BestPracticesPage,
})

function BestPracticesPage() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Reference
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Best Practices
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Patterns that keep your headless WordPress project maintainable and secure.
        </p>
      </div>

      <h2 id="code" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        Code Organisation
      </h2>
      <ul style={{ paddingLeft: '1.4rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>One file for all WordPress fetches.</strong> Keep all API calls in <code>src/lib/wordpress.ts</code>. Never fetch directly inside components.</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Type everything.</strong> Define TypeScript interfaces for every WordPress data shape. It catches errors before production.</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Keep components focused.</strong> Server components fetch data. Client components handle interactivity. Do not mix them.</li>
      </ul>

      <h2 id="wordpress" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        WordPress Administration
      </h2>
      <ul style={{ paddingLeft: '1.4rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Never delete the active theme.</strong> Even headless WordPress needs an active theme. Keep Twenty Twenty-Four active — it will not be visible to users.</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Use a staging environment</strong> before editing <code>functions.php</code>. A PHP syntax error can lock you out of wp-admin entirely.</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Back up before every major change.</strong> Hostinger has built-in backups. Use them.</li>
      </ul>

      <h2 id="security" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Security
      </h2>
      <ul style={{ paddingLeft: '1.4rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Never commit <code>.env.local</code> to GitHub.</strong> Add it to <code>.gitignore</code>. Use Vercel or Cloudflare environment variable settings for production values.</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Rotate your revalidation secret</strong> if you think it was exposed.</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Keep all WordPress plugins updated.</strong> Plugin vulnerabilities are the most common WordPress attack vector.</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Use a strong password</strong> for the WordPress admin — the CMS is now publicly reachable via its subdomain.</li>
      </ul>

      <h2 id="performance" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Performance
      </h2>
      <ul style={{ paddingLeft: '1.4rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Always use <code>?_embed</code></strong> in API requests to get featured images in a single request.</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Use Next.js Image for all images</strong> — automatic WebP conversion, lazy loading, and responsive sizes.</li>
        <li style={{ color: 'var(--muted)', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Set appropriate revalidate values:</strong></li>
      </ul>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Page Type</th><th>Revalidate</th></tr></thead>
          <tbody>
            <tr><td>Static pages (About, Contact)</td><td><code>86400</code> (24h)</td></tr>
            <tr><td>Blog posts</td><td><code>3600</code> (1h)</td></tr>
            <tr><td>Homepage news banner</td><td><code>1800</code> (30min)</td></tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/hacks"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Hacks & Gotchas</span>
        </Link>
        <Link
          to="/troubleshooting"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Troubleshooting</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
