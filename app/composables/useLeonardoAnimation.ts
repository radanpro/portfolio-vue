import { onMounted } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const useLeonardoAnimation = (cardsSelector: string) => {
  const init = () => {
    onMounted(() => {
      gsap.registerPlugin(ScrollTrigger)

      const cards = document.querySelectorAll(cardsSelector)

      cards.forEach((card, i) => {
        const imgContainer = card.querySelector<HTMLElement>(".img-container")
        const textElement = card.querySelector<HTMLElement>("h3")
        const type = card.getAttribute("data-type")

        if (!imgContainer || !textElement) return

        const startClip =
          type === "bottom"
            ? "polygon(100% 0%, 0% 0%, 0% 50%, 100% 90%)"
            : "polygon(100% 50%, 0% 10%, 0% 100%, 100% 100%)"

        const endClip = "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)"

        gsap.fromTo(
          imgContainer,
          { clipPath: startClip },
          {
            clipPath: endClip,
            duration: 3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        )

        const moveY = type === "bottom" ? 50 : -30
        const isEven = i % 2 === 0

        gsap.fromTo(
          textElement,
          {
            y: 0,
            scaleY: 1,
            rotationY: isEven ? 60 : -60,
            rotationZ: isEven ? 5 : 7,
            transformOrigin: isEven ? "right center" : "left center",
            z: 0,
            transformStyle: "preserve-3d",
            transformPerspective: 1000,
            opacity: 1,
          },
          {
            y: moveY,
            scaleY: 0.02,
            opacity: 0,
            duration: 3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    })
  }

  return { init }
}
