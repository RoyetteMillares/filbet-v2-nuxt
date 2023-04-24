<template>
  <div class="jackpot-panel flex justify-start">
    <HomeJackpotNumberBox
      v-for="(_, i) in boxes"
      :key="`HomeJackpotNumberBox-${i}`"
      :size="props.size ?? 24"
      :color="props.color ?? 'red'"
      :value="Number(numberList[i] ?? 0)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: number
  size?: number
  color?: "blue" | "red"
}>()

const valueLength = computed(
  () => Math.floor(Math.log10(props.value ?? Date.now())) + 1
)
const boxes = ref(Array(valueLength.value))

const numberList = computed(() => {
  const numberString = Number((props.value ?? 0) / 10 ** boxes.value.length)
    .toFixed(boxes.value.length)
    .replace(/\d+\./g, "")
  return [...numberString]
})
</script>

<style lang="scss" scoped>
.jackpot-panel {
  > div {
    &:not(:first-of-type) {
      margin-left: 2px;
    }
  }
}
</style>
