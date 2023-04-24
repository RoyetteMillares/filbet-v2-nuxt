<template>
  <ul class="p-4px">
    <section
      class="Classification-inner p-4px overflow-x-scroll rounded-32px flex items-center"
    >
      <li
        v-for="item in list"
        :key="item.label"
        class="py-10px rounded-24px game-info cursor-pointer px-14px font-500 <sm:(py-7px px-10px text-14px) @sm:(py-7px px-10px) text-14px flex flex-shrink-0 items-center"
        :class="{ 'game-info-active': modelValue === item.value }"
        @click="change(item)"
      >
        <CommonSvgIcon
          v-if="item.icon"
          class="<sm:(mr-8px) mr-12px"
          :name="item.icon"
        />
        <span>{{ item.label }}</span>
        <span
          v-if="item.count"
          class="flex show-count rounded-4px text-12px ml-2px p-2px"
          >{{ item.count }}</span
        >
        <!-- <span>{{ item.label }}</span> -->
      </li>
    </section>
  </ul>
</template>

<script setup lang="ts">
type ListItem = {
  label: string
  icon?: string
  value?: string
  count?: number
  title?: string
  code?: string
}
const props = defineProps<{
  list?: ListItem[]
  modelValue: string | number
}>()
const emit = defineEmits(["update:modelValue", "change"])
const change = (item: ListItem) => {
  emit("update:modelValue", item.value)
  emit("change", item)
}
</script>

<style lang="scss" scoped>
@mixin active {
  color: var(--v-class-game-active-color);
  background: linear-gradient(180deg, #324353 0%, #233546 100%);
  box-shadow: 0px 2px 4px #142a3a;
}
.Classification-inner {
  background: var(--v-class-inner-bg);
  width: fit-content;
  max-width: 100%;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .game-info {
    color: var(--v-class-game-color);
    &-active {
      @include active;
    }
    &:hover {
      @include active;
    }
  }
  .show-count {
    background: #df342d;
    color: #fff;
  }
}
</style>
