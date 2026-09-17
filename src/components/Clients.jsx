const CLIENTS = [
  {
    id: 1,
    name: 'Real Estates',
    sector: 'Property & Real Estate',
    desc: 'Property listings, agent CRM & lead management platform',
    status: 'In Development',
    statusColor: '#f59e0b',
    link: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 26V13L14 4l10 9v13" stroke="#00C8A4" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="10" y="17" width="8" height="9" rx="1.5" stroke="#00C8A4" strokeWidth="1.4" />
        <path d="M10 10h8" stroke="#00C8A4" strokeWidth="1.2" strokeLinecap="round" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Rajesh SuperMarket',
    sector: 'E-Commerce & Retail',
    desc: 'Online grocery store with inventory, orders & delivery tracking',
    status: 'In Development',
    statusColor: '#f59e0b',
    link: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M3 4h3l3.5 14h13L25 9H8" stroke="#00C8A4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="24" r="2" stroke="#00C8A4" strokeWidth="1.4" />
        <circle cx="21" cy="24" r="2" stroke="#00C8A4" strokeWidth="1.4" />
        <path d="M11 14h6M14 11v6" stroke="#00C8A4" strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'School Management',
    sector: 'Education ERP',
    desc: 'Complete student history tracking — academics, attendance, fees & more',
    status: 'Live Demo',
    statusColor: '#00C8A4',
    link: '/school-management/index.html',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3L2 10l12 7 12-7-12-7z" stroke="#00C8A4" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M2 10v8" stroke="#00C8A4" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6 13v6a8 8 0 0016 0v-6" stroke="#00C8A4" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="22" cy="22" r="4" fill="rgba(0,200,164,0.15)" stroke="#00C8A4" strokeWidth="1.3" />
        <path d="M20.5 22l1 1.2 2.5-2.5" stroke="#00C8A4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// Triplicate so the marquee never shows a gap
const TRACK = [...CLIENTS, ...CLIENTS, ...CLIENTS]

function ClientCard({ c }) {
  const inner = (
    <div className="client-card">
      <div className="client-card-icon">{c.icon}</div>
      <div className="client-card-body">
        <div className="client-card-name">{c.name}</div>
        <div className="client-card-sector">{c.sector}</div>
        <div className="client-card-desc">{c.desc}</div>
      </div>
      <div className="client-card-foot">
        <span className="client-badge" style={{ '--badge-color': c.statusColor }}>
          <span className="client-badge-dot" />
          {c.status}
        </span>
        {c.link && <span className="client-card-cta">View Demo →</span>}
      </div>
    </div>
  )

  if (c.link) {
    return <a href={c.link} className="client-card-wrap client-card-wrap--link">{inner}</a>
  }
  return <div className="client-card-wrap">{inner}</div>
}

export default function Clients() {
  return (
    <section className="clients-section" aria-labelledby="clients-h2">
      <div className="clients-header">
        <div className="sec-label">Our Clients</div>
        <h2 className="clients-h2" id="clients-h2">
          Websites we're building
        </h2>
        <p className="clients-sub">
          Real businesses. Real problems. We design and develop each product from scratch —
          fully custom, mobile-first, and built to grow.
        </p>
      </div>

      {/* Marquee */}
      <div className="clients-marquee-wrap" aria-hidden="true">
        <div className="clients-marquee-fade clients-marquee-fade--left" />
        <div className="clients-marquee-fade clients-marquee-fade--right" />
        <div className="clients-track">
          {TRACK.map((c, i) => (
            <ClientCard key={i} c={c} />
          ))}
        </div>
      </div>

      <div className="clients-footer-note">
        <span>Interested in building your website with us?</span>
        <a href="/contact" className="clients-cta-link">Get in touch →</a>
      </div>
    </section>
  )
}
