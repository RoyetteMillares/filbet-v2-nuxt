<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    currentLevel?: number
    selfIndex?: number
  }>(),
  {
    currentLevel() {
      return 0
    },
    selfIndex() {
      return 0
    },
  }
)

const ColorRgbStart = [138, 182, 255]
const ColorRgbEnd = [53, 123, 239]

const ColorRgbRange = [
  ColorRgbEnd[0] - ColorRgbStart[0],
  ColorRgbEnd[1] - ColorRgbStart[1],
  ColorRgbEnd[2] - ColorRgbStart[2],
]

const rangePerBar = ColorRgbRange.map((range) =>
  Number((range / props.currentLevel).toFixed(2))
)

const isActive = computed(() => {
  return props.currentLevel >= props.selfIndex + 1
})

const isAnchorActive = computed(
  () =>
    props.currentLevel === props.selfIndex + 1 ||
    (props.selfIndex === 0 && props.currentLevel === 0)
)

const isZero = computed(() => props.selfIndex === 0 && props.currentLevel === 0)

const background = computed(() => {
  const base = props.selfIndex
  const start = [
    ColorRgbStart[0] + base * rangePerBar[0],
    ColorRgbStart[1] + base * rangePerBar[0],
    ColorRgbStart[2] + base * rangePerBar[0],
  ]
  const end = [
    ColorRgbStart[0] + (base + 1) * rangePerBar[0],
    ColorRgbStart[1] + (base + 1) * rangePerBar[0],
    ColorRgbStart[2] + (base + 1) * rangePerBar[0],
  ]

  const output = `linear-gradient(to right, rgb(${start.join(
    ", "
  )}) 0%, rgb(${end.join(", ")}) 100%)`
  return output
})
</script>

<template>
  <div class="vip-level-bar inline-flex flex-col w-full relative">
    <div
      v-if="isAnchorActive"
      class="anchor absolute w-36px aspect-0.857"
      :class="{
        'left-0': isZero,
        'right-0': !isZero,
        left: isZero,
      }"
    >
      <div class="relative w-full h-full">
        <CommonAsset
          class="anchor-asset w-full h-full"
          name="images-vip-progress-icon"
        />
        <div
          class="absolute bottom-0 top-0 bottom-1 right-0 left-0 text-10px font-bold flex items-center justify-center"
        >
          {{ `VIP${props.currentLevel}` }}
        </div>
      </div>
    </div>
    <div
      class="a-bar w-full relative bg-$v-vip-progress-bg min-w-20px w-full min-h-10px overflow-hidden"
      :class="{
        'rounded-l-100px': props.selfIndex === 0,
        'rounded-r-100px': props.selfIndex === 9,
      }"
    >
      <div
        class="outer absolute top-0 bottom-0 left-0 right-0"
        :style="{
          background: isActive ? background : '#354559',
        }"
      />
      <div class="inner absolute" />
    </div>
    <div
      class="w-[113%] inline-flex text-12px justify-end mt-12px <xl:(w-[115%]) <lg:(w-[119%])"
    >
      <div v-if="!props.selfIndex" class="mr-auto">VIP0</div>
      <div>VIP{{ props.selfIndex + 1 }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.vip-level-bar {
  --border-width: 2px;
  .anchor {
    transform: translate(50%, -100%);
    &.left {
      transform: translate(-50%, -100%);
    }
  }

  .a-bar {
    border-color: #354559;
    border-width: var(--border-width);
    border-left-width: 0;
    border-right-width: 0;
  }
  &:first-child {
    .a-bar {
      border-left-width: var(--border-width);
    }
  }
  &:last-child {
    .a-bar {
      border-right-width: var(--border-width);
    }
  }
  &:first-child {
    .a-bar {
      border-left-width: var(--border-width);
    }
  }
  &:last-child {
    .a-bar {
      border-right-width: var(--border-width);
    }
  }
}
</style>
