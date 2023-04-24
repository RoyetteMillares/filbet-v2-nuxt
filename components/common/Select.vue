<template>
  <section class="flex items-center">
    <span
      class="mr-10px is-bold text-14px <md:(mr-4px text-12px font-400) label-select font-500"
      >{{ label }}</span
    >
    <client-only>
      <el-select
        v-model="key"
        :filterable="filterable"
        :placeholder="placeholder"
        class="custom-select"
        :teleported="false"
        @change="change"
      >
        <el-option
          v-for="item in statusList"
          :key="item?.code"
          :label="item?.title"
          :value="item?.code"
        ></el-option>
      </el-select>
    </client-only>
  </section>
</template>

<script setup>
import { ElSelect, ElOption } from "element-plus"
import { useI18n } from "vue-i18n"
const emit = defineEmits(["update:modelValue", "change"])
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  statusList: {
    type: [Array, Object],
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    // default: "Please select",
    default: () => useI18n().t("new.select"),
  },
  filterable: {
    type: Boolean,
    default: false,
  },
})
const key = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
  },
})
const state = reactive({
  key: "",
})
const change = (val) => {
  emit("update:modelValue", state.key)
  emit("change", val)
}
</script>

<style lang="scss" scoped>
.label-select {
  color: var(--v-label);
}
.custom-select {
  :deep(.el-input__wrapper) {
    min-width: 100px;
    max-width: 200px;
    //background: $main-input-bg;
    border-radius: 4px;
    box-shadow: 0 0 0 1px #232a33 inset;
    background: var(--v-filter-select-bg);
    @apply !w-117px <sm:(!w-86px);
    //&.is-focus {
    //}
    &:hover {
      box-shadow: none;
    }
    input {
      text-align: center;
    }
  }
  :deep(.is-focus) {
    .el-input__wrapper {
      box-shadow: 0 0 0 1px var(--v-help-center-banner-top-color) inset !important;
    }
  }
}
</style>
