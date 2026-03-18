<script setup lang="ts">
const logoRef = ref(null)
useMagnetic(logoRef, 0.3)

const navHeader = ["Projects", "Services", "About"]
</script>
<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference"
  >
    <div ref="logoRef" class="cursor-pointer">
      <span class="font-display text-2xl font-bold tracking-tighter text-white"
        >RADAN <span class="text-accent">.</span></span
      >
    </div>
    <div
      class="hidden md:flex space-x-8 font-body text-xs uppercase tracking-widest text-gray-400"
    >
      <template v-for="(item, index) in navHeader" :key="index">
        <a href="#" class="hover:text-white transition-colors">{{ item }}</a>
      </template>
      <a
        href="#"
        class="group flex items-center space-x-2 text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all"
      >
        <span>Let's Talk</span>
        <i class="ri-arrow-right-up-line"></i>
      </a>
    </div>
  </nav>
</template>
