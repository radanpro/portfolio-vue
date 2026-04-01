<script setup lang="ts">
const { cursorRef, ringRef, isEnabled } = useGooeyCursor()
</script>

<template>
  <div v-show="isEnabled" class="sniper-cursor">
    <div ref="ringRef" class="ring"></div>
    <div ref="cursorRef" class="crosshair">
      <span class="dot"></span>
    </div>
  </div>
</template>

<style scoped>
.sniper-cursor {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}

/* الحلقة */
.ring {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 255, 200, 0.6);
  border-radius: 50%;
}

/* الكروسهير */
.crosshair {
  position: fixed;
  width: 20px;
  height: 20px;
}

.crosshair::before,
.crosshair::after {
  content: "";
  position: absolute;
  background: rgba(0, 255, 200, 0.9);
}

/* خط أفقي */
.crosshair::before {
  width: 20px;
  height: 1px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

/* خط عمودي */
.crosshair::after {
  width: 1px;
  height: 20px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

/* نقطة */
.dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(0, 255, 200, 1);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* إخفاء الكيرسر */
:global(body.has-custom-cursor) {
  cursor: none;
}
</style>
