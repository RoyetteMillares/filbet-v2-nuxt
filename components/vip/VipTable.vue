<template>
  <div class="table w-full my-[30px] <lg:my-[20px]">
    <div class="table-header-group">
      <div class="table-row bg-$v-rank-table-bg th-header">
        <div
          v-for="(item, id) in props.headerList"
          :key="id"
          class="table-cell text-[14px] px-[32px] py-[12px] text-center align-middle <lg:text-[12px] lg:pt-[35px] lg:pb-[16px] w-100px"
          :class="item.class"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="table-row-group vip-tbody">
      <div v-for="(item, id) in props.vipList" :key="id" class="table-row">
        <div
          v-if="item.level != null"
          class="table-cell text-[14px] px-[12px] py-[12px] text-center align-middle lg:(text-[12px] px-[32px] py-6)"
        >
          <span class="mr-1 font-bold">VIP</span>{{ item.level }}
        </div>
        <div
          v-if="item.rowTwo != null"
          class="table-cell text-[14px] px-[12px] py-[12px] text-center align-middle lg:(text-[12px] px-[32px] py-6)"
        >
          {{ item.rowTwo }}
        </div>
        <div
          v-if="item.rowThree != null"
          class="table-cell text-[14px] px-[12px] py-[12px] text-center align-middle lg:(text-[12px] px-[32px] py-6) <md:(hidden)"
        >
          {{ item.rowThree }}
        </div>
        <div
          v-if="item.rowFour != null"
          class="table-cell text-[14px] px-[12px] py-[12px] text-center align-middle lg:(text-[12px] px-[32px] py-6) <md:(hidden)"
        >
          {{ item.rowFour }}
        </div>
        <div
          v-if="item.rowFive != null"
          class="table-cell text-[14px] px-[12px] py-[12px] text-center align-middle lg:(text-[12px] px-[32px] py-6)"
        >
          {{ item.rowFive }}
        </div>
        <div
          v-if="item.rowSix != null"
          class="table-cell text-[14px] px-[12px] py-[12px] text-center align-middle lg:(text-[12px] px-[32px] py-6)"
        >
          {{ item.rowSix }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type vipListType = {
  level?: number
  rowTwo?: string
  rowThree?: string
  rowFour?: string
  rowFive?: string
  rowSix?: string
}
type headerListType = {
  text: string
  class: string
}

const props = defineProps<{
  headerList?: headerListType[]
  vipList?: vipListType[]
}>()
</script>

<style lang="scss" scoped>
.vip-tbody {
  position: relative;
  .table-row:nth-child(even) {
    background: #263642;
  }
  .table-row:nth-child(odd) {
    background: #1e2c37;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 0;
    height: 15px;
    width: 100%;
    background: #263642;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
}

.th-header .table-cell:first-child {
  border-top-left-radius: 12px;
}
.th-header .table-cell:last-child {
  border-top-right-radius: 12px;
}
</style>
