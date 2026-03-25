<script setup lang="ts">
import * as THREE from "three"
import { onMounted, ref, onUnmounted } from "vue"

const container = ref<HTMLElement | null>(null)
let renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
let particles: THREE.Points
let animationId: number

const mouse = new THREE.Vector2(-999, -999)

onMounted(() => {
  if (!container.value) return

  scene = new THREE.Scene()

  // 1. إعداد الكاميرا لزاوية رؤية أفضل للمخروط على اليمين
  camera = new THREE.PerspectiveCamera(
    45,
    container.value.offsetWidth / container.value.offsetHeight,
    0.1,
    1000,
  )
  camera.position.set(16, -5, 20)
  camera.lookAt(4, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // 2. بناء الأسطوانة المخروطية المنتظمة
  const rings = 60
  const ptsPerRing = 50
  const count = rings * ptsPerRing

  const positions = new Float32Array(count * 3)
  const originalPositions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < rings; i++) {
    const fraction = i / rings
    const radius = 3.2 - fraction * 2.2 // فتحة مخروطية متزنة
    const z = -fraction * 15

    for (let j = 0; j < ptsPerRing; j++) {
      const idx = (i * ptsPerRing + j) * 3
      const angle = (j / ptsPerRing) * Math.PI * 2 + i * 0.05 // إمالة خفيفة جداً

      positions[idx] = Math.cos(angle) * radius
      positions[idx + 1] = Math.sin(angle) * radius
      positions[idx + 2] = z

      originalPositions[idx] = positions[idx]
      originalPositions[idx + 1] = positions[idx + 1]
      originalPositions[idx + 2] = positions[idx + 2]

      // التلاشي في العمق
      const brightness = Math.pow(1 - fraction, 1.5) // تلاشي أنعم
      colors[idx] = brightness
      colors[idx + 1] = brightness
      colors[idx + 2] = brightness
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  })

  particles = new THREE.Points(geometry, material)
  particles.position.set(8, 0, 2) // الموضع في اليمين
  scene.add(particles)

  const onMouseMove = (event: MouseEvent) => {
    const rect = container.value?.getBoundingClientRect()
    if (rect) {
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }
  }
  window.addEventListener("mousemove", onMouseMove)

  // 4. منطق التفاعل "لكل نقطة" (Per-Point Interaction)
  const raycaster = new THREE.Raycaster()
  const animate = () => {
    const posAttr = particles.geometry.attributes.position

    // تحديث الشعاع بناءً على موقع الماوس
    raycaster.setFromCamera(mouse, camera)
    const ray = raycaster.ray

    for (let i = 0; i < count; i++) {
      const ix = i * 3,
        iy = i * 3 + 1,
        iz = i * 3 + 2

      // 1. تحويل موقع النقطة إلى "World Space"
      const pX = originalPositions[ix] + particles.position.x
      const pY = originalPositions[iy] + particles.position.y
      const pZ = originalPositions[iz] + particles.position.z
      const pointV = new THREE.Vector3(pX, pY, pZ)

      // 2. حساب أقرب مسافة بين النقطة وشعاع الماوس (3D Distance)
      const distanceToRay = ray.distanceToPoint(pointV)

      if (distanceToRay < 1.2) {
        // منطقة التأثير
        const force = (1.2 - distanceToRay) / 1.2

        // حساب اتجاه التنافر من الشعاع إلى النقطة
        const projection = new THREE.Vector3()
        ray.closestPointToPoint(pointV, projection)
        const repulsionDir = pointV.clone().sub(projection).normalize()

        // تطبيق الحركة
        posAttr.array[ix] += repulsionDir.x * force * 0.04
        posAttr.array[iy] += repulsionDir.y * force * 0.04
      } else {
        // العودة للمكان الأصلي بسلاسة
        posAttr.array[ix] += (originalPositions[ix] - posAttr.array[ix]) * 0.1
        posAttr.array[iy] += (originalPositions[iy] - posAttr.array[iy]) * 0.1
      }
    }

    posAttr.needsUpdate = true
    particles.rotation.z += 0.0005

    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  animate()

  const handleResize = () => {
    if (!container.value) return
    camera.aspect = container.value.offsetWidth / container.value.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.offsetWidth, container.value.offsetHeight)
  }
  window.addEventListener("resize", handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose()
  window.removeEventListener("mousemove", () => {})
  window.removeEventListener("resize", () => {})
})
</script>

<template>
  <div
    ref="container"
    class="absolute inset-0 -z-10 bg-[#050505] overflow-hidden pointer-events-auto"
  ></div>
</template>
