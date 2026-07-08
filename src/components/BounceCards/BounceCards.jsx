import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton'
import './BounceCards.css'

/* Adapted from React Bits "BounceCards" — extended to render mixed content
   (coloured stat cards + image cards) instead of images only. Card class is
   namespaced as `.bc-card` to avoid clashing with the app's existing `.card`. */
export default function BounceCards({
  className = '',
  cards = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [],
  enableHover = true,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bc-card',
        { scale: 0 },
        { scale: 1, stagger: animationStagger, ease: easeType, delay: animationDelay },
      )
    }, containerRef)
    return () => ctx.revert()
  }, [animationStagger, easeType, animationDelay])

  /* Hover: lift the card slightly and bring it above its siblings;
     base rotation/offset from transformStyles is preserved by GSAP. */
  const liftCard = (idx) => {
    if (!enableHover || !containerRef.current) return
    const q = gsap.utils.selector(containerRef)
    const target = q(`.bc-card-${idx}`)
    gsap.killTweensOf(target)
    gsap.set(target, { zIndex: 30 })
    gsap.to(target, { y: -18, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
  }

  const dropCard = (idx) => {
    if (!enableHover || !containerRef.current) return
    const q = gsap.utils.selector(containerRef)
    const target = q(`.bc-card-${idx}`)
    gsap.killTweensOf(target)
    gsap.to(target, {
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
      onComplete: () => gsap.set(target, { zIndex: cards[idx]?.z ?? 1 }),
    })
  }

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{ position: 'relative', width: containerWidth, height: containerHeight }}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`bc-card bc-card-${idx} ${card.kind === 'image' ? 'bc-card--img' : ''}`}
          style={{ transform: transformStyles[idx] ?? 'none', zIndex: card.z ?? 1 }}
          onMouseEnter={() => liftCard(idx)}
          onMouseLeave={() => dropCard(idx)}
        >
          {card.kind === 'image' ? (
            <ImageWithSkeleton className="bc-image" src={card.src} alt="" />
          ) : (
            <div className={`bc-stat bc-stat--${card.theme}`}>
              <div className="bc-stat-top">
                <span className="bc-value">{card.value}</span>
                {card.label && <span className="bc-label">{card.label}</span>}
              </div>
              <span className="bc-foot">{card.foot}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
