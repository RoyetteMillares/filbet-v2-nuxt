<script setup lang="ts">
const props = defineProps<{
  level: number
  percentage: number
}>()
const levelMark = ref<HTMLDivElement>()
onMounted(() => {
  if (levelMark.value) levelMark.value.style.left = `${props.percentage}%`
})
</script>

<template>
  <div class="relative mt-15px mb-20px">
    <p class="absolute right-0 bottom-12px text-$v-vip-text text-12px">
      VIP{{ props.level + 1 }}
    </p>
    <div
      ref="levelMark"
      class="relative w-36px h-40px anchor-translate <sm:(w-32px h-36px)"
    >
      <CommonAsset
        class="anchor-asset w-full h-full"
        name="images-vip-progress-icon"
      />
      <p
        class="absolute bottom-0 top-0 bottom-1 right-0 left-0 text-10px font-bold flex items-center justify-center"
      >
        VIP{{ props.level }}
      </p>
    </div>
    <VipLevelSimpleBar
      :percentage="props.percentage"
      :container-class="'progress-container-mobile w-full rounded-8px h-9px'"
    />
  </div>
</template>
<style lang="scss" scoped>
.anchor-translate {
  transform: translateX(-16px);
}
</style>
