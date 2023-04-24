<template>
  <div class="auth-modal">
    <div
      class="auth-code rounded-8px inline-block md:(p-20px rounded-8px flex gap-16px items-center)"
    >
      <div class="show-code inline-block rounded-8px">
        <div class="rounded-8px overflow-hidden">
          <CommonQrcode
            v-if="googleInfo.qrCode"
            class="w-117px h-117px rounded-8px"
            :value="googleInfo.qrCode"
          />
        </div>
      </div>
      <div class="flex-1 text-left">
        <p class="text-14px font-400">
          To Activate, Scan the Qr Code Or Enter The Code Manually.
        </p>
        <div
          @click="copy(googleInfo.secret)"
          class="secret-key text-12px cursor-pointer mt-20px md:(flex flex-wrap-wrap items-center)"
        >
          <p class="text-14px">key value:</p>
          <p class="text-12px">{{ googleInfo.secret }}</p>
        </div>
      </div>
    </div>
    <CommonButton
      class="login-button w-full justify-center mt-40px <md:(mt-30px)"
      type="primary"
      @click.prevent="openInputGoogleCode"
    >
      Next
    </CommonButton>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"
import { useGoogle } from "~/stores/google"
import { StoreTypes } from "~/types/store"
import { Ref } from "vue"

const user = useUserStore()
const google = useGoogle()
const { setValue } = useStorage()

const googleInfo = computed(
  () => ({ qrCode: google.qrCode, secret: google.qrCode })
) as unknown as Ref<StoreTypes.Google.GoogleInfo>
// 开启输入谷歌验证码弹框
const openInputGoogleCode = () => {
  user.MODIFY_TYPE("authGoogleCode")
}
onMounted(async () => {
  const code = await google.GET_GOOGLE_CODE()
  if (code === 0) {
    setValue("secret", googleInfo.value?.secret as string)
  }
})
</script>

<style lang="scss" scoped>
.auth-modal {
  .auth-code {
    @screen md {
      background: #0d1c29;
    }
    .show-code {
      background: #344452;
    }
  }
  .secret-key {
    color: #1999ee;
  }
}
</style>
