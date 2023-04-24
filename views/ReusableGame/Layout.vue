<template>
  <div class="w-full min-h-100vh layout-full">
    <LazyViewsReusableGameBackground :="props" />
    <section
      class="max-w-1440px @sm:px-20px m-auto px-40px @lg:px-30px @md:px-20px <sm:px-18px"
    >
      <LazyViewsHomeAnnouncement />
      <LazyViewsHomeGameSearch />
      <LazyViewsReusableGameFilter :="props" />
      <LazyViewsHomeProfitLeaderboard />
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  groups?: number[]
  title?: string
  isSport?: boolean
  category?: number
}>()
</script>

<style lang="scss" scoped>
.layout-full {
  background: var(--v-layout-resuable-bg);
}
</style>
