import { useEffect, useRef, useState } from 'react'
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
  const [isContactDocked, setIsContactDocked] = useState(false)
  const dockRef = useRef(null)

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

  // Once the footer's logo card reaches the viewport, dock the floating nav to
  // its lower edge. It continues following the card as it scrolls away, which
  // keeps the social links in the adjacent/stacked card completely unobstructed.
  useEffect(() => {
    const dock = dockRef.current
    const brandCard = document.querySelector('.foot-brand')
    const brandWordmark = document.querySelector('.foot-wordmark')
    const footer = document.getElementById('contact')
    if (!dock || !brandCard || !brandWordmark || !footer) return undefined

    let frameId = 0
    let docked = false
    let trackUntil = 0

    const updateDock = () => {
      frameId = 0

      const brandRect = brandCard.getBoundingClientRect()
      const wordmarkRect = brandWordmark.getBoundingClientRect()
      const footerRect = footer.getBoundingClientRect()
      const dockRect = dock.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const normalTop = viewportHeight - dockRect.height - (viewportWidth <= 560 ? 14 : 22)
      const shouldDock =
        brandRect.top <= viewportHeight - dockRect.height - 24 &&
        footerRect.bottom > 0

      if (shouldDock) {
        const edgeSpace = 10
        const halfDock = dockRect.width / 2
        const wordmarkStart = wordmarkRect.left
        const isStackedFooter = viewportWidth <= 720
        const dockLeft = isStackedFooter
          ? viewportWidth / 2
          : Math.min(
              viewportWidth - halfDock - edgeSpace,
              Math.max(halfDock + edgeSpace, wordmarkStart + halfDock),
            )
        const dockTop = isStackedFooter
          ? footerRect.bottom - dockRect.height - 18
          : Math.min(normalTop, brandRect.bottom - dockRect.height - 14)

        dock.style.setProperty('--nav-docked-left', `${dockLeft}px`)
        dock.style.setProperty('--nav-docked-top', `${dockTop}px`)
      }

      if (docked !== shouldDock) {
        docked = shouldDock
        setIsContactDocked(shouldDock)
      }

      // ScrollSmoother keeps easing after the native scroll event. Follow that
      // short settling period so the dock stays visually locked to the card.
      if (performance.now() < trackUntil) {
        frameId = window.requestAnimationFrame(updateDock)
      }
    }

    const scheduleUpdate = () => {
      trackUntil = performance.now() + 1600
      if (!frameId) frameId = window.requestAnimationFrame(updateDock)
    }

    updateDock()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.cancelAnimationFrame(frameId)
    }
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
    <nav
      ref={dockRef}
      className={`navdock ${isContactDocked ? 'is-contact-docked' : ''}`}
      aria-label="Sections"
    >
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
