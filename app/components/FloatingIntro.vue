<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue"
import gsap from "gsap"
import { useHeroState } from "~/composables/useHeroState"

const heroFinished = useHeroState()

const containerRef = ref<HTMLElement | null>(null)
const particles = ref<HTMLElement[]>([])

const images = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300",
]

let isRunning = false
let delayedStart: gsap.core.Tween | null = null

// random helper
const rand = (min: number, max: number) => Math.random() * (max - min) + min

const spawnParticle = () => {
  if (!containerRef.value || !isRunning) return

  const el = document.createElement("img")
  el.src = images[Math.floor(Math.random() * images.length)]

  const size = rand(40, 120)

  el.style.width = `${size}px`
  el.style.height = `${size}px`
  el.className =
    "absolute object-cover rounded-xl pointer-events-none will-change-transform"

  containerRef.value.appendChild(el)
  particles.value.push(el)

  const vw = window.innerWidth
  const vh = window.innerHeight

  const targetX = rand(-vw / 2, vw / 2)
  const targetY = rand(-vh / 2, vh / 2)

  // random speed
  const duration = rand(2, 16)
  const driftX = rand(-150, 150)
  const driftY = rand(-150, 150)
  const depth = rand(0.5, 1.5)

  gsap.fromTo(
    el,
    {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      rotate: rand(-180, 180),
    },
    {
      x: targetX + driftX,
      y: targetY + driftY,
      opacity: rand(0.6, 1),
      rotate: rand(-90, 90),
      scale: depth,
      zIndex: Math.floor(depth * 100),
      duration,
      ease: ["power2.out", "power3.out", "expo.out"][Math.floor(rand(0, 3))],
      onComplete: () => {
        gsap.to(el, {
          opacity: 0,
          duration: rand(0.5, 1.5),
          onComplete: () => {
            el.remove()
            spawnParticle()
          },
        })
      },
    },
  )
}

// spawn initial batch
let loopTween: gsap.core.Tween | null = null

const spawnBurst = () => {
  if (!isRunning) return

  const count = Math.floor(rand(1, 3))

  for (let i = 0; i < count; i++) {
    spawnParticle()
  }

  // the Time between bursts
  const nextDelay = rand(0.2, 3.5)

  loopTween = gsap.delayedCall(nextDelay, spawnBurst)
}

const startParticles = () => {
  isRunning = true
  spawnBurst()
}

watch(heroFinished, (val) => {
  if (val) {
    // wait 1 seconds synced with GSAP
    delayedStart = gsap.delayedCall(1, startParticles)
  }
})

onBeforeUnmount(() => {
  delayedStart?.kill()
})
</script>

<template>
  <section
    ref="containerRef"
    class="relative w-full h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- center source -->
    <div
      class="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_60px_rgba(120,105,255,0.6)]"
    >
      <div class="w-6 h-6 bg-white rounded-full animate-pulse" />
    </div>
  </section>
</template>
