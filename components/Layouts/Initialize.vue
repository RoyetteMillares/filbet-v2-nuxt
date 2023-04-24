<template>
  <slot />
</template>
<script setup lang="ts">
import { useAppStore } from "~/stores/app"
import { useUserStore } from "~/stores/user"
import { StoreTypes } from "~/types/store"
// import { dialogConfirm } from "~/components/custom-dialog/custom"

import { useMessage } from "~/stores/message"

const userStore = useUserStore()
const appAppStore = useAppStore()
const message = useMessage()
const route = useRoute()
const { setValue } = useStorage()

// initialize

// 初始化存入邀请码
const initPromoCode = () => {
  if (route.query.promoCode) {
    setValue("promoCode", route.query?.promoCode as unknown as string)
  }
}

appAppStore.GET_DICTIONARY()
appAppStore.GET_CONFIG()
onMounted(async () => {
  // appAppStore.GET_DICTIONARY()
  // appAppStore.GET_CONFIG()
  await initPromoCode()
  if (getToken()) {
    try {
      await userStore.GET_USER_PROFILE()
      await message.GET_NOTICE_COUNT()
    } catch (e) {
      console.log(e)
    }
    //
  }
})
</script>
