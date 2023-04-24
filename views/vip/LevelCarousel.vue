<template>
  <section
    class="cloud-bg w-full max-w-1440px mx-auto pt-40px mb-30px <lg:(mb-20px) <sm:(mb-10px)"
  >
    <div class="relative w-[90%] mx-auto <2xl:(w-750px) <xl:(w-full)">
      <el-carousel
        ref="cardCarousel"
        :interval="4000"
        type="card"
        :loop="false"
        :autoplay="false"
        arrow="never"
      >
        <el-carousel-item
          v-for="item in cardList"
          :key="`card-level${item.level}`"
        >
          <div class="flex justify-center">
            <VipCard :level="item.level" :info="item.info" />
          </div>
        </el-carousel-item>
      </el-carousel>
      <div
        class="arrow-transform absolute top-[50%] left-[-65px] z-1 flex items-center justify-center cursor-pointer bg-$v-vip-indicators-bg w-45px h-45px rounded-1/2 <2xl:(w-40px h-40px) <xl:(top-0 left-0) <sm:(w-24px h-24px)"
        @click="arrowClick('prev')"
      >
        <CommonAsset name="images-vip-arrow-left" class="w-[60%]" />
      </div>
      <div
        class="arrow-transform absolute top-[50%] right-[-65px] z-1 flex items-center justify-center cursor-pointer bg-$v-vip-indicators-bg w-45px h-45px rounded-1/2 <2xl:(w-40px h-40px) <xl:(top-0 right-0) <sm:(w-24px h-24px)"
        @click="arrowClick('next')"
      >
        <CommonAsset name="images-vip-arrow-right" class="w-[60%]" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useVipStore } from "~/stores/vip"
const VipStore = useVipStore()
const activeValue = ref(0)
const cardCarousel = ref()
await VipStore.GET_User_Level_Details()

const cardList = computed(() => {
  return VipStore.userLevelDetails?.userLevelInfoList.map((item) => {
    return {
      level: item.name.replace("VIP", ""),
      info: [
        {
          label: "Deposit Requirements",
          amount: item.scoreRelegation,
        },
        {
          label: "Relegation Turnover",
          amount: item.relegationDay,
        },
      ],
    }
  })
})

const arrowClick = (val: string) => {
  if (val === "next") cardCarousel.value.next()
  else cardCarousel.value.prev()
}
</script>
<style lang="scss">
.cloud-bg {
  background-image: url("~/assets/images/vip/cloud-bg.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.arrow-transform {
  transform: translateY(-50%);
}
.el-carousel__container {
  height: 300px;
}
.el-carousel__item {
  background-color: none;

  &:hover {
    background-color: none !important;
  }
}
.el-carousel__container {
  margin-bottom: 5px;
}
.el-carousel__mask {
  display: none;
}
.el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.el-carousel__indicators--outside button {
  background: var(--v-vip-indicators-bg);
  opacity: 1;
}
.el-carousel__indicator.is-active button {
  background: linear-gradient(180deg, #eeedc2 0%, #ccb175 100%);
}

@media (max-width: 1536px) {
  .el-carousel__container {
    height: 260px;
  }
}
@media (max-width: 1024px) {
  .el-carousel__container {
    height: 230px;
  }
}
@media (max-width: 640px) {
  .el-carousel__container {
    height: 170px;
  }
}
</style>
