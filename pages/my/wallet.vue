<template>
  <section>
    <ViewsMyWalletInfo />
    <ViewsMyWalletRecord />
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  ...RouteRecord.Wallet,
})
</script>

<style scoped></style>
