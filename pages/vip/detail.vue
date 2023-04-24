<template>
  <Template_Root>
    <p
      class="text-$v-vip-text text-32px mt-40px cursor-pointer <xl:(text-24px mt-30px) <sm:(text-16px mt-20px)"
      @click="router.push({ name: 'VipCenter' })"
    >
      &lt; VIP Level
    </p>
    <LazyViewsVipLevelCarousel />
    <LazyViewsVipLevelDetial />
    <LazyViewsVipActivityRules />
  </Template_Root>
</template>

<script setup lang="ts">
definePageMeta(RouteRecord.VipDetail)
const router = useRouter()
</script>

<style lang="scss"></style>
