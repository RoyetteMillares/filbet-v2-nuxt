<!-- eslint-disable vue/no-v-html -->
<template>
  <span
    v-if="icon"
    class="h-[1em] w-[1em] custom-icon flex justify-center items-center"
    v-html="icon"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  name?: string
}>()

const icons = iconsPromises()
const icon = props.name && (await icons?.[props.name]?.())
</script>
<style lang="scss">
.custom-icon {
  svg {
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
    width: 1em;
    height: 1em;
    transition: none;
  }
}
</style>
