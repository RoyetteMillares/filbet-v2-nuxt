<template>
  <!--  <client-only>-->
  <!--  <el-carousel class="w-full">-->
  <!--    <el-carousel-item-->
  <!--      class="h-375px"-->
  <!--      v-for="item in bannerList"-->
  <!--      :key="item?.img"-->
  <!--    >-->
  <!--      <img class="banner-img" :src="item?.img" alt="" />-->
  <!--    </el-carousel-item>-->
  <!--  </el-carousel>-->
  <!--  </client-only>-->

  <ElCarousel
    indicator-position="none"
    class="w-full h-375px <sm:h-130px @sm:h-190px @md:h-230px @lg:h-290px @xl:h-330px"
  >
    <ElCarouselItem
      v-for="item in HomeStore.bannerList"
      :key="item?.img"
      class="h-375px <sm:h-130px @sm:h-170px @md:h-230px @lg:h-290px @xl:h-330px"
    >
      <img
        class="h-375px <sm:h-130px @sm:h-170px @md:h-230px @lg:h-290px @xl:h-330px banner-img"
        :src="item?.img"
        alt=""
      />
    </ElCarouselItem>
  </ElCarousel>
</template>

<script lang="ts" setup>
import { ElCarousel, ElCarouselItem } from "element-plus"
import { useHomeStore } from "~/stores/home"
const HomeStore = useHomeStore()
await HomeStore.GET_BANNER({ sign: "" })
</script>

<style lang="scss" scoped>
.banner-img {
  //height: 100%;
  width: 100%;
}
:deep(.el-carousel__container) {
  height: 100%;
}
</style>
