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
          <span>{{ getTitle(categoryList, item.gameId) }}</span>
          <span>{{ time(item.createdAt) }}</span>
        </div>
        <div class="pt-12px px-16px pb-15px grid grid-cols-3">
          <div class="col-span-1">
            <p>Balance</p>
            <p class="mt-4px text-13px font-500">{{ item.coinBefore }}</p>
          </div>
          <div class="col-span-1">
            <p class="text-12px">Bet Amount</p>
            <p class="mt-4px text-13px font-500">{{ item.stake }}</p>
          </div>
          <div class="col-span-1 text-right">
            <p class="text-12px">Payout</p>
            <p class="mt-4px text-13px font-500">
              {{ item.payout }}
            </p>
          </div>
        </div>
        <div
          class="flex items-center justify-between item-bottom py-10px px-16px"
        >
          <div class="col-span-1">
            <p class="text-12px">ID :{{ item.id }}</p>
          </div>
          <div class="col-span-1">
            <p class="text-12px">{{ getTitle(statusList, item.xbStatus) }}</p>
          </div>
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
  categoryList: any[]
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
