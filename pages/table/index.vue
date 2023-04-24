<template>
  <LazyViewsReusableGameLayout title="Table Games" :groups="[11]" />
</template>

<script setup lang="ts">
// ReusableGame
definePageMeta({
  ...RouteRecord.Table,
})
</script>

<style scoped></style>
