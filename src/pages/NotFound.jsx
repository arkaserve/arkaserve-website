import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="nf-page">
        <div className="nf-glow" aria-hidden="true" />
        <div className="nf-inner">
          <div className="nf-code" aria-hidden="true">
            <span className="nf-4">4</span>
            <span className="nf-0">0</span>
            <span className="nf-4">4</span>
          </div>
          <h1 className="nf-heading">Page not found</h1>
          <p className="nf-sub">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div className="nf-actions">
            <Link to="/" className="btn btn-teal">← Back to home</Link>
            <a href="#products" className="btn btn-ghost" onClick={() => window.location.href = '/#products'}>
              Explore products
            </a>
          </div>
          <div className="nf-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
