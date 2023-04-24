<template>
  <div
    class="p-32px rounded-12px <sm:(p-12px) @sm:(p-16px) @md:(p-20px) <md:w-full @lg:(p-24px) wallet-container"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Container",
}
</script>

<style lang="scss" scoped>
.wallet-container {
  background: var(--v-my-wallet-container-bg);
  color: var(--v-my-wallet-container-color);
}
</style>
