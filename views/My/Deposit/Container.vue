<template>
  <ViewsMyWalletContainer
    class="mt-16px <sm:(mt-12px) @sm:mt-13px @md:mt-14px @lg:mt-15px"
  >
    <p
      class="deposit-title text-26px mb-32px font-600 <sm:(text-12px mb-12px) @sm:(text-15px mb-16px) @md:(text-19px mb-20px) @lg:(text-22px mb-23px)"
    >
      {{ title }}
    </p>
    <section
      class="p-32px rounded-16px <sm:(p-12px rounded-12px) @sm:(p-16px rounded-13px) @md:(p-19px rounded-14px) <lg:grid-cols-2 @lg:(p-23px rounded-14px ) @xl:(p-27px rounded-15px ) deposit-container"
    >
      <slot />
    </section>
  </ViewsMyWalletContainer>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.deposit-container {
  background: #13212d;
}
</style>
