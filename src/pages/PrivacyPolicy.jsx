import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const SECTIONS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'collect',    label: 'What We Collect' },
  { id: 'use',        label: 'How We Use It' },
  { id: 'retention',  label: 'Data Retention' },
  { id: 'third-party',label: 'Third-party Services' },
  { id: 'rights',     label: 'Your Rights' },
  { id: 'contact',    label: 'Contact' },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Nav />
      <main className="legal-page">
        <div className="legal-hero">
          <div className="eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <p className="legal-meta">Effective date: 1 January 2025 · Last updated: 14 September 2026</p>
        </div>

        <div className="legal-body">
          <aside className="legal-toc">
            <div className="legal-toc-label">On this page</div>
            <nav aria-label="Table of contents">
              {SECTIONS.map(s => (
                <a key={s.id} href={`#${s.id}`} className="legal-toc-link">{s.label}</a>
              ))}
            </nav>
            <div className="legal-toc-footer">
              <Link to="/terms">Terms of Service →</Link>
            </div>
          </aside>

          <article className="legal-content">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Arkaserve ("we", "our", "us") operates the following digital products: the MockTest exam-preparation
                platform at <strong>mocktest.arkaserve.com</strong>, the PDF document services at{' '}
                <strong>pdftools.arkaserve.com</strong>, and the Career Guide at academicprojects.arkaserve.com. This Privacy
                Policy explains how we collect, use, and safeguard information when you use any of these services.
              </p>
              <p>
                By using our services you agree to the practices described in this policy. If you disagree, please
                discontinue use and contact us to request data deletion.
              </p>
            </section>

            <section id="collect">
              <h2>What We Collect</h2>
              <h3>MockTest Platform</h3>
              <ul>
                <li><strong>Exam session data</strong> — answers submitted, time spent per question, and score summaries stored to show your progress history.</li>
                <li><strong>Account information</strong> — email address and a display name if you create an account.</li>
                <li><strong>Usage analytics</strong> — anonymised data (pages visited, exam categories chosen) used to improve question quality.</li>
              </ul>
              <h3>PDF Tools</h3>
              <ul>
                <li><strong>Uploaded files</strong> — documents you upload are processed in-memory and are <strong>not</strong> stored on our servers after your session ends (typically within 1 hour).</li>
                <li><strong>Operation logs</strong> — anonymised logs of which tool was used (e.g. "Compress", "Merge") without file contents, used for service reliability.</li>
              </ul>
              <h3>Career Guide</h3>
              <ul>
                <li><strong>No account required</strong> — the Career Guide (final-year project ideas, resume prep, company API test guides) is a read-only resource; we do not collect personal data beyond standard server access logs.</li>
              </ul>
              <h3>All Services</h3>
              <ul>
                <li><strong>Browser storage</strong> — we use <code>localStorage</code> to remember your preferences (theme, last exam attempted) on your device only.</li>
                <li><strong>Server logs</strong> — standard web server logs (IP address, user agent, timestamp) retained for up to 30 days for security and debugging.</li>
              </ul>
            </section>

            <section id="use">
              <h2>How We Use Your Information</h2>
              <ul>
                <li>To deliver and improve the services you requested.</li>
                <li>To send transactional emails (e.g. exam result summaries) if you opted in.</li>
                <li>To detect and prevent abuse, fraud, or security incidents.</li>
                <li>To comply with legal obligations.</li>
              </ul>
              <p>We do <strong>not</strong> sell, rent, or trade your personal information to any third party.</p>
            </section>

            <section id="retention">
              <h2>Data Retention</h2>
              <p>
                Exam session data is retained for as long as your account is active. Uploaded PDF files are
                deleted within 1 hour of processing. Server access logs are deleted after 30 days. You may
                request immediate deletion of your account data at any time (see <a href="#contact">Contact</a>).
              </p>
            </section>

            <section id="third-party">
              <h2>Third-party Services</h2>
              <p>Our services may use the following third parties, each with their own privacy policies:</p>
              <ul>
                <li><strong>Hosting providers</strong> — AWS and/or GoDaddy for infrastructure.</li>
                <li><strong>Analytics</strong> — anonymised, aggregated analytics only; no cross-site tracking.</li>
                <li><strong>Email delivery</strong> — for transactional notifications if you opt in.</li>
              </ul>
              <p>
                We do not embed social media tracking pixels or advertising networks on any of our services.
              </p>
            </section>

            <section id="rights">
              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
                <li><strong>Correction</strong> — ask us to correct inaccurate data.</li>
                <li><strong>Deletion</strong> — request erasure of your personal data ("right to be forgotten").</li>
                <li><strong>Objection</strong> — object to processing of your data for analytics purposes.</li>
                <li><strong>Portability</strong> — receive your data in a structured, machine-readable format.</li>
              </ul>
              <p>To exercise any of these rights, contact us at the address below.</p>
            </section>

            <section id="contact">
              <h2>Contact</h2>
              <p>
                For privacy-related questions or requests, contact the Arkaserve data owner:
              </p>
              <div className="legal-contact-card">
                <div><strong>Arkaserve</strong></div>
                <div>Email: <a href="mailto:anil.mikkili@gmail.com">anil.mikkili@gmail.com</a></div>
                <div>Subject line: <em>"Privacy Request – [your name]"</em></div>
              </div>
              <p>We aim to respond within 5 business days.</p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
