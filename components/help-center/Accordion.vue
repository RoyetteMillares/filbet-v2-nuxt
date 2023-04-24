<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="bg-$v-help-center-accordion-bg rounded-14px"
    :class="props.class ?? ''"
  >
    <div
      class="flex items-center justify-between py-20px px-40px hover:(cursor-pointer) <md:(py-10px px-20px) <sm:(px-10px)"
      @click="isOpen = !isOpen"
    >
      <p
        class="text-$v-help-center-color text-20px font-medium <md:(text-18px) <sm:(text-14px)"
      >
        {{ props.title }}
      </p>
      <span
        class="inline-flex items-center justify-center w-28px h-28px rounded-1/2 bg-$v-help-center-arrow-bg <md:(w-22px h-22px) <sm:(w-18px h-18px)"
      >
        <CommonAsset
          :name="
            isOpen
              ? 'images-help-center-arrow-up'
              : 'images-help-center-arrow-down'
          "
          class="w-20px"
        />
      </span>
    </div>
    <div
      v-show="isOpen"
      class="py-30px px-40px border-t-1 border-$v-help-center-accordion-border text-14px leading-normal <md:(py-15px px-20px) <sm:(text-12 px-10px)"
      v-html="props.content"
    ></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string
  content: string
  class?: string
}>()
const isOpen = ref(false)
</script>
<style></style>
