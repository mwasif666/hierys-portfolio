import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-grid">
        <div className="foot-brand">
          <span className="foot-wordmark">Hierys.</span>
        </div>

        <a className="foot-touch" href="mailto:hello@hierys.com">
          <span>
            GET IN
            <br />
            TOUCH
          </span>
        </a>

        <a className="foot-email" href="mailto:hello@hierys.com">
          <span className="foot-email-label">Email us at</span>
          <span className="foot-email-addr">HELLO@HIERYS.COM</span>
        </a>
      </div>
    </footer>
  )
}
