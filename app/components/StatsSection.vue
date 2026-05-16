<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  {
    number: 3,
    suffix: "+",
    label: "Years of Experience",
    sub: "Full Stack & DevOps",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    number: 50,
    suffix: "+",
    label: "GitHub Projects",
    sub: "Open Source & Private",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    number: 100,
    suffix: "%",
    label: "Commitment",
    sub: "Learning Everyday",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);

const setCardRef = (el: HTMLElement | null, i: number) => {
  if (el) cardRefs.value[i] = el;
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Staggered card entrance
  gsap.fromTo(
    cardRefs.value,
    { y: 60, opacity: 0, scale: 0.92 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
      },
    },
  );

  // Counter animation per card
  cardRefs.value.forEach((card, i) => {
    const stat = stats[i];
    const valueEl = card.querySelector(".stat-value") as HTMLElement;
    if (!valueEl || !stat) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: stat.number,
      duration: 2.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      onUpdate() {
        valueEl.textContent = String(Math.round(obj.val));
      },
    });

    // Glow pulse on scroll enter
    gsap.fromTo(
      card.querySelector(".card-glow"),
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      },
    );
  });

  // Heading reveal
  gsap.fromTo(
    ".stats-heading",
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 85%",
      },
    },
  );
});

const handleMagnetic = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(el, {
    x: x * 0.25,
    y: y * 0.25,
    duration: 0.6,
    ease: "power2.out",
    overwrite: true,
  });

  // Also move the glow orb slightly more for parallax
  const glow = el.querySelector(".card-glow");
  if (glow) {
    gsap.to(glow, {
      x: x * 0.4,
      y: y * 0.4,
      opacity: 0.8,
      duration: 0.6,
      ease: "power2.out",
      overwrite: true,
    });
  }
};

const resetMagnetic = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  gsap.to(el, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.3)",
    overwrite: true,
  });

  const glow = el.querySelector(".card-glow");
  if (glow) {
    gsap.to(glow, {
      x: 0,
      y: 0,
      opacity: 0.2,
      duration: 0.8,
      ease: "power2.out",
      overwrite: true,
    });
  }
};

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<template>
  <section ref="sectionRef" class="py-32 relative overflow-hidden">
    <!-- Ambient background blobs -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div
        class="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full opacity-[0.07]"
        style="background: radial-gradient(circle, #a78bfa, transparent 70%)"
      />
      <div
        class="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full opacity-[0.05]"
        style="background: radial-gradient(circle, #818cf8, transparent 70%)"
      />
    </div>

    <div class="container mx-auto px-8">
      <!-- Optional heading -->
      <p
        class="stats-heading text-center text-xs uppercase tracking-[0.3em] text-white/30 mb-16 font-mono"
      >
        By the numbers
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(stat, i) in stats"
          :key="i"
          :ref="(el) => setCardRef(el as HTMLElement, i)"
          class="stat-card group relative rounded-3xl p-10 overflow-hidden border border-white/[0.07] bg-white/[0.03] backdrop-blur-md hover:border-white/20 transition-all duration-500 cursor-default"
          @mousemove="handleMagnetic"
          @mouseleave="resetMagnetic"
        >
          <!-- Shimmer sweep on hover -->
          <div
            class="shimmer pointer-events-none absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />

          <!-- Glow orb -->
          <div
            class="card-glow pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-0 blur-3xl transition-colors duration-700"
            :style="`background: radial-gradient(circle, ${['#7c3aed', '#4f46e5', '#0ea5e9'][i]}33, transparent 70%)`"
          />

          <div class="relative z-10">
            <!-- Icon -->
            <div
              class="mb-7 w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:border-white/20 transition-all duration-500"
            >
              <svg
                class="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors duration-500"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :d="stat.icon"
                />
              </svg>
            </div>

            <!-- Counter -->
            <div class="flex items-end gap-1 mb-4">
              <span
                class="stat-value font-drizy text-7xl font-black text-white leading-none tabular-nums"
                >0</span
              >
              <span
                class="text-3xl font-black pb-1 transition-colors duration-500"
                :style="`color: ${['#a78bfa', '#818cf8', '#38bdf8'][i]}`"
                >{{ stat.suffix }}</span
              >
            </div>

            <!-- Divider line -->
            <div
              class="h-px w-12 mb-4 transition-all duration-700 group-hover:w-20"
              :style="`background: ${['#7c3aed', '#4f46e5', '#0ea5e9'][i]}66`"
            />

            <h4
              class="font-display text-sm uppercase tracking-widest text-white/80 mb-1"
            >
              {{ stat.label }}
            </h4>
            <p class="text-xs text-white/30 italic">{{ stat.sub }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.shimmer::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.03) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  animation: shimmer-sweep 2.5s ease-in-out infinite;
}

@keyframes shimmer-sweep {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.stat-card {
  transform: translateZ(0);
}

.stat-card:hover {
  transform: translateY(-4px) translateZ(0);
}

@keyframes count-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
