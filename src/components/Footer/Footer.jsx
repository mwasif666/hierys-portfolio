import { useState } from 'react'
import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton'
import './Footer.css'

const team = [
  {
    name: 'Ahsan Ahmed',
    role: 'Ceo, Founder',
    lang: 'English',
    email: 'Ahsan.ahmed@hierys.com',
    calendly: 'https://calendly.com/ahsan-ahmed-hierys/30min',
    theme: 'lime',
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778840808/WhatsApp_Image_2026-01-21_at_15.51.54_pfhxka.jpg',
  },
  {
    name: 'Raphael G',
    role: 'Growth Partner',
    lang: 'German/English',
    email: 'rapheal.g@gmail.com',
    calendly: 'https://calendly.com/raphael-hierys',
    theme: 'sky',
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782764919/Rectangle_327_ed5qv7.png',
  },
]

export default function Footer() {
  const [calendlyUrl, setCalendlyUrl] = useState('')
  const closeCalendly = () => setCalendlyUrl('')

  return (
    <footer id="contact" className="footer">
      {/* ── Row 1: Get in touch ── */}
      <a className="foot-cta" href="mailto:hello@hierys.com">
        <span className="foot-cta-text">GET IN TOUCH</span>
        <svg className="foot-cta-arrow" viewBox="0 0 32 32" aria-hidden="true">
          <path
            d="M8 24 24 8M11 8h13v13"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      {/* ── Row 2: Team ── */}
      <div className="foot-team">
        {team.map((person) => (
          <article className={`foot-person foot-person--${person.theme}`} key={person.name}>
            <div className="foot-photo">
              <ImageWithSkeleton src={person.img} alt={person.name} />
            </div>
            <div className="foot-info">
              <div className="foot-id">
                <h3 className="foot-name">{person.name}</h3>
                <p className="foot-role">{person.role}</p>
              </div>
              <div className="foot-meta">
                <p className="foot-lang">{person.lang}</p>
                <a className="foot-mail" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
              </div>
              <button
                className="foot-appt"
                type="button"
                onClick={() => setCalendlyUrl(person.calendly)}
              >
                Schedule Appointment
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ── Row 3: Brand + email ── */}
      <div className="foot-bottom">
        <div className="foot-brand">
          <span className="foot-wordmark">Hierys.</span>
        </div>
        <a className="foot-email" href="mailto:hello@hierys.com">
          <span className="foot-email-label">Email us at</span>
          <span className="foot-email-addr">HELLO@HIERYS.COM</span>
        </a>
      </div>

      {calendlyUrl && (
        <div className="calendly-modal" role="dialog" aria-modal="true" aria-label="Schedule appointment">
          <button className="calendly-modal__backdrop" type="button" onClick={closeCalendly} aria-label="Close" />
          <div className="calendly-modal__panel">
            <button className="calendly-modal__close" type="button" onClick={closeCalendly}>
              Close
            </button>
            <iframe
              className="calendly-modal__frame"
              src={`${calendlyUrl}?hide_gdpr_banner=1`}
              title="Calendly scheduling"
            />
          </div>
        </div>
      )}
    </footer>
  )
}
