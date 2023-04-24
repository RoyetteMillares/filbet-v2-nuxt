<template>
  <section
    class="mt-12px rounded-40px items-center <sm:(h-32px) @sm:(h-34px) @md:(h-36px) @lg:(h-38px) p-4px home-announcement h-40px flex"
  >
    <span
      class="flex items-center text-16px py-7px <sm:(px-10px text-12px py-5px) px-19px rounded-20px announcement-icon"
    >
      <CommonSvgIcon name="announcement" />
    </span>
    <div class="flex-1 ml-8px <sm:(ml-5px) relative h-full overflow-hidden">
      <ul
        class="absolute text-14px font-700 left-0 top-0 h-full overflow-hidden flex items-center"
      >
        <section
          ref="sectionRef"
          class="cursor-pointer duration-0 w-full flex items-center"
          @mouseleave="onMouseLeave"
          @mouseenter="onMouseEnter"
        >
          <li
            v-for="(item, index) in noticeList"
            :key="index"
            class="announcement-text <sm:(text-13px font-400) flex mr-30px whitespace-nowrap"
          >
            <span class="mr-10px font-900">{{ item?.title }}</span>
            <span>{{ item?.content }}</span>
          </li>
        </section>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMessage } from "~/stores/message"
// Stores（狀態處理器）
const messageStore = useMessage()

// Refs or Reactives（靜態變量）
const timer = ref<number | null>(null)
const sectionRef = ref<HTMLDivElement>()
const distance = ref<number>(0)

// Computed（附依賴變量）
const noticeList = computed(() => messageStore.noticeList)
const isStartMoveOnMounted = computed(() => {
  return !!noticeList.value.length && !!sectionRef.value
})

// Functions（函式）
const startMove = () => {
  distance.value += 0.6
  const width = (sectionRef.value && sectionRef.value.clientWidth) || 0
  if (sectionRef.value && sectionRef.value.clientWidth) {
    sectionRef.value.style.transform = `translateX(${-distance.value}px)`
    // console.log(width - distance.value, "width - distance.value")
    if (distance.value - width > 0 && distance.value - width <= width * 0.3)
      distance.value = 0
    timer.value = window.requestAnimationFrame(startMove)
  }
}
const stopMove = () => {
  window.cancelAnimationFrame(timer.value ?? 0)
}

// onMounted or something about（事件監聽部分）
const onMouseEnter = () => {
  // sectionRef.value.style.transition = `all 0s`
  stopMove()
}
const onMouseLeave = () => {
  startMove()
}

onBeforeUnmount(() => {
  stopMove()
})

onMounted(async () => {
  try {
    // Initialize data（初始化資料）
    await messageStore.GET_NOTICE()
    // fix not scroll while switch page
    setTimeout(() => {
      if (isStartMoveOnMounted.value) startMove()
    }, 500)
  } catch (e) {
    console.log(e)
  }

  // console.log(sectionRef.value, sectionRef.value)
  // if (isStartMoveOnMounted.value) startMove()
})
</script>

<style lang="scss" scoped>
.home-announcement {
  background: var(--v-announcement-bg);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  .announcement-icon {
    background: var(--v-announcement-icon-bg);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
    .announcement-text {
      color: var(--v-announcement-text-bg);
    }
  }
}
</style>
