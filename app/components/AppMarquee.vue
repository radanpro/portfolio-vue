<template>
  <div
    class="marquee-container overflow-hidden bg-accent py-4 -rotate-2 scale-105 shadow-[0_0_50px_rgba(255,42,109,0.3)]"
  >
    <div class="marquee-track flex whitespace-nowrap">
      <div class="marqyee-content flex items-contener" v-for="i in 4" :key="i">
        <span class="text-black font-display text-4xl font-black uppercase px-8"
          >Web Development • Creative Coding • UI/UX Design • 3D WebGL •
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.marquee-track {
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
