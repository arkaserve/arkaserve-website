function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MockTestIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="20" height="26" rx="2.5" stroke="#00C8A4" strokeWidth="1.6" />
      <line x1="8.5" y1="10" x2="19.5" y2="10" stroke="#00C8A4" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8.5" y1="15" x2="19.5" y2="15" stroke="#00C8A4" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8.5" y1="20" x2="15" y2="20" stroke="#00C8A4" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="24" cy="24" r="6" fill="#00C8A4" />
      <path d="M21 24l2 2 4-4" stroke="#091C3E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M5 3h12l6 6v16a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="#00C8A4" strokeWidth="1.55" />
      <path d="M17 3v6h6" stroke="#00C8A4" strokeWidth="1.55" strokeLinecap="round" />
      <line x1="7" y1="17" x2="21" y2="17" stroke="#00C8A4" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="7" y1="21" x2="15" y2="21" stroke="#00C8A4" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function ProjectsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="11" height="11" rx="2.5" stroke="#00C8A4" strokeWidth="1.55" />
      <rect x="15" y="2" width="11" height="11" rx="2.5" stroke="#00C8A4" strokeWidth="1.55" />
      <rect x="2" y="15" width="11" height="11" rx="2.5" stroke="#00C8A4" strokeWidth="1.55" />
      <rect x="15" y="15" width="11" height="11" rx="2.5" stroke="#00C8A4" strokeWidth="1.55" />
    </svg>
  )
}

function SchoolIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 3L3 9l11 6 11-6-11-6z" stroke="#00C8A4" strokeWidth="1.55" strokeLinejoin="round" />
      <path d="M3 9v7" stroke="#00C8A4" strokeWidth="1.55" strokeLinecap="round" />
      <path d="M7 11.5v6a7 7 0 0014 0v-6" stroke="#00C8A4" strokeWidth="1.55" strokeLinecap="round" />
      <circle cx="22" cy="22" r="4" stroke="#00C8A4" strokeWidth="1.3" />
      <path d="M20.5 22l1 1 2-2" stroke="#00C8A4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WebDesignIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="24" height="18" rx="2.5" stroke="#00C8A4" strokeWidth="1.55" />
      <line x1="2" y1="9.5" x2="26" y2="9.5" stroke="#00C8A4" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="5.5" cy="6.8" r="1" fill="#00C8A4" />
      <circle cx="8.5" cy="6.8" r="1" fill="#00C8A4" />
      <circle cx="11.5" cy="6.8" r="1" fill="#00C8A4" />
      <rect x="5" y="12.5" width="7" height="5" rx="1.5" stroke="#00C8A4" strokeWidth="1.2" opacity="0.65" />
      <line x1="14" y1="13.5" x2="23" y2="13.5" stroke="#00C8A4" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <line x1="14" y1="16" x2="20" y2="16" stroke="#00C8A4" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <line x1="5" y1="20" x2="23" y2="20" stroke="#00C8A4" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

const PRODUCTS = [
  {
    id: 1,
    type: 'Exam Preparation',
    name: 'MockTest Platform',
    url: 'https://mocktest.arkaserve.com',
    desc: 'A comprehensive online exam preparation engine for competitive banking, SSC, and insurance exams. AI-generated questions, timed tests, and performance analytics — built to simulate the real exam experience.',
    bullets: [
      'Banking, SSC & Insurance exam coverage',
      'AI-powered question generation & variation',
      'Detailed performance analytics & review',
      'Nightly current affairs & GK updates',
    ],
    featured: true,
    icon: <MockTestIcon />,
    num: '01',
  },
  {
    id: 2,
    type: 'Productivity',
    name: 'PDF Tools',
    url: 'https://pdftools.arkaserve.com',
    desc: 'Fast, browser-based PDF utilities — merge, split, compress, and convert documents without installation or uploading files to a third party.',
    featured: false,
    icon: <PdfIcon />,
    num: '02',
  },
  {
    id: 3,
    type: 'Portfolio',
    name: 'Projects Hub',
    url: 'https://projects.arkaserve.com',
    desc: "A curated showcase of engineering work, open-source experiments, and in-progress builds — tracking what's shipped and what's in the pipeline.",
    featured: false,
    icon: <ProjectsIcon />,
    num: '03',
  },
  {
    id: 4,
    type: 'Design & Development',
    name: 'Website Designing',
    url: 'https://arkaserve.com/#contact',
    desc: 'Custom website design and development tailored to your brand. From landing pages to full web applications — clean, responsive, and built to convert visitors into customers.',
    bullets: [
      'Responsive design for all devices',
      'Custom branding & UI/UX design',
      'React, Next.js & modern tech stack',
      'SEO-optimised, fast-loading pages',
    ],
    featured: false,
    wide: true,
    icon: <WebDesignIcon />,
    num: '04',
  },
]

export default function Products() {
  return (
    <section className="products" id="products" aria-labelledby="prod-h2">
      <div className="sec-label">What we build</div>
      <h2 className="sec-h2" id="prod-h2">
        Four products. One unified mission.
      </h2>

      <div className="pgrid">
        {PRODUCTS.map(p => (
          <a
            key={p.id}
            href={p.url}
            className={`pcard${p.featured ? ' feat' : ''}${p.wide ? ' wide' : ''}`}
            {...(!p.internal && { target: '_blank', rel: 'noopener noreferrer' })}
          >
            <div className="pcard-ico">{p.icon}</div>
            <div className="pcard-type">{p.type}</div>
            <div className="pcard-name">{p.name}</div>
            <div className="pcard-desc">{p.desc}</div>
            {p.bullets && (
              <ul className="pcard-blist">
                {p.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            )}
            <div className="pcard-link">
              {p.label ?? (p.wide ? 'Get in touch' : `Visit ${p.name}`)} <ArrowIcon />
            </div>
            <div className="pcard-num" aria-hidden="true">{p.num}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
