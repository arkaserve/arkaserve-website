import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

const APPS = [
  {
    name: 'MockTest',
    desc: 'Exam preparation platform',
    href: 'https://mocktest.arkaserve.com',
    color: '#00C8A4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="1" y="1" width="26" height="26" rx="6" fill="rgba(0,200,164,0.12)" stroke="rgba(0,200,164,0.30)" strokeWidth="1.2"/>
        <rect x="6" y="8" width="16" height="2" rx="1" fill="#00C8A4" opacity="0.9"/>
        <rect x="6" y="13" width="12" height="1.5" rx="0.75" fill="#00C8A4" opacity="0.5"/>
        <rect x="6" y="17" width="10" height="1.5" rx="0.75" fill="#00C8A4" opacity="0.5"/>
        <circle cx="21" cy="19" r="4" fill="#00C8A4" opacity="0.15" stroke="#00C8A4" strokeWidth="1"/>
        <path d="M19.5 19l1 1 2-2" stroke="#00C8A4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'PDF Tools',
    desc: '57+ document services',
    href: 'https://pdftools.arkaserve.com',
    color: '#F7A84A',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="1" y="1" width="26" height="26" rx="6" fill="rgba(247,168,74,0.12)" stroke="rgba(247,168,74,0.30)" strokeWidth="1.2"/>
        <rect x="6" y="4" width="13" height="20" rx="2" fill="rgba(247,168,74,0.10)" stroke="rgba(247,168,74,0.35)" strokeWidth="1"/>
        <path d="M16 4v5h3" stroke="rgba(247,168,74,0.40)" strokeWidth="0.9"/>
        <rect x="8" y="12" width="9" height="1.2" rx="0.6" fill="#F7A84A" opacity="0.7"/>
        <rect x="8" y="15" width="7" height="1.2" rx="0.6" fill="#F7A84A" opacity="0.4"/>
        <rect x="8" y="18" width="8" height="1.2" rx="0.6" fill="#F7A84A" opacity="0.4"/>
      </svg>
    ),
  },
  {
    name: 'Career Guide',
    desc: 'Projects, resume & API prep',
    href: 'https://academicprojects.arkaserve.com',
    color: '#A78BFA',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="1" y="1" width="26" height="26" rx="6" fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.30)" strokeWidth="1.2"/>
        <path d="M14 5L6 9v6c0 5 3.6 8.5 8 9 4.4-.5 8-4 8-9V9L14 5z" fill="rgba(167,139,250,0.15)" stroke="#A78BFA" strokeWidth="1.1"/>
        <path d="M10.5 14l2 2 5-5" stroke="#A78BFA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

function WaffleIcon() {
  const centers = [4, 12, 20]
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {centers.map(cy => centers.map(cx => (
        <rect key={`${cx}-${cy}`} x={cx - 2.5} y={cy - 2.5} width="5" height="5" rx="1.2" fill="currentColor"/>
      )))}
    </svg>
  )
}

export default function Nav() {
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [appsOpen, setAppsOpen] = useState(false)
  const appsRef = useRef(null)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // On non-home pages always show the solid glass nav
  const navClass = ['nav', stuck || !isHome ? 'stuck' : ''].filter(Boolean).join(' ')

  // Links: smooth-scroll on homepage, navigate-then-scroll elsewhere
  const p = isHome ? '' : '/'

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!appsOpen) return
    function handleClick(e) {
      if (appsRef.current && !appsRef.current.contains(e.target)) setAppsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [appsOpen])

  function closeMenu() { setMenuOpen(false) }

  return (
    <>
      <nav className={navClass} role="navigation" aria-label="Main navigation">
        <Link to="/" className="nav-brand" aria-label="Arkaserve home">
          <Logo gradientId="sg-nav" />
          <div className="nav-brand-text">
            <span className="nav-wordmark">ARKA<em>SERVE</em></span>
            <span className="nav-caption">Protected Service Vessel</span>
          </div>
        </Link>

        <ul className="nav-links" role="list">
          <li><a href={`${p}#home`}>Home</a></li>
          <li><a href={`${p}#products`}>Products</a></li>
          <li><a href={`${p}#about`}>About</a></li>
          <li><Link to="/careers">Careers</Link></li>
          <li><a href={`${p}#contact`}>Contact</a></li>
        </ul>

        {/* Right group: CTA + ham */}
        <div className="nav-right">
          <a href={`${p}#contact`} className="nav-cta">Get in touch</a>
          <button
            className={`nav-ham${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="ham-bar" />
            <span className="ham-bar" />
            <span className="ham-bar" />
          </button>
        </div>

        {/* Waffle — last child of nav → extreme right edge */}
        <div className="nav-apps-wrap" ref={appsRef}>
          <button
            className={`nav-apps-btn${appsOpen ? ' open' : ''}`}
            onClick={() => setAppsOpen(o => !o)}
            aria-label="App launcher"
            aria-expanded={appsOpen}
          >
            <WaffleIcon />
          </button>

          {appsOpen && (
            <div className="nav-apps-panel" role="dialog" aria-label="Arkaserve apps">
              <div className="nap-col nap-col-products">
                <div className="nap-section-label">Our Products</div>
                {APPS.map(app => (
                  <a
                    key={app.name}
                    href={app.href}
                    className="nap-row"
                    target={app.href !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onClick={() => setAppsOpen(false)}
                    style={{ '--app-color': app.color }}
                  >
                    <div className="nap-row-icon">{app.icon}</div>
                    <div className="nap-row-text">
                      <span className="nap-row-name">{app.name}</span>
                      <span className="nap-row-desc">{app.desc}</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="nap-divider" />
              <div className="nap-col nap-col-links">
                <div className="nap-section-label">Company</div>
                <a href={`${p}#about`} className="nap-link-row" onClick={() => setAppsOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.3"/><path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  About us
                </a>
                <a href={`${p}#contact`} className="nap-link-row" onClick={() => setAppsOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1.5 5l6.5 4.5L14.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  Contact
                </a>
                <Link to="/careers" className="nap-link-row" onClick={() => setAppsOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="2" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M5 6h6M5 8.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Careers
                </Link>
                <div className="nap-link-divider" />
                <Link to="/privacy" className="nap-link-row" onClick={() => setAppsOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5L2.5 4v4c0 3.5 2.4 5.8 5.5 6 3.1-.2 5.5-2.5 5.5-6V4L8 1.5z" stroke="currentColor" strokeWidth="1.3"/></svg>
                  Privacy Policy
                </Link>
                <Link to="/terms" className="nap-link-row" onClick={() => setAppsOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="1.5" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5.5 5.5h5M5.5 8h4M5.5 10.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Terms of Service
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <a href={`${p}#home`} onClick={closeMenu}>Home</a>
        <a href={`${p}#products`} onClick={closeMenu}>Products</a>
        <a href={`${p}#about`} onClick={closeMenu}>About</a>
        <Link to="/careers" onClick={closeMenu}>Careers</Link>
        <a href={`${p}#contact`} onClick={closeMenu}>Contact</a>
        <a href={`${p}#contact`} onClick={closeMenu}>Get in touch</a>
      </div>
    </>
  )
}
