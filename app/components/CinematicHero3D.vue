<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const sceneRef = ref<HTMLElement | null>(null)

useCinematicHero(sectionRef, heroRef, sceneRef)
</script>

<template>
  <section ref="sectionRef" class="cinematic-hero-shell">
    <div ref="heroRef" class="cinematic-hero">
      <div class="cinematic-noise" aria-hidden="true"></div>

      <div ref="sceneRef" class="cinematic-scene">
        <p
          v-for="(word, i) in ['YOUR', 'IDEAS', 'START', 'HERE']"
          :key="'L' + i"
          class="cinematic-layer cinematic-wall"
          data-cinematic-layer
          data-pass="0.85"
          :style="{
            '--x': '-45vw',
            '--y': '-50%',
            '--z': `${-1000 - i * 800}px`,
            '--rx': '0deg',
            '--ry': '90deg',
            '--rz': '0deg',
          }"
        >
          {{ word }}
        </p>

        <p
          v-for="(word, i) in ['YOUR', 'TOOLS', 'FOR', 'AI']"
          :key="'R' + i"
          class="cinematic-layer cinematic-wall"
          data-cinematic-layer
          data-pass="0.85"
          :style="{
            '--x': '50vw',
            '--y': '-50%',
            '--z': `${-1000 - i * 800}px`,
            '--rx': '0deg',
            '--ry': '270deg',
            '--rz': '0deg',
          }"
        >
          {{ word }}
        </p>

        <p
          v-for="(word, i) in ['CINEMATIC', 'WEB', 'INTERFACES']"
          :key="'T' + i"
          class="cinematic-layer cinematic-surface"
          data-cinematic-layer
          data-pass="0.77"
          :style="{
            '--x': '-50%',
            '--y': '-35vh',
            '--z': `${-1720 - i * 600}px`,
            '--rx': '-87deg',
            '--ry': '0deg',
            '--rz': '0deg',
          }"
        >
          {{ word }}
        </p>

        <p
          v-for="(word, i) in ['CREATEAI', 'BOLD', 'SHIP', 'FAST']"
          :key="'B' + i"
          class="cinematic-layer cinematic-surface"
          data-cinematic-layer
          data-pass="0.75"
          :style="{
            '--x': '-50%',
            '--y': '25vh',
            '--z': `${-1000 - i * 800}px`,
            '--rx': '90deg',
            '--ry': '0deg',
            '--rz': '0deg',
          }"
        >
          {{ word }}
        </p>

        <div
          class="cinematic-layer cinematic-core"
          data-cinematic-layer
          data-pass="0.66"
          style="--x: -50%; --y: -50%; --z: -4800px"
        >
          <h1 class="core-title">DIGITAL ARCHITECT</h1>
          <p class="core-copy">Scroll to travel through the tunnel.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cinematic-hero-shell {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
}

.cinematic-hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  perspective: 1280px;
  perspective-origin: 50% 50%;
  isolation: isolate;
  background:
    radial-gradient(
      circle at 50% 42%,
      rgba(118, 99, 255, 0.32) 0%,
      transparent 42%
    ),
    radial-gradient(
      circle at 50% 105%,
      rgba(118, 99, 255, 0.4) 0%,
      transparent 48%
    ),
    #020202;
  border-block: 1px solid rgba(255, 255, 255, 0.08);
}

.cinematic-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 8;
  background: radial-gradient(
    circle,
    transparent 55%,
    rgba(0, 0, 0, 0.64) 100%
  );
}

.cinematic-noise {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.28;
  mix-blend-mode: soft-light;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.1) 0,
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px,
    transparent 3px
  );
}

.cinematic-scene {
  position: absolute;
  inset: -20vh -18vw;
  z-index: 5;
  transform-style: preserve-3d;
  will-change: transform;
}

.cinematic-layer {
  position: absolute;
  left: 50%;
  top: 50%;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  transform: translate3d(var(--x, 0), var(--y, 0), var(--z, 0))
    rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) rotateZ(var(--rz, 0deg));
}

.cinematic-wall,
.cinematic-surface,
.cinematic-depth {
  font-family: var(--font-drizy);
  font-weight: 800;
  line-height: 0.82;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: #7869ff;
  text-shadow: 0 0 22px rgba(120, 105, 255, 0.36);
}

.cinematic-wall {
  font-size: clamp(4rem, 20vw, 18rem);
  text-align: center;
}

.cinematic-surface {
  font-size: clamp(3rem, 15vw, 12rem);
}

.surface-one-line {
  white-space: nowrap !important;
  width: max-content;
  word-break: keep-all;
  overflow-wrap: normal;
}

.cinematic-depth {
  font-size: clamp(2.4rem, 13vw, 12rem);
  opacity: 0.24;
}

.cinematic-core {
  width: min(90vw, 800px);
  z-index: 10;
}

.core-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.38rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 999px;
  font-family: var(--font-black-sansa);
  font-size: clamp(0.64rem, 1.1vw, 0.8rem);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);
}

.core-title {
  margin: 0.9rem 0 0;
  font-family: var(--font-drizy);
  font-size: clamp(2rem, 6.8vw, 6.5rem);
  line-height: 0.92;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.core-copy {
  margin: 1rem auto 0;
  max-width: 58ch;
  font-family: var(--font-black-sansa);
  font-size: clamp(0.9rem, 1.35vw, 1.12rem);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);
}

.core-actions {
  margin-top: 1.4rem;
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  flex-wrap: wrap;
}

.core-btn {
  border-radius: 999px;
  padding: 0.68rem 1.35rem;
  font-family: var(--font-black-sansa);
  font-size: 0.86rem;
  letter-spacing: 0.04em;
  transition:
    transform 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;
}

.core-btn:hover {
  transform: translateY(-1px);
}

.core-btn--solid {
  background: #fff;
  color: #111;
}

.core-btn--ghost {
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #fff;
  background: transparent;
}

.cinematic-hud {
  font-family: var(--font-black-sansa);
  font-size: clamp(0.68rem, 1.2vw, 0.92rem);
  text-transform: uppercase;
  letter-spacing: 0.32em;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 1023px) {
  .cinematic-scene {
    inset: -14vh -36vw;
  }

  .cinematic-wall {
    font-size: clamp(2.6rem, 20vw, 11rem);
  }

  .cinematic-surface {
    font-size: clamp(1.8rem, 13vw, 7rem);
  }
}

@media (max-width: 767px) {
  .cinematic-hero {
    perspective: 740px;
  }

  .cinematic-scene {
    inset: -8vh -58vw;
  }

  .cinematic-core {
    width: min(92vw, 520px);
  }

  .core-title {
    font-size: clamp(1.8rem, 9.5vw, 3.8rem);
  }

  .core-copy {
    font-size: 0.9rem;
  }

  .core-btn {
    font-size: 0.78rem;
    padding: 0.62rem 1.16rem;
  }
}
</style>
