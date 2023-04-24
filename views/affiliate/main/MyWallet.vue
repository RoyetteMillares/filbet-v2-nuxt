<script setup lang="ts">
import { useAffiliateStore } from "~~/stores/affilate"

const router = useRouter()
const store = useAffiliateStore()
const levelItemsList = computed(() => {
  type Level = 1 | 2 | 3
  return ([1, 2, 3] as Level[]).map((lv) => {
    const levelKey = `level${lv}` as `level${1 | 2 | 3}`
    const levelTitle = `Agent Level ${lv}`
    return [
      {
        label: levelTitle,
        content: `${store.subordinateDetails?.[levelKey].nums}`,
      },
      {
        label: "Total Commission",
        content: `${store.subordinateDetails?.[levelKey].commission}`,
      },
      {
        label: "Betting Turnover",
        content: `${store.subordinateDetails?.[levelKey].bettingTurnOver}`,
      },
    ]
  })
})
</script>

<template>
  <AffiliateCardPrimary class="flex flex-col" title="My Wallet">
    <template #title>
      <CommonButton
        class="!px-12px !py-6px !rounded-4px <sm:!text-10px"
        @click.prevent="
          router.push({
            name: 'Affiliate-Rule',
          })
        "
      >
        Commission Rule
      </CommonButton>
    </template>
    <template #content>
      <div class="grid grid-cols-2 gap-3.2em flex-1">
        <AffiliateBoxPrimary
          class="row-span-1 col-span-1"
          label="Total Commission"
          :content="`${store.subordinateDetails?.commission} php`"
        />
        <AffiliateBoxPrimary
          class="row-span-1 col-span-1"
          label="Allow Withdrawal"
          :content="`${store.subordinateDetails?.bettingTurnOver} php`"
        />
        <AffiliateBoxSecondary
          v-for="items in levelItemsList"
          :key="`AffiliateBoxSecondary-${items[0].label}`"
          class="row-span-1 col-span-2"
          :items="items"
        />
      </div>
    </template>
  </AffiliateCardPrimary>
</template>

<style lang="scss" scoped></style>
