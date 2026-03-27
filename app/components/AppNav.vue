<script setup lang="ts">
const logoRef = ref(null)
useMagnetic(logoRef, 0.3)

const { isScrolled, isVisible } = useHeaderTransform()
const navHeader = ["Projects", "Services", "About"]

const isMobileMenuOpen = ref(false)
</script>

<template>
  <nav
    :class="[
      'fixed left-0 w-full z-50 flex justify-center items-start transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
      isVisible ? 'translate-y-0' : '-translate-y-full',
    ]"
  >
    <div
      :class="[
        'flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isScrolled
          ? 'w-[95vw] md:w-[650px] mt-4 px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl  shadow-2xl'
          : 'w-full px-6 md:px-12 py-6 bg-transparent mix-blend-difference',
      ]"
    >
      <div ref="logoRef" class="cursor-pointer z-60">
        <span
          :class="[
            'font-display font-bold tracking-tight transition-all duration-500',
            isScrolled
              ? 'text-lg text-white'
              : 'text-xl md:text-2xl text-white',
          ]"
        >
          RADAN<span class="text-accent-2">.</span>
        </span>
      </div>

      <div
        class="hidden md:flex items-center space-x-6 uppercase tracking-widest"
        :class="
          isScrolled ? 'text-[10px] text-gray-200' : 'text-xs text-gray-400'
        "
      >
        <template v-for="(item, index) in navHeader" :key="index">
          <MagneticButton :strength="0.4">
            <a href="#" class="hover:text-white transition-colors px-2 py-1">{{
              item
            }}</a>
          </MagneticButton>
        </template>
        <MagneticButton :strength="0.4">
          <a
            href="#"
            :class="[
              'rounded-full transition-all duration-500 font-bold',
              isScrolled
                ? 'px-4 py-1.5 bg-accent-2 text-black text-[10px]'
                : 'px-6 py-2 border border-white/20 text-white hover:bg-white hover:text-black text-xs',
            ]"
          >
            Let's Talk
          </a>
        </MagneticButton>
      </div>

      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden z-60 text-white p-2"
      >
        <div class="w-6 h-5 flex flex-col justify-between items-end">
          <span
            :class="[
              'h-0.5 bg-white transition-all',
              isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6',
            ]"
          ></span>
          <span
            :class="[
              'h-0.5 bg-white transition-all',
              isMobileMenuOpen ? 'opacity-0' : 'w-4',
            ]"
          ></span>
          <span
            :class="[
              'h-0.5 bg-white transition-all',
              isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5',
            ]"
          ></span>
        </div>
      </button>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-[-20px]"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-[-20px]"
      >
        <div
          v-if="isMobileMenuOpen"
          class="absolute top-16 left-0 my-4 w-full h-screen bg-black flex flex-col items-center justify-start space-y-8 text-2xl uppercase tracking-[0.2em] font-bold md:hidden"
        >
          <a
            v-for="item in navHeader"
            :key="item"
            href="#"
            @click="isMobileMenuOpen = false"
            class="text-white hover:text-accent-2 transition-colors"
            >{{ item }}</a
          >
          <a
            href="#"
            @click="isMobileMenuOpen = false"
            class="text-accent-2 border border-accent-2 px-8 py-3 rounded-full text-sm"
            >Let's Talk</a
          >
        </div>
      </Transition>
    </div>
  </nav>
</template>
