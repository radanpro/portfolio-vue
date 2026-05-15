<script setup lang="ts">
const mainContainer = ref<HTMLElement | null>(null);
useStackedMask(mainContainer);

const stackData = [
  {
    title: "VISION",
    category: "The Future",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
  },
  {
    title: "MOTION",
    category: "Fluid Design",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000",
  },
  {
    title: "BEYOND",
    category: "Space Exploration",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000",
  },
];
</script>

<template>
  <section
    ref="mainContainer"
    class="relative w-full bg-black overflow-hidden"
    style="height: 100svh"
  >
    <div
      v-for="(item, i) in stackData"
      :key="i"
      class="mask-card absolute inset-0 w-full h-full flex items-center justify-center"
      :style="{
        zIndex: i === 0 ? 10 : 1,
        visibility: i === 0 ? 'visible' : 'hidden',
      }"
    >
      <div class="absolute inset-0 w-full h-full overflow-hidden">
        <img
          :src="item.image"
          :alt="`${item.title} background`"
          class="w-full h-full object-cover brightness-75"
          style="will-change: transform; transform-origin: center center"
        />
      </div>

      <svg
        class="absolute inset-0 w-full h-full pointer-events-none select-none"
        style="z-index: 2"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask :id="`stackMask-${i}`">
            <rect width="100" height="100" fill="white" />
            <text
              x="50"
              y="50"
              text-anchor="middle"
              dominant-baseline="central"
              class="mask-text mask-text-font uppercase"
              font-size="16"
              font-weight="900"
              letter-spacing="-0.5"
              fill="black"
            >
              {{ item.title }}
            </text>
          </mask>
        </defs>
        <rect
          width="100"
          height="100"
          fill="black"
          fill-opacity="0.5"
          :mask="`url(#stackMask-${i})`"
        />
      </svg>

      <div
        class="card-content absolute bottom-16 left-8 md:left-16"
        style="z-index: 3"
      >
        <div class="overflow-hidden">
          <span
            class="block text-white/60 tracking-[0.5em] text-[9px] md:text-[11px] uppercase font-bold"
          >
            {{ item.category }}
          </span>
        </div>
        <div class="overflow-hidden mt-2">
          <h2
            class="text-white text-3xl md:text-5xl uppercase leading-none font-tropikal"
          >
            {{ item.title }} Strategy
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mask-card {
  will-change: transform, opacity;
}

.mask-text {
  will-change: transform;
}

.mask-text-font {
  font-family: "Drizy", "Tropikal", sans-serif;
}

.font-tropikal {
  font-family: "Tropikal", serif;
}
</style>
