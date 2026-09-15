import HeroVisual from './HeroVisual'

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="home" aria-label="Hero">
      <div className="hero-bloom" aria-hidden="true" />
      <HeroVisual />

      <div className="hero-content">
        <div className="eyebrow">Arkaserve · Technology Products</div>
        <h1 className="hero-h1">
          Built to <em>serve</em>,<br />designed to scale.
        </h1>
        <p className="hero-sub">
          Arkaserve builds focused digital products — from exam preparation platforms to productivity
          tools — crafted with precision and shipped with purpose.
        </p>
        <div className="hero-actions">
          <a href="#products" className="btn btn-teal">
            Explore Products <ArrowIcon />
          </a>
          <a href="#about" className="btn btn-ghost">Our story</a>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <div className="scroll-rail" />
        Scroll
      </div>
    </section>
  )
}
