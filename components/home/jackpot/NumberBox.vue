<template>
  <div
    class="home-jackpot-number-box-scale-wrap"
    :style="{
      [`--scoped-scale`]: scale,
    }"
  >
    <div
      class="home-jackpot-number-box c-outer inline-flex relative justify-center content-center items-center text-110px h-180px rounded-t-full"
      :class="{
        [`c-color-${color}`]: true,
      }"
      :style="`scale: ${scale}`"
    >
      <div
        class="c-number-list-scroller relative overflow-hidden w-full h-full"
      >
        <div
          ref="numberListRef"
          class="c-number-list text-center flex flex-col absolute w-full"
          :style="{
            top: `${-top}px`,
          }"
        >
          <HomeJackpotNumber
            v-for="n in items"
            :key="`home-jackpot-number-${n}`"
            class="relative h-170px"
            :size="props.size"
            :color="props.color"
            :data-number="n"
            :number="n"
          />
        </div>
      </div>
      <div class="c-dot-top" />
      <div class="c-dot-bottom" />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  /**
   * {number} px
   */
  size?: number
  color?: "blue" | "red"
  defaultNumber?: number
  value?: number
}>()
const scale = computed(() => (props.size ?? 24) / 100)
const items = new Array(10).fill(0).map((_, i) => i)
const numberListRef = ref<HTMLDivElement>()
const currentNumber = computed(() => props.value ?? props.defaultNumber ?? 0)
const targetElement = computed(() => {
  const list = Array.from(numberListRef.value?.children ?? [])
  const targetElement = list.find(
    (item) => Number(item.getAttribute("data-number")) === currentNumber.value
  )
  return targetElement
})
const basisHeight = computed(() => targetElement.value?.scrollHeight ?? 170)

const top = computed(() => {
  return currentNumber.value * basisHeight.value
})
</script>
<style lang="scss" scoped>
.home-jackpot-number-box-scale-wrap {
  --scoped-height: 180px;
  --scoped-width: 130px;
  width: calc(var(--scoped-scale) * var(--scoped-width));
  height: calc(var(--scoped-scale) * var(--scoped-height));
}
.home-jackpot-number-box {
  transform-origin: left top;
  overflow: hidden;
  border: #545761 5px solid;
  width: var(--scoped-width);
  height: var(--scoped-height);
  border-radius: calc(var(--scoped-width) * 0.5);
  box-shadow: inset 0px 0px 6px #000;
  &.c-color- {
    &blue {
      background-color: #13212d;
    }
    &red {
      background-color: #211a1a;
    }
  }

  .c-number-list {
    transition: all 0.3s;
  }

  .c-dot {
    --v-move: -10;
    z-index: 100;
    &-top,
    &-bottom {
      box-shadow: 0px 0px 6px #000;
      display: block;
      background: var(--v-jackpot-box-border-color);
      width: 35px;
      aspect-ratio: 1;
      position: absolute;
      border-radius: 50%;
    }
    &-top {
      top: -28px;
    }
    &-bottom {
      bottom: -28px;
    }
  }
}
</style>
