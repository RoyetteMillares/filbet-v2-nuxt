<template>
  <section class="login-page form-container mt-40px <sm:(mt-20px)">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      status-icon
    >
      <ElFormItem prop="oldPassword" label="Old Password">
        <ElInput
          type="password"
          show-password
          v-model="ruleForm.oldPassword"
          placeholder="Old Password"
        />
      </ElFormItem>
      <ElFormItem prop="password" label="Password">
        <ElInput
          v-model="ruleForm.password"
          type="password"
          show-password
          placeholder="Enter New Password"
        />
      </ElFormItem>
      <ElFormItem prop="confirmPassword" label="Confirm Password">
        <ElInput
          v-model="ruleForm.confirmPassword"
          type="password"
          show-password
          placeholder="Confirm New Password"
        />
      </ElFormItem>
      <ElFormItem>
        <CommonButton
          :loading="loading"
          class="login-button w-full justify-center"
          type="primary"
          @click.prevent="submitLogin"
        >
          Confirm
        </CommonButton>
      </ElFormItem>
    </ElForm>
    <!--    <VerifitionVerify-->
    <!--      :request="request"-->
    <!--      @success="() => {}"-->
    <!--      mode="pop"-->
    <!--      :captchaType="'blockPuzzle'"-->
    <!--      :imgSize="{ width: '330px', height: '155px' }"-->
    <!--      ref="verify"-->
    <!--    />-->
  </section>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElSelect, ElInput, ElOption } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"
import { useUserStore } from "~/stores/user"

const { checkPassword, checkMobile, checkVerify } = useCheck()
const { cityList } = useCityList()

const checkConfirmPassword = (
  rule: any,
  value: string,
  cb: (arg?: string) => void
) => {
  if (value) {
    if (isPassword(value) && value === ruleForm.password) cb()
    else cb(t("validator.text05"))
  } else cb(t("validator.text06"))
}
const rules: FormRules = {
  oldPassword: [{ required: true, validator: checkPassword, trigger: "blur" }],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
  confirmPassword: [
    { required: true, validator: checkConfirmPassword, trigger: "blur" },
  ],
}
const { t } = useLang()
const user: any = useUserStore()

type RuleFormType = {
  password: string
  oldPassword: string
  confirmPassword: string
}
const loading = shallowRef<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm: RuleFormType = reactive({
  password: "",
  oldPassword: "",
  confirmPassword: "",
})

const submitLogin = () => {
  ruleFormRef?.value?.validate(async (v: boolean) => {
    if (v) {
      const { code } = await user.RESET_PASSWORD({
        ...ruleForm,
        category: 1,
      })
      if (code === 0) {
        ruleFormRef?.value?.clearValidate()
        ruleForm.password = ""
        Notify({
          title: "Successfully",
          message: "Reset Successfully,please login again",
          type: "success",
          duration: 1000,
          position: "top-left",
        })
        user.MODIFY_TYPE("")
        const logoutCode = await user.LOGOUT()
        if (logoutCode === 0) {
          user.MODIFY_TYPE("signIn")
        }
      }
    }
  })
}

const toSignIn = () => {
  user.MODIFY_TYPE("signIn")
}
</script>

<style lang="scss" scoped>
@import "form.container";
.form-container {
  @include formContainer;
  .get-code {
    color: var(--v-form-get-color);
  }
  .forbidden-send {
    color: rgba(255, 255, 255, 0.4);
    cursor: not-allowed;
    pointer-events: none;
    .get-code {
      color: var(--v-form-forbidden-text-color);
      margin-left: 8px;
    }
  }
}
</style>
