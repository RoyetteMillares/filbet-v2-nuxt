<template>
  <LazyViewsReusableGameLayout title="Chess" :groups="[5]" />
</template>

<script setup lang="ts">
// ReusableGame
definePageMeta({
  ...RouteRecord.Chess,
})
</script>

<style scoped></style>
