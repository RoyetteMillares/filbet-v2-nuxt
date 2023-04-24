<script setup lang="ts">
const invitationCode = "ZIQMOW"
const invitationLink = ref("")

onMounted(() => {
  invitationLink.value = `${location.origin}?promoCode=${invitationCode}`
})
</script>

<template>
  <AffiliateCardPrimary title="Your Invite Code">
    <template #title>
      <div class="inline-block h-3.2em">
        <CommonQrcode
          v-if="!!invitationLink"
          class="<md:h-100px <md:w-100px h-167px w-167px"
          :value="invitationLink"
        />
      </div>
    </template>
    <template #content>
      <div class="w-3/5 <sm:w-full">
        <div class="text-12px space-y-20px <sm:space-y-12px">
          <div class="<sm:text-10px text-14px">Your Invitation Code</div>
          <AffiliateInputField class="max-w-full text-20px <sm:text-14px">
            {{ invitationCode }}
          </AffiliateInputField>
          <div class="<sm:text-10px text-14px">Your Invitation Link</div>
          <AffiliateInputField class="max-w-full text-20px <sm:text-14px">
            {{ invitationLink }}
          </AffiliateInputField>
        </div>
      </div>
    </template>
  </AffiliateCardPrimary>
</template>

<style lang="scss" scoped></style>
