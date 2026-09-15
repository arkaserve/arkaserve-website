import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const SECTIONS = [
  { id: 'acceptance',  label: 'Acceptance' },
  { id: 'services',    label: 'Our Services' },
  { id: 'mocktest',    label: 'MockTest Platform' },
  { id: 'pdftools',    label: 'PDF Tools' },
  { id: 'careerguide', label: 'Career Guide' },
  { id: 'ip',          label: 'Intellectual Property' },
  { id: 'disclaimer',  label: 'Disclaimer' },
  { id: 'liability',   label: 'Limitation of Liability' },
  { id: 'changes',     label: 'Changes to Terms' },
  { id: 'contact',     label: 'Contact' },
]

export default function TermsOfService() {
  return (
    <>
      <Nav />
      <main className="legal-page">
        <div className="legal-hero">
          <div className="eyebrow">Legal</div>
          <h1>Terms of Service</h1>
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
              <Link to="/privacy">Privacy Policy →</Link>
            </div>
          </aside>

          <article className="legal-content">
            <section id="acceptance">
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing or using any Arkaserve service — including the MockTest platform, PDF Tools, or
                Career Guide — you agree to be bound by these Terms of Service and our{' '}
                <Link to="/privacy">Privacy Policy</Link>. If you do not agree, do not use our services.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access any service operated by
                Arkaserve ("we", "our", "us").
              </p>
            </section>

            <section id="services">
              <h2>Our Services</h2>
              <p>
                Arkaserve provides three digital services, each subject to the specific provisions below in
                addition to these general terms:
              </p>
              <ul>
                <li><strong>MockTest Platform</strong> — exam-preparation tools at mocktest.arkaserve.com</li>
                <li><strong>PDF Tools</strong> — document processing utilities at pdftools.arkaserve.com</li>
                <li><strong>Career Guide</strong> — free resources for final-year students: projects, resume prep, and company API test guides</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any service at any time without notice.
                We are not liable for any such modification, suspension, or discontinuation.
              </p>
            </section>

            <section id="mocktest">
              <h2>MockTest Platform</h2>
              <ul>
                <li>MockTest is designed for practice purposes only. Exam questions are generated or curated for educational use and may not reflect the exact format or content of official exams.</li>
                <li>You agree not to reproduce, distribute, or commercially exploit exam content without written permission.</li>
                <li>Score results are estimates and carry no guarantee of actual exam performance.</li>
                <li>You must not use automated tools, bots, or scripts to access or manipulate the platform.</li>
                <li>We may impose usage limits (e.g. daily test attempts) to ensure fair access for all users.</li>
              </ul>
            </section>

            <section id="pdftools">
              <h2>PDF Tools</h2>
              <ul>
                <li>You are solely responsible for the content of files you upload. Do not upload files containing illegal, confidential, or third-party copyrighted material without authorisation.</li>
                <li>Uploaded files are processed in-memory and deleted automatically within 1 hour. We do not claim ownership of your files.</li>
                <li>PDF Tools are provided on a best-effort basis. We do not guarantee that every operation will succeed or that output files will be error-free.</li>
                <li>Maximum file sizes and operation limits may be enforced to maintain service availability.</li>
              </ul>
            </section>

            <section id="careerguide">
              <h2>Career Guide</h2>
              <ul>
                <li>The Career Guide provides free resources for final-year engineering and degree students, including project ideas, resume preparation tips, and API/coding test preparation guides. Content is for informational purposes only and does not constitute professional career or placement advice.</li>
                <li>Project ideas, resume templates, and company-specific interview patterns are curated from publicly available information and community contributions. Always verify details with your institution or the respective company's official channels.</li>
                <li>Arkaserve is not affiliated with any company, placement agency, or educational institution.</li>
              </ul>
            </section>

            <section id="ip">
              <h2>Intellectual Property</h2>
              <p>
                All content, design, code, trademarks, and branding on Arkaserve services are the property of
                Arkaserve or its licensors. You may not copy, modify, distribute, sell, or lease any part of our
                services without prior written consent.
              </p>
              <p>
                User-generated content (e.g. feedback submitted through our services) remains your property, but
                you grant Arkaserve a non-exclusive licence to use it to improve the service.
              </p>
            </section>

            <section id="disclaimer">
              <h2>Disclaimer of Warranties</h2>
              <p>
                Our services are provided <strong>"as is"</strong> and <strong>"as available"</strong> without
                warranties of any kind, express or implied, including but not limited to warranties of
                merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p>
                We do not warrant that services will be uninterrupted, error-free, or free of viruses or other
                harmful components.
              </p>
            </section>

            <section id="liability">
              <h2>Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Arkaserve shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages — including loss of data, revenue, or
                exam opportunities — arising from your use of or inability to use our services.
              </p>
              <p>
                Our total liability to you for any claims arising from these terms shall not exceed the amount
                you paid to Arkaserve in the twelve months preceding the claim (or ₹500 if no payment was made).
              </p>
            </section>

            <section id="changes">
              <h2>Changes to These Terms</h2>
              <p>
                We may update these Terms at any time. When we do, we will revise the "Last updated" date above.
                Continued use of our services after changes constitutes acceptance of the new terms. We encourage
                you to review this page periodically.
              </p>
            </section>

            <section id="contact">
              <h2>Contact</h2>
              <p>Questions about these Terms of Service? Reach us at:</p>
              <div className="legal-contact-card">
                <div><strong>Arkaserve</strong></div>
                <div>Email: <a href="mailto:arkaserve@gmail.com">arkaserve@gmail.com</a></div>
                <div>Subject line: <em>"Terms Query – [your question]"</em></div>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
