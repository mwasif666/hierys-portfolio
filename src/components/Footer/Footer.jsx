import ImageWithSkeleton from "../ImageWithSkeleton/ImageWithSkeleton";
import "./Footer.css";

const team = [
  {
    name: "Ahsan Ahmed",
    role: "CEO, Founder",
    lang: "English",
    email: "ahsan.ahmed@hierys.com",
    calendly: "https://calendly.com/ahsan-ahmed-hierys/30min",
    linkedin: "https://www.linkedin.com/in/syedahsana",
    theme: "lime",
    img: "https://res.cloudinary.com/djyb4mzzk/image/upload/v1778840808/WhatsApp_Image_2026-01-21_at_15.51.54_pfhxka.jpg",
  },
  {
    name: "Raphael Grubauer",
    role: "Growth Partner",
    lang: "German/English",
    email: "rapheal.g@hierys.com",
    calendly: "https://calendly.com/raphael-hierys",
    linkedin: "https://www.linkedin.com/in/raphael-grubauer-995b74263",
    theme: "sky",
    img: "https://res.cloudinary.com/djyb4mzzk/image/upload/v1782764919/Rectangle_327_ed5qv7.png",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="footer">
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

      <div className="foot-team">
        {team.map((person) => (
          <article
            className={`foot-person foot-person--${person.theme}`}
            key={person.name}
          >
            <div className="foot-photo">
              <ImageWithSkeleton src={person.img} alt={person.name} />
            </div>
            <div className="foot-info">
              <div className="foot-id">
                <div className="foot-id-text">
                  <h3 className="foot-name">{person.name}</h3>
                  <p className="foot-role">{person.role}</p>
                </div>
              </div>
              <div className="foot-meta">
                <p className="foot-lang">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
                  </svg>
                  <span>{person.lang}</span>
                </p>
                <a className="foot-mail" href={`mailto:${person.email}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                  <span>{person.email}</span>
                </a>
                <a
                  className="foot-li-link"
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} on LinkedIn`}
                  title="View LinkedIn profile"
                >
                  <span>LinkedIn</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8.5 7H17v8.5" />
                  </svg>
                </a>
              </div>
              <div className="foot-actions">
                <a
                  className="foot-appt"
                  href={person.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Schedule an appointment with ${person.name} on Calendly`}
                >
                  Schedule Appointment
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="foot-bottom">
        <div className="foot-brand">
          <span className="foot-wordmark">Hierys.</span>
        </div>
        <div className="foot-email">
          <a className="foot-email-link" href="mailto:hello@hierys.com">
            <span className="foot-email-label">Email us at</span>
            <span className="foot-email-addr">hello@hierys.com</span>
          </a>

          <div className="foot-follow">
            <h2 className="foot-follow-title">Follow us at</h2>
            <div className="foot-social">
              <a className="foot-social-icon" href="https://www.instagram.com/wearehierys" aria-label="Instagram" rel="noreferrer" target="_blank">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a className="foot-social-icon" href="https://www.facebook.com/wearehierys" aria-label="Facebook" rel="noreferrer" target="_blank">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a className="foot-social-icon" href="https://www.pinterest.com/wearehierys" aria-label="Pinterest" rel="noreferrer" target="_blank">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M10.2 20.5c.3-1.2.8-3.5 1.1-4.9" />
                  <path d="M11.3 15.6c-.5-.9-.4-2.3.1-3.4.5-1.1 1.5-1.8 2.5-1.5 1.1.3 1.3 1.5.9 2.8-.4 1.5-1.2 3.2.7 3.6 1.8.4 3.5-1.5 3.5-4.1 0-3.4-2.8-6-6.6-6-4.1 0-6.9 2.8-6.9 6.2 0 1.5.6 2.8 1.5 3.5" />
                </svg>
              </a>
              <a className="foot-social-icon" href="https://www.behance.net/wearehierys" aria-label="Behance" rel="noreferrer" target="_blank">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M2 5.5h7.1c1.6 0 2.8.4 3.6 1.1.7.6 1 1.5 1 2.6 0 1.4-.7 2.4-2 3 1.8.5 2.7 1.7 2.7 3.5 0 1.3-.4 2.3-1.3 3-.9.8-2.2 1.2-3.8 1.2H2V5.5Zm6.7 5.7c.7 0 1.2-.1 1.5-.4.4-.3.5-.7.5-1.2s-.2-.9-.5-1.1c-.3-.3-.8-.4-1.5-.4H5.2v3.1h3.5Zm.5 6.2c.7 0 1.3-.2 1.6-.5.4-.3.6-.7.6-1.3 0-.5-.2-.9-.6-1.2-.4-.3-1-.4-1.8-.4H5.2v3.4h4Z" />
                  <path d="M16.5 7.3h5V5.9h-5v1.4Zm2.7 12.9c1 0 1.9-.2 2.6-.7.7-.4 1.3-1 1.8-1.8l-2.1-1.2c-.6.8-1.3 1.2-2.3 1.2-.7 0-1.2-.2-1.7-.6-.5-.4-.7-.9-.8-1.6H24c0-.2.1-.6.1-.9 0-1.7-.5-3-1.4-4-.9-1-2.1-1.5-3.7-1.5-1.5 0-2.8.5-3.8 1.6-1 1-1.5 2.4-1.5 4s.5 3 1.5 4c1 1 2.3 1.5 4 1.5Zm-2.6-6.6c.1-.7.4-1.2.8-1.6.4-.4.9-.6 1.6-.6s1.2.2 1.6.6c.4.4.6.9.7 1.6h-4.7Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="foot-website">
          <p className="foot-website-lede">Explore our work, case studies and services.</p>
          <div className="foot-website-visit">
            <span className="foot-website-label">Visit our website</span>
            <a className="foot-website-url" href="https://www.hierys.com" target="_blank" rel="noopener noreferrer" aria-label="Visit the Hierys website">
              www.hierys.com
            </a>
            <nav className="foot-legal" aria-label="Legal information">
              <a href="https://hierys.com/privacy-policy">Privacy Policy</a>
              <a href="https://hierys.com/imprint">Imprint</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
