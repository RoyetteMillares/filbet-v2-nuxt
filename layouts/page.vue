<template>
  <div class="layouts-default h-full w-full flex">
    <LazyLayoutsNavBar />
    <LayoutsSection>
      <LayoutsHeader />
      <section class="w-full min-h-100vh max-w-1440px px-40px">
        <slot />
      </section>
      <LayoutsFooter />
    </LayoutsSection>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.layouts-default {
  background-color: var(--v-page-layout-bg);
}
</style>
