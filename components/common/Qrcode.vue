<script setup lang="ts">
import * as qrcode from "qrcode"

const props = withDefaults(
  defineProps<{
    value?: string
  }>(),
  {
    value: () => "none",
  }
)

const canvas = ref<HTMLCanvasElement>()
const outerWrap = ref<HTMLDivElement>()
const innerWrap = ref<HTMLDivElement>()
const scale = ref(1)

onMounted(() => {
  if (canvas.value && outerWrap.value && innerWrap.value) {
    qrcode.toCanvas(canvas.value, props.value, (error) => {
      if (error) console.error(error)
      useResizeObserver(outerWrap.value, () => {
        const outerWidth = outerWrap.value?.clientWidth ?? 0
        const innerWidth = innerWrap.value?.clientWidth ?? 0
        scale.value = Number((outerWidth / innerWidth).toPrecision(3))
      })
    })
  }
})
</script>

<template>
  <div ref="outerWrap" class="aspect-square">
    <div
      ref="innerWrap"
      class="inline-block p-11.24px bg-$v-bg-affiliate-box-secondary-bg rounded-8px overflow-hidden origin-top-left"
      :style="{
        scale,
      }"
    >
      <canvas ref="canvas" class="inline-block rounded-8px overflow-hidden" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
