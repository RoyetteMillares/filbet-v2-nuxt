<template>
  <div class="help-center-banner">
    <div
      class="w-full h-full max-w-1440px mx-auto px-20px relative pt-80px mb-200px relative min-h-340px <2xl:(pt-60px min-h-250px mb-350px) <md:(pt-30px min-h-180px mb-450px) <sm:(min-h-130px mb-370px)"
    >
      <h1
        class="text-40px text-$v-help-center-color font-semibold text-center <2xl:(text-30px) <md:(text-24px) <sm:(text-16px)"
      >
        Hi, We’re here to help you
      </h1>
      <div
        class="absolute flex items-center justify-between flex-wrap bottom-[-100px] left-20px w-[calc(100%-40px)] <2xl:(bottom-[-340px]) <md:(bottom-[-420px]) <sm:(bottom-[-350px])"
      >
        <HelpCenterButton
          v-for="(item, idx) in props.typesList"
          :key="idx"
          :label="item.label"
          :img="item.img"
          :is-active="props.modelValue === item.value"
          @click="change(item)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  typesList: { label: string; value: number; img: string }[]
}>()
const emit = defineEmits(["change"])

const change = (item: (typeof props.typesList)[0]) => {
  emit("change", item)
}
</script>
<style lang="scss">
.help-center-banner {
  background: linear-gradient(
    272.13deg,
    var(--v-help-center-banner-top-color) 14.75%,
    var(--v-help-center-banner-bottom-color) 99.6%
  );
}
</style>
