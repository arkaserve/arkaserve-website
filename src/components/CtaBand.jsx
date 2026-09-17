import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CtaBand() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText('support@arkaserve.com').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section className="cta-band" id="contact" aria-label="Contact">
      <div className="cta-bloom" aria-hidden="true" />
      <div className="cta-inner">
        <h2>Ready to get started?</h2>
        <p>Explore our products or reach out to discuss a collaboration.</p>
        <div className="cta-acts">
          <Link to="/contact" className="btn btn-teal">Contact Us</Link>
          <button className="btn btn-ghost" onClick={copyEmail}>
            {copied ? '✓ Copied!' : 'support@arkaserve.com'}
          </button>
        </div>
      </div>
    </section>
  )
}
