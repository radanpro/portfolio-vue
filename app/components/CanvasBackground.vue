<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import * as THREE from "three"

const container = ref<HTMLElement | null>(null)
let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let particlesMesh: THREE.Points
let animationId: number

// Mouse tracking
const mouse = { x: 0, y: 0 }
const targetMouse = { x: 0, y: 0 }

onMounted(() => {
  if (!container.value) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  )
  camera.position.z = 2

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // Particles industry
  const particlesCount = 5000
  const posArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10
  }

  const particlesGeometry = new THREE.BufferGeometry()
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3),
  )

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: "#00f2ff",
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending, // It gives a nice glow effect when particles overlap
  })

  particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesMesh)

  // Mouse move event
  const onMouseMove = (event: MouseEvent) => {
    targetMouse.x = (event.clientX / window.innerWidth - 0.5) * 0.5
    targetMouse.y = (event.clientY / window.innerHeight - 0.5) * 0.5
  }
  window.addEventListener("mousemove", onMouseMove)

  const clock = new THREE.Clock()

  const animate = () => {
    const elapsedTime = clock.getElapsedTime()

    // particlesMesh.rotation.x = elapsedTime * 0.05
    particlesMesh.rotation.y = elapsedTime * 0.05

    // Smoothly interpolate mouse movement
    mouse.x += (targetMouse.x - mouse.x) * 0.05
    mouse.y += (targetMouse.y - mouse.y) * 0.05

    particlesMesh.rotation.x = -mouse.y
    particlesMesh.rotation.y = mouse.x + elapsedTime * 0.05

    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  animate()

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener("resize", handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener("mousemove", () => {})
  window.removeEventListener("resize", () => {})
  renderer?.dispose()
})
</script>

<template>
  <div
    ref="container"
    class="fixed inset-0 -z-10 bg-[#050505] overflow-hidden pointer-events-none"
  ></div>
</template>
