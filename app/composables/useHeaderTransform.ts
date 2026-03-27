export const useHeaderTransform = (threshold = 100) => {
  const isScrolled = ref(false)

  const handleScroll = () => {
    if (window.scrollY > 50) {
      isScrolled.value = true
    } else {
      isScrolled.value = false
    }
  }
  onMounted(() => {
    window.addEventListener("scroll", handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })

  return {
    isScrolled,
  }
}
