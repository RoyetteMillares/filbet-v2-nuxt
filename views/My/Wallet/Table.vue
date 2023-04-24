<template>
  <section class="wallet-list">
    <CommonTable :="props" class="<md:hidden" />
    <!--    h5 table-->
    <ul class="md:hidden mt-20px">
      <li
        class="rounded-8px pt-12px text-12px mobile-list mb-8px"
        v-for="item in tableData"
      >
        <div
          class="flex px-16px justify-between text-12px items-center header-item pb-12px"
        >
          <span>{{ item.platName }}</span>
          <span>{{ time(item.createdAt) }}</span>
        </div>
        <div class="pt-12px px-16px pb-15px grid grid-cols-5">
          <div class="col-span-2">
            <p>amount</p>
            <p class="mt-4px text-13px font-500">{{ item.payAmount }}</p>
          </div>
          <div class="col-span-1">
            <p class="text-12px">Rate</p>
            <p class="mt-4px text-13px font-500">{{ item.exchangeRate }}</p>
          </div>
          <div class="col-span-2 text-right">
            <p>
              {{
                modelValue === "Deposit" ? "Amount Received" : "Actual Credit"
              }}
            </p>
            <p class="mt-4px text-13px font-500">{{ item.realAmount }}</p>
          </div>
        </div>
        <div
          class="flex items-center justify-between item-bottom py-10px px-16px"
        >
          <span>
            Transaction ID :
            {{ item?.orderId?.replace(/^(\S{4})\S+(\S{4})$/, "$1 **** $2") }}
          </span>
          <span
            :class="{
              'is-success': item.status === 1,
              'is-fail': item.status === 2,
            }"
            >{{ getTitle(statusList, item.status) }}</span
          >
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const { getTitle } = useDictionary()
const props = defineProps<{
  tableData: any[]
  tableColumnKeys: SearchListType[]
  statusList: any[]
  modelValue: string | unknown
}>()
</script>

<style lang="scss" scoped>
.mobile-list {
  background: var(--v-deposit-record-list-bg);
  color: var(--v-deposit-record-list-text);
  .header-item {
    border-bottom: 1px solid var(--v-deposit-record-bottom);
  }
  .item-bottom {
    background: #13212d;
    border-radius: 0px 0px 8px 8px;
  }
}
</style>
