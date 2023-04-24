<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text() {
      return "No data."
    },
  }
)
</script>

<template>
  <div
    class="common-no-data inline-flex flex-col items-center justify-center space-y-1.2em p-1em"
  >
    <CommonAsset name="icons-no-data" class="min-w-5em" />
    <strong class="text-1.2em font-normal">{{ props.text }}</strong>
  </div>
</template>
<style lang="scss" scoped>
.common-no-data {
  color: #b3bad1;
  @apply text-16px <sm:(text-10px) <md:(text-12px) <lg:(text-14px);
}
</style>
