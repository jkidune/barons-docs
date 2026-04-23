import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/phase-3')({
  component: Phase3Page,
})

function Phase3Page() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Build Phases
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Phase 3 — Dynamic Pages
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Blog listing, individual posts, and the hero news banner.
        </p>
      </div>

      <h2 id="blog-listing" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        Blog Listing Page
      </h2>
      <pre><code>{`// src/app/blog/page.tsx
import { getAllPosts, getFeaturedImageUrl, getFeaturedImageAlt } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Blog | Your Site Name" };

export default async function BlogPage() {
  const posts = await getAllPosts(12);
  return (
    <main>
      <h1>Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id}>
            <Link href={\`/blog/\${post.slug}\`}>
              <Image
                src={getFeaturedImageUrl(post)}
                alt={getFeaturedImageAlt(post)}
                width={600} height={400} loading="lazy"
              />
              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year:"numeric", month:"long", day:"numeric"
                })}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}`}</code></pre>

      <h2 id="blog-post" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Dynamic Blog Post Page
      </h2>
      <pre><code>{`// src/app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts, getFeaturedImageUrl, getFeaturedImageAlt } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Image from "next/image";

// Pre-generate the 20 most recent posts at build time
export async function generateStaticParams() {
  const posts = await getAllPosts(20);
  return posts.map((post) => ({ slug: post.slug }));
}
export const dynamicParams = true; // Other pages generate on-demand

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160),
    openGraph: { images: [getFeaturedImageUrl(post, "full")] },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  return (
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <Image src={getFeaturedImageUrl(post,"full")} alt={getFeaturedImageAlt(post)}
        width={1200} height={630} priority />
      {/* Use prose class from @tailwindcss/typography to style WP content */}
      <div className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}`}</code></pre>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          WordPress content is raw HTML. Add <code>className="prose prose-lg max-w-none"</code> from <code>@tailwindcss/typography</code> to automatically style headings, paragraphs, links, images, and lists inside WordPress content.
        </p>
      </div>

      <h2 id="hero-banner" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Hero News Banner
      </h2>
      <pre><code>{`// src/components/HeroNewsBanner.tsx
import { getLatestPost } from "@/lib/wordpress";
import Link from "next/link";

export default async function HeroNewsBanner() {
  const post = await getLatestPost();
  if (!post) return null;
  return (
    <div className="bg-primary text-white py-2 px-4 text-sm">
      <span className="font-semibold mr-2">Latest:</span>
      <Link href={\`/blog/\${post.slug}\`} className="underline hover:no-underline"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
    </div>
  );
}`}</code></pre>

      <h2 id="params-note" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Key Concepts
      </h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Concept</th><th>What it does</th></tr></thead>
          <tbody>
            <tr><td><code>generateStaticParams</code></td><td>Pre-renders the N most recent pages at build time for instant load</td></tr>
            <tr><td><code>dynamicParams = true</code></td><td>Any slug not in static params generates on first request then caches</td></tr>
            <tr><td><code>generateMetadata</code></td><td>Per-page SEO title, description, and Open Graph image from WordPress</td></tr>
            <tr><td><code>dangerouslySetInnerHTML</code></td><td>Renders raw WordPress HTML — always pair with the prose class</td></tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/phase-2"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Phase 2 — API Layer</span>
        </Link>
        <Link
          to="/phase-4"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Phase 4 — Forms</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
