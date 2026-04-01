import gsap from "gsap"
import { onMounted, onUnmounted, ref } from "vue"

export const useGooeyCursor = () => {
  const cursorRef = ref<HTMLElement | null>(null)
  const ringRef = ref<HTMLElement | null>(null)
  const isEnabled = ref(false)

  let cleanup: (() => void) | null = null

  onMounted(() => {
    const cursor = cursorRef.value
    const ring = ringRef.value

    if (!cursor || !ring) return

    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches

    isEnabled.value = supportsFinePointer
    if (!isEnabled.value) return

    document.body.classList.add("has-custom-cursor")

    gsap.set([cursor, ring], {
      xPercent: -50,
      yPercent: -50,
    })

    const setCursorX = gsap.quickSetter(cursor, "x", "px")
    const setCursorY = gsap.quickSetter(cursor, "y", "px")

    const moveRingX = gsap.quickTo(ring, "x", {
      duration: 0.2,
      ease: "power3.out",
    })

    const moveRingY = gsap.quickTo(ring, "y", {
      duration: 0.2,
      ease: "power3.out",
    })

    const onMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      setCursorX(x)
      setCursorY(y)

      moveRingX(x)
      moveRingY(y)
    }

    document.addEventListener("mousemove", onMove)

    cleanup = () => {
      document.removeEventListener("mousemove", onMove)
      gsap.killTweensOf([cursor, ring])
    }
  })

  onUnmounted(() => {
    cleanup?.()
    document.body.classList.remove("has-custom-cursor")
  })

  return {
    cursorRef,
    ringRef,
    isEnabled,
  }
}
