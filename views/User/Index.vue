<template>
  <client-only>
    <CustomDialog
      v-show="typeInfo.component"
      v-model="showVisible"
      :show-footer="false"
      :title="typeInfo.title"
      :before-close="beforeClose"
    >
      <component :is="typeInfo.component"> </component>
    </CustomDialog>
  </client-only>
</template>

<script setup lang="ts">
import { Ref } from "vue"
import { useUserStore } from "~/stores/user"
type ComponentType = {
  title: string
  key: string
  component: HTMLBaseElement
}

const UserStore = useUserStore()
const Login = resolveComponent("ViewsUserLogin")
const Register = resolveComponent("ViewsUserRegister")
const ForgetPassword = resolveComponent("ViewsUserForgetPassword")
const CreateCard = resolveComponent("ViewsUserCreateCard")
const ChangePassword = resolveComponent("ViewsUserChangePassword")
const ChangeMobile = resolveComponent("ViewsUserChangeMobile")
const Authenticator = resolveComponent("ViewsUserAuthenticator")
const AuthGoogleCode = resolveComponent("ViewsUserAuthGoogleCode")
const KycSetting = resolveComponent("ViewsUserKycSetting")
const ProviderAccount = resolveComponent("ViewsUserProviderAccount")

const modelValue = shallowRef<boolean>(false)

// watch(
//   () => UserStore.dialogType,
//   (val) => {
//     !!val ? (modelValue.value = true) : (modelValue.value = false)
//   }
// )
const showVisible = computed({
  get() {
    return !!UserStore.dialogType
  },
  set(val) {
    UserStore.MODIFY_TYPE("")
  },
})
const componentTypeList = [
  {
    title: "Sign In",
    component: Login,
    key: "signIn",
    confirmText: "Sign In",
  },
  {
    title: "Create an Account",
    component: Register,
    key: "signUp",
  },
  {
    title: "Forgot Password",
    component: ForgetPassword,
    key: "forgotPassword",
  },
  {
    title: "Add Address",
    component: CreateCard,
    key: "createCard",
  },
  {
    title: "Password",
    component: ChangePassword,
    key: "changePassword",
  },
  {
    title: "Mobile",
    component: ChangeMobile,
    key: "changeMobile",
  },
  {
    title: "Google Authenticator",
    component: Authenticator,
    key: "authenticator",
  },
  {
    title: "Google Authenticator",
    component: AuthGoogleCode,
    key: "authGoogleCode",
  },
  {
    title: "KYC Setting",
    component: KycSetting,
    key: "kycSetting",
  },
  {
    title: "Set",
    component: ProviderAccount,
    key: "providerAccount",
  },
] as ComponentType[]

// 组件详情
const typeInfo = computed(
  () =>
    componentTypeList.find(
      (item: ComponentType) => item.key === UserStore.dialogType
    ) ?? {}
) as unknown as Ref<ComponentType>

// 关闭之前
const beforeClose = () => {
  UserStore.MODIFY_TYPE("")
}
onMounted(() => {
  const { dialogType } = useRoute().query
  if (dialogType) {
    UserStore.MODIFY_TYPE(dialogType as string)
  }
})
</script>

<style scoped></style>
