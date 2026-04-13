<script setup lang="ts">
const sceneRef = ref<HTMLElement | null>(null)

const tunnelContent = {
  left: ["FRONTEND", "MASTER"],
  right: ["BACKEND FRONTEND", "EXPERT FRONTEND"],
  top: ["MODERN FRONTEND", "DESIGN FRONTEND"],
  bottom: ["CLEAN FRONTEND", "CODE FRONTEND"],
  back: ["SHEHAB FRONTEND", "RADAN FRONTEND"],
}

use3DTunnel(sceneRef)
</script>

<template>
  <section class="tunnel-container">
    <div class="viewport">
      <div class="box-wrapper">
        <div ref="sceneRef" class="scene">
          <div class="wall wall-left">
            <p v-for="text in tunnelContent.left" :key="text">{{ text }}</p>
          </div>

          <div class="wall wall-right">
            <p v-for="text in tunnelContent.right" :key="text">{{ text }}</p>
          </div>

          <div class="wall wall-top">
            <p v-for="text in tunnelContent.top" :key="text">{{ text }}</p>
          </div>

          <div class="wall wall-bottom">
            <p v-for="text in tunnelContent.bottom" :key="text">{{ text }}</p>
          </div>

          <div class="wall wall-back">
            <h1>{{ tunnelContent.back[0] }}</h1>
            <p>{{ tunnelContent.back[1] }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tunnel-container {
  position: relative;
  width: 100vw;
  height: 300vh;
  background: #020202;
}

.viewport {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1200px;
}

.box-wrapper {
  position: relative;
  width: 600px;
  height: 400px;
  transform-style: preserve-3d;
}

.scene {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  will-change: transform;
}

.wall {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  border: 1px solid rgba(120, 105, 255, 0.1);
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
}

.wall p,
.wall h1 {
  font-family: sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  color: #7869ff;
  margin: 0;
  line-height: 0.85;
  white-space: nowrap;
  text-shadow: 0 0 15px rgba(120, 105, 255, 0.5);
  width: 99%;
  text-align: center;
  /* display: block; */
  transform: scaleX(1.2) scaleY(3);
  /* letter-spacing: -0.05em; */
}

.wall-left {
  font-size: 5rem;
  transform: translateX(-300px) rotateY(90deg);
}

.wall-right {
  font-size: 5rem;
  transform: translateX(300px) rotateY(-90deg);
}

.wall-top {
  font-size: 4rem;
  transform: translateY(-200px) rotateX(-90deg);
}

.wall-bottom {
  font-size: 4rem;
  transform: translateY(200px) rotateX(90deg);
}

.wall-back {
  font-size: 3rem;
  transform: translateZ(-1500px);
}

@media (max-width: 768px) {
  .box-wrapper {
    width: 90vw;
    height: 30vh;
  }
  .wall-left {
    transform: translateX(-45vw) rotateY(90deg);
    font-size: 3rem;
  }
  .wall-right {
    transform: translateX(45vw) rotateY(-90deg);
    font-size: 3rem;
  }
  .wall-top {
    transform: translateY(-15vh) rotateX(-90deg);
    font-size: 2.5rem;
  }
  .wall-bottom {
    transform: translateY(15vh) rotateX(90deg);
    font-size: 2.5rem;
  }
}
</style>
