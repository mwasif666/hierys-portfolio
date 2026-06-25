import { useRef } from 'react'
import { useMagneticCards } from '../../useMagneticCards'
import './ServicesGrid.css'

const serviceBase = 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782224694'

const services = [
  {
    title: 'Branding',
    sub: 'Identity / Strategy',
    theme: 'lime',
    img: `${serviceBase}/Rectangle_292_mvqmsi.png`,
  },
  {
    title: 'Seo',
    sub: 'Growth / Ranking',
    theme: 'sky',
    img: `${serviceBase}/Rectangle_294_yi2pnk.png`,
  },
  {
    title: 'Web',
    sub: 'Design / Build',
    theme: 'lime',
    img: `${serviceBase}/Rectangle_301_pll516.png`,
  },
  {
    title: 'IT',
    sub: 'Design / Build',
    theme: 'sky',
    img: `${serviceBase}/Rectangle_297_kbcyxh.png`,
  },
  {
    title: 'Video',
    sub: 'Story / Production',
    theme: 'lime',
    img: `${serviceBase}/Rectangle_302_lzsncj.png`,
  },
  {
    title: 'Design',
    sub: 'Social / Story',
    theme: 'sky',
    img: `${serviceBase}/Rectangle_303_z49xbl.png`,
  },
]

function ServiceCard({ service }) {
  return (
    <article className={`svc-card svc-card--${service.theme}`}>
      <div className="svc-text">
        <h3 className="svc-title">{service.title}</h3>
        <p className="svc-sub">{service.sub}</p>
      </div>

      <div className="svc-frame">
        <img className="svc-media" src={service.img} alt={service.title} />
      </div>
    </article>
  )
}

export default function ServicesGrid() {
  const gridRef = useRef(null)
  useMagneticCards(gridRef, '.svc-card')

  return (
    <section id="services" className="svc-section">
      <div className="svc-wrap">
        <h2 className="svc-heading">
          Pick a place <span className="italic-accent">to start</span>. We&apos;ll{' '}
          <span className="italic-accent">take it</span> from there.
        </h2>

        <div className="svc-grid" ref={gridRef}>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="svc-cta-row">
          <a className="svc-cta" href="#contact">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
