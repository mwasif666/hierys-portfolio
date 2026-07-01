import { useEffect, useState } from 'react'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { sections } from '../../sections'
import './Navbar.css'

/* Minimal inline icon set (lucide-style paths) keyed by the `icon`
   field on each section, so the navbar stays dependency-free. */
const icons = {
  home: 'M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  sparkles:
    'M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4zM18 14l.9 2.3L21 17l-2.1.7L18 20l-.9-2.3L15 17l2.1-.7z',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
}

function NavIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  )
}

const home = sections[0]
const items = sections.slice(1)

export default function Navbar() {
  const [active, setActive] = useState(home.id)

  // Scroll-spy: highlight the section crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id) => {
    setActive(id)
    const el = document.getElementById(id)
    if (!el) return
    // The page is driven by GSAP ScrollSmoother (transform-based), so native
    // scrollIntoView lands in the wrong place — use the smoother when present.
    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTo(el, true, 'top top')
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="navdock" aria-label="Sections">
      <button
        className={`nav-logo ${active === home.id ? 'is-active' : ''}`}
        type="button"
        onClick={() => go(home.id)}
        aria-label={home.label}
      >
        <img src="/logo-mark.svg" alt="" />
      </button>

      {/* Items reveal (slow, symmetric) when the dock is hovered / focused */}
      <div className="nav-items">
        <div className="nav-items-inner">
          <span className="nav-sep" aria-hidden="true" />
          {items.map((s) => (
            <button
              key={s.id}
              className={`nav-item ${active === s.id ? 'is-active' : ''}`}
              type="button"
              onClick={() => go(s.id)}
              aria-label={s.label}
            >
              <NavIcon name={s.icon} />
              <span className="nav-label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Collapsed-state dot hint (fades out as the dock expands) */}
      <span className="nav-hint" aria-hidden="true">
        <span />
      </span>
    </nav>
  )
}
