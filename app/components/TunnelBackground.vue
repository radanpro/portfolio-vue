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

  // 1. إعداد الكاميرا والمشهد ليكون المخروط على اليمين تماماً
  camera = new THREE.PerspectiveCamera(
    45,
    container.value.offsetWidth / container.value.offsetHeight,
    0.1,
    1000,
  )
  camera.position.set(14, -3, 10)
  camera.lookAt(8, 0, 5) // النظر باتجاه اليمين قليلاً حيث يوجد المخروط

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // 2. بناء الأسطوانة المخروطية المنتظمة
  const rings = 60 // عدد الحلقات الطولية
  const ptsPerRing = 40 // عدد النقاط في كل دائرة
  const count = rings * ptsPerRing

  const positions = new Float32Array(count * 3)
  const originalPositions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3) // للتلاشي في الظلام

  for (let i = 0; i < rings; i++) {
    const fraction = i / rings
    // تقليل الفرق في القطر: يبدأ من 2.2 وينتهي عند 1.5 (توسع بسيط)
    const radius = 3.0 - fraction * 1.5
    const z = -fraction * 12 // طول المخروط في العمق

    for (let j = 0; j < ptsPerRing; j++) {
      const idx = (i * ptsPerRing + j) * 3
      const angle = (j / ptsPerRing) * Math.PI * 2 + i * 0.07 // إمالة بسيطة جداً

      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      positions[idx] = x
      positions[idx + 1] = y
      positions[idx + 2] = z

      originalPositions[idx] = x
      originalPositions[idx + 1] = y
      originalPositions[idx + 2] = z

      // 3. التلاشي في الظلام: كلما زاد العمق z، قل اللون الأبيض
      const brightness = 1 - fraction
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
    vertexColors: true, // تفعيل ألوان التلاشي
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  })

  particles = new THREE.Points(geometry, material)
  particles.position.set(8, 0, 2) // نقل كامل الشكل إلى أقصى اليمين
  scene.add(particles)

  // تتبع الماوس
  const onMouseMove = (event: MouseEvent) => {
    const rect = container.value?.getBoundingClientRect()
    if (rect) {
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }
  }
  window.addEventListener("mousemove", onMouseMove)

  // 4. منطق الأنيميشن والتنافر المطور
  const animate = () => {
    const posAttr = particles.geometry.attributes.position

    // إنشاء مستوي وهمي لملاحقة الماوس في الفضاء
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5)
    vector.unproject(camera)
    const dir = vector.sub(camera.position).normalize()
    const distance = -camera.position.z / dir.z
    const mousePosInWorld = camera.position
      .clone()
      .add(dir.multiplyScalar(distance))

    for (let i = 0; i < count; i++) {
      const ix = i * 3,
        iy = i * 3 + 1,
        iz = i * 3 + 2

      // حساب المسافة الحقيقية في فضاء المشهد
      const worldX = posAttr.array[ix] + particles.position.x
      const worldY = posAttr.array[iy] + particles.position.y
      const worldZ = posAttr.array[iz] + particles.position.z

      const dx = worldX - mousePosInWorld.x
      const dy = worldY - mousePosInWorld.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 1.8) {
        const force = (1.8 - dist) / 1.8
        posAttr.array[ix] += dx * force * 0.2
        posAttr.array[iy] += dy * force * 0.2
      } else {
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
    class="absolute inset-0 -z-10 bg-[#050505] overflow-hidden"
  ></div>
</template>
