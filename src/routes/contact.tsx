import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

const SERVICES = [
  { tag: 'WP', title: 'Headless WordPress Builds', desc: 'Lightning-fast frontends powered by Next.js with WordPress as the CMS. Your editors keep the workflow they know. Your users get blazing performance.' },
  { tag: 'WD', title: 'Full Website Design', desc: 'End-to-end design and development. From wireframes to live site — pixel-perfect, responsive, and built to convert.' },
  { tag: 'BI', title: 'Branding & Identity', desc: 'Logos, colour systems, typography, and brand guidelines that make your business impossible to ignore.' },
  { tag: 'SEO', title: 'SEO & Digital Marketing', desc: 'Technical SEO, content strategy, and digital campaigns that put your business in front of the right people at the right time.' },
]

function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    fetch('https://formspree.io/f/xwvwgjld', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, service, message }) }).then(() => { setSending(false); setSent(true) }).catch(() => { setSending(false) })
  }

  const inp: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    color: 'var(--text)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
  }

  const lbl: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--muted)',
    marginBottom: '0.4rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }

  return (
    <div>
      <div style={{ marginBottom: '3rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Barons Digital — Dar es Salaam
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.03em', color: 'var(--text)' }}>
          Lets build something<br />
          <span style={{ color: 'var(--accent)' }}>that actually works.</span>
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '60ch', lineHeight: 1.75, marginBottom: '1.5rem' }}>
          We are a Dar es Salaam-based creative agency building fast, modern websites and digital brands for businesses across East Africa and beyond. If you have a project in mind, we want to hear about it.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a href="https://wa.me/255719906205" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', background: '#25D366', color: '#fff', borderRadius: 10, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            WhatsApp Us
          </a>
          <a href="mailto:hello@barons-digital.com"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            hello@barons-digital.com
          </a>
        </div>
      </div>

      <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1rem', letterSpacing: '-0.015em' }}>
        What we do
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        {SERVICES.map((s) => (
          <div key={s.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem 1.35rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem', background: 'var(--accent-bg)', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: 6 }}>{s.tag}</div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>{s.title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.015em' }}>
        Start a project
      </h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '60ch' }}>
        Tell us what you need. We respond within 24 hours.
      </p>

      {sent ? (
        <div className="callout callout-tip" style={{ marginBottom: '2rem' }}>
          <span className="callout-icon">OK</span>
          <p><strong style={{ color: 'var(--text)' }}>Message received!</strong> We will get back to you within 24 hours. Reach us on WhatsApp for a faster response.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={lbl}>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" style={inp} />
            </div>
            <div>
              <label style={lbl}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" style={inp} />
            </div>
          </div>
          <div>
            <label style={lbl}>Service</label>
            <select value={service} onChange={(e) => setService(e.target.value)} required style={{ ...inp, cursor: 'pointer' }}>
              <option value="">Select a service...</option>
              <option value="headless">Headless WordPress Build</option>
              <option value="website">Full Website Design</option>
              <option value="branding">Branding and Identity</option>
              <option value="seo">SEO and Digital Marketing</option>
              <option value="other">Something else</option>
            </select>
          </div>
          <div>
            <label style={lbl}>Tell us about your project</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="What are you building? What is your timeline and budget?" rows={5} style={{ ...inp, resize: 'vertical' }} />
          </div>
          <button type="submit" disabled={sending}
            style={{ alignSelf: 'flex-start', padding: '0.75rem 1.75rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 10, fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', opacity: sending ? 0.7 : 1 }}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
        {[
          { label: 'WhatsApp', value: '+255 719 906 205', href: 'https://wa.me/255719906205' },
          { label: 'Email', value: 'hello@barons-digital.com', href: 'mailto:hello@barons-digital.com' },
          { label: 'Website', value: 'barons-digital.com', href: 'https://www.barons-digital.com' },
          { label: 'Instagram', value: '@barons_digital', href: 'https://instagram.com/barons_digital' },
          { label: 'LinkedIn', value: 'Barons Digital', href: 'https://www.linkedin.com/company/barons-digital/' },
          { label: 'Location', value: 'Dar es Salaam, Tanzania', href: '' },
        ].map((item) => (
          <div key={item.label}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{item.label}</p>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--accent)', textDecoration: 'none' }}>{item.value}</a>
            ) : (
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', margin: 0 }}>{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
