<script setup lang="ts">
import { dayjs } from "element-plus"
import { useAffiliateStore } from "~~/stores/affilate"

const store = useAffiliateStore()
const data = computed(() => store.commissionRecords?.list)
type DataType = Exclude<typeof store.commissionRecords, null>["list"]["0"]

const schema: DefineTableSchema<DataType> = {
  username: {
    label: "Username",
    format(data: string) {
      const output = [
        ...data.slice(0, 3),
        "*******",
        ...data.slice(data.length - 3, data.length),
      ].join("")
      return output
    },
    slot: true,
  },
  agentLevel: {
    label: "Agency Level",
    format(data: string) {
      return `Level ${data}`
    },
  },
  commissionUsd: {
    label: "Commission",
    format(data: number) {
      return Number(data).toFixed(2)
    },
  },
  createdAt: {
    label: "Register Date",
    format(data: number) {
      return dayjs(Number(data)).format("MM-DD-YYYY")
    },
  },
}
const options = [
  {
    label: "Ascending",
    value: "ASC",
  },
  {
    label: "Descending",
    value: "DESC",
  },
]
const type = ref<"ASC" | "DESC">("ASC")
const startDate = ref(new Date())
const endDate = ref(new Date())
const onFilterClick = async () => {
  const __startDate = dayjs(startDate.value).startOf("d").unix()
  const __endDate = dayjs(endDate.value).startOf("d").unix()

  await store.GET_COMMISSION_RECORDS({
    current: 1,
    data: {
      startTime: __startDate,
      endTime: __endDate,
    },
    size: 10,
    sortKey: type.value,
  })
}
</script>

<template>
  <CommonTableV2
    :data="data"
    :schema="schema"
    class="flex flex-col gap-1.8em text-14px <sm:(text-10px)"
  >
    <template #header>
      <client-only>
        <div
          class="flex justify-center items-center justify-between w-full <md:(flex-col justify-start children:text-left children:w-full space-y-1em)"
        >
          <div class="text-gray-300 text-20px whitespace-nowrap font-semibold">
            Commission Details
          </div>
          <div
            class="inline-flex justify-end items-center space-x-0.5em font-bold text-gray-300 text-14px <sm:(gap-2px text-10px justify-start) w-full"
          >
            <div>Type</div>
            <CommonSelection v-model="type" class="w-1/4" :options="options" />
            <div>Date</div>
            <CommonDateSelection
              v-model="startDate"
              placeholder="Start Date"
              class="w-1/5"
            />
            <div>-</div>
            <CommonDateSelection
              v-model="endDate"
              placeholder="End Date"
              class="w-1/5"
            />
            <AffiliateFilterButton
              class="text-10px <sm:(text) w-1/5"
              @click="onFilterClick"
            >
              Filter
            </AffiliateFilterButton>
          </div>
        </div>
      </client-only>
    </template>
    <template #column="{ cell }">
      {{ cell }}
    </template>
    <template #column-username="{ cell }">
      <b class="font-mono">{{ cell }}</b>
    </template>
    <template #footer> </template>
  </CommonTableV2>
</template>

<style lang="scss" scoped></style>
