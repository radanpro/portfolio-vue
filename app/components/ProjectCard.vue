<script setup lang="ts">
import { gsap } from "gsap"

const props = defineProps<{
  title: string
  category: string
  image: string
}>()

const cardRef = ref<HTMLElement | null>(null)
const glareRef = ref<HTMLElement | null>(null)

const onMouseMove = (e: MouseEvent) => {
  if (!cardRef.value || !glareRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // Calculate rotation based on mouse position
  const rotateX = ((y - rect.height / 2) / rect.height) * -40
  const rotateY = ((x - rect.width / 2) / rect.width) * 40

  gsap.to(cardRef.value, {
    rotateX,
    rotateY,
    scale: 1.1,
    duration: 0.5,
    ease: "power2.out",
    perspective: 1000,
  })

  // Glare position
  gsap.to(glareRef.value, {
    opacity: 1,
    x: x - 50,
    y: y - 50,
    duration: 0.2,
  })
}

const onMouseLeave = () => {
  if (!cardRef.value || !glareRef.value) return

  gsap.to(cardRef.value, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.7,
    ease: "elastic.out(1, 0.3)",
  })

  gsap.to(glareRef.value, { opacity: 0 })
}
</script>

<template>
  <div
    ref="cardRef"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    class="relative group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden aspect-16/10 transition-colors hover:border-accent-2/30"
  >
    <div
      class="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>

    <div
      class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end"
    >
      <p
        class="text-accent-2 text-xs tracking-widest uppercase mb-2 font-drizy"
      >
        {{ category }}
      </p>
      <h3
        class="font-black-sansa text-3xl font-bold uppercase tracking-tighter"
      >
        {{ title }}
      </h3>
    </div>

    <div
      ref="glareRef"
      class="absolute w-32 h-32 bg-accent-2/20 blur-3xl rounded-full pointer-events-none opacity-0"
    ></div>
  </div>
</template>
