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

// وظيفة لإنشاء نسيج دائري ناعم للنقاط
const createCircleTexture = () => {
  const canvas = document.createElement("canvas")
  canvas.width = 128 // حجم النسيج
  canvas.height = 128
  const ctx = canvas.getContext("2d")

  if (!ctx) return null

  ctx.beginPath()
  ctx.arc(64, 64, 60, 0, Math.PI * 2) // رسم دائرة
  ctx.fillStyle = "white" // لون الدائرة الأساسي
  ctx.fill()
  ctx.lineWidth = 1
  ctx.strokeStyle = "white"
  ctx.stroke()

  // تأثير توهج خفيف على الحواف
  ctx.shadowColor = "white"
  ctx.shadowBlur = 10

  return new THREE.CanvasTexture(canvas)
}

onMounted(() => {
  if (!container.value) return

  scene = new THREE.Scene()
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

  const rings = 70
  const ptsPerRing = 50
  const count = rings * ptsPerRing

  const positions = new Float32Array(count * 3)
  const initialAngles = new Float32Array(count)
  const initialRadii = new Float32Array(count)
  const colors = new Float32Array(count * 3)

  // مصفوفة إضافية لتخزين المواقع الحالية للنقاط من أجل "النعومة"
  const currentPositions = new Float32Array(count * 3)

  for (let i = 0; i < rings; i++) {
    const fraction = i / rings
    const radius = 3.2 - fraction * 2.2
    const z = -fraction * 15

    for (let j = 0; j < ptsPerRing; j++) {
      const idx = i * ptsPerRing + j
      const angle = (j / ptsPerRing) * Math.PI * 2 + i * 0.05

      initialAngles[idx] = angle
      initialRadii[idx] = radius

      positions[idx * 3] = Math.cos(angle) * radius
      positions[idx * 3 + 1] = Math.sin(angle) * radius
      positions[idx * 3 + 2] = z

      // تعيين المواقع الحالية لتكون نفس المواقع الأصلية في البداية
      currentPositions[idx * 3] = positions[idx * 3]
      currentPositions[idx * 3 + 1] = positions[idx * 3 + 1]
      currentPositions[idx * 3 + 2] = positions[idx * 3 + 2]

      const brightness = Math.pow(1 - fraction, 1.8) // تلاشي أنعم في العمق
      colors[idx * 3] = colors[idx * 3 + 1] = colors[idx * 3 + 2] = brightness
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(currentPositions, 3),
  )
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

  // استخدام PointsMaterial مع النسيج الدائري
  const circleTexture = createCircleTexture()
  const material = new THREE.PointsMaterial({
    size: 0.25, // تكبير حجم الدوائر قليلاً
    vertexColors: true,
    map: circleTexture, // تطبيق النسيج الدائري
    transparent: true,
    opacity: 1, // سطوع كامل مع الاعتماد على vertexColors للتلاشي
    sizeAttenuation: true, // الحفاظ على الحجم النسبي في العمق
    alphaTest: 0.1, // لمنع ظهور حواف مربعة شفافة
  })

  particles = new THREE.Points(geometry, material)
  particles.position.set(8, 0, 2)
  scene.add(particles)

  const raycaster = new THREE.Raycaster()
  let time = 0

  const animate = () => {
    time += 0.005
    const posAttr = particles.geometry.attributes.position
    raycaster.setFromCamera(mouse, camera)
    const ray = raycaster.ray

    for (let i = 0; i < count; i++) {
      const ix = i * 3,
        iy = i * 3 + 1,
        iz = i * 3 + 2

      // 1. حساب الموضع الدوراني "المستهدف" (الذي يجب أن تكون فيه النقطة)
      const currentAngle = initialAngles[i] + time * 0.2
      const radius =
        initialRadii[i] + Math.sin(time * 2 + initialAngles[i] * 3) * 0.03 // نبض خفيف

      const targetX = Math.cos(currentAngle) * radius
      const targetY = Math.sin(currentAngle) * radius
      const targetZ = positions[iz]

      // 2. حساب التنافر
      // نستخدم worldPoint لحساب المسافة عن الماوس في فضاء المشهد
      const worldPoint = new THREE.Vector3(
        targetX + particles.position.x,
        targetY + particles.position.y,
        targetZ + particles.position.z,
      )

      const distanceToRay = ray.distanceToPoint(worldPoint)

      let offsetX = 0
      let offsetY = 0

      if (distanceToRay < 1.5) {
        const force = (1.5 - distanceToRay) / 1.5
        const projection = new THREE.Vector3()
        ray.closestPointToPoint(worldPoint, projection)
        const repulsionDir = worldPoint.clone().sub(projection).normalize()

        // قوة التنافر المضافة للموقع المستهدف
        offsetX = repulsionDir.x * force * 1.2
        offsetY = repulsionDir.y * force * 1.2
      }

      // 3. السر في الحركة الناعمة (Easing):
      // بدلاً من وضع النقطة مباشرة، نجعلها تقترب من (الموقع المستهدف + التنافر) بنسبة 10% كل إطار
      const finalTargetX = targetX + offsetX
      const finalTargetY = targetY + offsetY

      posAttr.array[ix] += (finalTargetX - posAttr.array[ix]) * 0.1
      posAttr.array[iy] += (finalTargetY - posAttr.array[iy]) * 0.1
      posAttr.array[iz] = targetZ // العمق ثابت
    }

    posAttr.needsUpdate = true
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  animate()

  // تتبع الماوس و Resize (نفس الكود السابق)
  const onMouseMove = (e: MouseEvent) => {
    const rect = container.value?.getBoundingClientRect()
    if (rect) {
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
  }
  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("resize", () => {
    if (!container.value) return
    camera.aspect = container.value.offsetWidth / container.value.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.offsetWidth, container.value.offsetHeight)
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose()
  window.removeEventListener("mousemove", () => {}) // تنظيف الأحداث
  window.removeEventListener("resize", () => {})
})
</script>

<template>
  <div
    ref="container"
    class="absolute inset-0 -z-10 bg-[#050505] overflow-hidden pointer-events-auto"
  ></div>
</template>
