<template>
  <ViewsMyDepositContainer title="Choose a Deposit Method">
    <ul
      class="grid grid-cols-3 gap-20px <sm:( gap-8px grid-cols-1) @sm:( gap-10px) @md:( gap-12px) <lg:grid-cols-2 @lg:( gap-14px) @xl:( gap-16px)"
    >
      <li
        @click="openDialog(item)"
        :style="{ 'animation-delay': `${index * 0.2}s` }"
        class="item-list animated fadeIn cursor-pointer p-40px rounded-12px <sm:(rounded-8px p-12px) @sm:(p-13px) @md:(p-16px) @lg:(p-18px) @xl:(p-20px) flex items-center"
        v-for="(item, index) in depositList"
      >
        <img
          class="w-67px max-h-67px mr-30px <sm:w-40px @sm:(w-45px max-h-45px) @md:(w-50px max-h-50px) @lg:(w-55px max-h-55px)"
          :src="item.logoUrl"
          alt=""
        />
        <section class="deposit-info">
          <p
            class="<sm:(text-16px) font-600 text-23px @sm:(text-18px) @md:(text-20px) @lg:(text-22px)"
          >
            {{ item.channelAppShowName }}
          </p>
          <div class="text-12px mt-4px">
            Deposit Limit: ₱ {{ item.minCoin }} - ₱ {{ item.maxCoin }}
          </div>
          <p class="mt-4px text-12px">The exchange rate is 1:{{ item.rate }}</p>
        </section>
      </li>
    </ul>
    <ViewsMyDepositConfirm
      :openAddress="openAddress"
      :itemInfo="itemInfo"
      v-model="modelValue"
    />
  </ViewsMyDepositContainer>
</template>

<script setup lang="ts">
import { useWallet } from "~/stores/wallet"
import { Ref } from "vue"
import { useUserStore } from "~/stores/user"
import { dialogConfirm } from "~/components/custom-dialog/custom"

const { t } = useLang()
const wallet = useWallet()
const user = useUserStore()
const itemInfo = shallowRef<DepositListType>()
const depositList = computed(() => wallet.depositList || []) as Ref<
  DepositListType[]
>
const modelValue = shallowRef<boolean>(false)

const openAddress = async (coin: number | string) => {
  const params = {
    uid: user?.info?.id,
    code: itemInfo.value?.code,
    coin,
  }
  try {
    const { code, data }: any = await wallet.GET_DEPOSIT_ADDRESS(params)
    if (code === 0 && data.depositAddress) jump(data.depositAddress)
    return Promise.resolve(code)
  } catch (e) {
    return Promise.reject()
  }
}
const jump = (address: string) => {
  const newWindow: unknown | any = window.open()
  newWindow.location.href = address
}
const openDialog = async (item: DepositListType) => {
  const { code, data }: any = await user.CHECK_DEPOSIT({ code: item.code })

  if (code === 0) {
    if (data?.address) {
      dialogConfirm(t("additional.unFinished"), t("public.Reminder"), {
        showCancelButton: true,
        cancelText: t("additional.resend"),
        confirmText: t("additional.continuePay"),
      })
        .then(() => {
          jump(data?.address)
        })
        .catch(() => {
          modelValue.value = true
          itemInfo.value = item
        })
    } else {
      modelValue.value = true
      itemInfo.value = item
    }
  }
}
onMounted(() => {
  wallet.GET_DEPOSIT_CHANNEL()
})
</script>

<style lang="scss" scoped>
@mixin active {
  background: linear-gradient(
    180deg,
    #1999ee -9.78%,
    #115bca 26.02%,
    #0b3aa8 111.96%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.deposit-title {
  color: #b3bad1;
}
.deposit-container {
  background: #13212d;
  .item-list {
    transition: all 0.3s;
    background: linear-gradient(180deg, #324353 0%, #233546 100%);
    box-shadow: 0px 2.65714px 6.64286px rgba(8, 20, 30, 0.3);
    color: #fff;
    &:hover {
      @include active;
    }
  }
}
</style>
