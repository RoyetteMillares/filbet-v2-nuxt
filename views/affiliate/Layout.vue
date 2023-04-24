<script setup lang="ts">
import { useInitializeData } from "~~/composables/useInitializeData"
await useInitializeData().initAffiliate()
</script>

<template>
  <div class="">
    <AffiliateBanner />
    <slot />
  </div>
</template>

<style lang="scss" scoped></style>
