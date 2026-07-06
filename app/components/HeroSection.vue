<template>
  <section class="hero">
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
            <span>Full Stack Developer & System Architect</span>
          </Motion>

          <Motion
            tag="h1"
            class="heading"
            :initial="{ y: 20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }"
          >
            Crafting High-Performance<br />Web Applications.
          </Motion>

          <Motion
            tag="div"
            class="buttons"
            :initial="{ y: 16, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }"
          >
            <button class="btn-primary" @click="scrollToWork">View Work</button>
            <a href="mailto:radan1pro@gmail.com" class="btn-secondary">Contact Me</a>
          </Motion>
        </div>

        <div class="footer-right">
          <span class="tag-pill">Laravel</span>
          <span class="tag-pill">Python</span>
          <span class="tag-pill">Vue & React</span>
          <span class="tag-pill">DevOps</span>
        </div>
      </div>
    </Motion>
  </section>
</template>

<script setup>
import { Motion } from "motion-v";

const scrollToWork = () => {
  const el = document.getElementById("work");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
.hero {
  min-height: 100vh;
  width: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.video-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(5, 5, 5, 0.3) 0%,
    transparent 50%,
    rgba(5, 5, 5, 0.8) 100%
  );
  z-index: 1;
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer-wrapper {
  position: relative;
  z-index: 30;
  width: 100%;
  padding-top: 200px;
  background: linear-gradient(
    to top,
    rgba(5, 5, 5, 0.85) 0%,
    rgba(5, 5, 5, 0.2) 70%,
    transparent 100%
  );
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  mask-image: linear-gradient(to top, black 20%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 20%, transparent 100%);
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 20px 40px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--accent-2);
  
  font-family: var(--font-body), sans-serif;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  background:  var(--bg-color);
  border-radius: 999px;
  padding:2px 5px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-2);
  box-shadow: 0 0 10px var(--accent-2);
}

.heading {
  font-weight: 700;
  font-size: clamp(2rem, 6.5vw, 4.5rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #fff;
  margin: 0;
  font-family: var(--font-drizy), sans-serif;
  text-transform: uppercase;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.9);
}

.buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-primary {
  background: var(--accent-2);
  color: #000;
  font-size: 13px;
  font-weight: 700;
  border: none;
  border-radius: 999px;
  padding: 12px 28px;
  cursor: pointer;
  font-family: var(--font-body), sans-serif;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-primary:hover {
  background: var(--accent);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 42, 109, 0.2);
}

.btn-secondary {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 12px 28px;
  cursor: pointer;
  font-family: var(--font-body), sans-serif;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.footer-right {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-pill {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 11px;
  color: #e0e0e0;
  font-family: var(--font-body), sans-serif;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.tag-pill:hover {
  border-color: var(--accent-2);
  color: #fff;
  background: rgba(5, 217, 232, 0.05);
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 40px;
  }

  .heading {
    font-size: clamp(3rem, 5.5vw, 5.5rem);
  }
}
</style>
