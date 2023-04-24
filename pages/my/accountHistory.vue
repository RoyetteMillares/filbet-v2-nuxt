<template>
  <section>
    <ViewsMyWalletInquire :search-list="searchList" @inquire="inquire">
      <p class="text-20px font-600 <md:hidden">Account History</p>
    </ViewsMyWalletInquire>
    <ViewsMyAccountHistoryTable
      :category-list="categoryList"
      :status-list="statusList"
      :table-data="tableData"
      :table-column-keys="tableColumnKeys"
    />
    <CommonPagination
      :="{ ...page }"
      @handle-current-change="handleCurrentChange"
    />
  </section>
</template>

<script setup lang="ts">
import { Ref } from "vue"
import HttpInstance from "~/request/server"
definePageMeta({
  middleware: ["auth"],
  ...RouteRecord.AccountHistory,
})

const { t } = useLang()
const page = reactive({
  page: 1,
  size: 20,
  total: 0,
})
const params = reactive({
  category: "",
  outIn: "",
  time: [],
})
const statusList = computed(() => {
  let list = [{ title: t("public.All"), code: "" }]
  list = list.concat(getDirection("dic_coin_log_out_in") || [])
  return list
})
const tableData = shallowRef([]) as unknown as Ref<AccountItem[]>
const { getTitle, getDirection } = useDictionary()
const categoryList = computed(() => {
  let list = [{ title: t("public.All"), code: "" }]
  list = list.concat(getDirection("dic_coin_log_category") || [])

  return list
})
// 搜索list
const searchList = computed(() => {
  return reactive([
    {
      type: "select",
      label: "Trans Type",
      list: categoryList,
      modelValue: params.category,
      change: (val: any) => {
        params.category = val
      },
    },
    {
      type: "select",
      label: "Trans List",
      list: statusList,
      modelValue: params.outIn,
      change: (val: any) => {
        params.outIn = val
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
// table list
const tableColumnKeys = computed(() => {
  return [
    {
      label: "Time",
      prop: "createdAt",
      custom: ({ row }: { row: AccountItem }) => {
        return h("span", {}, time(row.createdAt))
      },
    },
    {
      label: "Trans Type",
      prop: "status",
      custom: ({ row }: { row: AccountItem }) => {
        return h("span", {}, getTitle(categoryList?.value, row.category))
      },
    },
    {
      label: "Trans List",
      prop: "status",
      custom: ({ row }: { row: AccountItem }) => {
        return h("span", {}, getTitle(statusList?.value, row.outIn))
      },
    },

    {
      label: "Amount",
      prop: "coin",
      custom: ({ row }: { row: AccountItem }) => {
        return h(
          "span",
          {
            class: {
              "is-success": row.outIn === 1,
              "is-fail": row.outIn !== 1,
            },
          },
          row.coin
        )
      },
    },
    { label: "Previous Balance", prop: "coinBefore" },
    { label: "Current Balance", prop: "coinAfter" },
  ]
})
const getData = async () => {
  const parameters = {
    current: page.page,
    data: {
      category: params.category,
      outIn: params.outIn,
      startTime: params.time?.[0] ?? "",
      endTime: params.time?.[1] ?? "",
    },
    size: page.size,
  }
  try {
    const url = "getCoinLogList"
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
const inquire = () => {
  page.page = 1
  getData()
}
onMounted(() => {
  getData()
})
</script>

<style scoped></style>
