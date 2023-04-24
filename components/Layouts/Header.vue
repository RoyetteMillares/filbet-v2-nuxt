<template>
  <div class="layout-header sticky top-0 left-0 z-10">
    <div
      class="flex px-40px justify-between items-center main-header full-width py-16px <sm:(py-8px px-18px) @sm:(py-10px) @md:(py-12px px-20px) @lg:(py-14px px-30px) flex items-center justify-between"
    >
      <div class="flex">
        <div class="">
          <img
            v-show="$route.name === 'Home'"
            class="show-logo md:hidden <sm:flex w-118px"
            :src="PLAT_LOGO"
          />
        </div>
        <div
          @click="router.back()"
          v-show="$route.name !== 'Home'"
          class="md:hidden"
        >
          <CommonSvgIcon
            name="back"
            class="show-logo cursor-pointer <sm:flex"
          />
        </div>
      </div>

      <!--      un login-->
      <section v-if="!isLogin" class="flex items-center">
        <div
          class="text-14px cursor-pointer font-500 px-24px py-14px text-14px <sm:(px-8px py-6px text-14px) @sm:(px-12px py-8px) @md:(px-16px py-12px) @lg:(px-20px py-13px) font-600"
          @click="openDialog('signIn')"
        >
          Sign in
        </div>
        <div
          class="rounded-12px cursor-pointer px-24px py-14px text-14px <sm:(px-8px py-6px text-14px rounded-6px) @sm:(px-12px py-8px) @md:(px-16px py-12px) @lg:(px-20px py-13px) font-600 to-register"
          @click="openDialog('signUp')"
        >
          Register
        </div>
      </section>
      <!--      loggined-->
      <section
        v-else
        class="flex items-center user-info cursor-pointer"
        @click="pageTo('My')"
      >
        <div
          class="relative flex font-700 px-17px py-8px text-16px <sm:(px-12px font-500 py-7px text-12px rounded-13px pr-40px) pr-50px rounded-18px s-balance"
        >
          <span>₱ {{ userStore.info?.coin || "0.00" }}</span>
          <div
            class="absolute currency-icon rounded-5px right-0 top-0 p-8px <sm:(p-5px text-14px) text-17px"
          >
            <CommonSvgIcon name="wallet" />
          </div>
        </div>
        <!--        签到图标-->
        <div
          class="flex cursor-pointer <sm:(text-20px) justify-center text-28px <sm:(ml-10px) ml-15px items-center"
        >
          <CommonSvgIcon name="Bell" />
        </div>
        <div
          class="flex cursor-pointer relative justify-center <sm:(text-20px) text-28px <sm:(ml-10px) ml-15px items-center"
        >
          <CommonSvgIcon name="notify" />
          <span
            v-show="messageCount > 0"
            class="w-7px rounded-5px h-7px absolute right-2px top-2px notify-icon"
          ></span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"
import { useMessage } from "~/stores/message"

const router = useRouter()
const message = useMessage()
const { PLAT_LOGO } = useConfig()
const userStore = useUserStore()
const isLogin = computed(() => userStore?.isLogin)
const openDialog = (type: string) => {
  userStore.MODIFY_TYPE(type)
}
const messageCount = computed(() => message.noticeCount || 0)
const pageTo = (name: RouteName) => {
  router.push({ name })
}
</script>

<style lang="scss" scoped>
.layout-header {
  width: 100%;
  background: var(--v-m);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  .to-register {
    background: var(--v-header-regiter-bg);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: var(--v-header-register-color);
    animation: shadowZoom 1s infinite;
  }
  .s-balance {
    background: var(--v-header-balance-bg);
  }
  .user-info {
    color: var(--v-header-color);
    .currency-icon {
      box-shadow: 0px 0px 5.71429px rgba(0, 0, 0, 0.25);
      background: var(--v-header-wallet-bg);
    }
    .notify-icon {
      background: #df342d;
    }
  }
}
</style>
