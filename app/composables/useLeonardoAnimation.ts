import { onMounted } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const useLeonardoAnimation = (cardsSelector: string) => {
  const init = () => {
    onMounted(() => {
      gsap.registerPlugin(ScrollTrigger)

      const cards = document.querySelectorAll(cardsSelector)

      cards.forEach((card) => {
        const imgContainer = card.querySelector<HTMLElement>(".img-container")
        const textElement = card.querySelector<HTMLElement>("h3")
        const type = card.getAttribute("data-type")

        if (!imgContainer || !textElement) return

        const startClip =
          type === "bottom"
            ? "polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%)"
            : "polygon(0% 45%, 100% 0%, 100% 100%, 0% 100%)"

        const endClip = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"

        const moveY = type === "bottom" ? 100 : -100

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

        gsap.fromTo(
          textElement,
          { y: 0, scaleY: 1, opacity: 1 },
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
