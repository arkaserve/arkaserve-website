const STATS = [
  { n: '3', suffix: '+', label: 'Live products' },
  { n: '10', suffix: 'k+', label: 'Questions generated' },
  { n: '5', suffix: '+', label: 'Exam categories' },
  { n: '24', suffix: '/7', label: 'Always available' },
]

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-h2">
      <div className="about-inner">
        <div>
          <div className="sec-label">About Arkaserve</div>
          <h2 className="sec-h2" id="about-h2">
            Small team.<br />Purposeful software.
          </h2>
          <p className="about-body">
            Arkaserve is an independent software studio focused on building practical,
            well-crafted products. We believe in shipping software that genuinely reduces
            effort for the people using it &mdash; not feature-bloated tools that require a manual
            to operate.
          </p>
          <p className="about-body">
            Every product starts from a real problem: competitive exam preparation,
            document management, or tracking what&apos;s been engineered. We stay focused,
            iterate quickly, and care about the details.
          </p>
          <div className="about-quote">
            <p>"Serve the user. Ship with intent. Iterate with honesty."</p>
          </div>
        </div>

        <div className="stats-mosaic" aria-label="Arkaserve by the numbers">
          {STATS.map(s => (
            <div className="stat-cell" key={s.label}>
              <div className="stat-n">
                {s.n}<em>{s.suffix}</em>
              </div>
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
