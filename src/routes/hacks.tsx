import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/hacks')({
  component: HacksPage,
})

function HacksPage() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Reference
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Hacks & Gotchas
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Real issues encountered while building — not hypothetical.
        </p>
      </div>

      <div className="hack-grid">
        {[
          {
            problem: 'REST API returns 404 for everything',
            fix: 'WordPress permalinks set to default numeric format.',
            solution: 'Settings -> Permalinks -> Post name -> Save. Do this first, every time.',
          },
          {
            problem: 'ACF fields missing from API response',
            fix: 'ACF REST API exposure is off by default.',
            solution: 'In ACF field group settings, enable "Show in REST API". Also ensure CPT registration has show_in_rest => true.',
          },
          {
            problem: 'WordPress images do not load in Next.js',
            fix: 'WordPress hostname not in next.config.ts remotePatterns, or Hostinger hotlink protection blocks external requests.',
            solution: 'Add hostname to remotePatterns. In hPanel, disable Hotlink Protection or whitelist your Vercel domain.',
          },
          {
            problem: 'CORS error in browser console',
            fix: 'WordPress does not allow cross-origin requests by default.',
            solution: 'Add add_cors_headers() to functions.php. During development, temporarily use * as the allowed origin.',
          },
          {
            problem: 'Published posts do not appear on live site',
            fix: 'Next.js ISR has cached the old version. Without a webhook it never updates.',
            solution: 'Set up the revalidation webhook (Phase 5).',
          },
          {
            problem: 'WordPress content renders unstyled',
            fix: 'WordPress content is raw HTML. Your CSS does not target elements inside dangerouslySetInnerHTML.',
            solution: 'Add className="prose prose-lg max-w-none" using @tailwindcss/typography.',
          },
          {
            problem: 'CF7 form returns 404',
            fix: 'Wrong API endpoint path.',
            solution: 'Use /wp-json/contact-form-7/v1/contact-forms/ID/feedback. Get the ID from the CF7 admin URL (?post=123).',
          },
          {
            problem: 'Subdomain not working after DNS change',
            fix: 'DNS propagation takes time (up to 48h).',
            solution: 'Wait and verify at dnschecker.org or run dig cms.yourdomain.com in terminal.',
          },
          {
            problem: 'Build is very slow (generateStaticParams)',
            fix: 'Pre-rendering hundreds of pages at build time.',
            solution: 'Only pre-generate the 20 most recent. Set dynamicParams = true so older pages generate on first request.',
          },
          {
            problem: 'wp-admin unreachable after going headless',
            fix: 'WordPress is now at cms.yourdomain.com but team visits old URL.',
            solution: 'Add redirect in vercel.json. Bookmark cms.yourdomain.com/wp-admin.',
          },
        ].map((item) => (
          <div key={item.problem} className="hack-card">
            <div className="problem">x &nbsp;{item.problem}</div>
            <div className="fix">
              <strong>Cause:</strong> {item.fix}<br />
              <strong>Fix:</strong> {item.solution}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/phase-9"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Phase 9 — Deployment</span>
        </Link>
        <Link
          to="/best-practices"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Best Practices</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
