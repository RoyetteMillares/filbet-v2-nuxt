<template>
  <img :src="src" :alt="props.name" />
</template>

<script setup lang="ts">
const props = defineProps<{
  name?: AssetKey
}>()

const assets = await assetPromises()
const defaultName = "icons-401"
const src = computed(() => {
  return assets[props.name ?? defaultName] ?? assets[defaultName]
})
</script>

<style lang="scss" scoped></style>
