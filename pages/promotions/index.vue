<template>
  <section class="w-full promo-bg min-h-100vh">
    <div
      class="promotions-bg h-400px <sm:(h-133px ) @sm:(h-220px ) @md:(h-250px) @lg:(h-300px ) @xl:(h-350px)"
    >
      <CommonContainer
        class="pt-120px <sm:(pt-36px pl-32px) @sm:(pl-32px pt-50px) @md:(pt-60px pl-30px) @2xl:(pl-0) pl-50px @lg:(pt-80px pl-50px)"
      >
        <p
          class="<sm:(text-16px mb-8px) @sm:(text-20px mb-14px) @md:(text-24px mb-20px) @lg:(text-30px mb-30px) mb-40px text-44px font-700"
        >
          Promotions
        </p>
        <p class="max-w-550px text-24px font-500 <sm:(text-14px) @sm:()">
          Non-stop activity prizes, Non-stop cash collection
        </p>
      </CommonContainer>
    </div>
    <CommonContainer
      class="<sm:(px-16px py-20px) @sm:(px-20px) @md:(px-24px) @lg:(px-26px) @xl:(px-30px) py-32px"
    >
      <ul
        class="grid grid-cols-2 gap-32px @sm:(gap-16px) @md:(gap-16px) <sm:(grid-cols-1 gap-16px)"
      >
        <li
          v-for="(item, i) in promotionList"
          :key="`li-${item.id}`"
          class="overflow-hidden <sm:(rounded-6px) rounded-12+px cursor-pointer animated zoomIn"
          :style="{ 'animation-delay': `${i * 0.2}s` }"
          @click="checkInfo(item)"
        >
          <div
            class="max-h-256px <sm:(h-150px) @sm:(h-150px) @md:(h-160px) @lg:(h-178px) @xl:(h-256px) h-256px"
          >
            <img :src="item.img" class="w-full h-full" alt="" />
          </div>
          <div
            class="promotions-display <sm:(py-12px px-16px block text-12px) @md:(py-12px px-16px block text-12px) @sm:(py-12px px-16px block text-12px) flex items-center justify-between py-18px px-32px"
          >
            <p class="font-600 <sm:(text-13px mb-4px)">
              {{ item.codeZh || "-" }}
            </p>
            <p class="font-400 text-12px">
              {{ t("bet.betrecord.Time") }}:
              {{ dateTime(item.startedAt) }}
              -
              {{ dateTime(item.endedAt) }}
            </p>
          </div>
        </li>
      </ul>
    </CommonContainer>
  </section>
</template>

<script setup lang="ts">
import HttpInstance from "~/request/server"
import { useLang } from "~/composables/useLang"
const { t } = useLang()
const router = useRouter()
definePageMeta({
  ...RouteRecord.Promotions,
  // middleware: ["auth"],
})
const promotionList = shallowRef<Promo[]>([])
const getPromotionList = async () => {
  try {
    const { code, data } = await HttpInstance.post("getPromotionList")
    if (code === 0) promotionList.value = data
  } catch (e) {}
}
getPromotionList()

const checkInfo = (item: Promo) => {
  router.push({ name: "PromotionInfo", params: { id: item.id } })
}
</script>

<style lang="scss" scoped>
.promo-bg {
  background: var(--v-promotion-bg-color);
}
.promotions-bg {
  background: url(../../assets/images/common/promotions-bg.jpg) no-repeat center
    center;
  background-size: 100% 100%;
  color: var(--v-promotions-text-color);
}
.promotions-display {
  color: var(--v-promotions-text-color);
  background: var(--v-promotions-text-bg);
}
</style>
