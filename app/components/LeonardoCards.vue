<script setup lang="ts">
import { useLeonardoAnimation } from "~/composables/useLeonardoAnimation"

const cardsData = [
  {
    title: "EDITING",
    desc: "Edit images and video while preserving elements.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
    color: "#22c55e",
    type: "bottom",
  },
  {
    title: "VIDEO",
    desc: "Bring visuals into motion with AI-driven tools.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
    color: "#eab308",
    type: "top",
  },
  {
    title: "CREATION",
    desc: "Generate high-quality visuals from simple prompts.",
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000",
    color: "#3b82f6",
    type: "bottom",
  },
]

// Initialize the animation
const { init: initLeonardo } = useLeonardoAnimation(".leo-card-wrapper")
initLeonardo()
</script>

<template>
  <section class="bg-black py-20">
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
        <p class="text-gray-400 max-w-sm mb-6">{{ card.desc }}</p>
        <button
          class="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition"
        >
          Learn More
        </button>
      </div>

      <div class="relative group cursor-pointer">
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
            fontSize: '10vw',
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
</style>
