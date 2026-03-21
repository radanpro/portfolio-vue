<script setup lang="ts">
const triggerRef = ref<HTMLElement | null>(null)

const props = defineProps({
  strength: {
    type: Number,
    default: 0.25,
  },
})
useMagnetic(triggerRef, props.strength)
</script>

<template>
  <div
    ref="triggerRef"
    class="inline-block transition-transform duration-200 ease-out cursor-pointer"
  >
    <slot />
  </div>
</template>
