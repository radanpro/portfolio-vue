<template>
  <section class="hero">
    <Motion
      tag="nav"
      class="navbar"
      :initial="{ y: -16, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }"
    >
      <div class="navbar-left">
        <div class="logo">
          <svg width="28" height="28" viewBox="0 0 28 28" class="logo-icon">
            <rect x="6" y="10" width="12" height="6" rx="2" fill="#000" transform="rotate(-35 12 13)" />
            <rect x="10" y="10" width="12" height="6" rx="2" fill="#000" transform="rotate(-35 16 13)" />
          </svg>
          <span class="brand-text">NeuralKinetics</span>
        </div>

        <button class="menu-pill">
          <span class="menu-circle">
            <Plus :size="12" :stroke-width="3" color="#000" />
          </span>
          <span class="menu-label">Menu</span>
        </button>

        <div class="tags-pill">
          <span>Advanced Bionics</span>
          <span>Cognitive AI</span>
        </div>
      </div>

      <div class="navbar-right">
        <div class="adaptive-pill">
          <span class="adaptive-circle">
            <LayoutGrid :size="14" color="#fff" />
          </span>
          <span class="adaptive-label">Adaptive Systems</span>
        </div>
      </div>
    </Motion>

    <Motion
      tag="div"
      class="video-wrapper"
      :initial="{ opacity: 0, scale: 1.05 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }"
    >
      <video
        class="bg-video"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
        autoplay
        muted
        playsinline
        loop
      />
    </Motion>

    <Motion
      tag="div"
      class="footer-wrapper"
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }"
    >
      <div class="footer-content">
        <div class="footer-left">
          <Motion
            tag="div"
            class="subtitle"
            :initial="{ y: 16, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }"
          >
            <span class="dot" />
            <span>Best digital banking card 2026</span>
          </Motion>

          <Motion
            tag="h1"
            class="heading"
            :initial="{ y: 20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }"
          >
            One Card, Zero<br />Limits. Worldwide.
          </Motion>

          <Motion
            tag="div"
            class="buttons"
            :initial="{ y: 16, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }"
          >
            <button class="btn-primary">See Features</button>
            <button class="btn-secondary">How It Works</button>
          </Motion>
        </div>

        <div class="footer-right">
          <span class="tag-pill">Neuromorphic</span>
          <span class="tag-pill">AGI</span>
          <span class="tag-pill">Cybernetics</span>
        </div>
      </div>
    </Motion>
  </section>
</template>

<script setup>
import { Motion } from 'motion-v'
import { Plus, LayoutGrid } from 'lucide-vue-next'
</script>

<style scoped>
.hero {
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  pointer-events: none;
}

.navbar > * {
  pointer-events: auto;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-text {
  display: none;
  font-size: 14px;
  font-weight: 500;
  color: #000;
}

.menu-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #000;
  border-radius: 999px;
  padding: 4px 12px 4px 4px;
  border: none;
  cursor: pointer;
}

.menu-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-label {
  font-size: 11px;
  color: #fff;
  font-weight: 400;
}

.tags-pill {
  display: none;
  align-items: center;
  gap: 12px;
  background: #F4F4F6;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
}

.adaptive-pill {
  display: none;
  align-items: center;
  gap: 10px;
  background: #F4F4F6;
  border-radius: 999px;
  padding: 4px 16px 4px 4px;
}

.adaptive-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.adaptive-label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
}

.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 80%;
  height: 80%;
  margin: auto;
}

.bg-video {
  width: 80%;
  height: 80%;
  object-fit: cover;
  border-radius: 12px;
}

.footer-wrapper {
  position: relative;
  z-index: 30;
  width: 100%;
  padding-top: 80px;
  background: linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 16px 32px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.55);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #000;
}

.heading {
  font-weight: 300;
  font-size: clamp(2rem, 8vw, 4.5rem);
  letter-spacing: -0.03em;
  line-height: 1;
  color: #000;
  margin: 0;
}

.buttons {
  display: flex;
  gap: 12px;
}

.btn-primary {
  background: #000;
  color: #fff;
  font-size: 13px;
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  cursor: pointer;
  font-family: inherit;
}

.btn-secondary {
  background: transparent;
  color: #000;
  font-size: 13px;
  border: 1px solid rgba(0, 0, 0, 0.35);
  border-radius: 999px;
  padding: 12px 24px;
  cursor: pointer;
  font-family: inherit;
}

.footer-right {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-pill {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.7);
}

@media (min-width: 768px) {
  .navbar {
    padding: 24px 32px;
  }

  .brand-text {
    display: block;
  }

  .tags-pill {
    display: flex;
  }

  .adaptive-pill {
    display: flex;
  }

  .menu-circle,
  .adaptive-circle {
    width: 32px;
    height: 32px;
  }

  .bg-video {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 32px;
  }

  .heading {
    font-size: clamp(2.5rem, 5.5vw, 4.5rem);
  }
}
</style>