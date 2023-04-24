<template>
  <transition name="el-fade-in-linear">
    <div
      v-show="props.isShow ?? context.isLoadingMaskOpen"
      class="components-loading-mask"
    >
      <CommonSpinner />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useComponentsContext } from "~/composables/useComponentsContext"
const { context } = useComponentsContext()
const props = defineProps<{ isShow?: Boolean }>()
</script>

<style lang="scss" scoped>
.components-loading-mask {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1001;
  background-color: var(--v-components-loading-mask-bg);
}
</style>
