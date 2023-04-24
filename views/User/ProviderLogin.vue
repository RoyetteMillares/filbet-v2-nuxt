<template>
  <section
    class="provider-login mt-20px <sm:(mt-10px) flex justify-center items-center"
  >
    <div class="show-or flex items-center">
      <div class="h-1px w-76px line-or"></div>
      <span class="mx-8px <sm:(mx-6px) text-14px font-400">Or</span>
      <div class="h-1px w-76px line-or"></div>
    </div>
    <div class="grid grid-cols-2 gap-20px mt-20px <sm:(mt-15px)">
      <div
        class="grid-item w-90px text-35px h-44px cursor-pointer flex items-center justify-center"
        @click="login(2)"
      >
        <CommonSvgIcon name="facebook" />
      </div>
      <div
        class="grid-item text-35px w-90px h-44px cursor-pointer flex items-center justify-center"
        @click="login(1)"
      >
        <CommonSvgIcon name="google" />
      </div>
    </div>
    <VerifitionVerify
      ref="verify"
      :request="thirdLogin"
      mode="pop"
      :captcha-type="'blockPuzzle'"
      :img-size="{ width: '330px', height: '155px' }"
      @success="() => {}"
    />
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()
const data = reactive<{ thirdType: number | string; device: string }>({
  thirdType: 1,
  device: "d",
})
// import HttpInstance from "~/request/server"
// import { HttpUseFetch, Response } from "~/types/http"

const { VERIFY_CODE } = useConfig()

const verify = ref()
const { setValue, getValue } = useStorage()

function login(thirdType: number | string) {
  data.thirdType = thirdType
  setValue("thirdType", thirdType as string)
  if (VERIFY_CODE.value === "1") verify.value.show()
  else thirdLogin({})
}
async function thirdLogin(para: {}) {
  const res: any = await userStore.PROVIDER_LOGIN({
    ...para,
    ...data,
  })
  if (res.code === 0) {
    location.href = res.data
  }
}
</script>

<style lang="scss" scoped>
.provider-login {
  flex-direction: column;
  .line-or {
    background: var(--v-form-line-bg);
  }
  .grid-item {
    background: url("../../assets/images/common/button.png") no-repeat center
      center;
    background-size: 100% 100%;
  }
}
</style>
