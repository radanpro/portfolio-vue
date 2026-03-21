<script setup lang="ts">
const { bridgeRef, cursorRef, followerRef, isEnabled } = useGooeyCursor()
</script>

<template>
  <div v-show="isEnabled" class="gooey-cursor" aria-hidden="true">
    <svg class="gooey-cursor__defs" width="0" height="0" focusable="false">
      <defs>
        <filter id="gooey-cursor">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 22 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>

    <div ref="followerRef" class="gooey-cursor__follower">
      <div class="gooey-cursor__liquid" style="filter: url(#gooey-cursor)">
        <div class="gooey-cursor__blob gooey-cursor__blob--core">
          <span class="gooey-cursor__sheen"></span>
        </div>
        <div
          ref="bridgeRef"
          class="gooey-cursor__blob gooey-cursor__blob--bridge"
        ></div>
      </div>
    </div>

    <div ref="cursorRef" class="gooey-cursor__dot"></div>
  </div>
</template>

<style scoped>
.gooey-cursor {
  --cursor-color: rgba(232, 32, 5, 0.98);
  --cursor-glow: rgba(158, 42, 7, 0.32);
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}

.gooey-cursor__defs {
  position: absolute;
}

.gooey-cursor__follower,
.gooey-cursor__dot {
  position: fixed;
  top: 0;
  left: 0;
  will-change: transform, opacity;
}

.gooey-cursor__follower {
  width: 7rem;
  height: 7rem;
  mix-blend-mode: screen;
}

.gooey-cursor__liquid {
  position: relative;
  width: 100%;
  height: 100%;
}

.gooey-cursor__blob {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle at 30% 28%,
    rgba(255, 255, 255, 0.92) 0,
    rgba(255, 255, 255, 0.35) 16%,
    rgba(61, 233, 244, 0.95) 40%,
    rgba(5, 217, 232, 0.6) 68%,
    rgba(5, 217, 232, 0.18) 100%
  );
  box-shadow:
    0 0 2.4rem var(--cursor-glow),
    inset 0 0 1.2rem rgba(255, 255, 255, 0.14);
}

.gooey-cursor__blob--core {
  width: 2.8rem;
  height: 2.8rem;
}

.gooey-cursor__blob--bridge {
  width: 1.3rem;
  height: 1.3rem;
  opacity: 0.95;
}

.gooey-cursor__sheen {
  position: absolute;
  top: 18%;
  left: 22%;
  width: 44%;
  height: 28%;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.88),
    rgba(255, 255, 255, 0)
  );
  filter: blur(0.5px);
  transform: rotate(-20deg);
}

.gooey-cursor__dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: var(--cursor-color);
  box-shadow:
    0 0 0.7rem rgba(5, 217, 232, 0.6),
    0 0 1.4rem rgba(5, 217, 232, 0.24);
}

:global(body.has-gooey-cursor),
:global(body.has-gooey-cursor a),
:global(body.has-gooey-cursor button),
:global(body.has-gooey-cursor .cursor-pointer) {
  cursor: none;
}
</style>
