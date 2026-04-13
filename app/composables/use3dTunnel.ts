export const use3DTunnel = (sceneRef: Ref<HTMLElement | null>) => {
  let rafId: number

  const handleScroll = () => {
    const scrollY = window.scrollY
    const vh = window.innerHeight
    const progress = scrollY / vh

    const zMovement = progress * 2500
    const rotationX = progress * 5
    const rotationY = Math.sin(progress * 2) * 2

    if (sceneRef.value) {
      sceneRef.value.style.transform = `
        translateZ(${zMovement}px)
        rotateX(${rotationX}deg)
        rotateY(${rotationY}deg)
      `
    }

    rafId = requestAnimationFrame(handleScroll)
  }

  onMounted(() => {
    rafId = requestAnimationFrame(handleScroll)
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
  })
}
