import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

async function fetchCount() {
  try {
    const res = await fetch(
      'https://api.counterapi.dev/v1/arkaserve-com/visits/up',
      { cache: 'no-store' }
    )
    if (!res.ok) throw new Error(res.status)
    const d = await res.json()
    return d.count ?? d.value ?? 0
  } catch {
    // dev / offline fallback — session-scoped local counter
    const KEY = 'arks_vc', SES = 'arks_vs'
    let n = parseInt(localStorage.getItem(KEY) || '0', 10)
    if (!sessionStorage.getItem(SES)) {
      n++
      try { localStorage.setItem(KEY, n) } catch {}
      try { sessionStorage.setItem(SES, '1') } catch {}
    }
    return n
  }
}

function VisitorCounter() {
  const [count, setCount] = useState(null)
  useEffect(() => { fetchCount().then(setCount) }, [])
  if (count === null) return null
  const digits = String(count).padStart(6, '0').split('')
  return (
    <div className="visitor-counter">
      <div className="visitor-digits">
        {digits.map((d, i) => (
          <span key={i} className="visitor-digit">{d}</span>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#" className="nav-brand" aria-label="Arkaserve home">
            <Logo size={34} gradientId="sg-footer" />
            <div className="nav-brand-text">
              <span className="nav-wordmark">ARKA<em>SERVE</em></span>
              <span className="nav-caption">Protected Service Vessel</span>
            </div>
          </a>
          <p className="footer-desc">
            Building focused digital products that serve real needs.
            Independent. Purposeful. Iterative.
          </p>
        </div>

        <div className="footer-col">
          <h5>Products</h5>
          <ul>
            <li><a href="https://mocktest.arkaserve.com" target="_blank" rel="noopener">MockTest Platform</a></li>
            <li><a href="https://pdftools.arkaserve.com" target="_blank" rel="noopener">PDF Tools</a></li>
            <li><a href="https://academicprojects.arkaserve.com" target="_blank" rel="noopener">Career Guide</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Legal</h5>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Arkaserve. All rights reserved.</span>
        <VisitorCounter />
        <div className="footer-legal-links">
          <Link to="/privacy">Privacy</Link>
          <span aria-hidden="true">·</span>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
