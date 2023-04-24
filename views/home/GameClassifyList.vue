<template>
  <client-only>
    <ul class="mt-32px <sm:(mt-16px) @sm:(mt-16px) @md:(mt-22px)">
      <li
        v-for="(item, index) in classificationList"
        :key="item.id"
        class="mb-36px <sm:(mb-18px) @sm:(mb-22px) @md:(mb-28px) @lg:(mb-34px)"
      >
        <!--      顶部-->
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img class="w-24px" :src="item.logoUrl" alt="" />
            <p class="text-24px ml-14px font-500 <sm:(text-14px ml-10px)">
              {{ item.className }}
            </p>
          </div>
          <div class="flex">
            <div
              class="direction-item direction-item-left text-18px cursor-pointer <md:(px-5px py-2px) px-10px py-5px border-right-none"
              :class="{ disabled: item.disabledLeft }"
              @click="translateScroll('left', index)"
            >
              <CommonSvgIcon class="svg-icon" name="left-arrow" />
            </div>
            <div
              class="direction-item direction-item-right text-18px cursor-pointer <md:(px-5px py-2px) p-10px py-5px"
              :class="{ disabled: item.disabledRight }"
              @click="translateScroll('right', index)"
            >
              <CommonSvgIcon class="svg-icon" name="right-arrow" />
            </div>
          </div>
        </div>
        <!--      游戏列表-->
        <div
          ref="GameContent"
          class="game-list flex gap-16px <sm:(gap-12px) @sm(gap-13px) @md:(gap-14px) overflow-x-scroll pt-20px"
          @scroll="scrollBy(item, index)"
        >
          <!--        <div></div>-->
          <transition-group enter-active-class="animated fadeIn">
            <ViewsGameItem
              v-for="val in item.gameResDtoList"
              :key="val.id"
              :item="val"
            />
          </transition-group>
        </div>
      </li>
    </ul>
  </client-only>
</template>

<script setup lang="ts">
import { useHomeStore } from "~/stores/home"
import { scroll } from "~/utils/scroll"

const HomeStore = useHomeStore()
const classificationList = computed(() => HomeStore.classificationList ?? [])
const GameContent = ref<HTMLDivElement[]>()
await HomeStore.GET_CLASSIFICATION()
onMounted(async () => {
  setTimeout(() => {
    calcScroll()
  })
})

const scrollBy = (item: any, index: number) => {
  calcScroll()
}
// 移动
const translateScroll = (type: string, index: number) => {
  const width = GameContent.value?.[index]?.clientWidth
  const leftScroll = GameContent.value?.[index]?.scrollLeft
  let distance = 0
  if (GameContent.value![index]) {
    if (type === "right") distance = leftScroll! + width!
    else distance = leftScroll! - width!
    scroll(GameContent.value![index], leftScroll, distance, "scrollLeft", 1200)
  }
}
// 计算
const calcScroll = () => {
  classificationList.value?.forEach((item: any, index: number) => {
    const width = GameContent.value?.[index]?.clientWidth
    const leftScroll = GameContent.value?.[index]?.scrollLeft
    const scrollWidth = GameContent.value?.[index]?.scrollWidth
    // 不足滚动条
    if (scrollWidth! <= width!) {
      item.disabledRight = true
      item.disabledLeft = true
    } else {
      // 居左
      // eslint-disable-next-line no-lonely-if
      if (leftScroll! <= 0) {
        item.disabledLeft = true
        item.disabledRight = false
      } else if (width! + leftScroll! >= scrollWidth!) {
        item.disabledRight = true
        item.disabledLeft = false
      } else {
        item.disabledRight = false
        item.disabledLeft = false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.game-list {
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.direction-item {
  border: 1px solid #576673;
  border-radius: 20px;
  &:hover {
    .svg-icon {
      transform: scale(1.3);
    }
  }
  &-left {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    //opacity: 0.5;
  }
  &-right {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-left: none;
  }
}
.disabled {
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}
</style>
