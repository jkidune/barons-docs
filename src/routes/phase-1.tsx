import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/phase-1')({
  component: Phase1Page,
})

function Phase1Page() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Build Phases
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Phase 1 — Next.js Scaffold
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Bootstrap the frontend project with TypeScript, Tailwind, and the App Router.
        </p>
      </div>

      <h2 id="create" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        Create the Project
      </h2>
      <pre><code>{`npx create-next-app@latest my-project \\
  --typescript \\
  --tailwind \\
  --eslint \\
  --app \\
  --src-dir \\
  --import-alias "@/*"

cd my-project`}</code></pre>

      <h2 id="dependencies" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Install Dependencies
      </h2>
      <pre><code>{`pnpm add framer-motion                  # Animations
pnpm add sharp                           # Required for Next.js Image
pnpm add @tailwindcss/typography         # Styles WordPress HTML content
pnpm add -D @types/node                  # Node.js type definitions`}</code></pre>

      <h2 id="structure" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Folder Structure
      </h2>
      <pre><code>{`src/
├── app/
│   ├── layout.tsx            # Root layout (header, footer, fonts)
│   ├── page.tsx              # Homepage
│   ├── blog/
│   │   ├── page.tsx          # Blog listing
│   │   └── [slug]/page.tsx   # Individual blog post
│   ├── projects/
│   │   ├── page.tsx          # Projects listing
│   │   └── [slug]/page.tsx   # Individual project
│   └── api/revalidate/
│       └── route.ts          # Webhook endpoint for ISR
├── components/               # Reusable UI components
├── lib/
│   └── wordpress.ts          # All WordPress API fetch functions
└── types/
    └── wordpress.ts          # TypeScript type definitions`}</code></pre>

      <h2 id="config" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Configure next.config.ts
      </h2>
      <pre><code>{`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.yourdomain.com",   // Your WordPress domain
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;`}</code></pre>
      <div className="callout callout-error">
        <span className="callout-icon">!</span>
        <p>Without adding the WordPress hostname to <code>remotePatterns</code>, all WordPress media images will fail to load in Image components.</p>
      </div>

      <h2 id="env" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Environment Variables
      </h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
        Create <code>.env.local</code> in your project root:
      </p>
      <pre><code>{`# .env.local
NEXT_PUBLIC_WP_API_URL=https://cms.yourdomain.com/wp-json/wp/v2
REVALIDATION_SECRET=your-super-secret-key-here`}</code></pre>
      <div className="callout callout-warn">
        <span className="callout-icon">!</span>
        <p>Never prefix secrets with <code>NEXT_PUBLIC_</code> — that exposes them to the browser. Only the API URL is safe to expose.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/phase-0"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Phase 0 — WordPress</span>
        </Link>
        <Link
          to="/phase-2"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Phase 2 — API Layer</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
