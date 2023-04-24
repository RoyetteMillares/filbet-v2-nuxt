<template>
  <section>
    <ViewsMyAccountCardList />
    <ViewsMyAccountSet />
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  ...RouteRecord.MyAccount,
})
</script>

<style scoped></style>
