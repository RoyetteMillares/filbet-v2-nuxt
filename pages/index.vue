<script lang="ts" setup>
import { StoreTypes } from "~/types/store"
import { Notify } from "~/composables/notification"
import { useUserStore } from "~/stores/user"
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

definePageMeta(RouteRecord.Home)
// 初始化三方登录
const initConfig = async () => {
  if (route.query.code) {
    const thirdType = useCookie("thirdType")
    if (thirdType.value) {
      const params: StoreTypes.User.providerLogin = {
        authCode: route?.query?.code,
        thirdType: thirdType.value,
        device: "d",
      }
      try {
        const { code, data } = await userStore.SAVE_PROVIDER_INFO(params)
        if (code === 0) {
          if (Number(data.type) === 1) {
            userStore.InitInfo(data.userInfoResDto)
            setTimeout(() => {
              router.replace("/")
            })
          } else {
            Notify({
              title: "Error",
              message: "Login Failed",
              duration: 1000,
              position: "top-left",
            })
          }
        }
      } catch (e) {
        Notify({
          title: "Error",
          message: "Login Failed",
          duration: 1000,
          position: "top-left",
        })
      }
    }
  }
}
onMounted(() => {
  initConfig()
})
</script>

<template>
  <Template_Root>
    <LazyViewsHomeBanner />
    <LazyViewsHomeAnnouncement />
    <LazyViewsHomeGameSearch />
    <LazyViewsHomeGameClassification />
    <LazyViewsHomeGameClassifyList />
    <ViewsHomeJackpot class="mb-44px" />
    <LazyViewsHomeProfitLeaderboard />
  </Template_Root>
</template>
<style lang="scss"></style>
