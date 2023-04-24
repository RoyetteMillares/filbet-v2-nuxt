<template>
  <section>
    <ViewsMyAccountCardList class="card-list">
      <template #title>
        <p class="mb-20px font-600 text-16px <sm:(text-12px mb-10px)">
          Choose a Withdrawal Card
        </p>
      </template>
    </ViewsMyAccountCardList>
    <ViewsMyWithdrawConfirm />
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["withdraw"],
  ...RouteRecord.Withdraw,
})
</script>

<style lang="scss" scoped>
.card-list {
  background: #263642;
}
</style>
