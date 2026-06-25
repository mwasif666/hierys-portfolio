import Navbar from './components/Navbar/Navbar'
import Foundation from './components/Foundation/Foundation'
import Portfolio from './components/Portfolio/Portfolio'
import ServicesGrid from './components/ServicesGrid/ServicesGrid'
import Process from './components/Process/Process'
import Trusted from './components/Trusted/Trusted'
import OneTeam from './components/OneTeam/OneTeam'
import FeelsLike from './components/FeelsLike/FeelsLike'
import Footer from './components/Footer/Footer'
import './App.css'

const featuredProjectImage =
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/14_1_efw5gd.png'

function App() {
  return (
    <main className="site-shell">
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
            <span className="stat-figure italic-accent">80+</span>
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
              <img src={featuredProjectImage} alt="" />
            </div>
          </article>

          {/* ── Projects stat card (500+) ── */}
          <article className="card card--sky-soft projects">
            <p className="stat-copy">
              Projects delivered across brand, website, content, and growth.
            </p>
            <span className="stat-figure italic-accent">500+</span>
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
