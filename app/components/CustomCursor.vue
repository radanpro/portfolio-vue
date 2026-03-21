<script setup lang="ts">
const { cursorRef, followerRef } = useGooeyCursor()
</script>

<template>
  <div class="fixed top-0 left-0 pointer-events-none z-9999">
    <div
      ref="cursorRef"
      class="w-1.5 h-1.5 bg-accent-2 rounded-full fixed -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      ref="followerRef"
      class="w-10 h-10 border border-accent-2/30 rounded-full fixed -translate-x-1/2 -translate-y-1/2"
    ></div>
  </div>
</template>
<style scoped>
:global(body) {
  cursor: none;
}
:global(a, button, .cursor-pointer) {
  cursor: none;
}
</style>
