import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const JOBS = [
  {
    id: 'python-dev',
    title: 'Python Backend Developer',
    type: 'Full-time',
    mode: 'Remote / Hybrid',
    location: 'Hyderabad, India',
    dept: 'Engineering',
    posted: 'September 2026',
    color: '#3B82F6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="1" y="1" width="26" height="26" rx="6" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.30)" strokeWidth="1.2"/>
        <path d="M10 8c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v3H10V8z" fill="#3B82F6" opacity=".7"/>
        <path d="M18 14c0 1.1-.9 2-2 2h-4a2 2 0 0 1-2-2v-3h8v3z" fill="#3B82F6" opacity=".4"/>
        <circle cx="12" cy="9" r="1" fill="#fff"/>
        <circle cx="16" cy="15" r="1" fill="#fff"/>
      </svg>
    ),
    about: 'We are looking for a skilled Python developer to build and maintain backend services for our MockTest and Academic Projects platforms. You will work on FastAPI-based REST APIs, PostgreSQL databases, and AI/ML integrations.',
    responsibilities: [
      'Design and develop RESTful APIs using FastAPI or Django REST Framework',
      'Work with PostgreSQL, Redis, and cloud storage (AWS S3)',
      'Integrate LLM/AI APIs for question generation and content workflows',
      'Write clean, well-tested code with proper documentation',
      'Collaborate with the frontend team on API contracts',
      'Deploy and monitor services on AWS EC2 / Render',
    ],
    requirements: [
      '2+ years of Python development experience',
      'Strong knowledge of FastAPI or Django REST Framework',
      'Experience with PostgreSQL and SQL query optimisation',
      'Familiarity with Docker, Git, and CI/CD pipelines',
      'Understanding of REST API design principles',
      'Bonus: experience with LangChain, OpenAI API, or Supabase',
    ],
    nice: [
      'Contributions to open-source Python projects',
      'Experience with async Python (asyncio, asyncpg)',
      'Knowledge of AWS services (EC2, RDS, S3)',
    ],
  },
  {
    id: 'react-dev',
    title: 'React Frontend Developer',
    type: 'Full-time',
    mode: 'Remote / Hybrid',
    location: 'Hyderabad, India',
    dept: 'Engineering',
    posted: 'September 2026',
    color: '#00C8A4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="1" y="1" width="26" height="26" rx="6" fill="rgba(0,200,164,0.12)" stroke="rgba(0,200,164,0.30)" strokeWidth="1.2"/>
        <circle cx="14" cy="14" r="2.5" fill="#00C8A4"/>
        <ellipse cx="14" cy="14" rx="9" ry="4" stroke="#00C8A4" strokeWidth="1.2" fill="none"/>
        <ellipse cx="14" cy="14" rx="9" ry="4" stroke="#00C8A4" strokeWidth="1.2" fill="none" transform="rotate(60 14 14)"/>
        <ellipse cx="14" cy="14" rx="9" ry="4" stroke="#00C8A4" strokeWidth="1.2" fill="none" transform="rotate(120 14 14)"/>
      </svg>
    ),
    about: 'We are hiring a React developer to craft fast, accessible, and beautiful user interfaces for our product suite — MockTest, PDF Tools, and Academic Projects. You will own the frontend experience end-to-end.',
    responsibilities: [
      'Build responsive UIs with React 18 + Vite and modern CSS',
      'Consume REST APIs and integrate real-time data with React Query or SWR',
      'Implement authentication flows (JWT, Supabase Auth)',
      'Write reusable component libraries with clean prop interfaces',
      'Optimise performance: code splitting, lazy loading, Core Web Vitals',
      'Work closely with the design vision and backend team',
    ],
    requirements: [
      '2+ years of React development experience',
      'Proficiency in JavaScript (ES2022+) and modern CSS/Flexbox/Grid',
      'Experience with React Router, state management (Context / Zustand)',
      'Familiarity with Vite, ESLint, and Git workflows',
      'Understanding of web accessibility (WCAG) and responsive design',
      'Bonus: experience with Tailwind CSS, Framer Motion, or Three.js',
    ],
    nice: [
      'Portfolio of shipped React projects or open-source contributions',
      'Experience with Supabase or Firebase for BaaS integrations',
      'Knowledge of TypeScript and basic testing (Vitest / Jest)',
    ],
  },
]

function JobCard({ job, onOpen }) {
  return (
    <div className="career-card" onClick={() => onOpen(job)}>
      <div className="career-card-top">
        <div className="career-icon">{job.icon}</div>
        <div className="career-badges">
          <span className="career-badge" style={{ color: job.color, background: `${job.color}18`, border: `1px solid ${job.color}30` }}>{job.dept}</span>
          <span className="career-badge">{job.type}</span>
          <span className="career-badge">{job.mode}</span>
        </div>
      </div>
      <h3 className="career-title">{job.title}</h3>
      <p className="career-location">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        {job.location} · Posted {job.posted}
      </p>
      <p className="career-about">{job.about.slice(0, 140)}…</p>
      <button className="career-apply-btn" style={{ '--job-color': job.color }} onClick={e => { e.stopPropagation(); onOpen(job) }}>
        View & Apply
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  )
}

