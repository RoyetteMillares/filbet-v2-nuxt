<template>
  <LazyViewsReusableGameLayout title="Bingo Games" :groups="[12]" />
</template>

<script setup lang="ts">
// ReusableGame
definePageMeta({
  ...RouteRecord.Bingo,
})
</script>

<style scoped></style>
