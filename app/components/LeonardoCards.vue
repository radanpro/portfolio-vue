<script setup lang="ts">
import { useLeonardoAnimation } from "~/composables/useLeonardoAnimation";
import { ref, onMounted, onUnmounted } from "vue";

const cardsData = [
  {
    title: "BACKEND",
    desc: "Building scalable APIs and robust server-side systems with Laravel and Django.",
    image: "/images/Gemini_1.png",
    color: "#22c55e",
    type: "bottom",
  },
  {
    title: "FullStack",
    desc: "Creating modern web platforms with Vue.js, React, and high-performance architectures.",
    image: "/images/Gemini_2.png",
    color: "#eab308",
    type: "top",
  },
  {
    title: "DEVOPS",
    desc: "Managing deployments, hosting environments, and optimized production infrastructures.",
    image: "/images/Gemini_3.png",
    color: "#3b82f6",
    type: "bottom",
  },
];

// Initialize the animation
const { init: initLeonardo } = useLeonardoAnimation(".leo-card-wrapper");
initLeonardo();

const screenWidth = ref(0);

const updateWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<template>
  <section class="bg-transparent py-20">
    <div
      v-for="(card, i) in cardsData"
      :key="i"
      class="leo-card-wrapper container mx-auto mb-40 px-6 grid md:grid-cols-2 gap-10 items-center"
      :data-type="card.type"
    >
      <div :class="i % 2 !== 0 ? 'md:order-2' : ''">
        <h2 class="text-5xl font-black text-white mb-4 uppercase">
          {{ card.title }}
        </h2>
        <p class="leo-card-description text-gray-400 max-w-sm mb-6">
          {{ card.desc }}
        </p>
        <button
          class="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition"
        >
          Learn More
        </button>
      </div>

      <div
        class="relative group cursor-pointer"
        :class="screenWidth < 767 ? 'mt-8' : ''"
      >
        <div
          class="img-container relative aspect-video rounded-[30px] overflow-hidden bg-[#111]"
        >
          <img
            :src="card.image"
            class="w-full h-full object-cover grayscale-50% group-hover:grayscale-0 transition-all duration-700"
          />
        </div>

        <h3
          class="absolute font-black italic tracking-tighter leading-none pointer-events-none z-20 w-full text-center"
          :style="{
            fontSize: screenWidth < 767 ? '20vw' : '10vw',
            color: card.color,
            bottom: card.type === 'bottom' ? '-25%' : 'auto',
            top: card.type === 'top' ? '-30%' : 'auto',
            [i % 2 === 0 ? 'left' : 'right']: '-5%',
          }"
        >
          {{ card.title }}
        </h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
.img-container {
  will-change: clip-path;
  transition: transform 0.5s ease;
}
.leo-card-wrapper:hover .img-container {
  transform: scale(1.02);
}
.card-selector {
  overflow: hidden;
}
.leo-card-wrapper {
  perspective: 1000px;
}
.leo-card-description :deep(.leo-desc-line),
.leo-card-description :deep(.leo-desc-line-mask) {
  display: block;
}
</style>
