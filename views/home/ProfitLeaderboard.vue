<template>
  <section>
    <CommonTab :model-value="modelValue" :list="list" @change="habdleChange" />
    <HomeRankTable :rank-list="rankList" />
  </section>
</template>
<script setup lang="ts">
import { useHomeStore } from "~/stores/home"
const HomeStore = useHomeStore()
const rankList = computed(() => HomeStore.rankList ?? [])
const modelValue = shallowRef<number>(0)
const params = reactive({ category: modelValue })
const list = [
  { label: "Top 10 Profit Leaderboard", value: 0 },
  { label: "Today’s Profit Leaderboard", value: 1 },
]
const getRankList = async () => {
  await HomeStore.GET_RANK(params)
}
getRankList()
const habdleChange = (item: { label: string; value: number }) => {
  modelValue.value = item.value
  getRankList()
}
</script>
<style></style>
