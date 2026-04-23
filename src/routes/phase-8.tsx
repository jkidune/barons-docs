import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/phase-8')({
  component: Phase8Page,
})

function Phase8Page() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Build Phases
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Phase 8 — SEO & Metadata
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Dynamic per-page metadata and auto-generated sitemaps.
        </p>
      </div>

      <h2 id="yoast" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        Yoast SEO Integration
      </h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem', maxWidth: '68ch' }}>
        Yoast exposes its SEO data via <code>yoast_head_json</code> in the REST API response. Extend your WPPost type to include it:
      </p>
      <pre><code>{`// Extended type for posts with Yoast data
export interface WPPostWithYoast extends WPPost {
  yoast_head_json: {
    title: string;
    description: string;
    og_image?: Array<{ url: string; width: number; height: number }>;
    canonical: string;
  };
}

// In your [slug]/page.tsx generateMetadata:
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug) as WPPostWithYoast;
  if (!post) return {};
  const y = post.yoast_head_json;
  return {
    title: y?.title ?? post.title.rendered,
    description: y?.description ?? "",
    openGraph: {
      images: y?.og_image?.map(img => ({
        url: img.url,
        width: img.width,
        height: img.height
      })),
    },
    alternates: { canonical: y?.canonical },
  };
}`}</code></pre>

      <h2 id="sitemap" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Auto-generated Sitemap
      </h2>
      <pre><code>{`// src/app/sitemap.ts
import { getAllPosts, getAllProjects } from "@/lib/wordpress";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts    = await getAllPosts(100);
  const projects = await getAllProjects();
  const base     = "https://yourdomain.com";

  return [
    { url: base,               changeFrequency: "daily",   priority: 1 },
    { url: \`\${base}/blog\`,     changeFrequency: "daily",   priority: 0.9 },
    { url: \`\${base}/projects\`, changeFrequency: "weekly",  priority: 0.9 },
    ...posts.map(p => ({
      url: \`\${base}/blog/\${p.slug}\`,
      lastModified: new Date(p.modified),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...projects.map(p => ({
      url: \`\${base}/projects/\${p.slug}\`,
      lastModified: new Date(p.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}`}</code></pre>

      <h2 id="robots" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Robots.txt
      </h2>
      <pre><code>{`// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}`}</code></pre>

      <h2 id="checklist" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        SEO Checklist
      </h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>How</th></tr></thead>
          <tbody>
            <tr><td>Page title</td><td><code>generateMetadata</code> per route</td></tr>
            <tr><td>Meta description</td><td>Yoast <code>yoast_head_json.description</code></td></tr>
            <tr><td>Open Graph image</td><td>Yoast <code>og_image</code> or featured image URL</td></tr>
            <tr><td>Canonical URL</td><td>Yoast <code>canonical</code> field</td></tr>
            <tr><td>Sitemap</td><td><code>src/app/sitemap.ts</code> — auto-submits to Google</td></tr>
            <tr><td>Robots.txt</td><td><code>src/app/robots.ts</code></td></tr>
            <tr><td>Structured data</td><td>Add JSON-LD in page components for articles</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          After deploying, submit your sitemap to Google Search Console at <code>yourdomain.com/sitemap.xml</code>. This speeds up indexing significantly.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/phase-7"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Phase 7 — Domains</span>
        </Link>
        <Link
          to="/phase-9"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Phase 9 — Deployment</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
