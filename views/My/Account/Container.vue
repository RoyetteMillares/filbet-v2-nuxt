<template>
  <div
    class="p-32px <sm:(p-12px rounded-12px) rounded-16px @sm:p16px @md:p-20px @lg:p-25px account-container"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "Container",
}
</script>

<style lang="scss" scoped>
.account-container {
  background: var(--v-my-account-container);
  color: var(--v-my-account-color);
}
</style>
