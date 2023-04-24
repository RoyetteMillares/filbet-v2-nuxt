<template>
  <div class="grid <lg:(grid-cols-1 gap-12px) grid-cols-5 gap-24px">
    <ViewsMyWalletAssets class="col-span-3 <lg:(col-span-1)" />
    <ViewsMyWalletBalance class="col-span-2 <lg:(col-span-1)" />
  </div>
</template>

<script>
export default {
  name: "info",
}
</script>

<style scoped></style>
