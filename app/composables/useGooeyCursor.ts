import gsap from "gsap"
import { onMounted, onUnmounted, ref } from "vue"

type Point = {
  x: number
  y: number
}

export const useGooeyCursor = () => {
  const cursorRef = ref<HTMLElement | null>(null)
  const followerRef = ref<HTMLElement | null>(null)
  const bridgeRef = ref<HTMLElement | null>(null)
  const isEnabled = ref(false)

  const pointer: Point = { x: 0, y: 0 }
  const follower: Point = { x: 0, y: 0 }

  let hasStarted = false
  let isVisible = false
  let isStretching = false
  let lastMoveAt = 0
  let cleanup: (() => void) | null = null

  onMounted(() => {
    const cursor = cursorRef.value
    const followerElement = followerRef.value
    const bridge = bridgeRef.value

    if (!cursor || !followerElement || !bridge) return

    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    isEnabled.value = supportsFinePointer && !prefersReducedMotion

    if (!isEnabled.value) return

    document.body.classList.add("has-gooey-cursor")

    gsap.set([cursor, followerElement], {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
      force3D: true,
    })

    gsap.set(followerElement, {
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: "50% 50%",
    })

    gsap.set(bridge, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: "50% 50%",
      force3D: true,
    })

    const setCursorX = gsap.quickSetter(cursor, "x", "px")
    const setCursorY = gsap.quickSetter(cursor, "y", "px")
    const setFollowerX = gsap.quickSetter(followerElement, "x", "px")
    const setFollowerY = gsap.quickSetter(followerElement, "y", "px")

    const rotateFollower = gsap.quickTo(followerElement, "rotation", {
      duration: 0.18,
      ease: "power2.out",
    })

    const moveScaleX = gsap.quickTo(followerElement, "scaleX", {
      duration: 0.16,
      ease: "power3.out",
    })

    const moveScaleY = gsap.quickTo(followerElement, "scaleY", {
      duration: 0.16,
      ease: "power3.out",
    })

    const settleScaleX = gsap.quickTo(followerElement, "scaleX", {
      duration: 0.85,
      ease: "elastic.out(1, 0.45)",
    })

    const settleScaleY = gsap.quickTo(followerElement, "scaleY", {
      duration: 0.85,
      ease: "elastic.out(1, 0.45)",
    })

    const moveBridgeX = gsap.quickTo(bridge, "x", {
      duration: 0.12,
      ease: "power2.out",
    })

    const moveBridgeY = gsap.quickTo(bridge, "y", {
      duration: 0.12,
      ease: "power2.out",
    })

    const moveBridgeScaleX = gsap.quickTo(bridge, "scaleX", {
      duration: 0.18,
      ease: "power2.out",
    })

    const moveBridgeScaleY = gsap.quickTo(bridge, "scaleY", {
      duration: 0.18,
      ease: "power2.out",
    })

    const settleBridgeX = gsap.quickTo(bridge, "x", {
      duration: 0.75,
      ease: "elastic.out(1, 0.42)",
    })

    const settleBridgeY = gsap.quickTo(bridge, "y", {
      duration: 0.75,
      ease: "elastic.out(1, 0.42)",
    })

    const settleBridgeScaleX = gsap.quickTo(bridge, "scaleX", {
      duration: 0.75,
      ease: "elastic.out(1, 0.42)",
    })

    const settleBridgeScaleY = gsap.quickTo(bridge, "scaleY", {
      duration: 0.75,
      ease: "elastic.out(1, 0.42)",
    })

    const revealCursor = () => {
      if (isVisible) return

      isVisible = true
      gsap.to([cursor, followerElement], {
        autoAlpha: 1,
        duration: 0.18,
        overwrite: "auto",
      })
    }

    const hideCursor = () => {
      if (!isVisible) return

      isVisible = false
      gsap.to([cursor, followerElement], {
        autoAlpha: 0,
        duration: 0.2,
        overwrite: "auto",
      })
    }

    const onMouseMove = (event: MouseEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      lastMoveAt = performance.now()

      setCursorX(pointer.x)
      setCursorY(pointer.y)

      if (!hasStarted) {
        follower.x = pointer.x
        follower.y = pointer.y
        setFollowerX(follower.x)
        setFollowerY(follower.y)
        hasStarted = true
      }

      revealCursor()
    }

    const onPointerLeave = () => {
      hideCursor()
    }

    const onPointerEnter = () => {
      if (hasStarted) {
        revealCursor()
      }
    }

    const updateFollower = () => {
      if (!hasStarted) return

      const frameRatio = Math.min(gsap.ticker.deltaRatio(), 1.6)
      const followStrength = 0.2 * frameRatio

      follower.x += (pointer.x - follower.x) * followStrength
      follower.y += (pointer.y - follower.y) * followStrength

      setFollowerX(follower.x)
      setFollowerY(follower.y)

      const dx = pointer.x - follower.x
      const dy = pointer.y - follower.y
      const distance = Math.hypot(dx, dy)
      const angle = Math.atan2(dy, dx)
      const angleDeg = (angle * 180) / Math.PI
      const tension = Math.min(distance / 110, 1)
      const isPulled = performance.now() - lastMoveAt < 48 || distance > 18

      rotateFollower(angleDeg)

      if (distance > 1 && isPulled) {
        isStretching = true

        const bridgeDistance = Math.min(42, distance * 0.44)
        const stretchX = 1 + tension * 0.5
        const stretchY = 1 - tension * 0.24
        const bridgeX = Math.cos(angle) * bridgeDistance
        const bridgeY = Math.sin(angle) * bridgeDistance
        const bridgeScaleX = 0.85 + tension * 1.1
        const bridgeScaleY = Math.max(0.4, 0.78 - tension * 0.24)

        moveScaleX(stretchX)
        moveScaleY(stretchY)
        moveBridgeX(bridgeX)
        moveBridgeY(bridgeY)
        moveBridgeScaleX(bridgeScaleX)
        moveBridgeScaleY(bridgeScaleY)

        return
      }

      if (isStretching) {
        isStretching = false
        settleScaleX(1)
        settleScaleY(1)
        settleBridgeX(0)
        settleBridgeY(0)
        settleBridgeScaleX(1)
        settleBridgeScaleY(1)
      }
    }

    document.documentElement.addEventListener("mousemove", onMouseMove, {
      passive: true,
    })
    document.documentElement.addEventListener("mouseenter", onPointerEnter)
    document.documentElement.addEventListener("mouseleave", onPointerLeave)
    window.addEventListener("blur", onPointerLeave)
    gsap.ticker.add(updateFollower)

    cleanup = () => {
      document.documentElement.removeEventListener("mousemove", onMouseMove)
      document.documentElement.removeEventListener("mouseenter", onPointerEnter)
      document.documentElement.removeEventListener("mouseleave", onPointerLeave)
      window.removeEventListener("blur", onPointerLeave)
      gsap.ticker.remove(updateFollower)
      gsap.killTweensOf([cursor, followerElement, bridge])
    }
  })

  onUnmounted(() => {
    cleanup?.()
    document.body.classList.remove("has-gooey-cursor")
  })

  return {
    bridgeRef,
    cursorRef,
    followerRef,
    isEnabled,
  }
}
