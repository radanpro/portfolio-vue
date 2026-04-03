import Lenis from "lenis"
import { isbot } from "isbot"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const useSmoothScroll = () => {
  let lenis: Lenis | null = null
  onMounted(() => {
    lenis = new Lenis({
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 2,
      infinite: false,
    })
    lenis.on("scroll", () => {
      // @ts-ignore
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {})
      ScrollTrigger.update()
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    lenis?.destroy()
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

    gsap.to(".reveal-text", {
      scrollTrigger: {
        trigger: ".reveal-text",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        scrub: true,
      },
      color: "#ffffff",
      stagger: 0.1,
    })
  })
}
