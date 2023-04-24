<script setup lang="ts"></script>
<template>
  <button class="affiliate-filter-button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import "~/assets/sass/mixins.scss";
.affiliate-filter-button {
  @apply text-14px <sm:(text-10px) h-3em w-6em font-semibold;
  box-sizing: border-box;
  border-radius: 24px;
  box-shadow: none;
  @include background-border(
    linear-gradient(180deg, #324353 0%, #233546 100%),
    linear-gradient(to bottom, #475a6c 0%, #0e1c28 100%),
    2px
  );
  border: transparent 2px solid;
}
</style>
