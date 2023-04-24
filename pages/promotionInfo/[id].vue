<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="info-bg w-full min-h-100vh <sm:(py-12px px-16px ) @sm:(py-20px px-26px) @md:(py-16px px-22px) @lg:(py-24px px-22px) @xl:(py-29px px-26px) py-38px"
  >
    <CommonContainer
      class="info-bg-container p-40px <sm:(p-16px) @sm:(p-20px) @md:(p-24px) @lg:(p-30px) rounded-12px"
    >
      <p
        class="<sm:(text-14px) @sm:(text-16px) @md:(text-20px) font-700 lg:(text-32px)"
      >
        {{ promotionInfo.codeZh || "-" }}
      </p>
      <p class="font-400 text-12px mt-12px md:(mt-30px text-16px) time-display">
        {{ t("bet.betrecord.Time") }}:
        {{ dateTime(promotionInfo.startedAt) }}
        -
        {{ dateTime(promotionInfo.endedAt) }}
      </p>
      <img
        :src="promotionInfo.img"
        class="w-full <sm:(mt-16px mb-12px) @sm:(mt-20px mb-14px) @md:(mt-24px mb-16px) lg:( mt-40px mb-20px)"
        alt=""
      />
      <p
        class="left-title <text-16px <sm:(text-12px) @sm:(text-14px) @md:(text-15px)"
      >
        Details
      </p>
      <div class="mt-25px lh-15px" v-html="promotionInfo.descript"></div>
      <CommonButton
        class="w-full max-w-300px m-auto mt-60px <md:(mt-40px)"
        @click="applyPromotes"
      >
        Submit
      </CommonButton>
    </CommonContainer>
  </div>
</template>

<script setup lang="ts">
import HttpInstance from "~/request/server"
const route = useRoute()
const { t } = useLang()
definePageMeta({
  ...RouteRecord.PromotionInfo,
  // middleware: ["auth"],
})
const promotionInfo = shallowRef<any>({})
const getPromotionList = async () => {
  const { id } = route.params
  try {
    const { code, data } = await HttpInstance.post("getPromotionList", { id })
    if (code === 0) promotionInfo.value = data?.[0] ?? {}
  } catch (e) {}
}
getPromotionList()
// 参加活动
const applyPromotes = () => {}
</script>

<style lang="scss" scoped>
.info-bg {
  background: var(--v-promotion-bg-color);
  color: var(--v-promotions-text-color);
  &-container {
    background: var(--v-promotions-info-container-bg);
  }
  .time-display {
    color: var(--v-promotions-time-color);
  }
}
.left-title {
  background: linear-gradient(
    90deg,
    #3874d9 17.49%,
    rgba(56, 116, 217, 0) 96.91%
  );
  position: relative;
  padding: 5px 14px;
  box-sizing: border-box;
  color: #fff;
  font-weight: bold;
  margin-left: 4px;
  //@apply <sm:(pl-20px) @md:(pl-40px) lg:(pl-100px);
  &:before {
    content: "";
    position: absolute;
    width: 4px;
    background: #3874d9;
    height: 100%;
    left: -8px;
    top: 0;
  }
}
</style>
