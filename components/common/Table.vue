<template>
  <section class="custom-table mt-24px <md:mt-12px">
    <client-only>
      <ElTable :data="tableData">
        <template
          :key="`${item.prop}-${idx}`"
          v-for="(item, idx) in props.tableColumnKeys"
        >
          <ElTableColumn
            v-if="!item.disabled"
            :="item"
            :prop="item.prop"
            v-bind="$attrs"
            show-overflow-tooltip
            align="center"
          >
            <template v-if="item.custom" #default="{ row, $index }">
              <component
                :row="row"
                :index="$index"
                :is="item.custom"
              ></component>
              <!--				<slot :row="row"></slot>-->
            </template>
          </ElTableColumn>
        </template>
      </ElTable>
    </client-only>
  </section>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn } from "element-plus"

const props = defineProps<{
  tableData: any[]
  tableColumnKeys: any[]
}>()
</script>
<style lang="scss" scoped>
.custom-table {
  :deep(.el-table) {
    background: #1e2c37;
    border: none;
    .el-table__inner-wrapper {
      &:before {
        background: transparent;
      }
      &:after {
        background: transparent;
      }
    }
    thead {
      tr {
        th {
          background: #1e2c37;
          font-size: 14px;
          color: #b3bad1;
          font-weight: 500;
          border-bottom: none;
          @apply py-20px;
        }
      }
    }
    tbody {
      tr {
        background: #1e2c37;
        &:nth-child(odd) {
          background: #263642;
        }
        td {
          @apply py-22px <xl:py-18px <lg:py-14px;
          border-bottom: none;
        }
      }
    }
  }
}
</style>
