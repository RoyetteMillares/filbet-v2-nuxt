<template>
  <div class="min-h-300px">
    <div
      class="p-20px mb-16px rounded-12px item-list <sm:(p-12px rounded-8px mb-8px) @sm:(p-14px rounded-10px mb-10px) @md:(p-16px rounded-12px mb-12px) @md:(p-18px rounded-14px mb-14px)"
    >
      <p
        class="font-600 text-24px mb-8px <sm:(text-12px mb-4px) @sm:(text-14px mb-5px) @md:(text-18px mb-5px) @lg:(text-22px mb-6px)"
      >
        {{ information?.title }}
      </p>
      <p class="item-time <sm:(text-12px) normal-text">
        {{ time(information?.createdAt) }}
      </p>
      <p
        class="normal-text text-14px leading-18px mt-20px <sm:(mt-16px text-12px leading-16px) @sm:mt-17px @md:mt-18px @lg:mt-19px"
      >
        {{ information?.content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getValue } = useStorage()
const information = shallowRef()
onMounted(() => {
  try {
    information.value = JSON.parse(localStorage.information)
  } catch (e) {}
})
</script>

<style scoped></style>
