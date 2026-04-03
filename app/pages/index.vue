<script setup lang="ts">
const projects = [
  {
    title: "Nexus UI Kit",
    category: "Digital Design",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
  },
  {
    title: "Aether Platform",
    category: "SaaS / Web",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
  },
  {
    title: "Radan OS",
    category: "DevOps / UI",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
  },
  {
    title: "Quantum Studio",
    category: "Interactive",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
  },
]

const titleArr = [
  ["D", "I", "G", "I", "T", "A", "L"],
  ["A", "R", "C", "H", "I", "T", "E", "C", "T"],
]
</script>
<template>
  <div class="mx-auto px-8 pb-32">
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

    <AppMarquee />

    <AboutSection />
    <StatsSection />
    <LeonardoCards />

    <!-- <MaskedStack /> -->

    <section id="work" class="py-32">
      <div
        class="reveal flex justify-between items-end mb-20 border-b border-white/10 pb-8 font-tropikal"
      >
        <div>
          <h2
            class="text-5xl md:text-7xl font-drizy font-bold uppercase tracking-tighter"
          >
            Selected Works
          </h2>
          <p
            class="text-accent-2 mt-2 uppercase tracking-widest text-sm font-black-sansa"
          >
            Case Studies / 2024-2026
          </p>
        </div>
        <div
          class="hidden md:block text-right font-drizy text-white/20 text-xl italic"
        >
          Scroll to Explore
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        <div
          v-for="(project, i) in projects"
          :key="i"
          :class="['reveal', i % 2 !== 0 ? 'md:mt-40' : '']"
        >
          <ProjectCard v-bind="project" />
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
