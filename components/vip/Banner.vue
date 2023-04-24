<script setup lang="ts"></script>

<template>
  <div
    class="vip-bg h-500px <sm:(h-150px ) @sm:(h-220px ) @md:(h-260px) @lg:(h-300px ) @xl:(h-350px)"
  >
    <CommonContainer
      class="pt-120px <sm:(pt-36px pl-32px) @sm:(pl-32px pt-50px) @md:(pt-60px pl-30px) @2xl:(pl-0) pl-50px @lg:(pt-80px pl-50px)"
    >
      <p
        class="<sm:(text-16px mb-8px) @sm:(text-20px mb-14px) @md:(text-24px mb-20px) @lg:(text-30px mb-30px) mb-40px text-44px font-700"
      >
        Welcome to the Club!
      </p>
      <p class="max-w-550px text-24px font-500 <sm:(text-14px) @sm:()">
        Exclusive Membership for Crypto Players! Whether you are on a hot streak
        or grinding hard, becoming a member of our FILBET Club will open the
        door to dazzling rewards and prizes.
      </p>
    </CommonContainer>
  </div>
</template>

<style lang="scss" scoped>
.vip-bg {
  background: url(../../assets/images/vip/vip-banner-default.png) no-repeat
    center center;
  background-size: 100% 100%;
  color: var(--v-promotions-text-color);
}
</style>
