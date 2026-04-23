import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/phase-6')({
  component: Phase6Page,
})

function Phase6Page() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Build Phases
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Phase 6 — Going Headless
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Disable the WordPress frontend once your Next.js site is live.
        </p>
      </div>

      <h2 id="method-a" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        Method A — Headless Mode Plugin (Recommended)
      </h2>
      <ol style={{ paddingLeft: '1.4rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <li style={{ color: 'var(--muted)' }}>Go to <strong style={{ color: 'var(--text)' }}>Plugins &rarr; Add New</strong></li>
        <li style={{ color: 'var(--muted)' }}>Search <strong style={{ color: 'var(--text)' }}>Headless Mode</strong> by WP Engine</li>
        <li style={{ color: 'var(--muted)' }}>Install and Activate</li>
      </ol>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '68ch' }}>
        Done. All WordPress frontend URLs now redirect to your Next.js site. <code>/wp-admin</code> and <code>/wp-json</code> keep working normally.
      </p>

      <h2 id="method-b" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Method B — Manual Redirect
      </h2>
      <pre><code>{`// functions.php
function redirect_frontend_to_nextjs() {
    if (is_admin()
        || strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false
        || strpos($_SERVER['REQUEST_URI'], '/wp-login.php') !== false) { return; }
    wp_redirect('https://yourdomain.com' . $_SERVER['REQUEST_URI'], 301);
    exit;
}
add_action('template_redirect', 'redirect_frontend_to_nextjs');`}</code></pre>

      <div className="callout callout-warn">
        <span className="callout-icon">!</span>
        <p>
          Use Method A unless you have a specific reason to do it manually. The plugin is maintained by WP Engine and handles edge cases like feed URLs and sitemaps automatically.
        </p>
      </div>

      <h2 id="verify" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Verify After Going Headless
      </h2>
      <pre><code>{`# REST API must still return JSON
curl https://cms.yourdomain.com/wp-json/wp/v2/posts | head -c 200

# WordPress frontend must redirect
curl -I https://cms.yourdomain.com/
# Expected: HTTP/2 301 -> https://yourdomain.com/`}</code></pre>

      <h2 id="important" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Important Notes
      </h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Thing</th><th>Status after going headless</th></tr></thead>
          <tbody>
            <tr><td>WordPress frontend (themes)</td><td>Redirects to Next.js — visitors never see it</td></tr>
            <tr><td><code>/wp-admin</code></td><td>Still works — editors log in here as usual</td></tr>
            <tr><td><code>/wp-json</code></td><td>Still works — Next.js fetches from here</td></tr>
            <tr><td><code>/wp-login.php</code></td><td>Still works — needed for admin access</td></tr>
            <tr><td>Active theme</td><td>Keep one active — WordPress requires it even headless</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          Never delete the active theme. Even in headless mode WordPress requires an active theme to function. Keep Twenty Twenty-Four active — visitors will never see it.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/phase-5"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Phase 5 — ISR Webhooks</span>
        </Link>
        <Link
          to="/phase-7"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Phase 7 — Domains</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
