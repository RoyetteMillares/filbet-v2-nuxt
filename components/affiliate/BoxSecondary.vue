<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items?: {
      label: String
      content: String
    }[]
  }>(),
  {
    items: () => [
      {
        label: "Label",
        content: "Content",
      },
    ],
  }
)
</script>
<template>
  <div
    class="bg-$v-bg-affiliate-box-secondary-bg flex justify-between rounded-8px p-12px space-x-12px text-1.4em <sm:text-12px items-center"
  >
    <div
      v-for="item in props.items"
      :key="`box-secondary-${item.label}`"
      class="w-full"
    >
      <div>{{ item.label }}</div>
      <div class="font-semibold">{{ item.content }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
