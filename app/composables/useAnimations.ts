import Lenis from "lenis"
import { isbot } from "isbot"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const useSmoothScroll = () => {
  onMounted(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      smoothTouch: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })
}

export const useScrollAnimations = () => {
  onMounted(() => {
    if (isbot()) return

    gsap.registerPlugin(ScrollTrigger)

    const revealElements = document.querySelectorAll(".reveal")
    revealElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })
    })

    gsap.from(".char-reveal", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: "back.out(1.7)",
      delay: 0.5,
    })
  })
}
