<template>
  <li
    class="h-220px game-item cursor-pointer relative rounded-16px game-list <sm:(h-140px) @sm:(h-160px) @md:(h-200px)"
  ></li>
</template>

<script>
export default {
  name: "Skeleton",
}
</script>

<style lang="scss" scoped>
.game-item {
  background: linear-gradient(
    90deg,
    var(--v-skeleton-color) 25%,
    var(--v-skeleton-color) 37%,
    #666 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}
@keyframes skeleton-loading {
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0 50%;
  }
}
</style>
