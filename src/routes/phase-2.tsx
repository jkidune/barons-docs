import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/phase-2')({
  component: Phase2Page,
})

function Phase2Page() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Build Phases
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Phase 2 — API Layer
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          All WordPress data fetching lives in one file: <code>src/lib/wordpress.ts</code>
        </p>
      </div>

      <h2 id="types" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        TypeScript Types
      </h2>
      <pre><code>{`// src/lib/wordpress.ts
const WP_API = process.env.NEXT_PUBLIC_WP_API_URL;

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details: { sizes: {
        medium_large?: { source_url: string };
        large?: { source_url: string };
        full: { source_url: string };
      }};
    }>;
  };
}

export interface WPProject extends WPPost {
  acf: {
    project_category?: string;
    project_partner?: string;
    project_overview?: string;
    project_location?: string;
  };
}`}</code></pre>

      <h2 id="fetch-functions" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Fetch Functions
      </h2>
      <pre><code>{`export async function getAllPosts(perPage = 12): Promise<WPPost[]> {
  const res = await fetch(
    \`\${WP_API}/posts?_embed&per_page=\${perPage}&status=publish\`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(\`Failed to fetch posts: \${res.status}\`);
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(\`\${WP_API}/posts?slug=\${slug}&_embed\`,
    { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  const posts: WPPost[] = await res.json();
  return posts[0] ?? null;
}

export async function getLatestPost(): Promise<WPPost | null> {
  const res = await fetch(\`\${WP_API}/posts?_embed&per_page=1&status=publish\`,
    { next: { revalidate: 1800 } });
  if (!res.ok) return null;
  const posts: WPPost[] = await res.json();
  return posts[0] ?? null;
}

export async function getAllProjects(): Promise<WPProject[]> {
  const res = await fetch(\`\${WP_API}/projects?_embed&per_page=100&status=publish\`,
    { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(\`Failed to fetch projects: \${res.status}\`);
  return res.json();
}

export async function getProjectBySlug(slug: string): Promise<WPProject | null> {
  const res = await fetch(\`\${WP_API}/projects?slug=\${slug}&_embed\`,
    { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  const projects: WPProject[] = await res.json();
  return projects[0] ?? null;
}`}</code></pre>

      <h2 id="helpers" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Image Helper Functions
      </h2>
      <pre><code>{`export function getFeaturedImageUrl(
  post: WPPost,
  size: "large" | "full" = "large"
): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return "/images/fallback.jpg";
  if (size === "large") {
    return media.media_details?.sizes?.large?.source_url
        ?? media.media_details?.sizes?.medium_large?.source_url
        ?? media.source_url;
  }
  return media.source_url;
}

export function getFeaturedImageAlt(post: WPPost): string {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text
    ?? post.title.rendered;
}`}</code></pre>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          Always use <code>?_embed</code> in API requests to get featured images in a single request. Without it you would need a second request per post to get the image URL.
        </p>
      </div>

      <h2 id="test" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Test from Terminal
      </h2>
      <pre><code>{`curl "https://cms.yourdomain.com/wp-json/wp/v2/posts?_embed&per_page=1"
# If you get JSON -> connected
# If you get HTML -> check WordPress permalink settings`}</code></pre>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/phase-1"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Phase 1 — Scaffold</span>
        </Link>
        <Link
          to="/phase-3"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Phase 3 — Dynamic Pages</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
