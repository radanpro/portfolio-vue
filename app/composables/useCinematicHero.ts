import { onMounted, onUnmounted } from "vue"
import type { Ref } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type HeroElementRef = Ref<HTMLElement | null>

export const useCinematicHero = (
  sectionRef: HeroElementRef,
  heroRef: HeroElementRef,
  sceneRef: HeroElementRef,
) => {
  let mm: gsap.MatchMedia | null = null
  let ctx: gsap.Context | null = null

  onMounted(() => {
    const section = sectionRef.value
    const hero = heroRef.value
    const scene = sceneRef.value

    if (!section || !hero || !scene) return

    gsap.registerPlugin(ScrollTrigger)

    ctx = gsap.context(() => {
      const layers =
        gsap.utils.toArray<HTMLElement>("[data-cinematic-layer]") ?? []

      mm = gsap.matchMedia()
      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        ({ conditions }) => {
          const isMobile = Boolean(conditions?.isMobile)
          const isTablet = Boolean(conditions?.isTablet)

          const perspective = isMobile ? 800 : isTablet ? 1000 : 1400
          const cameraTravel = isMobile ? 3600 : isTablet ? 4500 : 5500
          const scrollDistance = isMobile ? 3000 : isTablet ? 4000 : 5000

          gsap.set(hero, { perspective })
          gsap.set(scene, {
            z: 0,
            rotationX: isMobile ? -1 : -2,
            rotationY: isMobile ? 0.8 : 1.4,
            transformStyle: "preserve-3d",
            force3D: true,
          })

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          tl.to(
            scene,
            {
              z: cameraTravel,
              duration: 1,
            },
            0,
          )

          tl.to(
            scene,
            {
              rotationX: isMobile ? 1 : 2.2,
              rotationY: isMobile ? -1.1 : -2,
              duration: 0.5,
            },
            0,
          )

          tl.to(
            scene,
            {
              rotationX: isMobile ? -0.6 : -1.2,
              rotationY: isMobile ? 0.7 : 1.1,
              duration: 0.5,
            },
            0.5,
          )

          layers.forEach((layer) => {
            const passAt = Number(layer.dataset.pass ?? "0.72")
            const driftX = Number(layer.dataset.driftx ?? "0")
            const driftY = Number(layer.dataset.drifty ?? "0")
            const endScale = Number(layer.dataset.endscale ?? "1.18")

            tl.to(
              layer,
              {
                xPercent: driftX,
                yPercent: driftY,
                scale: endScale,
                duration: 1,
                force3D: true,
              },
              0,
            )

            tl.to(
              layer,
              {
                autoAlpha: 0,
                duration: 0.18,
                ease: "power2.in",
              },
              passAt,
            )
          })

          return () => {
            tl.kill()
          }
        },
      )
    }, section)
  })

  onUnmounted(() => {
    mm?.revert()
    ctx?.revert()
    mm = null
    ctx = null
  })
}
