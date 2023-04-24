<template>
  <button
    class="relative flex flex-row flex-nowrap justify-center items-center menu-item py-14px mb-3px px-12px items-center rounded-12px cursor-pointer common-button overflow-hidden font-500 text-14px"
    :class="{
      'common-button-active': props.isActive ?? true,
      'common-button-disabled': disabled ?? false,
      'common-button-grey': disabled ?? false,
    }"
    :="{ ...props.buttonProps }"
    @click="
      props.activateLoader
        ? onClickWithLoader($event)
        : onClickWithoutLoader($event)
    "
  >
    <div
      v-if="!!props.svgIconName"
      class="flex text-18px common-button-icon"
      :class="{ 'mr-8px': !!props.isLabelOpen }"
    >
      <CommonSvgIcon :name="props.svgIconName" />
    </div>
    <div v-show="props.isLabelOpen ?? true" class="flex items-center">
      <slot />
    </div>
    <transition name="el-fade-in-linear">
      <div
        v-show="props.loading ?? isLoaderMaskShow"
        class="loader-mask absolute top-0 left-0 bottom-0 right-0 inline-flex items-center justify-center blur-1"
      >
        <LazyCommonSpinner :size="20" />
      </div>
    </transition>
  </button>
</template>

<script setup lang="ts">
import { ButtonHTMLAttributes } from "vue"

const props = defineProps<{
  isActive?: Boolean
  svgIconName?: string
  isLabelOpen?: Boolean
  buttonProps?: Omit<ButtonHTMLAttributes, "onClick">
  onClick?: ButtonHTMLAttributes["onClick"]
  activateLoader?: boolean
  loading?: Boolean
  disabled?: boolean
}>()
const isLoaderMaskShow = ref(false)

const onClickWithLoader: ButtonHTMLAttributes["onClick"] = async (event) => {
  const target = event.target as HTMLButtonElement
  target.disabled = true
  isLoaderMaskShow.value = true
  try {
    if (props.onClick) await props.onClick(event)
    target.disabled = false
    isLoaderMaskShow.value = false
  } catch (error) {}
}
const onClickWithoutLoader: ButtonHTMLAttributes["onClick"] = async (event) => {
  const target = event.target as HTMLButtonElement
  target.disabled = true
  if (props.onClick) await props.onClick(event)
  target.disabled = false
}

// Event listener
</script>

<style lang="scss" scoped>
@import "~/assets/sass/mixins.scss";
@mixin active {
  box-shadow: var(--v-navbar-active-shadow);
  color: var(--v-navbar-active-color);
  border-radius: 12px;
  @include background-border(
    var(--v-navbar-active-bg),
    linear-gradient(180deg, #85c5ff 0%, rgba(0, 82, 255, 0) 100%),
    1px
  );

  .common-button-icon {
    animation-name: upAnimation;
    transform-origin: center bottom;
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
  }
}
.common-button {
  background: var(--v-navbar-bg);
  //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: var(--v-navbar-color);
  transition: box-shadow 0.5s;
  border-radius: 12px;
  border: transparent 1px solid;

  //@include active;
  &:hover {
    @include active;
  }
  &-active {
    @include active;
  }
  &-disabled {
    pointer-events: none;
    //cursor: ;
  }
  &-grey {
    @include background-border(
      linear-gradient(#324353 0%, #233546 100%),
      linear-gradient(180deg, #475a6c 0%, #0e1c28 100%),
      1px
    );
  }
  .loader-mask {
    transition: all 300ms;
    background: rgba(0, 0, 0, 0.457);
  }
}
</style>
