<script setup lang="ts">
import { useAffiliateStore } from "~~/stores/affilate"

const router = useRouter()
const store = useAffiliateStore()
const levelItemsList = computed(() => {
  type Level = 1 | 2 | 3
  return [
    ["Total Commission", store.teamBenefits?.totalCommission ?? 0],
    ["Numbers of Agents", store.teamBenefits?.totalAgentNum ?? 0],
    ["Added Agents", store.teamBenefits?.todayIncreaseAgentNum ?? 0],
    ["Allow Withdrawal", store.teamBenefits?.allowWithdrawal ?? 0],
  ].map((entry) => {
    const [title, num] = entry
    return [
      {
        label: title,
        content: num,
      },
    ]
  })
})
</script>

<template>
  <AffiliateCardPrimary title="Team Benefits">
    <template #title>
      <div class="text-12px w-1/2 <md:mt-5px <md:w-full">
        The agency commission is settled everyday at GMT 16:00
      </div>
    </template>
    <template #content>
      <div class="grid gap-3.2em grid-cols-2 grid-rows-2 flex-1">
        <AffiliateBoxSecondary
          v-for="items in levelItemsList"
          :key="`AffiliateBoxSecondary-${items[0].label}`"
          class="row-span-1 col-span-1"
          :items="items"
        />
        <CommonButton
          class="col-1"
          @click="router.push({ name: 'Withdraw', query: { type: 0 } })"
          >Withdrawal</CommonButton
        >
        <CommonButton class="col-1 common-button-grey">Transfer</CommonButton>
      </div>
    </template>
  </AffiliateCardPrimary>
</template>

<style lang="scss" scoped></style>
