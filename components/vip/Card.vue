<template>
  <div
    class="relative inline-block pt-80px <2xl:(pt-55px) <lg:(pt-45px) <sm:(pt-30px)"
  >
    <CommonAsset
      name="images-vip-card-bg"
      class="<lg:(h-180px) <sm:(h-140px)"
    />
    <CommonAsset
      :name="`images-vip-level-badge-${props.level}`"
      class="badge-icon absolute top-[0px] left-[50%] translate-y-full <2xl:(w-100px) <lg:(w-80px) <sm:(w-60px)"
    />
    <div
      class="absolute top-140px left-0 w-full flex flex-col items-center <2xl:(top-100px) <lg:(top-80px) <sm:(top-60px)"
    >
      <CommonAsset
        :name="`images-vip-level-brand-${props.level}`"
        class="mb-10px <lg:(w-50px)"
      />
      <p
        class="text-$v-vip-text text-36px font-semibold mb-20px <lg:(text-24px mb-30px) <sm:(text-16px mb-15px)"
      >
        VIP{{ props.level }}
      </p>
      <div class="w-full flex items-center justify-around">
        <div
          v-for="item in info"
          :key="item.label"
          class="flex flex-col items-center"
        >
          <span
            class="text-$v-vip-text text-16px font-semibold mb-5px <lg:(text-14px) <sm:(text-12px)"
            >₱ {{ item.amount }}</span
          >
          <p
            class="text-$v-vip-text text-14px text-center <lg:(text-12px) <sm:(text-10px)"
          >
            {{ item.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  level: string
  info: {
    label: string
    amount: number
  }[]
}>()
</script>
<style lang="scss">
.badge-icon {
  transform: translateX(-50%);
}
</style>
