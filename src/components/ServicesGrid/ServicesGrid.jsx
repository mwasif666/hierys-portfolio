import { useRef } from 'react'
import { useMagneticCards } from '../../useMagneticCards'
import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton'
import './ServicesGrid.css'

const serviceBase = 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782224694'

const services = [
  {
    title: 'Branding',
    sub: 'Identity / Strategy',
    stat: '50+',
    statLabel: 'Brand identity projects completed',
    theme: 'lime',
    img: `${serviceBase}/Rectangle_292_mvqmsi.png`,
  },
  {
    title: 'Seo',
    sub: 'Growth / Ranking',
    stat: '50K+',
    statLabel: 'Backlinks Created',
    theme: 'sky',
    img: `${serviceBase}/Rectangle_294_yi2pnk.png`,
  },
  {
    title: 'Web',
    sub: 'Design / Build',
    stat: '200+',
    statLabel: 'Websites Designed & Developed',
    theme: 'lime',
    img: `${serviceBase}/Rectangle_301_pll516.png`,
  },
  {
    title: 'IT',
    sub: 'Automation / Systems',
    stat: '40+',
    statLabel: 'Automation Solutions Delivered',
    theme: 'sky',
    img: `${serviceBase}/Rectangle_297_kbcyxh.png`,
  },
  {
    title: 'Video',
    sub: 'Story / Production',
    stat: '500+',
    statLabel: 'Video Edits Delivered',
    theme: 'lime',
    img: `${serviceBase}/Rectangle_302_lzsncj.png`,
  },
  {
    title: 'Design',
    sub: 'Digital / Conventional',
    stat: '10K+',
    statLabel: 'Designs Delivered',
    theme: 'sky',
    img: `${serviceBase}/Rectangle_303_z49xbl.png`,
  },
]

function ServiceCard({ service }) {
  return (
    <article className={`svc-card svc-card--${service.theme}`}>
      <div className="svc-text">
        <div className="svc-head">
          <h3 className="svc-title">{service.title}</h3>
          <p className="svc-sub">{service.sub}</p>
        </div>
        <div className="svc-stat">
          <span className="svc-stat-num">{service.stat}</span>
          <span className="svc-stat-label">{service.statLabel}</span>
        </div>
      </div>

      <div className="svc-frame">
        <ImageWithSkeleton className="svc-media" src={service.img} alt={service.title} />
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
          Pick a place <span className="italic-accent">to start</span>. We&apos;ll
          <br className="svc-heading-break" />
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
