<template>
  <section class="mb-40px <xl:(mb-30px) <md:(mb-25px) <sm:(mb-12px)">
    <p
      class="text-$v-vip-text text-32px font-medium mb-30px <xl:(text-28px mb-20px) <md:(text-20px mb-15px) <sm:(text-16px mb-10px)"
    >
      {{ VipStore.userLevelInfo?.code ?? "VIP0" }} Benefits
    </p>
    <div
      class="bg-$v-vip-dashboard rounded-16px py-40px px-30px flex items-center justify-around <xl:(flex-wrap pt-30px pb-0) <sm:(px-20px pt-20px)"
    >
      <VipLevelBenefit
        v-for="(info, idx) in userLevelInfoList"
        :key="`benefit-${idx}`"
        :benefit-data="info"
        class="min-w-150px <xl:(w-[30%] min-w-0 mb-35px) <sm:(mb-20px)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useVipStore } from "~/stores/vip"
const VipStore = useVipStore()
await VipStore.GET_Member_Ship_Level_Details()
const userLevelInfoList = reactive([
  {
    img: "images-vip-withdraw",
    label: "Withdrawal per Day",
    amount: VipStore.userLevelInfo?.withdrawalCount ?? 0,
  },
  {
    img: "images-vip-withdraw-limit",
    label: "Daily Withdrawal Limit",
    amount: VipStore.userLevelInfo?.withdrawalCoin ?? 0,
  },
  {
    img: "images-vip-promotion-bonus",
    label: "Promotion Bonus",
    amount: VipStore.userLevelInfo?.upgradeReward ?? "0.00",
  },
  {
    img: "images-vip-birthday-bonus",
    label: "Birthday Gift",
    amount: VipStore.userLevelInfo?.birthdayReward ?? "0.00",
  },
  {
    img: "images-vip-weekly-bonus",
    label: "Weekly Bonus",
    amount: VipStore.userLevelInfo?.weekReward ?? "0.00",
  },
  {
    img: "images-vip-monthly-bonus",
    label: "Monthly Bonus",
    amount: VipStore.userLevelInfo?.monthReward ?? "0.00",
  },
])
</script>
