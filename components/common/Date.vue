<template>
  <section class="flex-box custom-date">
    <span class="date-label mr-10px is-bold text-14px <md:(mr-4px text-12px)">{{
      label
    }}</span>
    <client-only>
      <el-date-picker
        v-model="state.start"
        :clearable="false"
        :format="VITE_APP_TIME_FORMAT"
        :value-format="VITE_APP_TIME_FORMAT"
        :teleported="false"
        :disabled-date="disabledDate"
        type="date"
        :placeholder="startPlaceholder"
        @change="change"
      />
      <span class="range-separator is-bold fs-14">-</span>
      <el-date-picker
        v-model="state.end"
        :clearable="false"
        :format="VITE_APP_TIME_FORMAT"
        :disabled-date="disabledDate"
        :value-format="VITE_APP_TIME_FORMAT"
        :teleported="false"
        type="date"
        :placeholder="endPlaceholder"
        @change="change"
      />
    </client-only>

    <div
      id="date-overlay"
      class="date-overlay hidden fixed top-0 left-0 w-full h-full"
    ></div>
  </section>
</template>

<script setup>
import { ElDatePicker, dayjs } from "element-plus"

import { useI18n } from "vue-i18n"

const VITE_APP_TIME_FORMAT = import.meta.env.VITE_APP_TIME_FORMAT
const emit = defineEmits(["update:modelValue", "change"])
const props = defineProps({
  modelValue: {
    type: [Array],
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: () => useI18n().t("public.start"),
  },
  startPlaceholder: {
    type: String,
    default: () => useI18n().t("new.start"),
  },
  endPlaceholder: {
    type: String,
    default: () => useI18n().t("public.EndDate"),
  },
})
const change = () => {
  const { start, end } = state
  const startTime = new Date(`${start} 00:00:00`).valueOf() / 1000
  const endTime = new Date(`${end} 23:59:59`).valueOf() / 1000
  emit("update:modelValue", [startTime, endTime])
  emit("change", [startTime, endTime])
}
const state = reactive({
  key: [],
  start: "",
  end: "",
})
const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

// const setDate = (date) => {
//   if (date?.length === 2) {
//     state.start = dayjs().unix(date[0]).format(VITE_APP_TIME_FORMAT)
//     state.end = dayjs().unix(date[1]).format(VITE_APP_TIME_FORMAT)
//   }
// }

// onMounted(() => {
//   setDate(props.modelValue)
// })
//
// watch(
//   () => props.modelValue,
//   (newDate) => {
//     setDate(newDate)
//   }
// )
</script>

<style lang="scss" scoped>
.custom-date {
  margin-right: 12px;
  .el-date-editor {
    --el-date-editor-width: 100px;
  }

  .date-label {
    color: var(--v-label);
    //color: $main-text-color;
    //margin-right: 12px;
  }
  :deep(.el-input) {
    width: auto;
    height: auto;
    .el-input__wrapper {
      //background: transparent;
      border-radius: 16px;
      @apply w-154px <sm:(w-104px h-28px) @sm:(w-112px h-30px) @md:(w-120px h-34px) @lg:(w-130px h-38px) h-46px;
      //width: 100px;
      //height: 32px;

      padding: 9px 13px;
      box-sizing: border-box;
      box-shadow: 0 0 0 1px #232a33 inset;
      background: var(--v-date-bg);
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
        &::placeholder {
          //color: $main-text-color;
        }
      }
    }
    .is-focus {
      //box-shadow: 0 0 0 1px $main-color inset !important;
    }
  }

  :deep(.el-date-editor) {
    //box-shadow: 0 0 0 1px transparent inset;
    //.el-range__icon {
    //  display: none;
    //}
    //.el-range__close-icon {
    //  display: none;
    //}
    .el-range-input {
      border-radius: 16px;
      //width: 86px;
      height: 32px;
      font-size: 14px;
      //color: $main-text-color;
      padding: 5px 12px;
      box-sizing: border-box;
    }
    .el-range-separator {
      //color: $main-text-color;
    }
  }

  :deep(.el-date-table-cell) {
    &:hover {
      //background: $main-color;
      color: #fff;
    }
  }
  .range-separator {
    margin: 0 8px;
    //color: $main-text-color;
  }
  :deep(.el-popper) {
    //--el-bg-color-overlay: #2b3547;
    .el-picker-panel__icon-btn {
      //color: $main-text-color;
    }
    .disabled {
      .el-date-table-cell {
        background: rgba(52, 184, 213, 0.2);

        .el-date-table-cell__text {
          color: #495572;
        }
      }
    }

    //--el-datepicker-icon-color: #000;
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
