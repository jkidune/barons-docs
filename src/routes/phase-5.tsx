import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/phase-5')({
  component: Phase5Page,
})

function Phase5Page() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Build Phases
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Phase 5 — ISR & Revalidation Webhooks
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Fresh content seconds after publishing — no full rebuild needed.
        </p>
      </div>

      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.5rem', maxWidth: '68ch' }}>
        <strong style={{ color: 'var(--text)' }}>Without ISR:</strong> New WordPress content only appears after running <code>vercel build</code> again.
      </p>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '68ch' }}>
        <strong style={{ color: 'var(--text)' }}>With ISR:</strong> New content appears seconds after publishing in wp-admin.
      </p>

      <h2 id="step1" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Step 1 — Create the Revalidation Endpoint
      </h2>
      <pre><code>{`// src/app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
  const { post_type, slug } = await request.json();

  if (post_type === "post") {
    revalidatePath(\`/blog/\${slug}\`);
    revalidatePath("/blog");
  } else if (post_type === "projects") {
    revalidatePath(\`/projects/\${slug}\`);
    revalidatePath("/projects");
  }
  revalidatePath("/"); // Always revalidate homepage (news banner)
  return NextResponse.json({ revalidated: true, post_type, slug });
}`}</code></pre>

      <h2 id="step2" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Step 2 — Trigger Webhook from WordPress
      </h2>
      <pre><code>{`// functions.php
function trigger_nextjs_revalidation($new_status, $old_status, $post) {
    if ($new_status !== 'publish') return;
    if (!in_array($post->post_type, ['post', 'projects', 'page'])) return;

    $secret = 'your-super-secret-key-here';
    $url    = 'https://yourdomain.com/api/revalidate?secret=' . $secret;

    wp_remote_post($url, array(
        'headers'  => array('Content-Type' => 'application/json'),
        'body'     => json_encode(array(
            'post_type' => $post->post_type,
            'slug'      => $post->post_name
        )),
        'timeout'  => 15,
        'blocking' => false,
    ));
}
add_action('transition_post_status', 'trigger_nextjs_revalidation', 10, 3);`}</code></pre>

      <h2 id="step3" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Step 3 — Add Secret to Vercel
      </h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem', maxWidth: '68ch' }}>
        Go to your Vercel project &rarr; <strong style={{ color: 'var(--text)' }}>Settings &rarr; Environment Variables</strong> and add:
      </p>
      <pre><code>{`REVALIDATION_SECRET = your-super-secret-key-here`}</code></pre>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: '0.75rem', maxWidth: '68ch' }}>
        Then redeploy once for the variable to take effect.
      </p>

      <h2 id="test" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Test the Webhook Locally
      </h2>
      <pre><code>{`curl -X POST "http://localhost:3000/api/revalidate?secret=your-secret" \\
  -H "Content-Type: application/json" \\
  -d '{"post_type":"post","slug":"hello-world"}'

# Expected response:
# {"revalidated":true,"post_type":"post","slug":"hello-world"}`}</code></pre>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          Set <code>blocking =&gt; false</code> in the WordPress <code>wp_remote_post</code> call. This means WordPress does not wait for Next.js to respond before returning control to the editor — publish feels instant.
        </p>
      </div>

      <h2 id="revalidate-times" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Recommended Revalidation Times
      </h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Page Type</th><th>Revalidate Value</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>Static pages (About, Contact)</td><td><code>86400</code> (24h)</td><td>Content rarely changes</td></tr>
            <tr><td>Blog posts</td><td><code>3600</code> (1h)</td><td>Webhook handles instant updates</td></tr>
            <tr><td>Blog listing</td><td><code>3600</code> (1h)</td><td>New posts trigger revalidation</td></tr>
            <tr><td>Homepage news banner</td><td><code>1800</code> (30min)</td><td>Should feel fresh</td></tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/phase-4"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Phase 4 — Forms</span>
        </Link>
        <Link
          to="/phase-6"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Phase 6 — Go Headless</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
