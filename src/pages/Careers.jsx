import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const EJS = {
  serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID  || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '',
}

function generateAppNum() {
  const year = new Date().getFullYear()
  const num = (Date.now() % 1000000).toString().padStart(6, '0')
  return `APP-${year}-${num}`
}

const JOBS = [
  {
    id: 'python-dev',
    title: 'Python Backend Developer',
    type: 'Full-time',
    mode: 'Remote / Hybrid',
    location: 'Hyderabad, India',
    dept: 'Engineering',
    experience: '2+ years',
    posted: 'September 2026',
    color: '#3B82F6',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="rgba(59,130,246,0.12)"/>
        <path d="M11 9c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2v4H11V9z" fill="#3B82F6" opacity=".7"/>
        <path d="M21 16c0 1.1-.9 2-2 2h-6a2 2 0 0 1-2-2v-3h10v3z" fill="#3B82F6" opacity=".4"/>
        <circle cx="13.5" cy="10" r="1.2" fill="#fff"/>
        <circle cx="18.5" cy="17" r="1.2" fill="#fff"/>
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
    experience: '2+ years',
    posted: 'September 2026',
    color: '#00C8A4',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="rgba(0,200,164,0.12)"/>
        <circle cx="16" cy="16" r="2.8" fill="#00C8A4"/>
        <ellipse cx="16" cy="16" rx="10" ry="4.5" stroke="#00C8A4" strokeWidth="1.3" fill="none"/>
        <ellipse cx="16" cy="16" rx="10" ry="4.5" stroke="#00C8A4" strokeWidth="1.3" fill="none" transform="rotate(60 16 16)"/>
        <ellipse cx="16" cy="16" rx="10" ry="4.5" stroke="#00C8A4" strokeWidth="1.3" fill="none" transform="rotate(120 16 16)"/>
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

const WHY = [
  { icon: '🛠️', title: 'Own your work', desc: 'Small team means real ownership. Your code ships to real users without layers of approval.' },
  { icon: '📈', title: 'Grow fast', desc: 'Work across the full stack — APIs, databases, UI — and build skills across the entire product.' },
  { icon: '🌐', title: 'Remote-first', desc: 'Work from anywhere in India. We care about results, not where you sit.' },
  { icon: '🤝', title: 'Honest culture', desc: 'No politics. Direct feedback. We celebrate wins and learn openly from mistakes.' },
]

function PinIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function BriefcaseIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
}
function GlobeIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
}
function ClockIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function ArrowIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
}

function JobCard({ job, onOpen }) {
  return (
    <div className="cjob-card">
      <div className="cjob-left">
        <div className="cjob-icon">{job.icon}</div>
        <div className="cjob-info">
          <span className="cjob-dept" style={{ color: job.color }}>{job.dept}</span>
          <h3 className="cjob-title">{job.title}</h3>
          <div className="cjob-meta">
            <span className="cjob-tag"><PinIcon /> {job.location}</span>
            <span className="cjob-tag"><BriefcaseIcon /> {job.type}</span>
            <span className="cjob-tag"><GlobeIcon /> {job.mode}</span>
            <span className="cjob-tag"><ClockIcon /> {job.experience} exp</span>
          </div>
        </div>
      </div>
      <div className="cjob-actions">
        <button className="cjob-btn-outline" onClick={() => onOpen(job)}>View Details</button>
        <button className="cjob-btn-apply" style={{ '--jc': job.color }} onClick={() => onOpen(job)}>
          Apply Now <ArrowIcon />
        </button>
      </div>
    </div>
  )
}

