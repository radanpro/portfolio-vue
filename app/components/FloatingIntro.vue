<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue"
import gsap from "gsap"
import { useHeroState } from "~/composables/useHeroState"

const heroFinished = useHeroState()
const containerRef = ref<HTMLElement | null>(null)
const images = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300",
]

let isRunning = false
let delayedStart: gsap.core.Tween | null = null
const rand = (min: number, max: number) => Math.random() * (max - min) + min

const spawnParticle = () => {
  if (!containerRef.value || !isRunning) return

  const el = document.createElement("img")
  el.src = images[Math.floor(Math.random() * images.length)]

  const size = rand(30, 180)
  el.style.width = `${size}px`
  el.style.height = `${size}px`
  el.className =
    "absolute object-cover rounded-xl pointer-events-none will-change-transform opacity-0"

  containerRef.value.appendChild(el)

  const vw = window.innerWidth
  const vh = window.innerHeight
  const targetX = rand(-vw / 2, vw / 2)
  const targetY = rand(-vh / 2, vh / 2)

  const depth = rand(0.3, 2.5)
  const duration = rand(2, 8) / depth

  gsap.fromTo(
    el,
    { x: 0, y: 0, scale: 0, opacity: 0, rotate: rand(-180, 180) },
    {
      x: targetX,
      y: targetY,
      scale: depth,
      rotate: rand(-45, 45),
      duration: duration,
      ease: "none",
      onUpdate: function () {
        const currentX = gsap.getProperty(el, "x") as number
        const currentY = gsap.getProperty(el, "y") as number

        const edgeX = 1 - Math.abs(currentX) / (vw / 2)
        const edgeY = 1 - Math.abs(currentY) / (vh / 2)
        const edgeFactor = Math.min(edgeX, edgeY)

        gsap.set(el, { opacity: Math.max(0, edgeFactor * 0.8) })
      },
      onComplete: () => {
        el.remove()
      },
    },
  )
}

let loopTween: gsap.core.Tween | null = null
const spawnBurst = () => {
  if (!isRunning) return
  const count = Math.floor(rand(1, 4))
  for (let i = 0; i < count; i++) spawnParticle()
  loopTween = gsap.delayedCall(rand(0.1, 1.5), spawnBurst)
}

const startParticles = () => {
  isRunning = true
  spawnBurst()
}

watch(heroFinished, (val) => {
  if (val) delayedStart = gsap.delayedCall(2, startParticles)
})

onBeforeUnmount(() => {
  delayedStart?.kill()
  loopTween?.kill()
  isRunning = false
})
</script>

<template>
  <section
    ref="containerRef"
    class="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
  />
</template>
