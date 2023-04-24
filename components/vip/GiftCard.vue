<script setup lang="ts">
const props = defineProps<{
  giftData: {
    id: string
    date: string
    img: string
    benefitTyeText: string
    benefitTyeTitle: string
    amount: string | number
    amountLabel: string
    status: number
  }
}>()
const emit = defineEmits(["receive"])
</script>

<template>
  <div class="bg-$v-vip-gift-card px-3 py-4 rounded-md">
    <div class="flex items-center justify-between">
      <p class="text-11px">{{ props.giftData.id }}</p>
      <p class="text-11px">
        {{ props.giftData.date }}
      </p>
    </div>
    <div class="flex items-center justify-between my-20px">
      <div class="flex items-center">
        <div class="bg-$v-vip-gift p-12px rounded-md flex items-center mr-2">
          <CommonAsset class="w-[21px] h-[21px]" :name="props.giftData.img" />
        </div>
        <div>
          <p class="text-$v-vip-text text-12px font-medium mb-8px">
            {{ props.giftData.benefitTyeText }}
          </p>
          <p class="text-$v-vip-reward-text text-[10px]">
            {{ props.giftData.benefitTyeTitle }}
          </p>
        </div>
      </div>
      <div>
        <p class="text-$v-vip-text text-12px font-medium text-right mb-8px">
          {{ props.giftData.amount }}
        </p>
        <p class="text-$v-vip-reward-text text-[10px]">
          {{ props.giftData.amountLabel }}
        </p>
      </div>
    </div>
    <div v-if="props.giftData.status === 0">
      <CommonButton
        class="w-full h-36px !rounded-6px"
        @click="emit('receive', props.giftData.id)"
      >
        Received
      </CommonButton>
    </div>
    <div v-else-if="props.giftData.status === 1">
      <CommonButton
        disabled
        class="w-full h-36px !rounded-6px !text-$v-vip-received-text"
      >
        Receive
      </CommonButton>
    </div>
    <div v-else-if="props.giftData.status === 2">
      <CommonButton
        disabled
        class="w-full h-36px !rounded-6px !text-$v-vip-expired-text"
      >
        Expired
      </CommonButton>
    </div>
  </div>
</template>
