<script setup lang="ts">
import { VNode } from "vue"

const props = withDefaults(
  defineProps<{
    data?: Array<any>
    schema?: TableSchema<unknown>
  }>(),
  {
    data() {
      return []
    },
    schema() {
      return {}
    },
  }
)

const slots = useSlots() as unknown as {
  header(): VNode
  footer(): VNode
  column(): VNode
} & {
  [K: string]: () => VNode
}

const SchemaEntries = computed(
  () => Object.entries(props.schema) as [string, TableSchemaConfig][]
)
</script>
<template>
  <div>
    <div v-if="!!slots.header" class="table-caption">
      <slots.header />
    </div>
    <template v-if="!props.data.length">
      <CommonNoData class="w-full" text="Commission Details is Empty" />
    </template>
    <template v-if="!!props.data.length">
      <div class="common-table-v2-root overflow-auto self-start">
        <div class="table common-table-v2 w-full text-1em">
          <div class="table-header-group">
            <div class="table-row">
              <div
                v-for="[, config] in SchemaEntries"
                :key="`header-col-${config.label}`"
                class="table-cell p-1em font-600 text-gray-400 text-center"
              >
                {{ config.label }}
              </div>
            </div>
          </div>
          <div class="table-row-group">
            <div
              v-for="(row, rowIndex) in props.data"
              :key="`data-row-${rowIndex}`"
              class="table-row"
            >
              <div
                v-for="([key, config], colIndex) in SchemaEntries"
                :key="`data-col-${rowIndex}-${colIndex}`"
                class="table-cell p-1em text-center"
              >
                <component
                  :is="
                    config.slot ? slots[`column-${key}`] : slots.column || 'div'
                  "
                  :row="row"
                  :cell="config.format ? config.format(row[key]) : row[key]"
                >
                  {{ config.format ? config.format(row[key]) : row[key] }}
                </component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-if="!!slots.footer" class="table-footer-group">
      <slots.footer />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.common-table-v2-root {
  .table-row-group {
    .table-row {
      &:nth-child(odd) {
        background: var(--v-bg-affiliate-secondary);
      }
    }
  }
}
</style>
