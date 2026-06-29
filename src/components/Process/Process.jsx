import Toolkit from '../Toolkit/Toolkit'
import './Process.css'

const pills = [
  { label: 'Social Media Creative' },
  { label: 'Email Creation', accent: true },
  { label: 'Performance Marketing' },
  { label: 'Campaign Strategy' },
  { label: 'Ad Creatives', accent: true },
  { label: 'Video Production' },
]

/* color = the theme that fades in on hover (3 themes: green / blue / pink) */
const steps = [
  {
    n: '01',
    title: 'We listen',
    color: 'green',
    desc: 'We understand what’s working, uncover what’s being missed, and identify where your brand can move further.',
  },
  {
    n: '02',
    title: 'We map it.',
    color: 'blue',
    desc: 'We shape a clear direction — what to prioritise, what to refine, and what to leave behind.',
  },
  {
    n: '03',
    title: 'We build it',
    color: 'green',
    desc: 'Design, content, and digital experience built as one system with purpose in every detail.',
  },
  {
    n: '04',
    title: 'You feel it.',
    color: 'pink',
    desc: 'A brand that feels clear, trusted, and memorable from the very first interaction.',
  },
]

export default function Process() {
  return (
    <section id="process" className="proc-section">
      {/* ── Marquee ── */}
      <div className="proc-marquee" aria-hidden="true">
        <div className="proc-track">
          {[...pills, ...pills].map((pill, i) => (
            <span
              className={`proc-pill ${pill.accent ? 'proc-pill--accent' : ''}`}
              key={`${pill.label}-${i}`}
            >
              {pill.label}
            </span>
          ))}
        </div>
      </div>

      <Toolkit />

      <div className="proc-wrap">
        <h2 className="proc-heading">
          We listen. We map it. We build it. You feel it.
        </h2>

        <div className="proc-grid">
          {steps.map((step) => (
            <article className={`proc-card proc-card--${step.color}`} key={step.n}>
              <span className="proc-num">{step.n}</span>
              <h3 className="proc-title">{step.title}</h3>
              <p className="proc-desc">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
