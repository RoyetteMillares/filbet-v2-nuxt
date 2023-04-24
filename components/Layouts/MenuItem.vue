<template>
  <CommonButton
    :disabled="disabled"
    :is-active="isActive"
    :svg-icon-name="props.iconName"
    :is-label-open="props.isOpen"
    class="w-full !justify-start"
    :class="{
      'w-auto': !props.isOpen,
    }"
  >
    <slot />
  </CommonButton>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    routeName?: RouteName
    iconName?: string
    isOpen?: Boolean
    disabled?: boolean
    isActive?(): boolean
  }>(),
  {
    routeName() {
      return "404"
    },
    iconName() {
      return ""
    },
    isOpen() {
      return false
    },
    disabled() {
      return false
    },
    isActive() {
      return false
    },
  }
)

const route = useRoute()
const isActive = computed(
  () => props.isActive() || props.routeName === route.name
)
</script>
