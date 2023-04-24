<template>
  <section class="login-page form-container mt-40px <sm:(mt-20px)">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      status-icon
    >
      <ElFormItem prop="username" label="Username ">
        <ElInput
          v-model="ruleForm.username"
          :placeholder="t('mine.UsernameOrEmail')"
        />
      </ElFormItem>
      <ElFormItem prop="mobile" label="Phone No. " class="prefix-input">
        <ElInput v-model="ruleForm.mobile" placeholder="Phone No.">
          <template #prefix>
            <ElSelect
              v-model="ruleForm.areaCode"
              searchable
              class="area-code w-80px"
              :placeholder="t('public.Select')"
            >
              <ElOption
                v-for="item in cityList"
                :key="`register-form-item-option-${item.code}`"
                :label="`+${item.code}`"
                :value="`+${item.code}`"
              >
                <span>{{ `${item.en} +${item.code}` }}</span>
              </ElOption>
            </ElSelect>
          </template>
          <template v-if="VERIFY_MOBILE_CODE === '1'" #suffix>
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
      <ElFormItem prop="password" label="Password">
        <ElInput
          v-model="ruleForm.password"
          type="password"
          show-password
          :placeholder="t('mine.Password')"
        />
      </ElFormItem>
      <ElFormItem prop="verifyCode" label="Verification Code">
        <ElInput
          v-model="ruleForm.verifyCode"
          :placeholder="t('mine.EnterCodeVerification')"
        />
      </ElFormItem>
      <ElFormItem prop="promoCode" label="Invitation Code">
        <ElInput
          v-model="ruleForm.promoCode"
          :placeholder="t('mine.InvitationCode')"
        />
      </ElFormItem>
      <ElFormItem>
        <section
          class="flex items-center cursor-pointer justify-start confirm-sign text-16px <sm:(text-14px)"
          @click.stop="ModifiedChecked"
        >
          <span class="flex items-center text-20px <sm:(text-15px)">
            <CommonSvgIcon :name="checked ? 'select' : 'default'" />
          </span>
          <span class="confirm-text text-left ml-10px <sm:(ml-5px)">{{
            t("mine.confirmText")
          }}</span>
        </section>
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

      <div class="is-have mt-20px">
        <span>{{ t("mine.HaveAccount") }}</span>
        <span
          class="is-active cursor-pointer cursor-pointer font-700 ml-5px"
          @click="toSignIn"
          >{{ t("mine.SignIn") }}</span
        >
      </div>
    </ElForm>
    <VerifitionVerify
      ref="verify"
      :request="request"
      mode="pop"
      :captcha-type="'blockPuzzle'"
      :img-size="{ width: '330px', height: '155px' }"
      @success="() => {}"
    />
  </section>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElSelect, ElInput, ElOption } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"
import { useUserStore } from "~/stores/user"

const { checkUsername, checkPassword, checkMobile, checkVerify } = useCheck()
const { cityList } = useCityList()

const checkPromo = (rule: any, value: string, cb: (arg?: string) => void) => {
  if (IS_NEED_PROMOTE.value !== "2") {
    if (IS_NEED_PROMOTE.value === "0") {
      if (!value) cb()
      else if (isPromoCode(value)) cb()
      else cb(t("mine.PromoIncorrect"))
    } else if (IS_NEED_PROMOTE.value === "1") {
      if (isPromoCode(value)) cb()
      else cb(t("mine.PromoIncorrect"))
    }
  } else cb()
}

const rules: FormRules = {
  username: [{ required: true, validator: checkUsername, trigger: "blur" }],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
  mobile: [{ required: true, validator: checkMobile, trigger: "blur" }],
  promoCode: [{ required: true, validator: checkPromo, trigger: "blur" }],
  verifyCode: [{ required: true, validator: checkVerify, trigger: "blur" }],
}
const { t } = useLang()
const user: any = useUserStore()
const verify = ref()
const checked = ref<boolean>(true)
const { getValue } = useStorage()

const {
  IS_NEED_PROMOTE,
  getConfigValue,
  IS_NEED_MOBILE,
  IS_AUTO,
  VERIFY_CODE,
  VERIFY_MOBILE_CODE,
} = useConfig()

const {
  blogtate: { timer, count },
  startTimer,
  closeTimer,
} = useVerify()

type CustomListType = {
  title: string
  component: any
  key: string
}
type RuleFormType = {
  username: string
  password: string
  areaCode: string
  mobile: number | string
  promoCode: number | string
  verifyCode: number | string
}
const loading = shallowRef<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm: RuleFormType = reactive({
  username: "",
  password: "",
  areaCode: "+63",
  mobile: "",
  promoCode: "",
  verifyCode: "",
})
/* 邀请码 */
const promoCode = getValue("promoCode")
if (promoCode) ruleForm.promoCode = promoCode

const submitLogin = () => {
  ruleFormRef?.value?.validate(async (v: boolean) => {
    if (v) {
      const code = await user.REGISTER({ ...ruleForm })
      if (code === 0) {
        ruleFormRef?.value?.clearValidate()
        user.MODIFY_TYPE("")
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
    smsType: "REG",
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
          if (VERIFY_CODE.value === "1") verify.value.show()
          else startSendSmsCode().then(resolve)
        }
      })
    }
  })
const request = async (data: any) => {
  let code = 1
  try {
    code = await startSendSmsCode(data)
  } catch (e) {
    console.log(e)
  }
  return code || 0
}
const toSignIn = () => {
  user.MODIFY_TYPE("signIn")
}
const ModifiedChecked = () => {
  checked.value = !checked.value
}
onBeforeUnmount(() => {
  closeTimer()
})
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
