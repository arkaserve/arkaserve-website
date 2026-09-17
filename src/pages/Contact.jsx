import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import emailjs from '@emailjs/browser'

/* ─── Config (set in .env) ───────────────────────────────────────────────────── */
const EJS = {
  serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID  || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '',
}

/* ─── Product catalogue ──────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'mocktest', name: 'MockTest Platform', color: '#00C8A4',
    icon: '📝',
    categories: [
      { label: 'Bug Report',           subjects: ['Test not loading','Timer malfunction','Wrong score calculated','Options not clickable','PDF result broken','Question missing'] },
      { label: 'Account Issue',        subjects: ['Cannot log in','OTP not received','Password reset failed','Account locked','Profile update error'] },
      { label: 'Content Quality',      subjects: ['Wrong answer in key','Incorrect explanation','Outdated question','Translation error','Missing solution'] },
      { label: 'Subscription / Billing', subjects: ['Payment failed','Plan not activated','Refund request','Invoice needed','Plan upgrade issue'] },
      { label: 'Feature Request',      subjects: ['New exam category','Mobile app','Bookmarks','Custom mock tests','Analytics improvement','Offline mode'] },
      { label: 'Other',                subjects: ['General feedback','Collaboration inquiry','Other'] },
    ],
  },
  {
    id: 'pdftools', name: 'PDF Tools', color: '#F7A84A',
    icon: '📄',
    categories: [
      { label: 'Conversion Issue',     subjects: ['PDF to Word broken','Word to PDF error','Image to PDF fails','PDF to JPG quality','Excel conversion'] },
      { label: 'Tool Not Working',     subjects: ['Merge not working','Split fails','Compress gives error','OCR not recognizing','Watermark issue','Rotate broken'] },
      { label: 'File Upload Problem',  subjects: ['File too large','Unsupported format','Upload stuck','File corrupt after download'] },
      { label: 'Feature Request',      subjects: ['New tool request','Batch processing','API access','Cloud storage integration','Dark mode'] },
      { label: 'Other',                subjects: ['General feedback','Collaboration inquiry','Other'] },
    ],
  },
  {
    id: 'projects', name: 'Projects Hub', color: '#A78BFA',
    icon: '🗂️',
    categories: [
      { label: 'Content Error',        subjects: ['Incorrect information','Broken link','Outdated content','Missing resource'] },
      { label: 'Page Issue',           subjects: ['Page not loading','Broken layout','404 error','Slow performance'] },
      { label: 'Project Submission',   subjects: ['Submit my project','Update submission','Remove project'] },
      { label: 'Feature Request',      subjects: ['New category','Search improvement','Rating system','Comments / Discussion'] },
      { label: 'Other',                subjects: ['Collaboration','General feedback','Other'] },
    ],
  },
  {
    id: 'website', name: 'Website Designing', color: '#60A5FA',
    icon: '🖥️',
    categories: [
      { label: 'New Project',          subjects: ['Landing page','E-commerce website','Portfolio site','Business website','Web application'] },
      { label: 'Existing Project',     subjects: ['Bug fix needed','Content update','New feature','Performance issue','SEO improvements'] },
      { label: 'Pricing & Quote',      subjects: ['Get a quote','Compare plans','Maintenance cost inquiry'] },
      { label: 'Design Feedback',      subjects: ['Design revision request','Brand alignment','Mobile responsiveness','Accessibility issue'] },
      { label: 'Other',                subjects: ['Partnership inquiry','Referral','General inquiry','Other'] },
    ],
  },
  {
    id: 'general', name: 'General Inquiry', color: '#94a3b8',
    icon: '💬',
    categories: [
      { label: 'Partnership',          subjects: ['Technology partnership','Content collaboration','White-label inquiry','API licensing'] },
      { label: 'Press & Media',        subjects: ['Interview request','Article feature','Product demo','Press kit'] },
      { label: 'Feedback',             subjects: ['Website feedback','Product suggestion','UX feedback'] },
      { label: 'Other',                subjects: ['General question','Other'] },
    ],
  },
]

const PRIORITIES = [
  { id: 'low',      label: 'Low',      desc: 'Minor issue, not urgent',     color: '#10b981' },
  { id: 'medium',   label: 'Medium',   desc: 'Affecting my workflow',       color: '#f59e0b' },
  { id: 'high',     label: 'High',     desc: 'Significant impact',          color: '#ef4444' },
  { id: 'critical', label: 'Critical', desc: 'System down / data loss',     color: '#7c3aed' },
]

/* ─── WO generator ───────────────────────────────────────────────────────────── */
function generateWO() {
  const year = new Date().getFullYear()
  const num  = (Date.now() % 1000000).toString().padStart(6, '0')
  return `WO-${year}-${num}`
}

