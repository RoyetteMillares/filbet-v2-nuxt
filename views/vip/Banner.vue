<template>
  <section class="mb-50px <md:(mb-30px)">
    <div class="relative">
      <CommonAsset
        name="images-vip-vip-banner"
        class="w-full h-full object-cover absolute top-0 left-0"
      />
      <div
        class="relative max-w-1440px min-h-500px p-40px mx-auto flex flex-col justify-center <xl:(min-h-400px) <lg:(min-h-300px p-20px) <md:(min-h-250px) <sm:(min-h-200px)"
      >
        <h1
          class="text-$v-vip-text text-44px font-bold mb-40px <xl:(text-38px) <lg:(text-32px mb-30px) <md:(text-28px mb-20px) <sm:(text-16px)"
        >
          Welcome to the Club!
        </h1>
        <p
          class="w-[45%] text-$v-vip-text text-24px font-medium <xl:(w-[50%] text-20px) <lg:(text-18px) <md:(hidden)"
        >
          Exclusive Membership for Crypto Players! Whether you are on a hot
          streak or grinding hard, becoming a member of our FILBET Club will
          open the door to dazzling rewards and prizes.
        </p>
        <CommonButton
          v-if="!isLogin"
          class="hidden <md:(flex w-250px px-3px py-10px !rounded-[8px] font-medium text-16px) <sm:(w-140px text-12px)"
          @click="useUserStore().MODIFY_TYPE('signIn')"
        >
          <p>Join Now</p>
        </CommonButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"
const isLogin = computed(() => useUserStore().isLogin)
</script>
