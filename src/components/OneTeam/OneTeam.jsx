import { useRef } from 'react'
import { useMagneticCards } from '../../useMagneticCards'
import './OneTeam.css'

const base = 'https://res.cloudinary.com/djyb4mzzk/image/upload'

const cards = [
  {
    title: 'Built to fit your pace',
    desc: 'Creative and marketing support that adapts as your business grows.',
    theme: 'lime',
    img: `${base}/v1782250610/Rectangle_311_xtyyqh.png`,
  },
  {
    title: 'AI-powered for fast delivery',
    desc: 'Efficient systems and modern tools that keep work moving quickly and smoothly.',
    theme: 'pink',
    img: `${base}/v1782250610/image_39_v23rd1.png`,
  },
  {
    title: 'Expertise without borders',
    desc: 'A connected team of specialists bringing diverse skills and perspectives to every project.',
    theme: 'blue',
    img: `${base}/v1782250609/image_40_y4hdj7.png`,
  },
]

export default function OneTeam() {
  const gridRef = useRef(null)
  useMagneticCards(gridRef, '.team-card')

  return (
    <section id="team" className="team-section">
      <div className="team-wrap">
        <h2 className="team-heading">
          One Team. Every Expertise. Unlimited Growth.
        </h2>

        <div className="team-grid" ref={gridRef}>
          {cards.map((card) => (
            <article className={`team-card team-card--${card.theme}`} key={card.title}>
              <h3 className="team-title">{card.title}</h3>
              <p className="team-desc">{card.desc}</p>
              <div className="team-img">
                <img src={card.img} alt={card.title} loading="lazy" />
              </div>
            </article>
          ))}
        </div>

        <div className="team-cta-row">
          <a className="team-cta" href="#contact">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
