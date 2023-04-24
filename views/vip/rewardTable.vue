<template>
  <section
    class="bg-$v-vip-dashboard rounded-16px p-20px mb-30px <xl:(py-10px)"
  >
    <CommonTab
      class="mb-15px"
      :model-value="modelValue"
      :list="tabList"
      @change="hanleChange"
    />
    <div v-if="!rewardData || rewardData.length === 0">
      <div
        class="flex flex-col items-center justify-center bg-transparent py-30px <xl:(py-20px) <sm:(py-10px)"
      >
        <p
          class="text-$v-vip-text text-14px mb-20px <xl:(mb-15px) <md:(mb-10px text-center)"
        >
          The current level has no gifts to receive.
        </p>
        <CommonButton
          class="w-230px !rounded-8px <xl:(w-210px h-40px) <md:(w-200px h-30px text-12px)"
          @click="router.push({ name: 'Vip' })"
        >
          More VIP Privileges
        </CommonButton>
      </div>
    </div>
    <div v-else class="card-area flex items-center flex-wrap">
      <LazyVipGiftCard
        v-for="(reward, idx) in rewardData"
        :key="`reward-${idx}`"
        :gift-data="reward"
        class="mb-20px <xl:(mb-15px) <sm:(mb-10px)"
        @receive="handleReceiveClick"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { dayjs } from "element-plus"
import { useVipStore } from "~/stores/vip"
import { useDictionary } from "~/composables/dictionary"
import Http from "~/request/server"

const router = useRouter()
const { getDirection } = useDictionary()
const VipStore = useVipStore()
const modelValue = ref(0)
const tabList = [
  { label: "VIP Cash Collection", value: 0 },
  { label: "Cash Receipt Records", value: 1 },
]

const getData = async () => {
  await VipStore.GET_User_Leve_Reward({ receiveCategory: modelValue.value })
}
await getData()

const handleReceiveClick = async (__id: string) => {
  await Http.post("receive", { id: Number(__id) })
  getData()
}
const hanleChange = (item: { label: string; value: number }) => {
  modelValue.value = item.value
  getData()
}
const rewardData = computed(() => {
  return VipStore.userLeveReward?.map((item) => {
    const benefitText = getDirection("dict_user_vip_rewards_type").find(
      (type: { code: string; title: string }) =>
        type.code === item.category.toString()
    ).title

    return {
      id: item.id,
      date: dayjs(item.receiveAt * 1000).format("YYYY-MM-DD HH:mm:ss"),
      img: "images-vip-gift",
      benefitTyeText: benefitText,
      benefitTyeTitle: "Benefit Type",
      amount: item.coin,
      amountLabel: "Cash Amount",
      status: item.status,
    }
  })
})
</script>
<style lang="scss">
.card-area {
  > div {
    width: 24%;
    &:not(:nth-child(4n)) {
      margin-right: calc(4% / 3);
    }
  }
}
@media (max-width: 1400px) {
  .card-area {
    > div {
      width: 32%;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:not(:nth-child(3n)) {
        margin-right: 2%;
      }
    }
  }
}
@media (max-width: 1200px) {
  .card-area {
    > div {
      width: 48%;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:not(:nth-child(2n)) {
        margin-right: 2%;
      }
    }
  }
}
@media (max-width: 640px) {
  .card-area {
    > div {
      width: 100%;
      &:nth-child(n) {
        margin-right: 0;
      }
    }
  }
}
</style>
