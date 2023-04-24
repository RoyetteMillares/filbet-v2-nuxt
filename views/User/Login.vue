<template>
  <section class="login-page form-container mt-40px <sm:(mt-20px)">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      status-icon
    >
      <ElFormItem prop="username" label="Username or Phone no.">
        <ElInput
          v-model="ruleForm.username"
          :placeholder="t('mine.UsernameOrEmail')"
        />
      </ElFormItem>
      <ElFormItem prop="password" label="Password">
        <ElInput
          v-model="ruleForm.password"
          type="password"
          show-password
          :placeholder="t('mine.Password')"
        />
      </ElFormItem>

      <ElFormItem>
        <CommonButton
          :loading="loading"
          class="login-button w-full justify-center"
          type="primary"
          @click.prevent="submitLogin"
          >{{ t("mine.SignIn") }}
        </CommonButton>
      </ElFormItem>
      <ViewsUserProviderLogin />

      <p
        class="forgot-text cursor-pointer mt-30px text-14px font-600 <sm:(mt-20px) @sm:(mt-25px) @md:(mt-27px)"
        @click="toOpen('forgotPassword')"
      >
        {{ t("mine.ForgotPassword") }}
      </p>
      <div class="is-have mt-20px">
        <span>{{ t("mine.DontHaveAccount") }}</span>
        <span
          class="is-active cursor-pointer font-700 ml-5px"
          @click="toOpen('signUp')"
          >{{ t("mine.CreateAccount") }}</span
        >
      </div>
    </ElForm>
  </section>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"
import { useUserStore } from "~/stores/user"

const { checkUsername, checkPassword } = useCheck()
const rules: FormRules = {
  username: [{ required: true, validator: checkUsername, trigger: "blur" }],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
}
const { t } = useLang()
const user: any = useUserStore()
type CustomListType = {
  title: string
  component: any
  key: string
}
type RuleFormType = {
  username: string
  password: string
}
const loading = shallowRef<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm: RuleFormType = reactive({
  username: "",
  password: "",
})
const submitLogin = () => {
  ruleFormRef?.value?.validate(async (v: boolean) => {
    if (v) {
      const { code } = await user.LOGIN({ ...ruleForm })
      if (code === 0) {
        ruleFormRef?.value?.clearValidate()
        ruleForm.username = ""
        ruleForm.password = ""
        user.MODIFY_TYPE("")
      }
    }
  })
}
const toOpen = (type: string) => {
  user.MODIFY_TYPE(type)
}
</script>

<style lang="scss" scoped>
@import "form.container";
.form-container {
  @include formContainer;
}
</style>
