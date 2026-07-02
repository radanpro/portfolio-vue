import { useHeroState } from "~/composables/useHeroState"

export const use3DTunnel = (sceneRef: Ref<HTMLElement | null>) => {
  let rafId: number
  const heroFinished = useHeroState()

  let lastScrollY = 0
  let rotationZ = 0
  const ROTATION_SENSITIVITY = 0.08
  const DECAY = 0.88

  const handleScroll = () => {
    const scrollY = window.scrollY
    const vh = window.innerHeight
    const progress = scrollY / vh

    const zMovement = progress * 2500
    const rotationX = progress * 5
    const rotationY = Math.sin(progress * 2) * 2

    // Scroll delta → rotateZ: down = counter-clockwise (negative), up = clockwise (positive)
    const delta = scrollY - lastScrollY
    lastScrollY = scrollY
    rotationZ += -delta * ROTATION_SENSITIVITY
    rotationZ *= DECAY

    if (sceneRef.value) {
      sceneRef.value.style.transform = `
        translateZ(${zMovement}px)
        rotateX(${rotationX}deg)
        rotateY(${rotationY}deg)
        rotateZ(${rotationZ}deg)
      `

      if (progress >= 1) {
        sceneRef.value.style.opacity = "0"
        sceneRef.value.style.visibility = "hidden"
        sceneRef.value.style.pointerEvents = "none"
      } else {
        sceneRef.value.style.opacity = "1"
        sceneRef.value.style.visibility = "visible"
        sceneRef.value.style.pointerEvents = "auto"
      }
    }

    if (progress >= 1 && !heroFinished.value) {
      heroFinished.value = true
    } else if (progress < 1 && heroFinished.value) {
      heroFinished.value = false
    }

    rafId = requestAnimationFrame(handleScroll)
  }

  onMounted(() => {
    lastScrollY = window.scrollY
    rafId = requestAnimationFrame(handleScroll)
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
  })
}
