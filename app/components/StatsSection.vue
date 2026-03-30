<script setup lang="ts">
import { onMounted } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const stats = [
  {
    number: 3,
    suffix: "+",
    label: "Years of Experience",
    sub: "Full Stack & DevOps",
  },
  {
    number: 50,
    suffix: "+",
    label: "GitHub Projects",
    sub: "Open Source & Private",
  },
  { number: 100, suffix: "%", label: "Commitment", sub: "Learning Everyday" },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // أنيميشن عد الأرقام
  const items = document.querySelectorAll(".stat-value")
  items.forEach((item) => {
    const target = parseInt(item.getAttribute("data-target") || "0")

    gsap.to(item, {
      innerText: target,
      duration: 2,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
      },
    })
  })
})
</script>

<template>
  <section class="py-32 relative">
    <div class="container mx-auto px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div
          v-for="(stat, i) in stats"
          :key="i"
          class="reveal p-10 bg-white/2 border border-white/5 rounded-3xl hover:border-accent-2/30 transition-colors group relative overflow-hidden"
        >
          <div
            class="absolute -right-10 -top-10 w-32 h-32 bg-accent-2/5 blur-3xl group-hover:bg-accent-2/20 transition-all duration-700"
          ></div>

          <div class="relative z-10">
            <div class="flex items-baseline mb-2">
              <span
                class="stat-value font-drizy text-6xl md:text-7xl font-black text-white"
                :data-target="stat.number"
                >0</span
              >
              <span class="text-accent-2 text-4xl font-black ml-1">{{
                stat.suffix
              }}</span>
            </div>

            <h4
              class="font-display text-lg uppercase tracking-widest text-white mt-4"
            >
              {{ stat.label }}
            </h4>
            <p class="font-black-sansa text-sm text-gray-500 mt-2 italic">
              {{ stat.sub }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
