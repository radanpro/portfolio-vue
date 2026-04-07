<script setup lang="ts">
import * as THREE from "three"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader"
import { onMounted, ref, onUnmounted } from "vue"

const container = ref<HTMLElement | null>(null)

let renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
let particles: THREE.Points
let animationId: number

const mouse = new THREE.Vector2(-999, -999)

// دالة داخل الشكل
const isPointInPoly = (point: { x: number; y: number }, poly: any[]) => {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x,
      yi = poly[i].y
    const xj = poly[j].x,
      yj = poly[j].y
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

onMounted(() => {
  if (!container.value) return

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    50,
    container.value.offsetWidth / container.value.offsetHeight,
    1,
    2000,
  )
  camera.position.z = 400

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  const loader = new SVGLoader()

  loader.load("/logo.svg", (data) => {
    const positions: number[] = []
    const colors: number[] = []
    const types: number[] = [] // 0 outline / 1 fill

    data.paths.forEach((path) => {
      const color = path.color
      const shapes = SVGLoader.createShapes(path)

      shapes.forEach((shape) => {
        const framePoints = shape.getPoints(200)

        // outline ثابت
        framePoints.forEach((p) => {
          positions.push(p.x, -p.y, 0)
          colors.push(color.r, color.g, color.b)
          types.push(0)
        })

        // fill متحرك
        const geometryShape = new THREE.ShapeGeometry(shape)
        geometryShape.computeBoundingBox()
        const bbox = geometryShape.boundingBox!

        for (let i = 0; i < 1000; i++) {
          const rx = Math.random() * (bbox.max.x - bbox.min.x) + bbox.min.x
          const ry = Math.random() * (bbox.max.y - bbox.min.y) + bbox.min.y

          if (isPointInPoly({ x: rx, y: ry }, framePoints)) {
            positions.push(rx, -ry, 0)
            colors.push(color.r, color.g, color.b)
            types.push(1)
          }
        }
      })
    })

    const geometry = new THREE.BufferGeometry()

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    )
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
    geometry.setAttribute("aType", new THREE.Float32BufferAttribute(types, 1))

    // center
    geometry.computeBoundingBox()
    const center = new THREE.Vector3()
    geometry.boundingBox!.getCenter(center)
    geometry.translate(-center.x, -center.y, 0)

    geometry.scale(5, 5, 5)

    const original = geometry.attributes.position.array.slice()
    geometry.setAttribute(
      "originalPos",
      new THREE.BufferAttribute(new Float32Array(original), 3),
    )

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 1,
    })
    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        `gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
        `
    float dist = length(gl_PointCoord - vec2(0.5));
    if(dist > 0.5) discard;       // يجعل النقاط دائرية
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    `,
      )
    }

    particles = new THREE.Points(geometry, material)
    scene.add(particles)

    animate()
  })

  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("resize", onResize)
})

const animate = () => {
  if (particles) {
    const posAttr = particles.geometry.attributes.position
    const origAttr = particles.geometry.attributes.originalPos
    const typeAttr = particles.geometry.attributes.aType

    const time = performance.now() * 0.001

    // raycaster لتحويل الماوس
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, camera)

    const mouseWorld = new THREE.Vector3()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    raycaster.ray.intersectPlane(plane, mouseWorld)

    for (let i = 0; i < posAttr.count; i++) {
      const ox = origAttr.getX(i)
      const oy = origAttr.getY(i)
      const type = typeAttr.getX(i)

      let tx = ox
      let ty = oy

      if (type === 1) {
        tx += Math.sin(oy * 0.1 + time) * 1.5
        ty += Math.cos(ox * 0.1 + time) * 1.5
      }

      const dx = ox - mouseWorld.x
      const dy = oy - mouseWorld.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 50) {
        const force = (50 - dist) / 50

        // 🔹 outline أهدأ (اختياري)
        const strength = type === 0 ? 25 : 15

        tx += (dx / dist) * force * strength
        ty += (dy / dist) * force * strength
      }

      const cx = posAttr.getX(i)
      const cy = posAttr.getY(i)

      posAttr.setXY(i, cx + (tx - cx) * 0.12, cy + (ty - cy) * 0.12)
    }

    posAttr.needsUpdate = true
  }

  renderer.render(scene, camera)
  animationId = requestAnimationFrame(animate)
}

const onMouseMove = (e: MouseEvent) => {
  const rect = container.value?.getBoundingClientRect()
  if (!rect) return

  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
}

const onResize = () => {
  if (!container.value) return
  camera.aspect = container.value.offsetWidth / container.value.offsetHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight)
}

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose()
  window.removeEventListener("mousemove", onMouseMove)
  window.removeEventListener("resize", onResize)
})
</script>

<template>
  <div ref="container" class="canvas-container"></div>
</template>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #20243531;
}
</style>
