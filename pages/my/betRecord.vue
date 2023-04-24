<template>
  <section>
    <ViewsMyWalletInquire :search-list="searchList" @inquire="inquire">
      <p class="text-20px font-600 <md:hidden">Bet Record</p>
    </ViewsMyWalletInquire>
    <ViewsMyBetRecordStatistics :statisticsInfo="statisticsInfo" />
    <ViewsMyBetRecordTable
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
  ...RouteRecord.BetRecord,
})

const { t } = useLang()
const page = reactive({
  page: 1,
  size: 20,
  total: 0,
})
const params = reactive({
  status: "",
  gameId: "",
  time: [],
})
const statisticsInfo = shallowRef({}) as Ref<StatisticsInfoType> // 统计数据
const statusList = computed(() => {
  let list = [{ title: t("public.All"), code: "" }]
  list = list.concat(getDirection("dic_bet_status") || [])
  return list
})
const tableData = shallowRef([]) as unknown as Ref<BetRecord[]>
const { getTitle, getDirection } = useDictionary()
const categoryList = computed(() => {
  let list = [{ title: t("public.All"), code: "" }]
  list = list.concat(getDirection("dic_game_id_name") || [])

  return list
})
// 搜索list
const searchList = computed(() => {
  return reactive([
    {
      type: "select",
      label: "Game Platform",
      list: categoryList,
      modelValue: params.gameId,
      change: (val: any) => {
        params.gameId = val
      },
    },
    {
      type: "select",
      label: "Status",
      list: statusList,
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
// table list
const tableColumnKeys = computed(() => {
  return [
    {
      label: "Time",
      prop: "createdAt",
      custom: ({ row }: { row: BetRecord }) => {
        return h("span", {}, time(row.createdAt))
      },
    },
    {
      label: "ID",
      prop: "id",
    },
    {
      label: "Game Name",
      prop: "status",
      custom: ({ row }: { row: BetRecord }) => {
        return h("span", {}, getTitle(categoryList.value, row.gameId))
      },
    },
    {
      label: "Balance",
      prop: "coinBefore",
    },
    {
      label: "Bet Amount",
      prop: "stake",
    },
    {
      label: "Payout",
      prop: "payout",
    },
    {
      label: "Status",
      prop: "payout",
      custom: ({ row }: { row: BetRecord }) => {
        return h("span", {}, getTitle(statusList.value, row.xbStatus))
      },
    },
    // getTitle(statusList, row.xbStatus)
  ]
})
const getData = async () => {
  const parameters = {
    current: page.page,
    data: {
      status: params.status,
      gameId: params.gameId,
      startTime: params.time?.[0] ?? "",
      endTime: params.time?.[1] ?? "",
    },
    size: page.size,
  }
  try {
    const url = "betLists"
    const { code, data } = await HttpInstance.post(url, parameters)
    if (code === 0) {
      tableData.value = data.list
      page.total = +data.total
    }
  } catch (e) {
    console.log(e)
  }
}
const getStatistics = async () => {
  try {
    const parameters = {
      status: params.status,
      gameId: params.gameId,
      startTime: params.time?.[0] ?? "",
      endTime: params.time?.[1] ?? "",
    }
    const { code, data } = await HttpInstance.post("betStatistics", parameters)
    if (code === 0) statisticsInfo.value = data
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
  getStatistics()
}
onMounted(() => {
  getData()
  getStatistics()
})
</script>

<style scoped></style>
