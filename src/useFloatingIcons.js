import { useEffect } from 'react'
import gsap from 'gsap'

// Cursor-proximity repulsion with spring-like easing. The outer tile handles
// pointer movement while its child owns the idle float, so transforms compose.
export function useFloatingIcons(containerRef, selector) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktop = window.matchMedia('(min-width: 901px)').matches
    if (reducedMotion || !desktop) return undefined

    const icons = Array.from(container.querySelectorAll(selector))
    let frame = 0
    let pointerX = -1000
    let pointerY = -1000

    const controls = icons.map((icon) => ({
      icon,
      xTo: gsap.quickTo(icon, 'x', { duration: 0.34, ease: 'power3.out' }),
      yTo: gsap.quickTo(icon, 'y', { duration: 0.34, ease: 'power3.out' }),
      rotateTo: gsap.quickTo(icon, 'rotation', { duration: 0.4, ease: 'power3.out' }),
      scaleTo: gsap.quickTo(icon, 'scale', { duration: 0.25, ease: 'power2.out' }),
    }))

    const update = () => {
      frame = 0

      controls.forEach(({ icon, xTo, yTo, rotateTo }) => {
        const rect = icon.getBoundingClientRect()
        const currentX = Number(gsap.getProperty(icon, 'x')) || 0
        const currentY = Number(gsap.getProperty(icon, 'y')) || 0
        // Remove the current GSAP offset to keep the force anchored to the
        // icon's original layout position and prevent feedback/jitter.
        const centerX = rect.left + rect.width / 2 - currentX
        const centerY = rect.top + rect.height / 2 - currentY
        const deltaX = pointerX - centerX
        const deltaY = pointerY - centerY
        const distance = Math.hypot(deltaX, deltaY)
        const radius = 165

        if (distance < radius) {
          const safeDistance = Math.max(distance, 1)
          const force = (1 - distance / radius) * 48
          const targetX = -(deltaX / safeDistance) * force
          const targetY = -(deltaY / safeDistance) * force
          xTo(targetX)
          yTo(targetY)
          rotateTo(targetX * 0.08)
        } else {
          xTo(0)
          yTo(0)
          rotateTo(0)
        }
      })
    }

    const onPointerMove = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const reset = () => {
      pointerX = -1000
      pointerY = -1000
      controls.forEach(({ xTo, yTo, rotateTo, scaleTo }) => {
        xTo(0)
        yTo(0)
        rotateTo(0)
        scaleTo(1)
      })
    }

    const hoverCleanups = controls.map(({ icon, scaleTo }) => {
      const enter = () => scaleTo(1.08)
      const leave = () => scaleTo(1)
      icon.addEventListener('pointerenter', enter)
      icon.addEventListener('pointerleave', leave)
      return () => {
        icon.removeEventListener('pointerenter', enter)
        icon.removeEventListener('pointerleave', leave)
      }
    })

    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerleave', reset)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', reset)
      hoverCleanups.forEach((cleanup) => cleanup())
      controls.forEach(({ icon }) => gsap.killTweensOf(icon))
    }
  }, [containerRef, selector])
}
