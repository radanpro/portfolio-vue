import { onMounted, onUnmounted, type Ref } from "vue"

export const useMagnetic = (
  elementRef: Ref<HTMLElement | null>,
  strength = 0.25,
) => {
  const mouseMove = (e: MouseEvent) => {
    if (!elementRef.value) return

    const { clientX, clientY } = e
    const { left, top, width, height } =
      elementRef.value.getBoundingClientRect()

    // Calculate the center of the element
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)

    // Apply a magnetic effect
    elementRef.value.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const mouseLeave = () => {
    if (!elementRef.value) return
    elementRef.value.style.transform = `translate(0px, 0px)`
  }

  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.addEventListener("mousemove", mouseMove)
      elementRef.value.addEventListener("mouseleave", mouseLeave)
    }
  })

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener("mousemove", mouseMove)
      elementRef.value.removeEventListener("mouseleave", mouseLeave)
    }
  })
}
