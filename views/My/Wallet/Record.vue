<template>
  <div>
    <section
      class="flex gap-20px flex-wrap mt-44px justify-between <sm:(mt-20px) @sm:mt-24px @md:mt-28px @lg:mt-32px"
    >
      <CommonTab
        :list="tabList"
        @change="changeRecord"
        v-model="modelValue"
        class="!p-0"
      />
      <ViewsMyWalletInquire :searchList="searchList" @inquire="inquire" />
    </section>
    <CommonPagination
      @handleCurrentChange="handleCurrentChange"
      :="{ ...page }"
    />
    <ViewsMyWalletTable
      :statusList="
        modelValue === 'deposit' ? depositStatusList : withdrawStatusList
      "
      :modelValue="modelValue"
      :tableData="tableData"
      :tableColumnKeys="tableColumnKeys"
    />
  </div>
</template>

<script setup lang="ts">
import { useDirectionList } from "~/composables/directionList"
import { Ref } from "vue"
import HttpInstance from "~/request/server"
const page = reactive({
  page: 1,
  size: 20,
  total: 0,
})
const params = reactive({
  status: "",
  time: [],
})

const tableData = shallowRef([]) as unknown as Ref<RecordItem[]>
const modelValue = shallowRef("deposit")
const tableColumnKeys = computed(() => {
  return [
    { label: "Channel", prop: "platName" },
    { label: "Amount", prop: "payAmount" },
    {
      label: "Transaction ID",
      prop: "orderId",
      custom: ({ row }: { row: RecordItem }) => {
        return h(
          "span",
          {},
          row?.orderId?.replace(/^(\S{4})\S+(\S{4})$/, "$1 **** $2")
        )
      },
    },
    { label: "Exchange Rate", prop: "exchangeRate" },
    {
      label: "mainnet Fees",
      prop: "mainNetFees",
      disabled: modelValue.value === "deposit",
    },
    {
      label: "Actual Credit",
      prop: "realAmount",
      disabled: modelValue.value === "deposit",
    },
    {
      label: "Amount Received",
      prop: "realAmount",
      disabled: modelValue.value === "withdraw",
    },
    {
      label: "Status",
      prop: "status",
      custom: ({ row }: { row: RecordItem }) => {
        return h(
          "span",
          {
            class: {
              "is-success": row.status === 1,
              "is-fail": row.status === 2,
            },
          },
          getTitle(depositStatusList?.value, row.status)
        )
      },
    },
    {
      label: "Time",
      prop: "createdAt",
      custom: ({ row }: { row: RecordItem }) => {
        return h("span", {}, time(row.createdAt))
      },
    },
  ]
})
// 充值记录字典
const { depositStatusList, withdrawStatusList } = useDirectionList()
const { getTitle } = useDictionary()
const searchList = computed(() => {
  return reactive([
    {
      type: "select",
      label: "Status",
      list:
        modelValue.value === "deposit" ? depositStatusList : withdrawStatusList,
      modelValue: params.status,
      change: (val: any) => {
        params.status = val
      },
    },
    {
      label: "Date",
      type: "date",
      modelValue: params.time,
      change: (val: any) => {
        params.time = val
      },
    },
  ])
}) as unknown as RecordType[]

const tabList = [
  { label: "Deposit", value: "deposit" },
  { label: "Withdraw", value: "withdraw" },
]
const inquire = () => {
  page.page = 1
  getData()
}
const getData = async () => {
  const parameters = {
    current: page.page,
    data: {
      status: params.status,
      startTime: params.time?.[0] ?? "",
      endTime: params.time?.[1] ?? "",
    },
    size: page.size,
  }
  try {
    const url: string =
      modelValue.value === "deposit"
        ? "getDepositRecord"
        : "getWithdrawalRecord"
    const { code, data } = await HttpInstance.post(url, parameters)
    if (code === 0) {
      tableData.value = data.list
      page.total = +data.total
    }
  } catch (e) {
    console.log(e)
  }
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getData()
}
const changeRecord = () => {
  params.status = ""
  page.page = 1
  getData()
}

getData()
</script>

<style scoped></style>
