<template>
  <div
    class="my-page mt-40px <sm:(mt-12px) @sm:(mt-16px) @md:(mt-22px) @lg:(mt-30px)"
  >
    <CommonTab
      :model-value="$route.name"
      class="!p-0 mb-30px <sm:(mb-12px top-42px) @sm:(mb-16px top-50px) @md:(mb-20px top-55px) @lg:(mb-24px top-60px) sticky top-64px z-10"
      :list="tabList"
      @change="changeRoute"
    />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue"
import { useMessage } from "~/stores/message"

definePageMeta({
  redirect: { name: "Wallet" },
  middleware: ["auth"],
  ...RouteRecord.My,
})
type RouteInfo = {
  label: string
  value: RouteName
}
const message = useMessage()
const messageCount = computed(() => message.noticeCount || 0)
const modelValue = shallowRef<string>("Wallet")
const route = useRoute()
const router = useRouter()
const routeName = computed(() => route.name)

const tabList = computed(() => {
  return [
    { label: "Deposit", value: "Deposit" },
    { label: "Withdraw", value: "Withdraw" },
    { label: "My Wallet", value: "Wallet" },
    { label: "Account History", value: "AccountHistory" },
    { label: "Bet Record", value: "BetRecord" },
    { label: "Information", value: "Information", count: messageCount.value },
    { label: "My Account", value: "MyAccount" },
  ]
}) as Ref<RouteInfo[]>
const initRouteName = () => {
  try {
    const name = tabList.value.find(
      (item) => item.value === routeName.value
    )?.value
    if (name) modelValue.value = name
  } catch (e) {}
}
const changeRoute = (item: RouteInfo) => {
  router.push({ name: item.value })
}
initRouteName()
</script>

<style scoped></style>
