import gsap from "gsap"
import { ref, onMounted, onUnmounted, type Ref } from "vue"

export const useGooeyCursor = () => {
  const cursorRef = ref<HTMLElement | null>(null)
  const followerRef = ref<HTMLElement | null>(null)

  const mouse = { x: 0, y: 0 }

  const followerLag = 0.2

  const onMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY

    gsap.to(cursorRef.value, {
      x: mouse.x,
      y: mouse.y,
      duration: 0.1,
      ease: "none",
      overwrite: "auto",
    })
  }

  const updateFollower = () => {
    if (!followerRef.value) return

    gsap.to(followerRef.value, {
      x: mouse.x,
      y: mouse.y,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",

      scaleX: 1.1,
      scaleY: 0.9,

      onComplete: () => {
        gsap.to(followerRef.value, { scaleX: 1, scaleY: 1, duration: 0.3 })
      },
    })
  }

  onMounted(() => {
    window.addEventListener("mousemove", onMouseMove)
    gsap.ticker.add(updateFollower)
  })

  onUnmounted(() => {
    window.removeEventListener("mousemove", onMouseMove)
    gsap.ticker.remove(updateFollower)
  })

  return {
    cursorRef,
    followerRef,
  }
}
