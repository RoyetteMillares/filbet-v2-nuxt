<template>
  <div>
    <LazyViewsVipMemberDashboard />
    <LazyViewsVipLevelBenefits />
    <LazyViewsVipRewardTable />
  </div>
</template>

<script setup lang="ts">
import { useVipStore } from "~/stores/vip"
definePageMeta(RouteRecord.VipCenter)
const VipStore = useVipStore()
await VipStore.GET_User_Level_Info()
</script>

<style lang="scss"></style>