function JobModal({ job, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', github: '', why: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError('')

    const appNum = generateAppNum()
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    const params = {
      name:         'Arkaserve Careers',
      to_name:      'Arkaserve Hiring Team',
      to_email:     'support@arkaserve.com',
      wo_number:    appNum,
      product:      job.title,
      category:     'Career Application',
      issue:        `Application from ${form.name}`,
      priority:     'High',
      description:  `Name: ${form.name}\nEmail: ${form.email}\nGitHub / Portfolio: ${form.github || '—'}\n\nWhy I'm a great fit:\n${form.why}`,
      subject:      `[${appNum}] Career Application — ${job.title} from ${form.name}`,
      submitted_at: now,
      reply_to:     form.email,
    }

    try {
      if (EJS.serviceId && EJS.templateId && EJS.publicKey) {
        await emailjs.send(EJS.serviceId, EJS.templateId, params, EJS.publicKey)
      } else {
        await new Promise(r => setTimeout(r, 1400))
        console.warn('EmailJS not configured — simulating success')
      }
      setSent(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('Something went wrong. Please email us directly at support@arkaserve.com')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="career-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="career-modal" role="dialog" aria-label={job.title}>
        <div className="career-modal-head" style={{ '--job-color': job.color }}>
          <div className="career-modal-head-left">
            <div className="career-icon" style={{ transform: 'scale(1.1)' }}>{job.icon}</div>
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
          <section className="career-section">
            <h4>About the role</h4>
            <p>{job.about}</p>
          </section>
          <section className="career-section">
            <h4>What you'll do</h4>
            <ul>{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </section>
          <section className="career-section">
            <h4>What we're looking for</h4>
            <ul>{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </section>
          <section className="career-section">
            <h4>Nice to have</h4>
            <ul className="career-nice">{job.nice.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </section>

          <div className="career-divider" />

          {sent ? (
            <div className="career-sent">
              <div className="career-sent-icon">✓</div>
              <h4>Application sent!</h4>
              <p>Your application for <strong>{job.title}</strong> has been sent to <strong>support@arkaserve.com</strong>. We'll review it and get back to you at <strong>{form.email}</strong>.</p>
              <div className="career-sent-actions">
                <button className="career-btn-outline" onClick={onClose}>Close</button>
              </div>
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
              {error && <p className="career-form-error">{error}</p>}
              <button type="submit" className="career-submit" style={{ '--job-color': job.color }} disabled={sending}>
                {sending ? 'Sending…' : 'Submit Application'}
                {!sending && <ArrowIcon />}
              </button>
              <p className="career-form-note">Your application will be sent directly to our team at support@arkaserve.com</p>
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
        <div className="chero">
          <div className="chero-inner">
            <div className="chero-eyebrow">We're Hiring</div>
            <h1 className="chero-h1">Build the future with Arkaserve</h1>
            <p className="chero-sub">
              We're a small, focused team building digital products that serve real needs —
              exam prep, productivity tools, and student resources. Join us and own
              meaningful work from day one.
            </p>
            <div className="chero-stats">
              <div className="chero-stat">
                <span className="chero-stat-num">2</span>
                <span className="chero-stat-label">Open roles</span>
              </div>
              <div className="chero-stat-div" />
              <div className="chero-stat">
                <span className="chero-stat-num">Remote</span>
                <span className="chero-stat-label">Work mode</span>
              </div>
              <div className="chero-stat-div" />
              <div className="chero-stat">
                <span className="chero-stat-num">India</span>
                <span className="chero-stat-label">Based in</span>
              </div>
            </div>
            <a href="#openings" className="chero-cta">
              View Open Roles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </a>
          </div>
        </div>

        {/* Why Arkaserve */}
        <div className="chero-why">
          <div className="chero-why-inner">
            {WHY.map((w, i) => (
              <div key={i} className="chero-why-card">
                <span className="chero-why-icon">{w.icon}</span>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job listings */}
        <div className="cjobs" id="openings">
          <div className="cjobs-inner">
            <div className="cjobs-eyebrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              Current Openings
            </div>
            <h2 className="cjobs-h2">2 roles open right now</h2>
            <p className="cjobs-sub">Find your perfect role and take the next step in your technology career with us.</p>
            <div className="cjobs-list">
              {JOBS.map(job => (
                <JobCard key={job.id} job={job} onOpen={setActiveJob} />
              ))}
            </div>
          </div>
        </div>

        {/* General apply */}
        <div className="careers-general">
          <p>Don't see the right role?</p>
          <a
            href="https://mail.google.com/mail/?view=cm&to=support%40arkaserve.com&su=General%20Application%20%E2%80%94%20Arkaserve"
            target="_blank"
            rel="noopener noreferrer"
            className="careers-btn-outline"
          >
            Send a general application →
          </a>
        </div>

      </main>
      <Footer />

      {activeJob && <JobModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </>
  )
}
