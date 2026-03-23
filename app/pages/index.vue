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
  <div class="container mx-auto px-8 pb-32">
    <section class="min-h-screen flex flex-col justify-center py-20">
      <div class="overflow-hidden">
        <h2
          class="text-[14vw] font-display font-black leading-none uppercase text-white/5 -mb-8 select-none tracking-tighter"
        >
          Architect
        </h2>
      </div>
      <div class="max-w-4xl">
        <h1
          class="text-6xl md:text-8xl font-display font-bold uppercase leading-[0.9] tracking-tighter"
        >
          Crafting <span class="text-accent-2">Digital</span> <br />
          Masterpieces <span class="text-accent">.</span>
        </h1>
        <p
          class="mt-8 text-gray-400 font-body max-w-xl text-lg leading-relaxed"
        >
          Full Stack Developer & DevOps Engineer specializing in high-end
          interactive web experiences.
        </p>
      </div>
    </section>

    <section id="projects" class="grid grid-cols-1 md:grid-cols-2 gap-12 pt-20">
      <div
        v-for="(project, i) in projects"
        :key="i"
        :class="i % 2 !== 0 ? 'md:mt-32' : ''"
      >
        <ProjectCard v-bind="project" />
      </div>
    </section>
  </div>
</template>
