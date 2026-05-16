<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const aboutText =
  "Full Stack Developer and System Architect focused on building scalable web applications, robust backend systems, and modern digital platforms using Laravel, Python, Vue, React, and DevOps technologies.";
const words = aboutText.split(" ");

useScrollAnimations();

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".about-word", {
    color: "#ffffff",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".section-about",
      start: "top 60%",
      end: "bottom 40%",
      scrub: true,
    },
  });
});

const handleMagnetic = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(el, {
    x: x * 0.3,
    y: y * 0.3,
    skewX: -10, // The parallelogram shape
    scale: 1.05,
    duration: 0.6,
    ease: "power2.out",
    overwrite: true,
  });
};

const resetMagnetic = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  gsap.to(el, {
    x: 0,
    y: 0,
    skewX: 0,
    scale: 1,
    duration: 0.8,
    ease: "elastic.out(1, 0.3)",
    overwrite: true,
  });
};
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
              Expertise
            </span>
            <h3
              class="text-3xl md:text-4xl font-tropikal font-bold mt-4 leading-tight text-white"
            >
              Building Scalable Systems <br class="hidden md:block" />
              With Modern Technologies
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
              class="skill-card group bg-white/5 backdrop-blur-md rounded-2xl px-8 py-10 border border-white/10 transition-all duration-300 hover:border-accent-2/50 hover:bg-white/10"
              @mousemove="(e) => handleMagnetic(e)"
              @mouseleave="(e) => resetMagnetic(e)"
            >
              <div class="relative z-10 pointer-events-none">
                <h4 class="text-accent-2 text-xl uppercase mb-3 font-tropikal font-bold tracking-widest">
                  {{ skill }}
                </h4>
                <p class="text-gray-400 text-sm italic leading-relaxed">
                  {{
                    index === 0
                      ? "Vue 3, Nuxt 4, React, Tailwind, GSAP"
                      : index === 1
                        ? "AdonisJS, Laravel, PostgreSQL, MySQL"
                        : "Linux, Docker, CI/CD, Git, Nginx"
                  }}
                </p>
              </div>
              <!-- Subtle glow background -->
              <div class="absolute inset-0 bg-accent-2/0 group-hover:bg-accent-2/5 transition-colors duration-500 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-about {
  isolation: isolate;
  background-color: rgba(10, 54, 43, 0.5);
  border-radius: 30px;
}
.about-word {
  position: relative;
  z-index: 30;
  will-change: color;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
}
@media (max-width: 768px) {
  .about-word {
    text-shadow: 0 0 10px rgba(0, 0, 0, 1);
  }
}
</style>
