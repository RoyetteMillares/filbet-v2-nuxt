<script setup lang="ts">
import { HTMLAttributes, Ref } from "vue"

const props = withDefaults(
  defineProps<{
    dataRef?: Ref<any>
    type: "select" | "date"
    elProps: Pick<HTMLAttributes, "class" | "style"> & { [K: string]: any }
    modleValue: any
    label: string
    list?: {
      code: string
      title: string
    }[]
  }>(),
  {
    dataRef() {
      return ref("")
    },
    type() {
      return "select"
    },
    elProps() {
      return {
        class: "",
        style: {},
      }
    },
    list() {
      return []
    },
  }
)
const emit = defineEmits(["change"])
const modelRef = ref(props.modleValue)
const onChange = (
  ...args: Parameters<Required<HTMLAttributes>["onChange"]>
) => {
  emit("change", ...args)
}

const AsyncComponent = defineAsyncComponent(
  // @ts-ignore
  () => {
    switch (props.type) {
      case "select": {
        return import("~/components/common/Select.vue")
      }
      case "date": {
        return import("~/components/common/Date.vue")
      }
    }
  }
)
</script>
<template>
  <AsyncComponent
    v-model="modelRef"
    class="affiliate-table-filter"
    :label="props.label"
    :status-list="props.list"
    :="props.elProps"
    @change="onChange"
  />
</template>
<style lang="scss" scoped></style>
