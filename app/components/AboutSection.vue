<script setup lang="ts">
import { onMounted } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const aboutText =
  "Dinital Architect crafting immersive web experience at the intersection of design technology.  Focused on high-end animations, creative codeing, and rebust DevOps architectures."

const words = aboutText.split(" ")

useScrollAnimations()

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
  <section
    class="py-24 md:py-40 bg-transparent relative overflow-hidden section-about"
  >
    <TunnelBackground />

    <div class="container mx-auto px-6 md:px-12 relative z-20">
      <div class="flex flex-col lg:grid lg:grid-cols-12 gap-12">
        <div class="lg:col-span-12">
          <div class="sticky top-24">
            <span
              class="text-accent-2 font-display uppercase tracking-[0.3em] font-bold text-sm md:text-xl"
            >
              Philosophy
            </span>
            <h3
              class="text-3xl md:text-4xl font-tropikal font-bold mt-4 leading-tight text-white"
            >
              Merging Aesthetics <br class="hidden md:block" />
              With Performance
            </h3>
          </div>
        </div>

        <div class="lg:col-span-8 w-full lg:w-11/12">
          <p
            class="font-drizy text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.2] tracking-tighter text-white/20 flex flex-wrap"
          >
            <span
              v-for="(word, i) in words"
              :key="i"
              class="reveal-text about-word mr-3 mb-2 transition-colors duration-500 hover:text-accent"
            >
              {{ word }}
            </span>
          </p>

          <div
            class="mt-12 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-12 font-drizy"
          >
            <div
              v-for="(skill, index) in ['Frontend', 'Backend', 'DevOps']"
              :key="index"
            >
              <h4 class="text-accent-2 text-lg uppercase mb-2 font-tropikal">
                {{ skill }}
              </h4>
              <p class="text-gray-400 text-sm italic">
                {{
                  index === 0
                    ? "Vue 3, Nuxt 4, Three.js, GSAP"
                    : index === 1
                      ? "AdonisJS, Laravel, PostgreSQL"
                      : "Linux, Docker, CI/CD"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-about {
  isolation: isolate; /* تضمن استقلال الطبقات */
}
.about-word {
  position: relative;
  z-index: 30;
  will-change: color;
  /* إضافة ظل خفيف للنص ليبرز فوق النقاط عند التداخل */
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
}
@media (max-width: 768px) {
  .about-word {
    text-shadow: 0 0 10px rgba(0, 0, 0, 1); /* تعزيز الظل في الجوال */
  }
}
</style>
