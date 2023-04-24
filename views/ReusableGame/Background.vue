<template>
  <div
    class="w-full reusable-bg h-200px <sm:(h-80px) overflow-hidden @sm:(h-120px) @md:(h-140px) @lg:(h-160px)"
    :class="groups.length > 1 ? `category-${category}` : `bg-${groups[0]}`"
  >
    <p
      class="max-w-1440px title-text px-40px @lg:px-30px text-44px font-700 mt-74px @md(:px-20px mt-50px text-30px) @lg(:px-30px mt-60px text-35px) @sm:(px-18px mt-40px text-25px) <sm:(px-18px mt-28px text-20px) m-auto"
    >
      {{ title }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  groups: number[]
  title?: string
  category?: number
}>()
</script>

<style lang="scss" scoped>
.reusable-bg {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  animation: fromBigToSmall 1s forwards;
  .title-text {
    color: var(--v-title-text-color);
    //animation: fromBigToSmall 1s forwards;
    transform-origin: center center;
  }
}
.bg-1 {
  background-image: url(../../assets/images/game/bg-1.jpg);
}
.bg-2 {
  background-image: url(../../assets/images/game/bg-2.jpg);
}
.bg-3 {
  background-image: url(../../assets/images/game/bg-3.jpg);
}
.bg-4 {
  background-image: url(../../assets/images/game/bg-4.jpg);
}
.bg-5 {
  background-image: url(../../assets/images/game/bg-5.jpg);
}
.bg-11 {
  background-image: url(../../assets/images/game/bg-11.jpg);
}
.bg-12 {
  background-image: url(../../assets/images/game/bg-12.jpg);
}
.category-3 {
  background-image: url(../../assets/images/game/category-3.jpg);
}
.category-5 {
  background-image: url(../../assets/images/game/category-3.jpg);
}
@keyframes fromBigToSmall {
  from {
    transform: scale(1.5);
    opacity: 0.7;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
