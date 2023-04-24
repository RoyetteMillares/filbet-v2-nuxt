<script setup lang="ts">
import { useVipStore } from "~/stores/vip"
const VipStore = useVipStore()
const levelNumber = computed(() =>
  Number(VipStore.userLevelInfo?.code.replace("VIP", ""))
)
const levelPercentage = computed(() => {
  return (
    ((Number(VipStore.userLevelInfo?.betPercentage) ?? 0) +
      (Number(VipStore.userLevelInfo?.depositPercentage) ?? 0)) /
    2
  )
})

const range = ref(
  Array(10)
    .fill(0)
    .map((_, index) => index)
)
</script>

<template>
  <div
    class="space-x-3px mt-40px rounded-[12px] relative flex mb-[30px] w-full h-[14px] justify-evenly <sm:(mt-55px) <sm:(hidden)"
  >
    <VipLevelBar
      v-for="(circle, index) in range"
      :key="`VipLevelBar-${index}`"
      :current-level="levelNumber"
      :self-index="index"
      class=""
    />
  </div>
  <div class="hidden <sm:(block)">
    <VipLevelBarMobile :level="levelNumber" :percentage="levelPercentage" />
  </div>
</template>
