<script setup lang="ts">
const titleArr = [
  ["D", "I", "G", "I", "T", "A", "L"],
  ["A", "R", "C", "H", "I", "T", "E", "C", "T"],
]
</script>
<template>
  <section
    class="min-h-screen flex flex-col justify-center items-center text-center relative"
  >
    <div
      class="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden pointer-events-none"
    >
      <h2
        class="text-[20vw] font-drizy font-black uppercase text-white/10 leading-none select-none tracking-[0.2em]"
      >
        Radan
      </h2>
    </div>

    <h1
      class="hero-title text-[10vw] md:text-[12vw] font-black leading-[0.95] uppercase tracking-[0.02em] text-slate-100"
    >
      <div
        v-for="(word, wordIndex) in titleArr"
        :key="wordIndex"
        class="block overflow-hidden"
        :class="{ 'text-accent-2': wordIndex === 1 }"
      >
        <span
          v-for="(char, charIndex) in word"
          :key="charIndex"
          class="char-reveal inline-block"
        >
          {{ char }}
        </span>
      </div>
    </h1>

    <div
      class="reveal mt-12 max-w-2xl font-black-sansa text-lg md:text-xl text-gray-400 leading-relaxed"
    >
      <div
        class="inline-block px-6 py-2 border-y border-accent-2/30 text-accent-2 tracking-[0.4em] uppercase font-bold text-xs mb-6 font-display"
      >
        Design. Code. Motion.
      </div>
      <p class="text-gray-400 text-lg md:text-xl leading-relaxed">
        Full Stack Developer & DevOps Engineer specializing in high-end
        interactive web experiences.
      </p>
    </div>
  </section>
</template>
