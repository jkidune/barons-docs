import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/troubleshooting')({
  component: TroubleshootingPage,
})

function TroubleshootingPage() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Reference
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Troubleshooting
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Step-by-step diagnosis for the most common issues.
        </p>
      </div>

      <h2 id="api" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        Diagnosing API Issues
      </h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.75rem', maxWidth: '68ch' }}>
        Always start here. Run these curl commands in order and stop at the first failure:
      </p>
      <pre><code>{`# 1. Is WordPress reachable at all?
curl -I https://cms.yourdomain.com
# Expected: 200 OK or 301

# 2. Is the REST API enabled?
curl https://cms.yourdomain.com/wp-json
# Expected: JSON with "namespaces" array

# 3. Can you fetch posts?
curl "https://cms.yourdomain.com/wp-json/wp/v2/posts?per_page=1"
# Expected: JSON array
# If HTML -> permalink issue (Settings -> Permalinks -> Post name)

# 4. Are embedded images included?
curl "https://cms.yourdomain.com/wp-json/wp/v2/posts?per_page=1&_embed" | grep source_url
# Expected: image URLs in output`}</code></pre>

      <h2 id="build" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Build & Deploy Failures
      </h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Error</th><th>Cause</th><th>Fix</th></tr></thead>
          <tbody>
            <tr>
              <td><code>Invalid src prop on Image</code></td>
              <td>WordPress domain not in remotePatterns</td>
              <td>Add hostname to <code>next.config.ts</code></td>
            </tr>
            <tr>
              <td><code>NEXT_PUBLIC_WP_API_URL is undefined</code></td>
              <td>Env var not set in Vercel</td>
              <td>Add it in Vercel Settings &rarr; Environment Variables</td>
            </tr>
            <tr>
              <td><code>Type error: Property acf does not exist</code></td>
              <td>Using WPPost instead of WPProject type</td>
              <td>Cast to <code>WPProject</code> or extend the interface</td>
            </tr>
            <tr>
              <td><code>404 on all dynamic routes</code></td>
              <td>Missing <code>dynamicParams = true</code></td>
              <td>Add <code>export const dynamicParams = true</code> to the route file</td>
            </tr>
            <tr>
              <td>Build times out on Vercel</td>
              <td>Too many pages in generateStaticParams</td>
              <td>Reduce to 20 most recent, let rest generate on demand</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="wordpress-issues" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        WordPress Admin Issues
      </h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Issue</th><th>Fix</th></tr></thead>
          <tbody>
            <tr>
              <td>Locked out of wp-admin after URL change</td>
              <td>Update <code>siteurl</code> and <code>home</code> in the WordPress database via phpMyAdmin in hPanel</td>
            </tr>
            <tr>
              <td>White screen after editing functions.php</td>
              <td>PHP syntax error. Use hPanel File Manager to revert the last change</td>
            </tr>
            <tr>
              <td>Plugin update broke the site</td>
              <td>Restore from Hostinger automatic backup (hPanel &rarr; Backups)</td>
            </tr>
            <tr>
              <td>Media uploads failing</td>
              <td>Check folder permissions — <code>wp-content/uploads</code> must be 755</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="cors" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        CORS Debugging
      </h2>
      <pre><code>{`# Check if CORS headers are present
curl -I -H "Origin: https://yourdomain.com" \\
  https://cms.yourdomain.com/wp-json/wp/v2/posts

# Look for this in the response:
# Access-Control-Allow-Origin: https://yourdomain.com

# If missing, add add_cors_headers() to functions.php (see Phase 0)`}</code></pre>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          When stuck, check the browser Network tab first. The actual error response from the WordPress API is almost always more informative than the React error message in the console.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/best-practices"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Best Practices</span>
        </Link>
        <Link
          to="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Back to start</span>Introduction</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
