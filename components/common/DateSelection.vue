<script setup lang="ts">
import { ElDatePicker } from "element-plus"

const props = withDefaults(
  defineProps<{
    modelValue?: any
    title?: string
    disabledDate?: InstanceType<typeof ElDatePicker>["$props"]["disabledDate"]
    format?: InstanceType<typeof ElDatePicker>["$props"]["format"]
    placeholder?: InstanceType<typeof ElDatePicker>["$props"]["placeholder"]
  }>(),
  {
    options() {
      return []
    },
    modelValue() {
      return ref(0)
    },
    title() {
      return "Select"
    },
    disabledDate() {
      return (time: Date) => {
        return time.getTime() > Date.now()
      }
    },
    format() {
      return (import.meta.env.VITE_APP_TIME_FORMAT ?? "YYYY-MM-DD") as string
    },
    placeholder() {
      return "Select date"
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
</script>

<template>
  <div class="common-date-selection">
    <ElDatePicker
      v-model="vModel"
      :clearable="false"
      :format="props.format"
      :teleported="false"
      :disabled-date="props.disabledDate"
      type="date"
      :placeholder="props.placeholder"
    />
  </div>
</template>
<style lang="scss" scoped>
@import "~/assets/sass/mixins.scss";
.common-date-selection {
  display: inline-block;
  .date-label {
    color: var(--v-label);
  }
  :deep(.el-input) {
    @apply text-10px <sm:(text-6px) w-full;
    height: auto;
    .el-input__wrapper {
      box-sizing: border-box;
      width: 100%;
      @apply rounded-24px shadow-none;
      background: linear-gradient(180deg, #13212d 0%, #13212d 100%);
      border: transparent 2px solid;
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
      }
      &.is-focus {
        box-shadow: 0 0 0 1px var(--v-help-center-banner-top-color) inset;
      }
      .el-range-separator {
        flex: unset;
        margin: 0 5px;
      }
      .el-input__prefix {
        display: none;
      }
      .el-input__inner {
        text-align: center;
      }
    }
  }

  :deep(.el-date-editor) {
    .el-range-input {
      border-radius: 16px;
      height: 32px;
      font-size: 14px;
      padding: 5px 12px;
      box-sizing: border-box;
    }
  }

  :deep(.el-date-table-cell) {
    &:hover {
      color: #fff;
    }
  }
  .range-separator {
    margin: 0 8px;
  }
  :deep(.el-popper) {
    .disabled {
      .el-date-table-cell {
        background: rgba(52, 184, 213, 0.2);

        .el-date-table-cell__text {
          color: #495572;
        }
      }
    }
  }

  :deep(.el-popper) {
    @screen sm {
      .el-popper__arrow {
        display: none !important;
      }
    }
    @apply <sm:(fixed bottom-0 left-0 right-0 top-[unset] w-100vw overflow-hidden rounded-t-1em transition-all duration-500) !important;
    .el-picker-panel {
      @apply <sm:(!w-full);
      .el-picker-panel__content {
        @apply <sm:(!w-full !m-0);
      }
    }
  }
}
:deep(.el-date-picker__header) {
  .el-picker-panel__icon-btn {
    .el-icon {
      color: #fff;
    }
  }
}
.date-overlay {
  background: rgba(0, 8, 20, 0.4);
  backdrop-filter: blur(2px);
}
</style>
