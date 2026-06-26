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

  const getNoRotationTransform = (transformStr) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr)
    if (hasRotate) return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)')
    if (transformStr === 'none') return 'rotate(0deg)'
    return `${transformStr} rotate(0deg)`
  }

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/
    const match = baseTransform.match(translateRegex)
    if (match) {
      const newX = parseFloat(match[1]) + offsetX
      return baseTransform.replace(translateRegex, `translate(${newX}px)`)
    }
    return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`
  }

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover || !containerRef.current) return
    const q = gsap.utils.selector(containerRef)
    cards.forEach((_, i) => {
      const target = q(`.bc-card-${i}`)
      gsap.killTweensOf(target)
      const baseTransform = transformStyles[i] || 'none'
      if (i === hoveredIdx) {
        gsap.to(target, {
          transform: getNoRotationTransform(baseTransform),
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        })
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160
        gsap.to(target, {
          transform: getPushedTransform(baseTransform, offsetX),
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay: Math.abs(hoveredIdx - i) * 0.05,
          overwrite: 'auto',
        })
      }
    })
  }

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return
    const q = gsap.utils.selector(containerRef)
    cards.forEach((_, i) => {
      const target = q(`.bc-card-${i}`)
      gsap.killTweensOf(target)
      gsap.to(target, {
        transform: transformStyles[i] || 'none',
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      })
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
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
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
