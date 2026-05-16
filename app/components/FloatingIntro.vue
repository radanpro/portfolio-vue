<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from "vue";
import gsap from "gsap";

const containerRef = ref<HTMLElement | null>(null);
const images = [
  "/images/barq.png",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300",
];

let isRunning = false;
let loopTween: gsap.core.Tween | null = null;
let observer: IntersectionObserver | null = null;

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const spawnParticle = () => {
  if (!containerRef.value || !isRunning) return;

  const el = document.createElement("img");
  el.src = images[Math.floor(Math.random() * images.length)] as string;

  // Requirement: Randomize sizes (30px to 150px)
  const size = rand(30, 150);
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.className =
    "absolute object-cover rounded-xl pointer-events-none will-change-transform opacity-0";

  containerRef.value.appendChild(el);

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Center is (0,0) relative to the screen for ease of calculation
  const targetX = rand(-vw / 1.5, vw / 1.5);
  const targetY = rand(-vh / 1.5, vh / 1.5);

  // Requirement: depth factor for a 3D parallax effect
  const depth = rand(0.5, 2.0);
  // Requirement: speeds (Durations) based on 'depth' factor
  const duration = rand(3, 10) / depth;

  gsap.fromTo(
    el,
    { x: 0, y: 0, scale: 0, opacity: 0, rotate: rand(-180, 180) },
    {
      x: targetX,
      y: targetY,
      scale: depth,
      rotate: rand(-45, 45),
      duration: duration,
      ease: "power1.out",
      onUpdate: function () {
        const currentX = gsap.getProperty(el, "x") as number;
        const currentY = gsap.getProperty(el, "y") as number;

        // Requirement: 'Edge Fading' logic
        const edgeX = 1 - Math.abs(currentX) / (vw / 2);
        const edgeY = 1 - Math.abs(currentY) / (vh / 2);
        const edgeFactor = Math.min(edgeX, edgeY);

        // Fade in initially, then fade out as it reaches edges
        const progress = this.progress();
        let opacity = 1;

        if (progress < 0.2) {
          opacity = progress * 5; // Fade in
        } else {
          opacity = Math.max(0, edgeFactor); // Edge fade
        }

        gsap.set(el, { opacity: opacity * 0.8 });
      },
      onComplete: () => {
        el.remove();
      },
    },
  );
};

const spawnBurst = () => {
  if (!isRunning) return;
  const count = Math.floor(rand(1, 3));
  for (let i = 0; i < count; i++) spawnParticle();
  loopTween = gsap.delayedCall(rand(0.2, 1.2), spawnBurst);
};

const startParticles = () => {
  if (isRunning) return;
  isRunning = true;
  spawnBurst();
};

const stopParticles = () => {
  isRunning = false;
  loopTween?.kill();

  if (containerRef.value) {
    const particles = containerRef.value.querySelectorAll("img");
    // Requirement: Completely stop the spawning and kill all active GSAP tweens
    gsap.killTweensOf(particles);
    particles.forEach((el) => el.remove());
  }
};

onMounted(() => {
  // Requirement: Use the Intersection Observer API
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startParticles();
        } else {
          stopParticles();
        }
      });
    },
    { threshold: 0.1 },
  );

  if (containerRef.value) {
    observer.observe(containerRef.value);
  }
});

onBeforeUnmount(() => {
  // Requirement: Cleanup all delayedCall and observer
  stopParticles();
  observer?.disconnect();
});
</script>

<template>
  <section
    ref="containerRef"
    class="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-sm"
  />
</template>
