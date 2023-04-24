<!-- eslint-disable vue/no-v-html -->
<template>
  <span
    v-if="image"
    class="custom-image flex justify-center items-center"
    :class="props.class"
    v-html="image"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  name?: string
  class?: string
}>()

const images = iconsPromises()
const image = props.name && (await images?.[props.name]?.())
</script>
<style lang="scss"></style>
