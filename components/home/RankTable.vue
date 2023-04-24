<template>
  <div class="table w-full my-[30px] <lg:my-[20px]">
    <div class="table-header-group">
      <div class="table-row">
        <div
          v-for="(item, idx) in headerList"
          :key="idx"
          class="table-cell text-[14px] px-[32px] py-[12px] text-center align-middle <lg:(text-[12px] px-[16px] py-[6px])"
          :class="item.class"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="table-row-group">
      <div
        v-for="(item, idx) in props.rankList"
        :key="idx"
        class="table-row"
        :class="{ 'bg-$v-rank-table-bg': idx % 2 === 0 }"
      >
        <div
          class="table-cell text-[14px] h-54px px-[32px] py-[12px] text-center align-middle rounded-l-[4px] <lg:(text-[12px] h-40px px-[16px] py-[6px])"
        >
          <CommonSvgImage v-if="idx < 3" :name="`rank${idx + 1}`" />
          <p v-else>{{ idx + 1 + "th" }}</p>
        </div>
        <div
          class="table-cell text-[14px] h-54px px-[32px] py-[12px] text-center align-middle <lg:(text-[12px] h-40px px-[16px] py-[6px])"
        >
          {{ obscureName(item.username) }}
        </div>
        <div
          class="table-cell text-[14px] h-54px px-[32px] py-[12px] text-center align-middle <lg:(text-[12px] h-40px px-[16px] py-[6px]) <md:(hidden)"
        >
          {{ item.groupName === null ? "-" : item.groupName }}
        </div>
        <div
          class="table-cell text-[14px] h-54px px-[32px] py-[12px] text-center align-middle <lg:(text-[12px] h-40px px-[16px] py-[6px]) <md:(hidden)"
        >
          -
        </div>
        <div
          class="table-cell text-[14px] h-54px px-[32px] py-[12px] text-center align-middle <lg:(text-[12px] h-40px px-[16px] py-[6px])"
        >
          {{ item.validStake }}
        </div>
        <div
          class="table-cell text-[14px] h-54px px-[32px] py-[12px] text-right align-middle rounded-r-[4px] <lg:(text-[12px] h-40px px-[16px] py-[6px])"
        >
          {{ item.profit }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const headerList = reactive([
  {
    text: "Rank",
    class: "w-100px",
  },
  {
    text: "User",
    class: "",
  },
  {
    text: "Game",
    class: "<md:(hidden)",
  },
  {
    text: "Time",
    class: "<md:(hidden)",
  },
  {
    text: "Bet Amount",
    class: "",
  },
  {
    text: "Profit",
    class: "text-right",
  },
])
type rankListType = {
  gameGroupId: number
  groupName: string
  profit: string
  username: string
  validStake: string
}
const props = defineProps<{
  rankList?: rankListType[]
}>()

const obscureName = (name: string) => {
  if (name.length < 4) return "****"
  return name.slice(0, 2) + "****" + name.slice(name.length - 2, name.length)
}
</script>
<style></style>
