<template>
  <p class="mb-20px font-600 text-16px <sm:(text-12px mb-10px)">Quick Amount</p>
  <ul
    class="flex items-center flex-wrap gap-16px <sm:(grid grid-cols-4 gap-10px)"
  >
    <li
      @click="selectQuick(item)"
      :key="`item-${item}`"
      class="quick-item cursor-pointer text-center py-15px px-21px rounded-8px <sm:(text-12px p-14px) text-14px font-500"
      :class="{ 'quick-item-active': modelValue === item }"
      v-for="item in quickList"
    >
      ₱ {{ item }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const quickList = shallowRef([100, 200, 500, 1000, 2000, 5000, 10000, 20000])
const props = defineProps<{
  modelValue: number | string
}>()
const emit = defineEmits(["update:modelValue", "change"])
const selectQuick = (val: number) => {
  emit("change", val)
  emit("update:modelValue", val)
}
</script>

<style lang="scss" scoped>
@mixin active {
  background: linear-gradient(
    180deg,
    #1999ee -9.78%,
    #115bca 26.02%,
    #0b3aa8 111.96%
  );
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
}
.quick-item {
  background: linear-gradient(180deg, #324353 0%, #233546 100%);
  box-shadow: 0px 2px 5px rgba(8, 20, 30, 0.3);
  color: #b3bad1;
  &:hover {
    @include active;
  }
  &-active {
    @include active;
  }
}
</style>
