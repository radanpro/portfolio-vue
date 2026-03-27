<script setup lang="ts">
const logoRef = ref(null)
useMagnetic(logoRef, 0.3)

const { isScrolled, isVisible } = useHeaderTransform()
const navHeader = ["Projects", "Services", "About"]
</script>

<template>
  <nav
    :class="[
      'fixed left-0 w-full z-50 flex justify-center items-start transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
      // تحريك الـ Nav بالكامل للأعلى عند عدم الرؤية
      isVisible ? 'translate-y-0' : '-translate-y-full',
    ]"
  >
    <div
      :class="[
        'flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isScrolled
          ? 'w-[90vw] md:w-[650px] mt-4 px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl scale-100'
          : 'w-full px-8 py-6 bg-transparent scale-100 mix-blend-difference',
      ]"
    >
      <div ref="logoRef" class="cursor-pointer">
        <span
          :class="[
            'font-display font-bold tracking-tight transition-all duration-500',
            isScrolled ? 'text-lg text-white' : 'text-2xl text-white',
          ]"
        >
          RADAN<span class="text-accent-2">.</span>
        </span>
      </div>

      <div
        class="hidden md:flex items-center space-x-6 uppercase tracking-widest transition-all duration-500"
        :class="
          isScrolled ? 'text-[10px] text-gray-200' : 'text-xs text-gray-400'
        "
      >
        <template v-for="(item, index) in navHeader" :key="index">
          <MagneticButton :strength="0.4">
            <a href="#" class="hover:text-white transition-colors px-2 py-1">
              {{ item }}
            </a>
          </MagneticButton>
        </template>

        <MagneticButton :strength="0.4">
          <a
            href="#"
            :class="[
              'flex items-center space-x-2 rounded-full transition-all duration-500 font-bold',
              isScrolled
                ? 'px-4 py-1.5 bg-accent-2 text-black text-[10px]'
                : 'px-6 py-2 border border-white/20 text-white hover:bg-white hover:text-black text-xs',
            ]"
          >
            <span>Let's Talk</span>
          </a>
        </MagneticButton>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  will-change: transform;
}
</style>
