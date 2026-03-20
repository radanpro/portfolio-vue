<script setup lang="ts">
import gsap from "gsap"
import { ref, onMounted, onUnmounted } from "vue"

const cursorRef = ref(null)
const followerRef = ref(null)

const onMouseMove = (e: MouseEvent) => {
  gsap.to(cursorRef.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    scale: 2,
    onComplete: () => gsap.to(cursorRef.value, { scale: 1, duration: 0.2 }),
  })

  gsap.to(followerRef.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.5,
    ease: "power2.out",
    scale: 1.5,
    opacity: 1,
    onComplete: () => {
      gsap.to(followerRef.value, {
        scale: 1,
        opacity: 0.75,
        duration: 0.4,
        ease: "power2.out",
      })
    },
  })
}

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove)
})

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove)
})
</script>
<template>
  <div class="fixed top-0 left-0 pointer-events-none z-9999">
    <div
      ref="cursorRef"
      class="w-1.5 h-1.5 bg-accent-2 rounded-full fixed -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      ref="followerRef"
      class="w-10 h-10 border border-accent-2/30 rounded-full fixed -translate-x-1/2 -translate-y-1/2"
    ></div>
  </div>
</template>
<style scoped>
:global(body) {
  cursor: none;
}
:global(a, button, .cursor-pointer) {
  cursor: none;
}
</style>
