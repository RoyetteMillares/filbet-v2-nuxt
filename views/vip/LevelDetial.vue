<template>
  <section
    class="w-full max-w-1440px mx-auto mb-60px <xl:(mb-50px) <md:(mb-30px)"
  >
    <div
      class="flex items-center justify-between mb-30px <xl:(mb-20px) <md:(mb-14px) <sm:(mb-8px)"
    >
      <h2
        class="text-$v-vip-text text-32px font-medium <xl:(text-24px) <sm:(text-16px)"
      >
        VIP Benefits
      </h2>
      <CommonButton
        v-if="!isLogin"
        class="w-200px px-3px py-10px !rounded-[8px] font-medium text-16px <xl:(w-150px text-14px py-8px) <md:(hidden)"
        @click="useUserStore().MODIFY_TYPE('signIn')"
      >
        Join Now
      </CommonButton>
    </div>
    <div
      class="flex items-center overflow-x-auto mb-20px <xl:(mb-15px) <lg:(mb-0)"
    >
      <CommonButton
        v-for="(item, idx) in VipStore.userLevelBenefits ?? []"
        :key="`${item.name}-${idx}`"
        :is-active="item.name === levelActive"
        class="w-110px px-10px py-10px !rounded-[30px] font-semibold text-14px flex-shrink-0 <xl:(w-90px py-8px) <sm:(w-76px text-12px font-medium)"
        :class="{
          'mr-15px <xl:(mr-12px) <sm:(mr-8px)':
            idx !== (VipStore.userLevelBenefits?.length ?? 1) - 1,
        }"
        @click="levelActive = item.name"
      >
        {{ item.name.replace("VIP", "LV") }}
      </CommonButton>
    </div>
    <div
      class="bg-$v-vip-dashboard rounded-16px py-40px px-30px mb-60px <xl:(pt-30px pb-0 mb-40px) <lg:(mb-20px) <sm:(px-20px pt-20px mb-10px)"
    >
      <p
        class="text-$v-vip-title-text text-24px font-semibold text-center mb-40px <lg:(text-20px mb-30px) <sm:(text-16px mb-20px)"
      >
        VIP Level: {{ levelActive }}
      </p>
      <div class="flex items-center justify-between <xl:(flex-wrap)">
        <VipLevelBenefit
          v-for="(info, idx) in userLevelInfoList"
          :key="`benefit-${idx}`"
          :benefit-data="info"
          class="w-120px <xl:(w-[30%] min-w-0 mb-35px) <sm:(mb-20px)"
        />
      </div>
    </div>
    <div
      class="relative bg-$v-vip-dashboard rounded-16px p-24px mb-30px <lg:(mb-20px) <sm:(bg-transparent p-0 mb-10px)"
    >
      <div
        class="mb-30px <sm:(bg-$v-vip-area-bg rounded-16px flex justify-center py-10px px-16px mb-10px)"
      >
        <CommonTab
          :model-value="tabValue"
          :list="list"
          @change="habdleChange"
        />
      </div>
      <div class="<sm:(bg-$v-vip-area-bg rounded-16px p-20px)">
        <p
          class="absolute top-32px right-24px text-$v-vip-title-text text-24px font-semibold <lg:(text-20px mb-30px) <sm:(relative top-auto right-auto text-16px text-center mb-20px)"
        >
          VIP Level: {{ levelActive }}
        </p>
        <div class="flex items-center justify-around <md:(flex-wrap)">
          <template v-if="tabValue === 0">
            <div
              v-for="(item, idx) in ratioData"
              :key="`${item.title}-${item.groupId}`"
              class="<md:(w-[22%])"
              :class="{ '<md:(mb-25px)': idx < 4 }"
            >
              <span
                class="block text-$v-vip-text text-14px font-medium text-center mb-15px"
                >{{
                  item.userLevelRebateList[levelActivenumber].rebateRate
                }}%</span
              >
              <p
                class="text-$v-vip-rules-text text-14px text-center whitespace-nowrap"
              >
                {{ item.title }}
              </p>
            </div>
          </template>
          <template v-if="tabValue === 1">
            <div v-for="item in withdrawalAmountList" :key="`${item.label}`">
              <span
                class="block text-$v-vip-text text-14px font-medium text-center mb-15px"
                >{{ item.amount }}</span
              >
              <p class="text-$v-vip-rules-text text-14px text-center">
                {{ item.label }}
              </p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <p class="text-$v-vip-rules-text text-16px <lg:(text-14px) <sm:(text-12px)">
      Note: Weekly bonus VIP level (subject to the VIP level at 23:59:59 every
      Sunday);
    </p>
  </section>
