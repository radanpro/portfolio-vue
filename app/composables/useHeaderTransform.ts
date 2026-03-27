export const useHeaderTransform = () => {
  const isScrolled = ref(false)
  const isVisible = ref(true)
  let lastScroll = 0

  const handleScroll = () => {
    const current = window.scrollY

    isScrolled.value = current > 80

    if (current > lastScroll && current > 550) {
      isVisible.value = false
    } else {
      isVisible.value = true
    }

    lastScroll = current <= 0 ? 0 : current
  }

  onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })

  return { isScrolled, isVisible }
}
