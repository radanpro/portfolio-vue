<script setup lang="ts">
const logoRef = ref(null)
useMagnetic(logoRef, 0.3)

// استدعاء الـ Composable الجديد
const { isScrolled } = useHeaderTransform()

const navHeader = ["Projects", "Services", "About"]
</script>

<template>
  <nav
    :class="[
      'fixed z-50 transition-all duration-500 ease-in-out px-8 py-4 flex justify-between items-center',
      isScrolled
        ? 'top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] bg-black/40 backdrop-blur-xl border  rounded-full py-3 px-6 shadow-2xl'
        : 'top-0 left-0 w-full py-8 mix-blend-difference',
    ]"
  >
    <div ref="logoRef" class="cursor-pointer">
      <span
        :class="[
          'font-display font-bold tracking-tighter transition-all duration-500',
          isScrolled ? 'text-sm text-white' : 'text-2xl text-white',
        ]"
      >
        RADAN<span class="text-accent-2">.</span>
      </span>
    </div>

    <div
      class="hidden md:flex items-center space-x-6 font-body uppercase tracking-widest text-gray-400"
      :class="isScrolled ? 'text-[10px]' : 'text-xs'"
    >
      <template v-for="(item, index) in navHeader" :key="index">
        <MagneticButton :strength="0.4">
          <a
            href="#"
            class="hover:text-white transition-colors px-2 py-1 inline-block"
          >
            {{ item }}
          </a>
        </MagneticButton>
      </template>

      <MagneticButton :strength="0.4">
        <a
          href="#"
          :class="[
            'group flex items-center space-x-2 transition-all duration-500 rounded-full border',
            isScrolled
              ? 'px-4 py-1.5 bg-accent-2 border-transparent text-black font-bold'
              : 'px-6 py-2 border-white/20 text-white hover:bg-white hover:text-black',
          ]"
        >
          <span>Let's Talk</span>
          <i class="ri-arrow-right-up-line" v-if="!isScrolled"></i>
        </a>
      </MagneticButton>
    </div>
  </nav>
</template>

<style scoped>
nav {
  will-change: transform, width, top;
}
</style>
