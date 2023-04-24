<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    containerClass?: string
    progressClass?: string
    percentage?: number
  }>(),
  {
    containerClass() {
      return "progress-container w-full max-w-[480px] mx-5 rounded-md h-[9px] <xl:(mx-0)"
    },
    progressClass() {
      return "progress rounded-md"
    },
    percentage: () => 0,
  }
)
</script>

<template>
  <div :class="props.containerClass">
    <div
      :class="props.progressClass"
      :style="{ width: `${props.percentage}%` }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.progress-container {
  background: #263642;
  .progress {
    height: 100%;
    background: linear-gradient(90deg, #8ab6ff 0%, #357bef 100%);
  }
}
.progress-container-mobile {
  background: #354559;
  .progress {
    height: 100%;
    background: linear-gradient(90deg, #8ab6ff 0%, #357bef 100%);
  }
}
</style>
