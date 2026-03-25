<script setup lang="ts">
import { onMounted } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const aboutText =
  "Dinital Architect crafting immersive web experience at the intersection of design technology.  Focused on high-end animations, creative codeing, and rebust DevOps architectures."

const words = aboutText.split(" ")

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.to(".about-word", {
    color: "#ffffff",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".section-about",
      start: "top 60%",
      end: "bottom 40%",
      scrub: true,
    },
  })
})
</script>
<template>
  <section class="py-40 bg-transparent relative overflow-hidden section-about">
    <TunnelBackground />

    <div class="container mx-auto px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-4">
          <div class="reveal stricky top-32">
            <span
              class="text-accent-2 font-display uppercase tracking-[0.3em] font-bold text-xl"
              >Philosophy</span
            >
            <h3 class="text-3xl font-tropikal font-bold mt-4 leading-tight">
              Merging Aesthetics <br />
              With Performance
            </h3>
          </div>
        </div>

        <div class="lg:col-span-8">
          <p
            class="font-drizy text-4xl md:text-6xl font-bold uppercase leading-[1.1] tracking-tighter text-white/20 flex flex-wrap"
          >
            <!-- <span
              v-for="(word, i) in words"
              :key="i"
              class="reveal-text about-word mr-4 mb-2 transition-colors duration-500 hover:text-accent"
            >
              {{ word }}
            </span> -->
          </p>
          <div
            class="reveal mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-12 font-drizy"
          >
            <div>
              <h4
                class="text-accent-2 text-xs lg:text-xl uppercase mb-2 font-tropikal"
              >
                Frontend
              </h4>
              <p class="text-gray-400 text-sm italic">
                Vue 3, Nuxt 4, Three.js, GSAP
              </p>
            </div>
            <div>
              <h4
                class="text-accent-2 text-xs lg:text-xl uppercase mb-2 font-tropikal"
              >
                Backend
              </h4>
              <p class="text-gray-400 text-sm italic">
                AdonisJS, Laravel, PostgreSQL
              </p>
            </div>
            <div>
              <h4
                class="text-accent-2 text-xs lg:text-xl uppercase mb-2 font-tropikal"
              >
                DevOps
              </h4>
              <p class="text-gray-400 text-sm italic">Linux, Docker, CI/CD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.reveal-text {
  will-change: color;
}
</style>
