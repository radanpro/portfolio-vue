<script setup lang="ts">
import { onMounted } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const isMobile = window.innerWidth < 768

  gsap.from(".footer-big-text", {
    scrollTrigger: {
      trigger: ".main-footer",
      start: "top 90%",
      end: "bottom bottom",
      scrub: 1,
    },
    y: isMobile ? 80 : 200,
    opacity: 0,
    scale: 0.85,
    duration: 1,
  })
})

const email = {
  email: "radan1pro@gmail.com",
  link: "mailto:radan1pro@gmail.com",
}

const links = [
  {
    name: "Github",
    like: "https://github.com/radanpro",
    icon: "ri-github-line",
  },
  {
    name: "LinkedIn",
    like: "https://www.linkedin.com/in/radanpro",
    icon: "ri-linkedin-line",
  },
  {
    name: "Twitter",
    like: "https://twitter.com/a1radan",
    icon: "ri-twitter-x-line",
  },
]
</script>

<template>
  <footer
    class="main-footer pt-20 md:pt-40 pb-10 relative overflow-hidden bg-black text-white"
  >
    <div class="container mx-auto px-6 md:px-8">
      <div class="text-center mb-20 md:mb-40 pointer-events-none select-none">
        <h2
          class="footer-big-text font-drizy text-[18vw] md:text-[15vw] leading-none text-white/30 uppercase tracking-tighter"
        >
          Let's Build
        </h2>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end border-t border-white/10 pt-12 md:pt-20"
      >
        <div class="flex flex-col">
          <p
            class="text-accent-2 font-display uppercase tracking-[0.2em] text-xs md:text-sm mb-4"
          >
            Get in touch
          </p>
          <a
            :href="email.link"
            class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-tropikal hover:text-accent-2 transition-colors duration-500 break-all md:break-normal"
          >
            {{ email.email }}
          </a>
        </div>

        <div
          class="flex flex-col items-start md:items-end space-y-10 md:space-y-8"
        >
          <div class="flex flex-wrap gap-4 md:space-x-8">
            <template v-for="item in links" :key="item.name">
              <a :href="item.like" class="group relative p-2 md:p-4">
                <i
                  class="text-2xl group-hover:text-accent-2 transition-colors"
                  :class="item.icon"
                ></i>
                <span
                  class="hidden md:block absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest whitespace-nowrap"
                >
                  {{ item.name }}
                </span>
              </a>
            </template>
          </div>

          <div
            class="text-gray-500 font-display text-[10px] md:text-sm uppercase tracking-widest"
          >
            © 2026 RADAN STUDIO • ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent-2 to-transparent opacity-20"
    ></div>
  </footer>
</template>

<style scoped>
.main-footer {
  z-index: 10;
}
.footer-big-text {
  will-change: transform, opacity;
}
</style>