function fmtDate() {
  return new Date().toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
    timeZone: 'Asia/Kolkata',
  }) + ' IST'
}

/* ─── Step Indicator ─────────────────────────────────────────────────────────── */
function StepBar({ current }) {
  const steps = ['Your Details', 'Your Issue', 'Review & Send']
  return (
    <div className="cform-stepbar">
      {steps.map((label, i) => {
        const n    = i + 1
        const done = n < current
        const act  = n === current
        return (
          <div className="cform-step-item" key={n}>
            <div className={`cform-step-circle${act ? ' act' : done ? ' done' : ''}`}>
              {done ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3.5 3.5 5.5-7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : n}
            </div>
            <span className={`cform-step-label${act ? ' act' : done ? ' done' : ''}`}>{label}</span>
            {i < steps.length - 1 && <div className={`cform-step-line${done ? ' done' : ''}`} />}
          </div>
        )
      })}
    </div>
  )
}

/* ─── Step 1 ─────────────────────────────────────────────────────────────────── */
function Step1({ form, onChange, onNext }) {
  const [errors, setErrors] = useState({})

  const product    = PRODUCTS.find(p => p.id === form.productId)
  const category   = product?.categories.find(c => c.label === form.categoryLabel)
  const subjects   = category?.subjects || []

  function validate() {
    const e = {}
    if (!form.name.trim())          e.name     = 'Name is required'
    if (!form.email.trim())         e.email    = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.productId)            e.product  = 'Select a product'
    if (!form.categoryLabel)        e.category = 'Select a general subject'
    if (!form.subject)              e.subject  = 'Select a specific subject'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <div className="cform-body">
      <div className="cform-row-2">
        <div className="cform-field">
          <label className="cform-label">Your name <span className="req">*</span></label>
          <input className={`cform-input${errors.name ? ' err' : ''}`}
            placeholder="e.g. Anil Kumar" value={form.name}
            onChange={e => onChange('name', e.target.value)} />
          {errors.name && <span className="cform-err">{errors.name}</span>}
        </div>
        <div className="cform-field">
          <label className="cform-label">Your email <span className="req">*</span></label>
          <input className={`cform-input${errors.email ? ' err' : ''}`}
            placeholder="you@example.com" type="email" value={form.email}
            onChange={e => onChange('email', e.target.value)} />
          {errors.email && <span className="cform-err">{errors.email}</span>}
        </div>
      </div>

      <div className="cform-field">
        <label className="cform-label">Product <span className="req">*</span></label>
        <div className="cform-product-grid">
          {PRODUCTS.map(p => (
            <button type="button" key={p.id}
              className={`cform-product-btn${form.productId === p.id ? ' selected' : ''}`}
              style={{ '--pcolor': p.color }}
              onClick={() => { onChange('productId', p.id); onChange('categoryLabel', ''); onChange('subject', '') }}
            >
              <span className="cform-product-icon">{p.icon}</span>
              <span className="cform-product-name">{p.name}</span>
            </button>
          ))}
        </div>
        {errors.product && <span className="cform-err">{errors.product}</span>}
      </div>

      <div className="cform-row-2">
        <div className="cform-field">
          <label className="cform-label">General Subject <span className="req">*</span></label>
          <select className={`cform-input${errors.category ? ' err' : ''}`}
            value={form.categoryLabel}
            onChange={e => { onChange('categoryLabel', e.target.value); onChange('subject', '') }}
            disabled={!form.productId}
          >
            <option value="">— Select category —</option>
            {(product?.categories || []).map(c => (
              <option key={c.label} value={c.label}>{c.label}</option>
            ))}
          </select>
          {errors.category && <span className="cform-err">{errors.category}</span>}
        </div>
        <div className="cform-field">
          <label className="cform-label">Specific Subject <span className="req">*</span></label>
          <select className={`cform-input${errors.subject ? ' err' : ''}`}
            value={form.subject}
            onChange={e => onChange('subject', e.target.value)}
            disabled={!form.categoryLabel}
          >
            <option value="">— Select issue —</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.subject && <span className="cform-err">{errors.subject}</span>}
        </div>
      </div>

      <div className="cform-footer">
        <button className="cform-btn-next" onClick={() => { if (validate()) onNext() }}>
          Next Step
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  )
}

