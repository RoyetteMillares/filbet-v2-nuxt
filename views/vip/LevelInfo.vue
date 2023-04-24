<template>
  <div
    class="bg-$v-default-bg px-60px py-30px rounded-16px mt-[3rem] <lg:(py-20px px-40px) <sm:(px-20px mt-0)"
  >
    <p class="text-$v-vip-label text-14px mb-16px">
      Distance to the next level: VIP{{ levelNumber + 1 }}
    </p>
    <div class="">
      <div class="flex items-center mb-16px <xl:(flex-col items-start)">
        <p class="text-14px min-w-150px <xl:(mb-10px)">Cumulative Recharge</p>
        <VipLevelSimpleBar
          :percentage="Number(VipStore.userLevelInfo?.depositPercentage ?? 0)"
          class="<xl:(mb-10px)"
        />
        <p class="text-$v-vip-label text-14px min-w-350px <sm:(min-w-0)">
          Need to rechange about ₱
          {{ VipStore.userLevelInfo?.needDeposit ?? "0.00" }}
        </p>
      </div>
      <div class="flex items-center <xl:(flex-col items-start)">
        <p class="text-14px min-w-150px <xl:(mb-10px)">Valid Bet</p>
        <VipLevelSimpleBar
          :percentage="Number(VipStore.userLevelInfo?.betPercentage ?? 0)"
          class="<xl:(mb-10px)"
        />
        <p class="text-$v-vip-label text-14px min-w-350px <sm:(min-w-0)">
          A valid bet of about ₱
          {{ VipStore.userLevelInfo?.needBet ?? "0.00" }} is required
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVipStore } from "~/stores/vip"
const VipStore = useVipStore()
const levelNumber = computed(() =>
  Number(VipStore.userLevelInfo?.code.replace("VIP", ""))
)
</script>

<style scoped lang="scss"></style>
