import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/phase-0')({
  component: Phase0Page,
})

function Phase0Page() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Build Phases
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Phase 0 — WordPress Setup
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Do these steps before writing any Next.js code.
        </p>
      </div>

      <div className="steps">

        <div className="step">
          <h4>Set Permalinks — Do This First</h4>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Go to <strong style={{ color: 'var(--text)' }}>Settings &rarr; Permalinks</strong>, select <strong style={{ color: 'var(--text)' }}>Post name</strong> (<code>/%postname%/</code>), click Save.
          </p>
          <div className="callout callout-error">
            <span className="callout-icon">!</span>
            <p>Without Post name permalinks, the REST API returns 404 for everything. Always set this first.</p>
          </div>
        </div>

        <div className="step">
          <h4>Test the REST API</h4>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Open your browser and visit these URLs. You should see a JSON array:
          </p>
          <pre><code>{`https://yourdomain.com/wp-json/wp/v2/posts
https://yourdomain.com/wp-json/wp/v2/pages`}</code></pre>
        </div>

        <div className="step">
          <h4>Install Required Plugins</h4>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Go to <strong style={{ color: 'var(--text)' }}>Plugins &rarr; Add New</strong> and install these:
          </p>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Plugin</th><th>Search For</th></tr></thead>
              <tbody>
                <tr><td>Headless Mode</td><td>Headless Mode WP Engine</td></tr>
                <tr><td>Advanced Custom Fields</td><td>Advanced Custom Fields</td></tr>
                <tr><td>Contact Form 7</td><td>Contact Form 7</td></tr>
                <tr><td>JWT Authentication</td><td>JWT Authentication for WP REST API</td></tr>
                <tr><td>Yoast SEO</td><td>Yoast SEO</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="step">
          <h4>Register Custom Post Types (CPTs)</h4>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Add to <code>functions.php</code> for any content beyond standard Posts:
          </p>
          <pre><code>{`function register_projects_cpt() {
    register_post_type('projects', array(
        'labels'       => array('name' => 'Projects', 'singular_name' => 'Project'),
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,      // CRITICAL: enables REST API
        'rest_base'    => 'projects',
        'supports'     => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
    ));
}
add_action('init', 'register_projects_cpt');`}</code></pre>
          <div className="callout callout-error">
            <span className="callout-icon">!</span>
            <p><code>show_in_rest =&gt; true</code> is mandatory. Without it, your CPT will be invisible to the REST API.</p>
          </div>
        </div>

        <div className="step">
          <h4>Add ACF Fields</h4>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Go to <strong style={{ color: 'var(--text)' }}>Custom Fields &rarr; Add New</strong>, create fields, set Location to your CPT. In field group settings, enable <strong style={{ color: 'var(--text)' }}>"Show in REST API"</strong>. Test with:
          </p>
          <pre><code>{`https://yourdomain.com/wp-json/wp/v2/projects?_embed&per_page=1
// Look for: "acf": { "your_field": "value" }`}</code></pre>
        </div>

        <div className="step">
          <h4>Configure CORS Headers</h4>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Add to <code>functions.php</code> so your Next.js frontend can fetch from WordPress:
          </p>
          <pre><code>{`function add_cors_headers() {
    header("Access-Control-Allow-Origin: https://yourdomain.com");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200); exit();
    }
}
add_action('init', 'add_cors_headers');`}</code></pre>
          <div className="callout callout-tip">
            <span className="callout-icon">TIP</span>
            <p>During local development, temporarily change <code>https://yourdomain.com</code> to <code>*</code> to allow all origins. Lock it down before going live.</p>
          </div>
        </div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/prerequisites"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Prerequisites</span>
        </Link>
        <Link
          to="/phase-1"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Phase 1 — Next.js Scaffold</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
