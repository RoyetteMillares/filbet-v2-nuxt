<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: String
    content?: String
  }>(),
  {
    label: () => "Unlabeled",
    content: () => "No content",
  }
)
</script>
<template>
  <div
    class="inline-block bg-$v-bg-affiliate-box-primary-bg rounded-8px p-12px text-1.4em <sm:text-12px"
  >
    <div>
      <div>{{ props.label }}</div>
      <div class="font-semibold">{{ props.content }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