</template>
<script setup lang="ts">
import { useVipStore } from "~/stores/vip"
import { useDictionary } from "~/composables/dictionary"
import { useUserStore } from "~/stores/user"

type Direction = {
  code: string
  title: string
}
const VipStore = useVipStore()
await VipStore.GET_User_Level_Benefits()
await VipStore.GET_User_Level_Details()
const { getDirection } = useDictionary()
const levelActive = ref("VIP0")
const tabValue = ref(0)
const isLogin = computed(() => useUserStore().isLogin)
const directionData = computed<Direction[]>(() => {
  return getDirection("dic_game_group").sort((a: Direction, b: Direction) => {
    return Number(a.code) > Number(b.code) ? 1 : -1
  })
})

const levelActivenumber = computed(() => {
  return Number(levelActive.value.match(/\d+/g)?.[0] ?? 0)
})

const list = [
  { label: "VIP Rebate Ratio", value: 0 },
  { label: "VIP Withdrawal Amount", value: 1 },
]

const levelActiveData = computed(() => {
  return VipStore.userLevelBenefits?.[levelActivenumber.value]
})
const userLevelInfoList = computed(() => [
  {
    img: "images-vip-cumulative-deposit",
    label: "Cumulative Deposit",
    amount: levelActiveData.value?.depositUpgrade ?? "0.00",
  },
  {
    img: "images-vip-accumulated-turnover",
    label: "Current Accumulated Turnover",
    amount: levelActiveData.value?.scoreRelegation ?? "0.00",
  },
  {
    img: "images-vip-require-turnover",
    label: "Require Turnover",
    amount: levelActiveData.value?.scoreUpgrade ?? "0.00",
  },
  {
    img: "images-vip-withdraw",
    label: "VIP Daily WIthdrawal Times",
    amount: levelActiveData.value?.withdrawalCount ?? 0,
  },
  {
    img: "images-vip-withdraw-limit",
    label: "Daily Withdrawal Limit",
    amount: levelActiveData.value?.withdrawalCoin ?? 0,
  },
  {
    img: "images-vip-promotion-bonus",
    label: "Promotion Bonus",
    amount: levelActiveData.value?.upgradeReward ?? "0.00",
  },
  {
    img: "images-vip-birthday-bonus",
    label: "Birthday Gift",
    amount: levelActiveData.value?.birthdayReward ?? "0.00",
  },
  {
    img: "images-vip-weekly-bonus",
    label: "Weekly Bonus",
    amount: levelActiveData.value?.weekReward ?? "0.00",
  },
  {
    img: "images-vip-monthly-bonus",
    label: "Monthly Bonus",
    amount: levelActiveData.value?.monthReward ?? "0.00",
  },
])
const ratioData = computed(() => {
  return VipStore.userLevelDetails?.userLevelRebateConfigList?.map((config) => {
    const title =
      directionData.value.find((direction) => {
        return Number(direction.code) === config.groupId
      })?.title ?? "-"
    return {
      ...config,
      title,
    }
  })
})

const withdrawalAmountData = computed(() => {
  return VipStore.userLevelDetails?.userLevelWithdrawalInfo[
    levelActivenumber.value
  ]
})
const withdrawalAmountList = computed(() => {
  return [
    {
      amount: withdrawalAmountData.value?.withdrawalCount,
      label: "No. of Daily Withdrawal",
    },
    {
      amount: withdrawalAmountData.value?.withdrawalCoin,
      label: "Daily Withdrawal Limit",
    },
  ]
})

const habdleChange = (item: { label: string; value: number }) => {
  tabValue.value = item.value
}
</script>
