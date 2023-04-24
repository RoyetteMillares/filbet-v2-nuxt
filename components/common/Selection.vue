<script setup lang="ts">
import { ElOption, ElSelect } from "element-plus"
const props = withDefaults(
  defineProps<{
    options?: {
      label: string
      value: any
    }[]
    modelValue?: any
    title?: string
  }>(),
  {
    options() {
      return []
    },
    modelValue() {
      return ref("")
    },
    title() {
      return "Select"
    },
  }
)

const emit = defineEmits(["update:modelValue", "change"])

const vModel = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
    emit("change", value)
  },
})

const optionsComputed = computed(() => {
  return [...props.options]
})
</script>

<template>
  <ElSelect v-model="vModel" class="common-selection" placeholder="Select">
    <ElOption
      v-for="op in optionsComputed"
      :key="`common-options-${op.label}`"
      :label="op.label"
      :value="op.value"
      :class="{
        'select-selected': vModel.value === op.value,
      }"
    />
  </ElSelect>
</template>
<style lang="scss" scoped>
@import "~/assets/sass/mixins.scss";
.common-selection {
  display: inline-block;

  :deep(.el-input__wrapper) {
    @apply text-10px <sm:(text-6px) w-full;
    @apply rounded-24px shadow-none;
    @include background-border(
      linear-gradient(180deg, #13212d 0%, #13212d 100%),
      linear-gradient(to bottom, #475a6c 0%, #0e1c28 100%),
      0px
    );

    //&.is-focus {
    //}
    &:hover {
      box-shadow: none;
      @include background-border(
        linear-gradient(180deg, #324353 0%, #233546 100%),
        linear-gradient(to bottom, #475a6c 0%, #0e1c28 100%),
        2px
      );
    }
    input {
      @apply text-1.4em;
      height: 3em;
      width: 4em;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
      color: #b3bad1;
    }
    .el-icon {
      svg {
        font-weight: 600;
      }
    }
  }
}
</style>
