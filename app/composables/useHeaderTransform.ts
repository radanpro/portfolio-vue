export const useHeaderTransform = () => {
  const isScrolled = ref(false)
  let last = 0

  const handleScroll = () => {
    const current = window.scrollY

    if (current > 80 && last <= 80) {
      isScrolled.value = true
    } else if (current < 60 && last >= 60) {
      isScrolled.value = false
    }

    last = current
  }

  onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })

  return { isScrolled }
}
