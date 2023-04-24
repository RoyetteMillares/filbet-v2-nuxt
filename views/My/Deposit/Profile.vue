<template>
  <ViewsMyWalletContainer>
    <div
      class="flex justify-between items-center flex-wrap gap-20px <md:gap-10px"
    >
      <section
        class="user-profile flex items-center <md:(w-full justify-between)"
      >
        <div class="flex items-center">
          <div
            class="<sm:(w-30px) rounded-1/2 w-100px user-avatar @sm:(w-45px) @md:(w-60px) @lg:(w-75px) @xl:w-90px"
          >
            <img
              class="w-full"
              src="../../../assets/images/avatar/default.png"
              alt=""
            />
          </div>

          <div
            class="user-username font-500 text-26px ml-21px @sm:(text-14px ml-10px) @md:(text-16px ml-12px) @lg:(text-20px ml-14px) @xl:(text-22px ml-16px) <sm:(text-12px ml-7px)"
          >
            <span> {{ info?.username }}</span>
            <img
              class="w-102px mt-6px max-h-26px <sm:(w-56px hidden) @sm:(w-66px) @md:(w-76px) @lg:(w-90px)"
              :src="info?.vipLevelCodeIcon"
              alt=""
            />
          </div>
        </div>
        <img
          class="w-102px max-h-26px sm:hidden <sm:(w-56px ) @sm:(w-66px) @md:(w-76px) @lg:(w-90px)"
          :src="info?.vipLevelCodeIcon"
          alt=""
        />
      </section>
      <!--      wallet info-->
      <ul class="grid grid-cols-3 gap-23px <md:(gap-10px w-full)">
        <li
          :style="{ 'animation-delay': `${i * 0.2}s` }"
          class="p-20px animated fadeIn rounded-8px wallet-item <sm:(p-8px) @sm:(p-10px) @md:(p-14px) @lg:(p-16px) @xl:(p-18px)"
          v-for="(item, i) in walletInfo"
          :key="`wallet-info-${i}`"
        >
          <p class="text-12px item-label font-500 <sm:font-100">
            {{ item.title }}
          </p>
          <p
            class="text-20px mt-20px font-500 @sm:(text-14px mt-15px) <md:(min-w-3/10) @md:(text-16px mt-17px min-w-150px) @lg:(text-18px mt-19px) <sm:(text-12px mt-13px) lg:(min-w-200px)"
          >
            {{ item.value }}
          </p>
        </li>
      </ul>
    </div>
  </ViewsMyWalletContainer>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"
import { useWallet } from "~/stores/wallet"

const user = useUserStore()
const info = computed(() => user.info)
const wallet = useWallet()
const walletInfo = computed(() => {
  return [
    { title: "Total Funds", value: wallet?.walletList?.bonus || "0.00" },
    { title: "Bonus", value: wallet?.walletList?.bonus || "0.00" },
    {
      title: "Allow Withdrawal",
      value: wallet?.walletList?.allWithdrawalCoin || "0.00",
    },
  ]
})
</script>

<style lang="scss" scoped>
.user-avatar {
  border: 1px solid #fff;
}
.wallet-item {
  background: #13212d;
  color: #fff;
  .item-label {
    color: #b3bad1;
  }
}
</style>
