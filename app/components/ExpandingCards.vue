<script setup>
import gsap from "gsap"

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      {
        title: "Explore The World",
        image:
          "https://images.unsplash.com/photo-1558979158-65a1eaa08691?auto=format&fit=crop&w=1350&q=80",
      },
      {
        title: "Wild Forest",
        image:
          "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?auto=format&fit=crop&w=1350&q=80",
      },
      {
        title: "Sunny Beach",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1353&q=80",
      },
      {
        title: "City on Winter",
        image:
          "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&w=1351&q=80",
      },
      {
        title: "Mountains",
        image:
          "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1350&q=80",
      },
    ],
  },
})

const activeIndex = ref(0)
const panelsRef = ref([])

const setActive = (index) => {
  if (activeIndex.value === index) return
  activeIndex.value = index

  panelsRef.value.forEach((panel, i) => {
    gsap.to(panel, {
      flex: i === index ? 5 : 0.7,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    })
  })
}

const onMouseMove = (e, index) => {
  if (activeIndex.value !== index) return

  const card = panelsRef.value[index]
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const rotateX = ((y - rect.height / 2) / rect.height) * -10
  const rotateY = ((x - rect.width / 2) / rect.width) * 10

  gsap.to(card, {
    rotateX,
    rotateY,
    duration: 0.5,
    ease: "power2.out",
    transformPerspective: 1000,
  })
}

const onMouseLeave = (index) => {
  gsap.to(panelsRef.value[index], {
    rotateX: 0,
    rotateY: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.3)",
  })
}

let timer
onMounted(() => {
  setActive(0)

  timer = setInterval(() => {
    const next = (activeIndex.value + 1) % props.items.length
    setActive(next)
  }, 5000)
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="cards-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      :ref="(el) => (panelsRef[index] = el)"
      class="panel"
      @mouseenter="setActive(index)"
      @mousemove="onMouseMove($event, index)"
      @mouseleave="onMouseLeave(index)"
      :style="{ backgroundImage: `url(${item.image})` }"
    >
      <div class="content">
        <h3 class="font-drizy text-3xl uppercase">{{ item.title }}</h3>
      </div>
      <div class="overlay"></div>
    </div>
  </div>
</template>

<style scoped>
.cards-container {
  display: flex;
  width: 100%;
  height: 75vh;
  gap: 12px;
  perspective: 1000px;
}

.panel {
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex: 0.7;
  transform-style: preserve-3d;
}

.content {
  position: absolute;
  bottom: 40px;
  left: 40px;
  z-index: 5;
  pointer-events: none;
}

.panel h3 {
  color: white;
  margin: 0;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.5s ease;
}

.panel[style*="flex: 5"] h3 {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.3s;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 50%);
  opacity: 0.6;
}
</style>
