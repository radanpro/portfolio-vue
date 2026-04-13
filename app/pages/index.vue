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
</script>
<template>
  <div class="mx-auto px-8 pb-32">
    <CinematicHero3D />
    <HeroSection />
    <AppMarquee />

    <AboutSection />
    <div>
      <LogoParticles />
    </div>
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
