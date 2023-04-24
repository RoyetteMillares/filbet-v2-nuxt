<template>
  <div class="layouts-default-full h-full w-full flex bg-$v-bg-page-bg-primary">
    <LazyLayoutsNavBar />
    <LayoutsSection>
      <LayoutsHeader />
      <section class="w-full bg-full min-h-100vh overflow-x-hidden">
        <slot />
      </section>
      <LayoutsFooter />
    </LayoutsSection>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped></style>
