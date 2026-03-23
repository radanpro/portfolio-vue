<script setup lang="ts">
useScrollAnimations()

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
</script>
<template>
  <div class="container mx-auto px-8 pb-32">
    <section
      class="min-h-screen flex flex-col justify-center items-center text-center relative"
    >
      <div
        class="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden pointer-events-none"
      >
        <h2
          class="text-[15vw] font-display font-black uppercase text-white/10 leading-none select-none"
        >
          Radan
        </h2>
      </div>

      <h1
        class="hero-title text-[10vw] md:text-[8vw] font-display font-black leading-[0.85] uppercase tracking-tighter"
      >
        <div class="block overflow-hidden">
          <span class="char-reveal inline-block">D</span>
          <span class="char-reveal inline-block">I</span>
          <span class="char-reveal inline-block">G</span>
          <span class="char-reveal inline-block">I</span>
          <span class="char-reveal inline-block">T</span>
          <span class="char-reveal inline-block">A</span>
          <span class="char-reveal inline-block">L</span>
        </div>
        <div class="block overflow-hidden text-accent-2">
          <span class="char-reveal inline-block">A</span>
          <span class="char-reveal inline-block">R</span>
          <span class="char-reveal inline-block">C</span>
          <span class="char-reveal inline-block">H</span>
          <span class="char-reveal inline-block">I</span>
          <span class="char-reveal inline-block">T</span>
          <span class="char-reveal inline-block">E</span>
          <span class="char-reveal inline-block">C</span>
          <span class="char-reveal inline-block">T</span>
        </div>
      </h1>

      <div class="reveal mt-12 max-w-2xl">
        <div
          class="inline-block px-6 py-2 border-y border-accent-2/30 text-accent-2 tracking-[0.4em] uppercase font-bold text-xs mb-6"
        >
          Design. Code. Motion.
        </div>
        <p class="text-gray-400 font-body text-lg md:text-xl leading-relaxed">
          Full Stack Developer & DevOps Engineer specializing in high-end
          interactive web experiences.
        </p>
      </div>
    </section>

    <AppMarquee />

    <section id="work" class="py-32">
      <div
        class="reveal flex justify-between items-end mb-20 border-b border-white/10 pb-8"
      >
        <div>
          <h2
            class="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter"
          >
            Selected Works
          </h2>
          <p class="text-accent-2 mt-2 uppercase tracking-widest text-sm">
            Case Studies / 2024-2026
          </p>
        </div>
        <div
          class="hidden md:block text-right font-display text-white/20 text-xl italic"
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
  </div>
</template>
