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
          <div className="footer-social">
            <a href="https://wa.me/919866376367" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="#" className="footer-social-link" aria-label="LinkedIn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="footer-social-link" aria-label="Twitter / X">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="footer-social-link" aria-label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="footer-social-link" aria-label="YouTube">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#03080F"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h5>Products</h5>
          <ul>
            <li><a href="https://mocktest.arkaserve.com" target="_blank" rel="noopener">MockTest Platform</a></li>
            <li><a href="https://pdftools.arkaserve.com" target="_blank" rel="noopener">PDF Tools</a></li>
            <li><a href="https://academicprojects.arkaserve.com" target="_blank" rel="noopener">Career Guide</a></li>
            <li><a href="https://arkaserve.com/#contact">Website Designing</a></li>
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