function JobModal({ job, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', github: '', why: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Opens mail client with pre-filled body
    const subject = encodeURIComponent(`Application — ${job.title}`)
    const body = encodeURIComponent(
      `Hi Arkaserve Team,\n\nI'd like to apply for the ${job.title} role.\n\nName: ${form.name}\nEmail: ${form.email}\nGitHub / Portfolio: ${form.github}\n\nWhy I'm a fit:\n${form.why}\n\nLooking forward to hearing from you!\n\nBest regards,\n${form.name}`
    )
    window.open(`mailto:arkaserve@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
  }

  return (
    <div className="career-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="career-modal" role="dialog" aria-label={job.title}>
        {/* Header */}
        <div className="career-modal-head" style={{ '--job-color': job.color }}>
          <div className="career-modal-head-left">
            <div className="career-icon" style={{ transform: 'scale(1.2)' }}>{job.icon}</div>
            <div>
              <h2 className="career-modal-title">{job.title}</h2>
              <p className="career-modal-meta">{job.location} · {job.type} · {job.mode}</p>
            </div>
          </div>
          <button className="career-modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="career-modal-body">
          {/* About */}
          <section className="career-section">
            <h4>About the role</h4>
            <p>{job.about}</p>
          </section>

          {/* Responsibilities */}
          <section className="career-section">
            <h4>What you'll do</h4>
            <ul>{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </section>

          {/* Requirements */}
          <section className="career-section">
            <h4>What we're looking for</h4>
            <ul>{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </section>

          {/* Nice to have */}
          <section className="career-section">
            <h4>Nice to have</h4>
            <ul className="career-nice">{job.nice.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </section>

          <div className="career-divider" />

          {/* Apply form */}
          {sent ? (
            <div className="career-sent">
              <div className="career-sent-icon">✓</div>
              <h4>Application sent!</h4>
              <p>Your email client opened with a pre-filled message to <strong>arkaserve@gmail.com</strong>. Please send it to complete your application. We'll get back to you within 5 business days.</p>
              <button className="career-btn-outline" onClick={onClose}>Close</button>
            </div>
          ) : (
            <form className="career-form" onSubmit={handleSubmit}>
              <h4 className="career-form-title">Apply for this role</h4>
              <div className="career-form-row">
                <div className="career-field">
                  <label>Full name *</label>
                  <input required placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="career-field">
                  <label>Email address *</label>
                  <input required type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="career-field">
                <label>GitHub / Portfolio URL</label>
                <input placeholder="https://github.com/yourname" value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} />
              </div>
              <div className="career-field">
                <label>Why are you a great fit? *</label>
                <textarea required rows={4} placeholder="Tell us about your relevant experience and what excites you about Arkaserve…" value={form.why} onChange={e => setForm({ ...form, why: e.target.value })} />
              </div>
              <button type="submit" className="career-submit" style={{ '--job-color': job.color }}>
                Send Application
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
              <p className="career-form-note">This opens your email client to send the application to arkaserve@gmail.com</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Careers() {
  const [activeJob, setActiveJob] = useState(null)

  return (
    <>
      <Nav />
      <main className="careers-page">

        {/* Hero */}
        <div className="careers-hero">
          <div className="eyebrow">We're hiring</div>
          <h1>Build the future<br />with Arkaserve</h1>
          <p className="careers-hero-sub">
            We're a small, focused team building digital products that serve real needs —
            exam prep, productivity tools, and student resources. Join us and own meaningful work from day one.
          </p>
          <div className="careers-stats">
            <div className="careers-stat"><span className="careers-stat-num">2</span><span className="careers-stat-label">Open roles</span></div>
            <div className="careers-stat-div" />
            <div className="careers-stat"><span className="careers-stat-num">Remote</span><span className="careers-stat-label">Work mode</span></div>
            <div className="careers-stat-div" />
            <div className="careers-stat"><span className="careers-stat-num">India</span><span className="careers-stat-label">Based in</span></div>
          </div>
        </div>

        {/* Why Arkaserve */}
        <div className="careers-why">
          <div className="careers-why-inner">
            {[
              { icon: '🛠️', title: 'Own your work', desc: 'Small team means real ownership. Your code ships to real users without layers of approval.' },
              { icon: '📈', title: 'Grow fast', desc: 'Work across the full stack — APIs, databases, UI — and build skills across the entire product.' },
              { icon: '🌐', title: 'Remote-first', desc: 'Work from anywhere in India. We care about results, not where you sit.' },
              { icon: '🤝', title: 'Honest culture', desc: 'No politics. Direct feedback. We celebrate wins and learn openly from mistakes.' },
            ].map((w, i) => (
              <div key={i} className="careers-why-card">
                <span className="careers-why-icon">{w.icon}</span>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job listings */}
        <div className="careers-listings">
          <div className="careers-listings-label">Open positions</div>
          <h2 className="careers-listings-h2">2 roles open right now</h2>
          <div className="careers-grid">
            {JOBS.map(job => (
              <JobCard key={job.id} job={job} onOpen={setActiveJob} />
            ))}
          </div>
        </div>

        {/* General apply CTA */}
        <div className="careers-general">
          <p>Don't see the right role?</p>
          <a href="mailto:arkaserve@gmail.com?subject=General Application — Arkaserve" className="careers-btn-outline">
            Send a general application →
          </a>
        </div>

      </main>
      <Footer />

      {activeJob && <JobModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </>
  )
}
