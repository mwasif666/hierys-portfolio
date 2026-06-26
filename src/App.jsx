import { useEffect, useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Navbar from './components/Navbar/Navbar'
import Foundation from './components/Foundation/Foundation'
import Portfolio from './components/Portfolio/Portfolio'
import ServicesGrid from './components/ServicesGrid/ServicesGrid'
import Process from './components/Process/Process'
import Trusted from './components/Trusted/Trusted'
import OneTeam from './components/OneTeam/OneTeam'
import FeelsLike from './components/FeelsLike/FeelsLike'
import Footer from './components/Footer/Footer'
import ImageWithSkeleton from './components/ImageWithSkeleton/ImageWithSkeleton'
import './App.css'

const featuredProjectImage =
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/14_1_efw5gd.png'

function CountUpStat({ value, suffix = '+', duration = 1400 }) {
  const ref = useRef(null)
  const hasRunRef = useRef(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node || hasRunRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setCount(value)
      hasRunRef.current = true
      return
    }

    let rafId = 0
    const animate = () => {
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * value))

        if (progress < 1) {
          rafId = requestAnimationFrame(tick)
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        hasRunRef.current = true
        animate()
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [duration, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function SiteLoader({ isReady }) {
  return (
    <div className={`site-loader ${isReady ? 'site-loader--hidden' : ''}`} aria-hidden={isReady}>
      <div className="site-loader__panel">
        <span className="site-loader__brand">Hierys</span>
        <CircularProgress
          size={34}
          thickness={4}
          sx={{ color: 'var(--palette-navy)' }}
        />
      </div>
    </div>
  )
}

function App() {
  const [siteReady, setSiteReady] = useState(false)

  useEffect(() => {
    const startedAt = performance.now()
    let timeoutId = 0

    const finishLoading = () => {
      const remainingDelay = Math.max(0, 700 - (performance.now() - startedAt))
      timeoutId = window.setTimeout(() => setSiteReady(true), remainingDelay)
    }

    if (document.readyState === 'complete') {
      finishLoading()
    } else {
      window.addEventListener('load', finishLoading, { once: true })
    }

    return () => {
      window.removeEventListener('load', finishLoading)
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <main className="site-shell">
      <SiteLoader isReady={siteReady} />
      <section id="home" className="page">
        <div className="banner-grid">
          {/* ── Left lime card ── */}
          <article className="card card--lime left">
            <a className="brand" href="#home" aria-label="Hierys home">
              <img className="brand-logo" src="/hierys-logo.png" alt="Hierys" />
            </a>

            <div className="left-foot">
              <h1 className="headline">
                <span className="italic-accent">Build.</span>
                <span className="headline-bold">Position.</span>
                <span className="italic-accent">Grow.</span>
              </h1>
              <p className="lede">
                We are a full-service digital agency with a global team.
                Branding, marketing, design, web development, SEO, and content;
                built as one connected system, delivered by one partner.
              </p>
            </div>
          </article>

          {/* ── Blue stat card (80+) ── */}
          <article className="card card--sky blue">
            <p className="stat-copy">
              Brands built with consistent identity and creative direction.
            </p>
            <span className="stat-figure italic-accent">
              <CountUpStat value={80} />
            </span>
          </article>

          {/* ── Get in touch card ── */}
          <article className="card card--sky-soft getintouch">
            <a className="pill-cta" href="#contact">
              Get in Touch
            </a>
          </article>

          {/* ── Product / featured project card ── */}
          <article className="card product">
            <div className="product-art" role="img" aria-label="Featured project">
              <ImageWithSkeleton src={featuredProjectImage} alt="" loading="eager" />
            </div>
          </article>

          {/* ── Projects stat card (500+) ── */}
          <article className="card card--sky-soft projects">
            <p className="stat-copy">
              Projects delivered across brand, website, content, and growth.
            </p>
            <span className="stat-figure italic-accent">
              <CountUpStat value={500} />
            </span>
          </article>
        </div>
      </section>

      <Foundation />
      <Portfolio />
      <ServicesGrid />
      <Process />
      <Trusted />
      <OneTeam />
      <FeelsLike />
      <Footer />

      <Navbar />
    </main>
  )
}

export default App
