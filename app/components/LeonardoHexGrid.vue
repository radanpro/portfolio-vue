<script setup lang="ts">
import { ref, onMounted } from "vue"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const gridRef = ref(null)
const images = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400",
  "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400",
]

onMounted(() => {
  if (gridRef.value) {
    gsap.fromTo(
      ".hex-item",
      {
        z: -1000,
        opacity: 0,
        rotateY: -20,
      },
      {
        z: 0,
        opacity: 1,
        rotateY: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.value,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      },
    )
  }
})
</script>

<template>
  <section class="hex-section py-32 overflow-hidden bg-black">
    <div ref="gridRef" class="container mx-auto px-4 perspective-container">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-8 hex-grid">
        <div
          v-for="(img, i) in [...images, ...images]"
          :key="i"
          class="hex-item relative aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        >
          <img
            :src="img"
            class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.perspective-container {
  perspective: 2000px;
}

.hex-grid {
  transform: rotateX(15deg) rotateY(-10deg) skewY(-5deg);
  transform-style: preserve-3d;
}

.hex-item {
  will-change: transform, opacity;
  transition: all 0.1s cubic-bezier(0.23, 1, 0.32, 1);
}

.hex-item:hover {
  border-color: #7869ff;
  box-shadow: 0 0 30px rgba(120, 105, 255, 0.4);
}
</style>
