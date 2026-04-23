import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/phase-4')({
  component: Phase4Page,
})

function Phase4Page() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Build Phases
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Phase 4 — Forms & Submissions
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          Contact Form 7 integration via the WordPress REST API.
        </p>
      </div>

      <h2 id="cf7-setup" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
        Find Your Form ID
      </h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem', maxWidth: '68ch' }}>
        In WordPress admin, go to <strong style={{ color: 'var(--text)' }}>Contact &rarr; Contact Forms</strong>. Click your form — the URL will show <code>?post=123</code>. That number is your Form ID.
      </p>

      <h2 id="contact-form" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Contact Form Component
      </h2>
      <pre><code>{`// src/components/ContactForm.tsx
"use client";
import { useState } from "react";

// Replace YOUR_FORM_ID with the numeric ID from CF7 admin URL (?post=123)
const CF7_URL = \`\${process.env.NEXT_PUBLIC_WP_API_URL
  ?.replace("/wp/v2","")}/contact-form-7/v1/contact-forms/YOUR_FORM_ID/feedback\`;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(CF7_URL, { method: "POST", body: formData });
      const result = await res.json();
      setStatus(result.status === "mail_sent" ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"  name="your-name"    placeholder="Your Name" required />
      <input type="email" name="your-email"   placeholder="Email"     required />
      <textarea          name="your-message"  placeholder="Message"   required />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && <p>Message sent!</p>}
      {status === "error"   && <p>Something went wrong. Please try again.</p>}
    </form>
  );
}`}</code></pre>

      <div className="callout callout-error">
        <span className="callout-icon">!</span>
        <p>
          The CF7 endpoint path is <code>/wp-json/contact-form-7/v1/contact-forms/ID/feedback</code> — not the standard <code>/wp/v2/</code> path. Replace <code>ID</code> with the numeric ID from the CF7 admin URL.
        </p>
      </div>

      <h2 id="cf7-fields" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        Matching Field Names
      </h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem', maxWidth: '68ch' }}>
        The <code>name</code> attribute on each input must match exactly what you set in the CF7 form editor in WordPress. Mismatched names are the most common cause of silent failures.
      </p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>CF7 Field Tag</th><th>HTML name attribute</th></tr></thead>
          <tbody>
            <tr><td><code>[text your-name]</code></td><td><code>name="your-name"</code></td></tr>
            <tr><td><code>[email your-email]</code></td><td><code>name="your-email"</code></td></tr>
            <tr><td><code>[textarea your-message]</code></td><td><code>name="your-message"</code></td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="cf7-response" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2rem 0 0.75rem', letterSpacing: '-0.015em' }}>
        API Response Statuses
      </h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><code>mail_sent</code></td><td>Form submitted and email sent successfully</td></tr>
            <tr><td><code>mail_failed</code></td><td>Form valid but email failed to send — check SMTP settings</td></tr>
            <tr><td><code>validation_failed</code></td><td>Required fields missing or invalid</td></tr>
            <tr><td><code>spam</code></td><td>Flagged by Akismet or honeypot</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-tip">
        <span className="callout-icon">TIP</span>
        <p>
          Test your form submission directly in the terminal first: <code>curl -X POST "https://cms.yourdomain.com/wp-json/contact-form-7/v1/contact-forms/123/feedback" -F "your-name=Test" -F "your-email=test@test.com" -F "your-message=Hello"</code>
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link
          to="/phase-3"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Previous</span>Phase 3 — Dynamic Pages</span>
        </Link>
        <Link
          to="/phase-5"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: 'var(--accent)', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          <span><span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.2 }}>Next</span>Phase 5 — ISR Webhooks</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  )
}
