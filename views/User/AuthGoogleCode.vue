<template>
  <section class="login-page form-container mt-40px <sm:(mt-20px)">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      status-icon
    >
      <ElFormItem prop="googleCode" label="Code Verification">
        <ElInput
          type="number"
          v-model="ruleForm.googleCode"
          placeholder="Enter The Six Digit Code To Verify"
        />
      </ElFormItem>

      <ElFormItem>
        <CommonButton
          :loading="loading"
          class="login-button w-full justify-center"
          type="primary"
          @click.prevent="submitLogin"
        >
          Submit
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
import { useGoogle } from "~/stores/google"

const { getValue } = useStorage()
const google = useGoogle()
const { checkGoogleCode } = useCheck()

const rules: FormRules = {
  googleCode: [{ required: true, validator: checkGoogleCode, trigger: "blur" }],
}
const { t } = useLang()
const user: any = useUserStore()

type RuleFormType = {
  googleCode: string
}
const loading = shallowRef<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm: RuleFormType = reactive({
  googleCode: "",
})

const submitLogin = () => {
  ruleFormRef?.value?.validate(async (v: boolean) => {
    if (v) {
      const code = await google.BIND_GOOGLE_CODE({
        googleCode: +ruleForm.googleCode,
        secret: getValue("secret"),
      })
      if (code === 0) {
        ruleFormRef?.value?.clearValidate()
        Notify({
          title: "Successfully",
          message: "Successfully",
          type: "success",
          duration: 1000,
          position: "top-left",
        })
        user.GET_USER_PROFILE()
        user.MODIFY_TYPE("")
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
