<template>
  <div
    class="statistics-container mt-24px rounded-20px p-16px <sm:(p-8px rounded-12px mt-12px) <md:(p-10px rounded-14px mt-13px) <lg:(p-12px rounded-18px mt-15px)"
  >
    <div
      class="inner-container grid grid-cols-3 p-40px rounded-16px @md:(p-20px rounded-14px) @lg:(p-24px rounded-20px) @sm:(p-16px rounded-8px) <sm:(p-16px text-14px rounded-8px grid-cols-2 gap-12px)"
    >
      <div
        class="col-span-1 text-center flex items-center justify-center <sm:(col-span-2 ) items-center text-32px font-600 <sm:(text-14px) @sm:(text-16px) @md:(text-18px) @lg:(text-24px) @xl:(text-29px)"
      >
        Total Statistics
      </div>
      <div class="col-span-1 text-center">
        <p
          class="<sm:(text-20px) @sm:(text-25px) @md:text-30px @lg:text-35px @xl:text-40px font-500 text-48px"
        >
          {{ formatCoin(statisticsInfo.stakeSum) }}
        </p>
        <p>Bet Amount</p>
      </div>
      <div class="col-span-1 text-center">
        <p
          class="<sm:(text-20px) @sm:(text-25px) @md:text-30px @lg:text-35px @xl:text-40px font-500 text-48px"
        >
          {{ formatCoin(statisticsInfo.payOutSum) }}
        </p>
        <p
          class="<sm:(text-12px mt-2px) @sm:(text-14px mt-3px) @md:(text-16px mt-4px) @lg:(text-18px mt-5px) text-20px font-500 mt-8px"
        >
          Incentives
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCoin } from "~/utils/amount-format"

defineProps<{
  statisticsInfo: StatisticsInfoType
}>()
</script>

<style lang="scss" scoped>
.statistics-container {
  background: linear-gradient(180deg, #324353 0%, #233546 100%);
  box-shadow: 0px 2px 5px rgba(8, 20, 30, 0.3);
  color: #fff;
  .inner-container {
    background: #263642;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  }
}
</style>
