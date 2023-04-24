<template>
  <ViewsMyWalletContainer>
    <p
      class="text-20px @sm:(text-14px) @md:(text-16px) @lg:(text-18px) <sm:text-12px font-700"
    >
      My Wallet
    </p>
    <ul
      class="grid grid-cols-3 gap-22px mt-32px <sm:(gap-10px mt-10px) <md:(gap-14px mt-14px) <lg:(gap-18px mt-20px)"
    >
      <li
        class="grid-info p-24px rounded-12px <sm:(p-8px rounded-8px) <md:(p-12px) <lg:(p-16px) <xl:(p-12px) <2xl:(p-20px)"
        :key="`item-${i}`"
        v-for="(item, i) in walletInfo"
      >
        <p
          class="font-500 text-16px <md:(text-13px text-14px) <lg:(text-14px) <xl:(text-14px) <sm:(text-12px) info-title"
        >
          {{ item.label }}
        </p>
        <p
          class="text-20px mt-40px <sm:(mt-13px text-12px) <md:(mt-20px text-14px) <lg:(mt-25px text-16px) <xl:(mt-30px text-18px)"
        >
          ₱ {{ formatCoin(item.value) }}
        </p>
      </li>
    </ul>
  </ViewsMyWalletContainer>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"
import { useWallet } from "~/stores/wallet"

const userStore = useUserStore()
const walletStore = useWallet()
const walletList = computed(() => walletStore.walletList)
const walletInfo = computed(() => {
  return [
    {
      label: "Assets",
      value: walletList.value?.reelCoin || "0.00",
    },
    {
      label: "Bonus",
      value: walletList.value?.bonus || "0.00",
    },
    {
      label: "Allow Withdrawal",
      value: walletList.value?.allWithdrawalCoin || "0.00",
    },
  ]
})
</script>

<style lang="scss" scoped>
.grid-info {
  background: var(--v-my-wallet-assets-bg);
  .info-title {
    color: var(--v-my-wallet-assets-label-color);
  }
}
</style>
