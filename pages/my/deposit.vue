<template>
  <div>
    <ViewsMyDepositProfile />
    <ViewsMyDepositSubmit />
    <ViewsMyDepositVideo />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  ...RouteRecord.Deposit,
})
</script>

<style scoped></style>