/* ─── Step 2 ─────────────────────────────────────────────────────────────────── */
function Step2({ form, onChange, onBack, onNext }) {
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (form.description.trim().length < 20) e.description = 'Please describe your issue (min 20 characters)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const product = PRODUCTS.find(p => p.id === form.productId)

  return (
    <div className="cform-body">
      <div className="cform-issue-banner" style={{ '--pcolor': product?.color || '#00C8A4' }}>
        <span className="cform-issue-banner-icon">{product?.icon}</span>
        <div>
          <div className="cform-issue-banner-prod">{product?.name}</div>
          <div className="cform-issue-banner-cat">{form.categoryLabel} → {form.subject}</div>
        </div>
      </div>

      <div className="cform-field">
        <label className="cform-label">Describe your issue <span className="req">*</span></label>
        <textarea className={`cform-input cform-textarea${errors.description ? ' err' : ''}`}
          placeholder="Please provide as much detail as possible — steps to reproduce, screenshots descriptions, error messages, etc."
          rows={5} value={form.description}
          onChange={e => onChange('description', e.target.value)}
        />
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:'4px' }}>
          {errors.description
            ? <span className="cform-err">{errors.description}</span>
            : <span />}
          <span style={{ fontSize:'11px', color:'var(--ink-3)' }}>{form.description.length} chars</span>
        </div>
      </div>

      <div className="cform-field">
        <label className="cform-label">Priority</label>
        <div className="cform-priority-grid">
          {PRIORITIES.map(p => (
            <button type="button" key={p.id}
              className={`cform-priority-btn${form.priority === p.id ? ' selected' : ''}`}
              style={{ '--pricolor': p.color }}
              onClick={() => onChange('priority', p.id)}
            >
              <span className="cform-priority-dot" />
              <span className="cform-priority-label">{p.label}</span>
              <span className="cform-priority-desc">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="cform-footer cform-footer-2">
        <button className="cform-btn-back" onClick={onBack}>← Back</button>
        <button className="cform-btn-next" onClick={() => { if (validate()) onNext() }}>
          Review & Send
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  )
}

/* ─── Step 3 ─────────────────────────────────────────────────────────────────── */
function Step3({ form, wo, sending, error, onBack, onSend }) {
  const product  = PRODUCTS.find(p => p.id === form.productId)
  const priority = PRIORITIES.find(p => p.id === form.priority)

  const rows = [
    { label: 'Work Order',      value: wo,                     highlight: true },
    { label: 'Name',            value: form.name },
    { label: 'Email',           value: form.email },
    { label: 'Product',         value: product?.name },
    { label: 'Category',        value: form.categoryLabel },
    { label: 'Issue',           value: form.subject },
    { label: 'Priority',        value: priority?.label,        color: priority?.color },
    { label: 'Submitted',       value: fmtDate() },
  ]

  return (
    <div className="cform-body">
      <div className="cform-review-card">
        <div className="cform-review-wo">
          <span className="cform-review-wo-label">Your Work Order Number</span>
          <span className="cform-review-wo-num">{wo}</span>
          <span className="cform-review-wo-hint">Save this number to track your request</span>
        </div>
        <div className="cform-review-table">
          {rows.map(r => (
            <div className="cform-review-row" key={r.label}>
              <span className="cform-review-key">{r.label}</span>
              <span className={`cform-review-val${r.highlight ? ' highlight' : ''}`}
                style={r.color ? { color: r.color, fontWeight: 600 } : {}}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
        {form.description && (
          <div className="cform-review-desc">
            <div className="cform-review-desc-label">Message</div>
            <p>{form.description}</p>
          </div>
        )}
      </div>

      <div className="cform-review-notice">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/><path d="M8 7.5v4M8 5h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
        A confirmation email will be sent to <strong>{form.email}</strong> with your WO number and all details.
        <br />Response time: 1–2 business days.
      </div>

      {error && <div className="cform-send-error">{error}</div>}

      <div className="cform-footer cform-footer-2">
        <button className="cform-btn-back" onClick={onBack} disabled={sending}>← Back</button>
        <button className="cform-btn-send" onClick={onSend} disabled={sending}>
          {sending ? (
            <><span className="cform-spinner" /> Sending…</>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l12-5-5 12-2-5-5-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              Send Message
            </>
          )}
        </button>
      </div>
    </div>
  )
}

/* ─── Success Screen ─────────────────────────────────────────────────────────── */
function SuccessScreen({ wo, name, onReset }) {
  return (
    <div className="cform-success">
      <div className="cform-success-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16l7 7 13-13" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <h3 className="cform-success-title">Message Sent!</h3>
      <p className="cform-success-sub">
        Thank you, <strong>{name}</strong>. Your request has been received.
      </p>
      <div className="cform-success-wo">
        <span className="cform-success-wo-label">Your Work Order Number</span>
        <span className="cform-success-wo-num">{wo}</span>
      </div>
      <p className="cform-success-hint">
        A confirmation email has been sent to your inbox with all details and the WO number.<br />
        We'll respond within <strong>1–2 business days</strong>.
      </p>
      <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap', marginTop:'8px' }}>
        <button className="cform-btn-next" onClick={onReset}>Submit Another Request</button>
        <Link to="/" className="cform-btn-back" style={{ textDecoration:'none', display:'inline-flex', alignItems:'center' }}>← Back to Home</Link>
      </div>
    </div>
  )
}

/* ─── Main Contact Page ──────────────────────────────────────────────────────── */
export default function Contact() {
  const [step,    setStep]    = useState(1)
  const [wo]                  = useState(generateWO)   // stable across re-renders
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [sendErr, setSendErr] = useState(null)

  const [form, setForm] = useState({
    name: '', email: '', productId: '',
    categoryLabel: '', subject: '',
    priority: 'medium', description: '',
  })

  function update(key, val) { setForm(f => ({ ...f, [key]: val })) }

  async function handleSend() {
    setSending(true)
    setSendErr(null)

    const product  = PRODUCTS.find(p => p.id === form.productId)
    const priority = PRIORITIES.find(p => p.id === form.priority)
    const emailSubject = `[${wo}] ${product?.name} — ${form.categoryLabel}: ${form.subject}`

    const params = {
      wo_number:    wo,
      name:         'Arkaserve Support',   // From Name in EmailJS template
      to_name:      form.name,
      to_email:     form.email,
      product:      product?.name || '',
      category:     form.categoryLabel,
      issue:        form.subject,
      priority:     priority?.label || '',
      description:  form.description,
      subject:      emailSubject,
      submitted_at: fmtDate(),
      reply_to:     'support@arkaserve.com',
    }

    // If EmailJS is not configured, simulate success in dev mode
    if (!EJS.serviceId || !EJS.templateId || !EJS.publicKey) {
      console.warn('EmailJS not configured. In production, add VITE_EMAILJS_* env vars.')
      console.table(params)
      await new Promise(r => setTimeout(r, 1400))
      setSent(true)
      setSending(false)
      return
    }

    try {
      await emailjs.send(EJS.serviceId, EJS.templateId, params, EJS.publicKey)
      setSent(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setSendErr('Failed to send. Please try again or reach us at support@arkaserve.com')
    } finally {
      setSending(false)
    }
  }

  function reset() {
    setForm({ name:'', email:'', productId:'', categoryLabel:'', subject:'', priority:'medium', description:'' })
    setStep(1)
    setSent(false)
    setSendErr(null)
  }

  return (
    <>
      <Nav />
      <main className="contact-page">
        {/* Left panel */}
        <div className="contact-left">
          <div className="contact-left-inner">
            <h1 className="contact-h1">Contact Us</h1>
            <p className="contact-sub">
              Report a problem, suggest a feature, or just say hello.
              We read every message.
            </p>

            <div className="contact-info-cards">
              <div className="contact-info-card">
                <div className="contact-info-icon" style={{ background:'rgba(239,68,68,.10)' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="#ef4444" strokeWidth="1.4"/><path d="M1.5 6l7.5 5 7.5-5" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-val">support@arkaserve.com</div>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="contact-info-icon" style={{ background:'rgba(59,130,246,.10)' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#3b82f6" strokeWidth="1.4"/><path d="M9 5v4l2.5 2.5" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <div className="contact-info-label">Response time</div>
                  <div className="contact-info-val">Within 1–2 business days</div>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="contact-info-icon" style={{ background:'rgba(16,185,129,.10)' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2C6.24 2 4 4.24 4 7c0 4.25 5 9 5 9s5-4.75 5-9c0-2.76-2.24-5-5-5z" stroke="#10b981" strokeWidth="1.4"/><circle cx="9" cy="7" r="1.8" stroke="#10b981" strokeWidth="1.3"/></svg>
                </div>
                <div>
                  <div className="contact-info-label">Location</div>
                  <div className="contact-info-val">Hyderabad, Telangana, India</div>
                </div>
              </div>
              <a className="contact-info-card contact-wa-card"
                href="https://wa.me/919866376367" target="_blank" rel="noopener noreferrer">
                <div className="contact-info-icon" style={{ background:'rgba(37,211,102,.12)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <div className="contact-info-label">WhatsApp (urgent)</div>
                  <div className="contact-info-val">+91 98663 76367</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right panel — wizard */}
        <div className="contact-right">
          <div className="cform-wrap">
            {sent ? (
              <SuccessScreen wo={wo} name={form.name} onReset={reset} />
            ) : (
              <>
                <StepBar current={step} />
                {step === 1 && <Step1 form={form} onChange={update} onNext={() => setStep(2)} />}
                {step === 2 && <Step2 form={form} onChange={update} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
                {step === 3 && <Step3 form={form} wo={wo} sending={sending} error={sendErr}
                                      onBack={() => setStep(2)} onSend={handleSend} />}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
