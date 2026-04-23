import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/phase-9')({
  component: Phase9Page,
})

function Phase9Page() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Build Phases
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Phase 9 — Deployment
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Deploy to Vercel or Cloudflare Pages and verify everything works.
        </p>
      </div>

      <h2 id="checklist" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        Pre-Deployment Checklist
      </h2>
      <pre><code>{`pnpm tsc --noEmit          # Check TypeScript errors
pnpm eslint src/           # Run linter
pnpm build && pnpm start   # Test production build locally
# Visit all key routes at localhost:3000`}</code></pre>

      <h2 id="vercel" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Deploy to Vercel
      </h2>
      <pre><code>{`# Option A: GitHub auto-deploy (recommended)
git push origin main   # Vercel deploys on every push

# Option B: Vercel CLI
npm install -g vercel
vercel --prod`}</code></pre>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, margin: '1rem 0 0.75rem', maxWidth: '68ch' }}>
        Add environment variables in <strong style={{ color: 'var(--text)' }}>Vercel &rarr; Settings &rarr; Environment Variables</strong>:
      </p>
      <pre><code>{`NEXT_PUBLIC_WP_API_URL  =  https://cms.yourdomain.com/wp-json/wp/v2
REVALIDATION_SECRET     =  your-secret-key`}</code></pre>

      <h2 id="cloudflare" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Deploy to Cloudflare Pages
      </h2>
      <pre><code>{`pnpm add -D @cloudflare/next-on-pages

# Add to package.json scripts:
# "pages:build":  "npx @cloudflare/next-on-pages",
# "pages:deploy": "wrangler pages deploy .vercel/output/static"

pnpm pages:build && pnpm pages:deploy`}</code></pre>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          Cloudflare Pages gives you unlimited bandwidth on the free tier. For a documentation or marketing site this is almost always the better free option over Vercel Hobby.
        </p>
      </div>

      <h2 id="verify" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Post-Deploy Verification
      </h2>
      <pre><code>{`curl -I https://yourdomain.com/            # 200 OK
curl -I https://yourdomain.com/blog/       # 200 OK
curl -I https://yourdomain.com/sitemap.xml # 200 OK

# Test revalidation webhook
curl -X POST "https://yourdomain.com/api/revalidate?secret=your-secret" \\
  -H "Content-Type: application/json" \\
  -d '{"post_type":"post","slug":"test"}'`}</code></pre>

      <h2 id="cicd" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        CI/CD Flow Summary
      </h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Trigger</th><th>What happens</th></tr></thead>
          <tbody>
            <tr><td>Push to <code>main</code></td><td>Vercel auto-deploys full production build</td></tr>
            <tr><td>Push to any branch</td><td>Vercel creates a preview URL for that branch</td></tr>
            <tr><td>Publish post in WordPress</td><td>Webhook fires, Next.js revalidates affected pages only</td></tr>
            <tr><td>Pull request opened</td><td>Vercel posts a preview link in the PR comments</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="monitoring" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Monitoring & Logs
      </h2>
      <ul style={{ paddingLeft: '1.4rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Vercel Dashboard</strong> — real-time function logs, build logs, analytics</li>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Cloudflare Analytics</strong> — traffic, bandwidth, threat blocking</li>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Google Search Console</strong> — indexing status, search performance</li>
        <li style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Hostinger hPanel</strong> — WordPress error logs, PHP logs</li>
      </ul>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          Set up Vercel Speed Insights (free) to monitor Core Web Vitals in production. Go to your Vercel project &rarr; Analytics &rarr; Enable Speed Insights.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/phase-8"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Phase 8 — SEO</span>
        </Link>
        <Link
          to="/hacks"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Hacks & Gotchas</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
