<template>
  <div class="min-h-screen">
    <AppNav />
    <main class="pt-32 px-8">
      <h2
        class="text-[12vw] font-display font-black leading-none uppercase text-white spacity-10 select-none"
      >
        Architect
      </h2>
    </main>
    <NuxtPage />
    <div
      class="min-h-screen flex flex-col items-center justify-center space-y-4"
    >
      <h1
        class="text-6xl font-display text-accent-2 tracking-tighter uppercase"
      >
        Radan Studio
      </h1>
      <p class="text-gray-400 font-body border-t border-accent/30 pt-4">
        Tailwind CSS 4 + Nuxt 4 is Active
      </p>
      <div
        class="w-12 h-1 bg-accent shadow-[0_0_15px_rgba(255,42,109,0.5)]"
      ></div>
    </div>
  </div>
</template>
