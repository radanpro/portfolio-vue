<script setup>
import gsap from "gsap";

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      {
        title: "Etihad Bank CMS",
        image: "/images/Etihad.png",
      },
      {
        title: "Hudhudline Platform",
        image: "/images/Hudhudline.png",
      },
      {
        title: "Dental Store System",
        image: "/images/DentalStore.png",
      },
      {
        title: "Shifa plus app",
        image: "/images/Shifa.png",
      },
      {
        title: "NetMonitor App",
        image: "/images/NetMonitor.png",
      },
    ],
  },
});

const activeIndex = ref(0);
const panelsRef = ref([]);

const setActive = (index) => {
  if (activeIndex.value === index) return;
  activeIndex.value = index;

  panelsRef.value.forEach((panel, i) => {
    gsap.to(panel, {
      flex: i === index ? 5 : 0.7,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    });
  });
};

const onMouseMove = (e, index) => {
  if (activeIndex.value !== index) return;

  const card = panelsRef.value[index];
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = ((y - rect.height / 2) / rect.height) * -10;
  const rotateY = ((x - rect.width / 2) / rect.width) * 10;

  gsap.to(card, {
    rotateX,
    rotateY,
    duration: 0.5,
    ease: "power2.out",
    transformPerspective: 1000,
  });
};

const onMouseLeave = (index) => {
  gsap.to(panelsRef.value[index], {
    rotateX: 0,
    rotateY: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.3)",
  });
};

let timer;
onMounted(() => {
  setActive(0);

  timer = setInterval(() => {
    const next = (activeIndex.value + 1) % props.items.length;
    setActive(next);
  }, 5000);
});

onUnmounted(() => clearInterval(timer));
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
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
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
