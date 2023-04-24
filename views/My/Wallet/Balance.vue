<template>
  <ViewsMyWalletContainer>
    <div class="px-24px py-12px <sm:(p-12px) balance-bg rounded-12px">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img
            class="w-30px h-30px rounded-1/2 mr-5px <md:(w-20px h-20px)"
            src="../../../assets/images/avatar/default.png"
            alt=""
          />
          <span class="text-18px font-600 <sm:(text-12px)">
            {{ info?.username ?? "" }}
          </span>
        </div>
        <img
          class="w-102px mt-6px max-h-26px <sm:(w-56px ) @sm:(w-66px) @md:(w-76px) @lg:(w-90px)"
          :src="info?.vipLevelCodeIcon"
          alt=""
        />
      </div>
      <p class="text-16px font-400 mt-2px <sm:(text-12px)">Current Balance</p>
      <p
        class="mt-4px font-700 text-32px <sm:(text-18px) @sm:(text-20px) @md:(text-24px) @lg:(text-26px)"
      >
        ₱ {{ formatCoin(info?.coin ?? "") }}
      </p>
    </div>
    <div
      class="grid grid-cols-2 gap-16px mt-20px <sm:(gap-12px mt-10px) <md:(gap-13px mt-12px) <lg:(gap-15px mt-14px)"
    >
      <div
        @click="pageTo('Deposit')"
        class="is-button is-deposit rounded-8px flex items-center justify-center font-700 text-16px py-14px <sm:(py-9px text-12px) <md:(py-12px text-13px) <lg:(py-14px text-14px)"
      >
        Deposit
      </div>
      <div
        @click="pageTo('Withdraw')"
        class="is-button is-withdraw rounded-8px flex items-center justify-center font-700 text-16px py-14px <sm:(py-9px text-12px) <md:(py-12px text-13px) <lg:(py-14px text-14px)"
      >
        Withdrawal
      </div>
    </div>
  </ViewsMyWalletContainer>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"

const user = useUserStore()
const info = computed(() => user.info)
const router = useRouter()
const pageTo = (name: RouteName) => {
  router.push({ name })
}
</script>

<style lang="scss" scoped>
.balance-bg {
  background: url(../../../assets/images/bank/bank-bg.png) no-repeat center
    center;
  background-size: 100% 100%;
}
.is-button {
  cursor: pointer;
  box-shadow: 0px 2.52379px 2.52379px rgba(0, 0, 0, 0.25);
  &:hover {
    transform: translateY(-5px);
  }
  &.is-deposit {
    background: linear-gradient(
      180deg,
      #1999ee -9.78%,
      #115bca 26.02%,
      #0b3aa8 111.96%
    );
  }
  &.is-withdraw {
    background: linear-gradient(180deg, #324353 0%, #233546 100%);
  }
}
</style>
