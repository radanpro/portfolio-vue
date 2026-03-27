<script setup lang="ts">
const logoRef = ref(null)
useMagnetic(logoRef, 0.3)

const { isScrolled } = useHeaderTransform()
const navHeader = ["Projects", "Services", "About"]
</script>

<template>
  <nav
    :class="[
      'fixed z-50 left-1/2 -translate-x-1/2 flex items-center justify-between',
      'transition-[transform,background,backdrop-filter,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
      isScrolled ? 'top-4 scale-95' : 'top-4 scale-100',
    ]"
  >
    <div
      :class="[
        'flex items-center justify-between w-full',
        'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isScrolled
          ? 'w-[90vw] md:w-[600px] px-6 py-3 rounded-xl bg-black/30 backdrop-blur-xl shadow-2xl  '
          : 'w-screen px-8 py-6 bg-transparent',
      ]"
    >
      <!-- Logo -->
      <div ref="logoRef" class="cursor-pointer">
        <span
          :class="[
            'font-display font-bold tracking-tight transition-all duration-500',
            isScrolled ? 'text-sm text-white' : 'text-2xl text-white',
          ]"
        >
          RADAN<span class="text-accent-2">.</span>
        </span>
      </div>

      <!-- Nav -->
      <div
        class="hidden md:flex items-center space-x-6 uppercase tracking-widest transition-all duration-500"
        :class="
          isScrolled ? 'text-[10px] text-gray-300' : 'text-xs text-gray-400'
        "
      >
        <template v-for="(item, index) in navHeader" :key="index">
          <MagneticButton :strength="0.4">
            <a class="hover:text-white transition-colors px-2 py-1">
              {{ item }}
            </a>
          </MagneticButton>
        </template>

        <!-- CTA -->
        <MagneticButton :strength="0.4">
          <a
            :class="[
              'flex items-center space-x-2 rounded-full transition-all duration-500',
              isScrolled
                ? 'px-4 py-1.5 bg-accent-2 text-black font-bold'
                : 'px-6 py-2 border border-white/20 text-white hover:bg-white hover:text-black',
            ]"
          >
            <span>Let's Talk</span>
          </a>
        </MagneticButton>
      </div>
    </div>
  </nav>
</template>
