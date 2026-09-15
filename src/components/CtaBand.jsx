import { useState } from 'react'

export default function CtaBand() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText('arkaserve@gmail.com').then(() => {
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
          <a href="#products" className="btn btn-teal">See all products</a>
          <button className="btn btn-ghost" onClick={copyEmail}>
            {copied ? '✓ Copied!' : 'arkaserve@gmail.com'}
          </button>
        </div>
      </div>
    </section>
  )
}
