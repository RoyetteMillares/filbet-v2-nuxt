<template>
  <div
    id="layout-section"
    @scroll="scroll"
    class="layout-section overflow-y-scroll h-full flex-1 relative"
    ref="layoutSection"
  >
    <slot />
    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <div
        v-show="showButton"
        @click="scrollToTop"
        class="fixed right-10px flex cursor-pointer rounded-1/2 bottom-50px <md:bottom-70px text-40px z-10 top-section"
      >
        <CommonSvgIcon name="scrollTop" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { scroll } from "~/utils/scroll"
const layoutSection = ref<HTMLBaseElement>()

const showButton = shallowRef(false)
// export const scrollToTop = () => {
//   scroll(
//     layoutSection.value,
//     layoutSection.value?.scrollTop,
//     0,
//     "scrollTop",
//     1000
//   )
// }
const scroll = (e: Event) => {
  const innerHeight = layoutSection.value?.clientHeight
  const scrollHeight = layoutSection.value?.scrollHeight
  const scrollTop = layoutSection.value?.scrollTop
  if (scrollHeight! > innerHeight!) {
    if (scrollTop! >= 10) showButton.value = true
    else showButton.value = false
  }

  // console.log(e)
}
</script>

<style lang="scss" scoped>
.top-section {
  background: #115bca;
}
</style>
