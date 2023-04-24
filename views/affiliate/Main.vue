<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const id = route.params.id
</script>

<template>
  <div class="affliate-main w-full">
    <div class="affliate-main-info">
      <ViewsAffiliateMainMyWallet class="row-span-2 <md:row-span-1" />
      <ViewsAffiliateMainTeamBenefits class="" />
      <ViewsAffiliateMainYourInviteCode class="" />
    </div>
    <ViewsAffiliateMainCommissionRecords
      class="affliate-main-record w-full p-40px gap-40px <md:p-12px <md:gap-12px <md:grid-rows-3 <md:grid-cols-1 children:w-full"
    />
  </div>
</template>

<style lang="scss" scoped>
.affliate-main-info {
  @apply w-full grid grid-cols-2 grid-rows-2 flex-nowrap p-40px gap-40px children:w-full;
  @apply <md:(flex flex-col p-12px gap-12px);
}
.affliate-main-record {
}
</style>
