<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: String
  }>(),
  {
    title: () => "Untitled",
  }
)
</script>
<template>
  <div
    class="card-primary bg-$v-default-bg text-10px inline-flex flex-col p-3.2em <sm:text-3.75px <md:p-3.2em rounded-12px max-w-full space-y-12px"
  >
    <div class="card-primary-title flex items-center justify-between flex-wrap">
      <h3 class="font-bold text-2em <sm:text-12px w-1/2">
        {{ props.title }}
      </h3>
      <slot name="title" />
    </div>
    <div class="content flex-1 flex flex-col">
      <slot name="content" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
