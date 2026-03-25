<script setup lang="ts">
import { onMounted } from "vue"
import { gsap } from "gsap"

onMounted(() => {
  gsap.from(".footer-big-text", {
    scrollTrigger: {
      trigger: ".main-footer",
      start: "top 90%",
      end: "bottom bottom",
      scrub: 1,
    },
    y: 200,
    opacity: 0,
    scale: 0.8,
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
  <footer class="main-footer pt-40 pb-10 relative overflow-hidden">
    <div class="container mx-auto px-8">
      <div class="text-center mb-40 pointer-events-none select-none">
        <h2
          class="footer-big-text font-drizy text-[15vw] leading-none text-white/30 uppercase tracking-tighter"
        >
          Let's Build
        </h2>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-20 items-end border-t border-white/5 pt-20"
      >
        <div>
          <p
            class="text-accent-2 font-display uppercase tracking-widest text-sm mb-4"
          >
            Get in touch
          </p>
          <a
            :href="email.link"
            class="text-4xl md:text-6xl font-tropikal hover:text-accent-2 transition-colors duration-500 wrap-break-words"
          >
            {{ email.email }}
          </a>
        </div>

        <div class="flex flex-col md:items-end space-y-8">
          <div class="flex space-x-8">
            <template v-for="item in links" :key="item.name">
              <a :href="item.like" class="group relative p-4">
                <i
                  class="text-2xl group-hover:text-accent-2 transition-colors"
                  :class="item.icon"
                ></i>
                <span
                  class="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest"
                  >{{ item.name }}</span
                >
              </a>
            </template>
          </div>

          <div
            class="text-gray-500 font-display text-sm uppercase tracking-widest"
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
</style>
