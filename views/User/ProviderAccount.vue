<template>
  <div class="gaf">
    <div class="flex items-center justify-between">
      <div class="text-14px items-center flex">
        <div class="text-35px"><CommonSvgIcon name="facebook" /></div>

        <span>Link with Facebook</span>
      </div>
      <div
        class="flex items-center cursor-pointer"
        :class="{ 'pointer-events-none': providerInfo.facebookUserId }"
        @click="bindingUrl(2)"
      >
        <span>{{ providerInfo.facebookUserId || "Link" }} </span>
        <div class="transform rotate-180 flex">
          <CommonSvgIcon name="back" />
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-20px">
      <div class="text-14px items-center flex">
        <div class="text-35px"><CommonSvgIcon name="google" /></div>
        <span>Link with Google</span>
      </div>
      <div
        class="flex items-center cursor-pointer"
        :class="{ 'pointer-events-none': providerInfo.googleLoginEmail }"
        @click="bindingUrl(2)"
      >
        <span>{{ providerInfo.googleLoginEmail || "Link" }} </span>
        <div class="transform rotate-180 flex">
          <CommonSvgIcon name="back" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGoogle } from "~/stores/google"
import { useUserStore } from "~/stores/user"

const google = useGoogle()
const providerInfo = computed(() => google.providerInfo)
const userStore = useUserStore()
const { setValue, getValue } = useStorage()

const data = reactive<{ thirdType: number | string; device: string }>({
  thirdType: 1,
  device: "d",
})
function bindingUrl(thirdType: number | string) {
  setValue("thirdType", thirdType as string)
  thirdLogin()
}
async function thirdLogin() {
  const res: any = await userStore.PROVIDER_BINDING({
    ...data,
  })
  if (res.code === 0) {
    location.href = res.data
  }
}
onMounted(() => {
  google.GET_PROVIDER_INFO()
})
</script>

<style scoped></style>
