<script setup lang="ts">
import { useVipStore } from "~/stores/vip"
const VipStore = useVipStore()
const router = useRouter()
</script>
<template>
  <div class="max-w-1440px mx-auto my-40px <lg:(my-30px) <sm:(my-20px)">
    <div class="bg-$v-vip-dashboard rounded-16px p-32px <lg:(py-16px)">
      <div
        class="flex items-center justify-between <sm:(flex-col items-center)"
      >
        <div class="flex items-center <sm:(mb-20px)">
          <CommonAsset
            class="mr-16px <xl:(w-120px mr-10px) <sm:(w-100px)"
            name="images-vip-level-badge-1"
          />
          <div>
            <p class="text-20px mb-10px <xl:(text-16px) <sm:(text-14px)">
              Current Level: {{ VipStore.userLevelInfo?.name ?? "VIP0" }}
            </p>
            <div class="flex <lg:(flex-col)">
              <p
                class="text-20px mr-40px <xl:(text-16px) <lg:(mb-10px) <md:(text-12px)"
              >
                Recharge: ₱ {{ VipStore.userLevelInfo?.betSum ?? "0.00" }}
              </p>
              <p class="text-size-[20px] <xl:(text-16px) <md:(text-12px)">
                Valid Betting: ₱
                {{ VipStore.userLevelInfo?.depositSum ?? "0.00" }}
              </p>
            </div>
          </div>
        </div>
        <CommonButton
          class="w-230px <xl:(w-190px) <lg:(w-170px h-38px) <sm:(h-30px !rounded-8px)"
          @click="router.push({ name: 'VipDetail' })"
        >
          View VIP Details
        </CommonButton>
      </div>
      <div>
        <LazyViewsVipLevelProgressBar />
      </div>
      <LazyViewsVipLevelInfo />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
