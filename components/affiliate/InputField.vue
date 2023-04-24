<script setup lang="ts"></script>
<template>
  <div
    class="input-field inline-flex items-center space-x-30px font-600 px-24px py-12px rounded-8px bg-$v-bg-affiliate-box-secondary-bg <sm:p-12px <sm:space-x-12px"
  >
    <div>
      <slot />
    </div>
    <CommonAsset name="images-affiliate-copy" />
  </div>
</template>
<style lang="scss" scoped>
.input-field {
  > div:first-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
