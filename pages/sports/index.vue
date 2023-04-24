<template>
  <LazyViewsReusableGameLayout title="Sports" is-sport :groups="[1]" />
</template>

<script setup lang="ts">
// ReusableGame
definePageMeta({
  ...RouteRecord.Sports,
})
</script>

<style scoped></style>
