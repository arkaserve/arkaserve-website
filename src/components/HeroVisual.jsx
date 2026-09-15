function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M1.5 5.5l2.5 2.5 5.5-5.5" stroke="#00C8A4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const EXAM_CATS = ['IBPS', 'SBI', 'RRB', 'SSC', 'POSTAL', '+5 more']

const PDF_OPS = [
  'Merge', 'Split', 'Compress', 'Convert',
  'Protect', 'Unlock', 'Sign', 'Watermark',
  'OCR', 'Extract', 'Rotate', '+45 more',
]

const GUIDE_ITEMS = [
  { icon: '🗂️', title: 'Project Ideas',   desc: 'Final year CS & IT projects' },
  { icon: '📄', title: 'Resume Builder',  desc: 'ATS-ready templates & tips' },
  { icon: '🧪', title: 'API Test Prep',   desc: 'Company coding round guides' },
  { icon: '🏢', title: 'Company Insights', desc: 'Interview patterns & salaries' },
]

const MCQ_OPTIONS = [
  { key: 'A', text: 'Profitable', sel: true  },
  { key: 'B', text: 'Expensive',  sel: false },
  { key: 'C', text: 'Ambitious',  sel: false },
]

const LEFT_STATS = [
  { n: '10k+', label: 'Questions',    color: '#00C8A4' },
  { n: '57',   label: 'PDF Tools',   color: '#F7A84A' },
  { n: 'Free', label: 'Career Guide', color: '#A78BFA' },
]

export default function HeroVisual() {
  return (
    <div className="hv-wrap" aria-hidden="true">

      {/* Left product stats */}
      <div className="hv-left-stats">
        {LEFT_STATS.map(s => (
          <div key={s.label} className="hv-lstat">
            <span className="hv-lstat-bar" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}88` }} />
            <span className="hv-lstat-n">{s.n}</span>
            <span className="hv-lstat-l">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Three-product deck */}
      <div className="hv-deck">

        {/* ── MockTest ── */}
        <div className="hv-card-item card-test">
          <div className="hv-header hv-header-test">
            <div className="hv-badge">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <rect x="0.75" y="0.75" width="8.5" height="8.5" rx="1.5" stroke="#00C8A4" strokeWidth="1.1"/>
                <path d="M2.5 5l1.5 1.5 3.5-3.5" stroke="#00C8A4" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              MockTest · Exams
            </div>
            <div className="hv-timer">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <circle cx="5.5" cy="6" r="4" stroke="#00C8A4" strokeWidth="1.1"/>
                <path d="M5.5 3.5V6l1.5 1.5" stroke="#00C8A4" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              38:42
            </div>
          </div>

          <div className="hv-cat-chips">
            {EXAM_CATS.map(c => (
              <span key={c} className={`hv-cat-chip${c.startsWith('+') ? ' hv-cat-more' : ''}`}>{c}</span>
            ))}
          </div>

          <div className="hv-progress-wrap">
            <div className="hv-progress-bar"><div className="hv-progress-fill" style={{ width: '43%' }} /></div>
            <div className="hv-progress-meta"><span>Q15 of 35</span><span>43% done</span></div>
          </div>
          <div className="hv-question">
            <div className="hv-q-num">
              Q15 · Vocabulary — <strong>SIMILAR</strong> to <span className="hv-underline">LUCRATIVE</span>
            </div>
          </div>
          <div className="hv-options">
            {MCQ_OPTIONS.map(o => (
              <div key={o.key} className={`hv-option${o.sel ? ' hv-sel' : ''}`}>
                <span className="hv-opt-key">{o.key}</span>
                <span className="hv-opt-text">{o.text}</span>
                {o.sel && <CheckIcon />}
              </div>
            ))}
          </div>
          <div className="hv-footer">
            <div className="hv-stats">
              <span className="hv-stat hv-c">✓ 11</span>
              <span className="hv-stat hv-w">✗ 3</span>
              <span className="hv-stat hv-s">○ 21</span>
            </div>
            <div className="hv-next-btn">Save &amp; Next →</div>
          </div>
        </div>

        {/* ── PDF Tools ── */}
        <div className="hv-card-item card-pdf">
          <div className="hv-header hv-header-pdf">
            <div className="hv-badge hv-badge-pdf">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <rect x="1" y="0.5" width="7" height="9" rx="1" stroke="#F7A84A" strokeWidth="1.1"/>
                <path d="M6.5 0.5V3H9" stroke="#F7A84A" strokeWidth="0.9"/>
                <line x1="2.5" y1="5.5" x2="7.5" y2="5.5" stroke="#F7A84A" strokeWidth="0.9" strokeLinecap="round"/>
                <line x1="2.5" y1="7" x2="6" y2="7" stroke="#F7A84A" strokeWidth="0.9" strokeLinecap="round"/>
              </svg>
              PDF Tools
            </div>
            <div className="hv-size-chip">57+ services</div>
          </div>
          <div className="hv-ops-grid">
            {PDF_OPS.map(op => (
              <span key={op} className={`hv-op-chip${op.startsWith('+') ? ' hv-op-more' : ''}`}>{op}</span>
            ))}
          </div>
        </div>

        {/* ── Career Guide ── */}
        <div className="hv-card-item card-guide">
          <div className="hv-header hv-header-guide">
            <div className="hv-badge hv-badge-guide">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M5 1L1 3v3c0 2 1.8 3.5 4 4 2.2-.5 4-2 4-4V3L5 1z" stroke="#A78BFA" strokeWidth="0.9"/>
                <path d="M3.5 5l1 1 2-2" stroke="#A78BFA" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Career Guide
            </div>
            <div className="hv-size-chip hv-size-chip-guide">For Students</div>
          </div>
          <div className="hv-guide-list">
            {GUIDE_ITEMS.map(g => (
              <div key={g.title} className="hv-guide-row">
                <span className="hv-guide-icon">{g.icon}</span>
                <div className="hv-guide-info">
                  <span className="hv-guide-title">{g.title}</span>
                  <span className="hv-guide-desc">{g.desc}</span>
                </div>
                <span className="hv-guide-arrow">→</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
