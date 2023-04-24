<template>
  <div
    class="botton-background inline-flex w-200px h-210px flex-col justify-center items-center rounded-30px hover:(cursor-pointer) <2xl:(w-[30%] h-200px mb-20px) <lg:(rounded-20px) <md:(w-[48%] h-150px mb-15px px-10px) <sm:(h-120px rounded-10px)"
    :class="{ active: props.isActive }"
  >
    <!-- <CommonAsset :name="props.img" class="w-full mb-20px" /> -->
    <img
      :src="props.img"
      class="w-full max-w-200px mb-20px <md:(max-w-150px mb-10px) <sm:(max-w-120px)"
    />
    <p
      class="text-$v-help-center-color text-16px font-semibold text-center <sm:(text-14px)"
    >
      {{ props.label }}
    </p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  isActive: Boolean
  img: string
  label: string
}>()
</script>
<style lang="scss">
.botton-background {
  background: linear-gradient(
        var(--v-help-center-button-top-bg),
        var(--v-help-center-button-bottom-bg)
      )
      padding-box,
    linear-gradient(
        180deg,
        var(--v-help-center-button-top-border) 0%,
        var(--v-help-center-button-bottom-border) 100%
      )
      border-box;
  border: 1px solid transparent;
  box-shadow: 0px 2.65714px 6.64286px var(--v-help-center-button-shadow);
}
.botton-background:hover,
.active {
  background: linear-gradient(
        var(--v-help-center-button-active-top-bg),
        var(--v-help-center-button-active-bottom-bg)
      )
      padding-box,
    linear-gradient(
        180deg,
        var(--v-help-center-button-active-top-border) 0%,
        var(--v-help-center-button-active-bottom-border) 100%
      )
      border-box;
  border: 1px solid transparent;
}
</style>
