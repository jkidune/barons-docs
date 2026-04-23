import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/cost')({
  component: CostPage,
})

function CostPage() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Getting Started
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Cost Breakdown
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          This stack can run for as little as $0–$4/month.
        </p>
      </div>

      <h2 id="tiers" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1rem', letterSpacing: '-0.015em' }}>
        Total Monthly Cost Tiers
      </h2>
      <div className="cost-grid">
        {[
          { tier: 'Free', price: '$0', unit: '/mo', desc: 'Learning, prototypes, personal sites' },
          { tier: 'Starter', price: '$3–5', unit: '/mo', desc: 'Small NGOs, portfolios, blogs' },
          { tier: 'Professional', price: '$25–30', unit: '/mo', desc: 'Businesses, client work' },
          { tier: 'Enterprise', price: '$100+', unit: '/mo', desc: 'High-traffic production sites' },
        ].map((c) => (
          <div key={c.tier} className="cost-card">
            <div className="tier">{c.tier}</div>
            <div className="price">{c.price}<span>{c.unit}</span></div>
            <div className="desc">{c.desc}</div>
          </div>
        ))}
      </div>

      <h2 id="wordpress-hosting" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        WordPress Backend Hosting
      </h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Provider</th><th>Plan</th><th>Monthly</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td>Hostinger</td><td>Shared Starter</td><td>$0–$3</td><td>Perfect for headless — only handles API requests</td></tr>
            <tr><td>Hostinger</td><td>Business</td><td>~$9</td><td>Staging environment, more resources</td></tr>
            <tr><td>Kinsta</td><td>Managed WP</td><td>$35+</td><td>Auto-scaling, built-in CDN</td></tr>
            <tr><td>WP Engine</td><td>Scale</td><td>$290+</td><td>Full SLA, dedicated resources</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="frontend-hosting" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Next.js Frontend Hosting
      </h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Provider</th><th>Plan</th><th>Monthly</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td>Vercel</td><td>Hobby</td><td><span style={{ fontSize: '0.7rem', fontWeight: 600, background: '#2a3828', color: '#6daa45', padding: '0.15rem 0.45rem', borderRadius: 999 }}>Free</span></td><td>100GB bandwidth, great for side projects</td></tr>
            <tr><td>Cloudflare Pages</td><td>Free</td><td><span style={{ fontSize: '0.7rem', fontWeight: 600, background: '#2a3828', color: '#6daa45', padding: '0.15rem 0.45rem', borderRadius: 999 }}>Free</span></td><td>Unlimited bandwidth, global CDN</td></tr>
            <tr><td>Netlify</td><td>Starter</td><td><span style={{ fontSize: '0.7rem', fontWeight: 600, background: '#2a3828', color: '#6daa45', padding: '0.15rem 0.45rem', borderRadius: 999 }}>Free</span></td><td>100GB bandwidth, 300 build min/mo</td></tr>
            <tr><td>Vercel</td><td>Pro</td><td>$20</td><td>Team collaboration, analytics</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="plugins" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Key WordPress Plugins
      </h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Plugin</th><th>Free?</th><th>Paid</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td>Advanced Custom Fields</td><td style={{ color: '#6daa45' }}>✓ Core</td><td>$149/yr Pro</td><td>Custom post type fields</td></tr>
            <tr><td>Contact Form 7</td><td style={{ color: '#6daa45' }}>✓ Full</td><td>Free</td><td>Contact and subscription forms</td></tr>
            <tr><td>Headless Mode (WP Engine)</td><td style={{ color: '#6daa45' }}>✓ Full</td><td>Free</td><td>Disables WordPress frontend</td></tr>
            <tr><td>JWT Authentication</td><td style={{ color: '#6daa45' }}>✓ Full</td><td>Free</td><td>API token authentication</td></tr>
            <tr><td>Yoast SEO</td><td style={{ color: '#6daa45' }}>✓ Basic</td><td>$99/yr Pro</td><td>SEO metadata via REST API</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-tip">
        <span className="callout-icon">��</span>
        <p>
          <strong style={{ color: 'var(--text)' }}>Our setup:</strong> Hostinger Shared ($3/mo) + Vercel Hobby (Free) + Namecheap domain (~$20/yr). Total: ~$3–4/month.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/architecture"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Architecture</span>
        </Link>
        <Link
          to="/prerequisites"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Prerequisites</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
