<template>
  <section class="login-page form-container mt-40px <sm:(mt-20px)">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      status-icon
    >
      <ElFormItem prop="mobile" label="Phone No. " class="prefix-input">
        <ElInput v-model="ruleForm.mobile" placeholder="Phone No.">
          <template #prefix>
            <el-select
              v-model="ruleForm.areaCode"
              searchable
              class="area-code w-80px"
              :placeholder="t('public.Select')"
            >
              <el-option
                v-for="item in cityList"
                :key="`el-option-${item.code}`"
                :label="`+${item.code}`"
                :value="`+${item.code}`"
              >
                <span>{{ `${item.en} +${item.code}` }}</span>
              </el-option>
            </el-select>
          </template>
          <template #suffix>
            <div
              class="verify-code"
              :class="{ 'forbidden-send': timer }"
              @click.stop="sendSms"
            >
              <span class="font-600 get-code text-14px">{{
                t("mine.GetCode")
              }}</span>
              <span
                v-show="count > 0 && timer"
                class="font-bold text-14px countdown-show"
                >({{ count }})</span
              >
            </div>
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="verifyCode" label="Verification Code">
        <ElInput
          v-model="ruleForm.verifyCode"
          :placeholder="t('mine.EnterCodeVerification')"
        />
      </ElFormItem>
      <!--      <ElFormItem prop="mobile" label="Phone No. " class="prefix-input">-->
      <!--        <ElInput v-model="ruleForm.mobile" placeholder="Phone No.">-->
      <!--          <template #prefix>-->
      <!--            <el-select-->
      <!--              v-model="ruleForm.areaCode"-->
      <!--              searchable-->
      <!--              class="area-code w-80px"-->
      <!--              :placeholder="t('public.Select')"-->
      <!--            >-->
      <!--              <el-option-->
      <!--                v-for="item in cityList"-->
      <!--                :key="`el-option-${item.code}`"-->
      <!--                :label="`+${item.code}`"-->
      <!--                :value="`+${item.code}`"-->
      <!--              >-->
      <!--                <span>{{ `${item.en} +${item.code}` }}</span>-->
      <!--              </el-option>-->
      <!--            </el-select>-->
      <!--          </template>-->
      <!--        </ElInput>-->
      <!--      </ElFormItem>-->
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

const rules: FormRules = {
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
  mobile: [{ required: true, validator: checkMobile, trigger: "blur" }],
  verifyCode: [{ required: true, validator: checkVerify, trigger: "blur" }],
}
const { t } = useLang()
const user: any = useUserStore()

const {
  blogtate: { timer, count },
  startTimer,
  closeTimer,
} = useVerify()

type RuleFormType = {
  areaCode: string
  mobile: number | string
  verifyCode: number | string
}
const loading = shallowRef<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm: RuleFormType = reactive({
  areaCode: "+63",
  mobile: "",
  verifyCode: "",
})

const submitLogin = () => {
  ruleFormRef?.value?.validate(async (v: boolean) => {
    if (v) {
      const code = await user.RESET_MOBILE({ ...ruleForm })
      if (code === 0) {
        ruleFormRef?.value?.clearValidate()
        Notify({
          title: "Successfully",
          message: "Reset Successfully",
          type: "success",
          duration: 1000,
          position: "top-left",
        })
        user.MODIFY_TYPE("")
        user.GET_USER_PROFILE()
      }
    }
  })
}

/** 开始发送验证码 */
const startSendSmsCode = async (data = {}) => {
  // return new Promise( (resolve)=>{
  const { areaCode, mobile } = ruleForm
  const res = await user.GET_MOBILE_CODE({
    areaCode,
    mobile,
    smsType: "OTHER",
    ...data,
  })
  if (res.code === 0) {
    Notify({
      title: "Successfully",
      message: "Send Successfully",
      type: "success",
      duration: 1000,
      position: "top-left",
    })
    startTimer()
  }
  return Promise.resolve(res.code)
  // })
}
// 手机号 验证码发送
const sendSms = () =>
  new Promise((resolve) => {
    if (ruleFormRef.value) {
      ruleFormRef.value.validateField("mobile", (v) => {
        if (v) {
          startSendSmsCode().then(resolve)
          // if (VERIFY_CODE.value === "1") verify.value.show()
          // else startSendSmsCode()
        }
      })
    }
  })
onBeforeUnmount(() => {
  closeTimer()
})
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
