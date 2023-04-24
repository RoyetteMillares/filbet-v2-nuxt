<template>
  <div class="inline-block">
    <CommonAsset
      :name="props.benefitData.img"
      class="mb-25px mx-auto <xl:(mb-20px) <md:(w-60px mb-15px) <sm:(w-50px)"
    />
    <span
      class="block text-center text-$v-vip-text text-14px font-medium mb-6px <xl:(mb-5px)"
      >{{ props.benefitData.amount }}</span
    >
    <div class="flex justify-center items-center min-h-42px <sm:(min-h-30px)">
      <p class="text-center text-$v-vip-rules-text text-14px <sm:(text-10px)">
        {{ props.benefitData.label }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  benefitData: {
    img: string
    label: string
    amount: string | number
  }
}>()
</script>

<style lang="scss" scoped></style>
