<script setup lang="ts">
const props = defineProps({
  isScrolled: Boolean,
})

const videoRef = ref<HTMLVideoElement | null>(null)

const restartVideo = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = 0
    videoRef.value.play()
  }
}
</script>

<template>
  <div
    class="relative flex items-center justify-center overflow-hidden cursor-pointer group"
    @mouseenter="restartVideo"
  >
    <div
      class="absolute inset-0 bg-accent-2/10 blur-2xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    ></div>
    <span
      :class="[
        'font-display font-bold tracking-tight transition-all duration-500',
        isScrolled ? 'text-lg text-white' : 'text-xl md:text-2xl text-white',
      ]"
    >
      RADAN<span class="text-accent-2">.</span>
    </span>

    <!-- <ClientOnly>
      <video
        ref="videoRef"
        :src="logoVideo"
        loop
        muted
        playsinline
        :class="[
          ' duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] object-contain transition-transform',
          isScrolled ? 'h-10 md:h-12' : 'h-16 md:h-20',
        ]"
        style="mix-blend-mode: screen"
      ></video>

      <template #fallback>
        <div
          :class="isScrolled ? 'h-10 md:h-12' : 'h-16 md:h-20'"
          class="w-20 bg-transparent"
        ></div>
      </template>
    </ClientOnly> -->
  </div>
</template>

<style scoped>
video {
  pointer-events: none;
  will-change: transform, height;
}
</style>
