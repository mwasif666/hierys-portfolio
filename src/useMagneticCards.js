import { useEffect } from 'react'
import gsap from 'gsap'

/* Magnetic cursor-follow for cards — ported from the Hierys "Our Work"
   SelectedHero: each card glides toward the pointer with a slight rotation
   and scale, easing back on leave. Desktop + motion-allowed only. */
export function useMagneticCards(containerRef, selector, options = {}) {
  const {
    xStrength = 0.07,
    yStrength = 0.07,
    rotationStrength = 0.005,
    hoverScale = 1.025,
    moveDuration = 0.7,
    scaleDuration = 0.5,
    ease = 'power3',
  } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.matchMedia('(min-width: 901px)').matches
    if (prefersReduced || !isDesktop) return undefined

    const cards = Array.from(container.querySelectorAll(selector))
    const cleanups = []

    cards.forEach((card) => {
      const xTo = gsap.quickTo(card, 'x', { duration: moveDuration, ease })
      const yTo = gsap.quickTo(card, 'y', { duration: moveDuration, ease })
      const rTo = gsap.quickTo(card, 'rotation', { duration: moveDuration, ease })
      const sTo = gsap.quickTo(card, 'scale', { duration: scaleDuration, ease })

      const onMove = (event) => {
        const rect = card.getBoundingClientRect()
        const relX = event.clientX - (rect.left + rect.width / 2)
        const relY = event.clientY - (rect.top + rect.height / 2)
        // Subtle drift — just enough to feel alive.
        xTo(relX * xStrength)
        yTo(relY * yStrength)
        rTo(relX * rotationStrength)
      }
      const onEnter = () => {
        card.style.zIndex = '5'
        sTo(hoverScale)
      }
      const onLeave = () => {
        xTo(0)
        yTo(0)
        rTo(0)
        sTo(1)
        gsap.delayedCall(0.5, () => {
          card.style.zIndex = ''
        })
      }

      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointerleave', onLeave)
        gsap.killTweensOf(card)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [
    containerRef,
    selector,
    xStrength,
    yStrength,
    rotationStrength,
    hoverScale,
    moveDuration,
    scaleDuration,
    ease,
  ])
}
