<template>
  <CustomDialog
    v-model="showVisible"
    :before-close="beforeClose"
    :title="title"
    :show-footer="false"
  >
    <section class="login-page">
      <ElForm
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        size="small"
        class="demo-ruleForm"
        status-icon
      >
        <ElFormItem prop="phone">
          <!-- <ElInput
            :placeholder="t('EnterAccountBindingPhone')"
            v-model="ruleForm.phone"
          >
          </ElInput> -->
          <ElInput
            v-model="ruleForm.phone"
            class="phone-code"
            type="number"
            :placeholder="t('mine.profile.PhoneNumber')"
          >
            <template #prepend>
              <ElSelect
                v-model="ruleForm.areaCode"
                class="area-code"
                searchable
                :placeholder="t('public.Select')"
              >
                <ElOption
                  v-for="item in areaList"
                  :key="`ElOption-${item.code}-${item.locale}`"
                  :label="`+${item.code} ${item.locale}`"
                  :value="`+${item.code}`"
                />
              </ElSelect>
            </template>
          </ElInput>
          <div
            :class="{ 'send-disabled': timer }"
            class="show-append fs-14 flex-box is-center"
            @click="sendSms"
          >
            <span>{{ t("mine.GetCode") }}</span>
            <span v-show="timer" class="show-count">({{ count }})</span>
          </div>
        </ElFormItem>
        <ElFormItem prop="verifyCode">
          <ElInput
            v-model="ruleForm.verifyCode"
            :placeholder="t('mine.CodeVerification')"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="ruleForm.password"
            type="password"
            show-password
            :placeholder="t('mine.NewPassword')"
          />
        </ElFormItem>
        <ElFormItem prop="confirmPassword">
          <ElInput
            v-model="ruleForm.confirmPassword"
            type="password"
            show-password
            :placeholder="t('additional.ConfirmNewPassword')"
          />
        </ElFormItem>
      </ElForm>
      <ElButton type="primary" class="dialog-button" @click="confirm">
        <span class="is-bold fs-14">{{ t("public.Submit") }}</span>
      </ElButton>
    </section>
  </CustomDialog>
</template>

<script setup>
import { computed, onBeforeUnmount, reactive, ref } from "vue"
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
} from "element-plus"
import { isPassword, isEmail } from "~/utils/validate"
import { useUserStore } from "~/stores/user"
import { useVerify } from "~/composables/verify"
// import { useI18n } from "vue-i18n";
import areaList from "@/assets/json/area.json"
const { t } = useLang()
// const { t } = useI18n();
const {
  blogtate: { timer, count },
  startTimer,
  closeTimer,
} = useVerify()
const user = useUserStore()
const ruleForm = reactive({
  areaCode: "+63",
  email: "",
  phone: "",
  verifyCode: "",
  password: "",
  confirmPassword: "",
})

const checkconfirmPassword = (rule, value, cb) => {
  if (value) {
    if (isPassword(value) && `${value}` === `${ruleForm.password}`) cb()
    else cb(t("validator.text05"))
  } else cb(t("validator.text06"))
}

const rules = reactive({
  // email: [{ required: true, validator: checkEmail, trigger: "blur" }],
  phone: [{ required: true, validator: checkMobile, trigger: "blur" }],
  verifyCode: [{ required: true, validator: checkVerify, trigger: "blur" }],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
  confirmPassword: [
    { required: true, validator: checkconfirmPassword, trigger: "blur" },
  ],
})
const props = defineProps({
  modelVisible: {
    type: Boolean,
  },
  title: {
    type: String,
    default: "",
  },
})
const showVisible = computed({
  get() {
    return props.modelVisible
  },
  set(val) {
    emit("update:modelValue", val)
  },
})
// const disabledSend = computed(() => {
//   const { email } = ruleForm;
//   return !isEmail(email) || state.timer;
// });
const ruleFormRef = ref(null)
const emit = defineEmits(["update:modelValue"])
const beforeClose = () => {
  emit("update:modelValue", false)
}
const confirm = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validate(async (v) => {
      if (v) {
        // const data = {
        //   email: ruleForm.email,
        //   phone: `${ruleForm.areaCode} ${ruleForm.phone}`,
        //   password: ruleForm.password,
        //   verifyCode: ruleForm.verifyCode
        // }
        const data = { ...ruleForm }
        data.mobile = `${data.phone}`
        delete data.phone
        const { code } = await user.FORGET_PASSWORD(data)
        if (code === 0) {
          ruleForm.phone = ""
          ruleForm.email = ""
          ruleForm.verifyCode = ""
          ruleForm.password = ""
          beforeClose()
        }
      }
    })
  }
}

const sendSms = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validateField("phone", async (v) => {
      if (v) {
        const { code } = await user.GET_MOBILE_CODE({
          areaCode: ruleForm.areaCode,
          mobile: ruleForm.phone,
          smsType: "FORGOT",
        })
        if (code === 0) startTimer()
        // console.log(code);
      }
    })
  }
}
onBeforeUnmount(() => {
  closeTimer()
})
</script>

<style lang="scss" scoped>
.login-page {
  .demo-ruleForm {
    :deep(.el-input__suffix-inner) {
      display: none;
    }
    :deep(.ElInput) {
      height: 40px;
    }
    //:deep(.ElInput-group__append) {
    //  background: #232a33;
    //  box-shadow: none;
    //  border-left: none;
    //}
    .show-append {
      height: calc(100% - 4px);
      position: absolute;
      right: 2px;
      border-radius: 5px;
      top: 2px;
      padding: 0 12px;
      //color: $main-color;
      cursor: pointer;
      background: #232a33;
      z-index: 10;
      //padding: 1px;
    }
    .send-disabled {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.4;
      color: #fff;
    }
    .show-count {
      //color: $main-text-color;
      margin-left: 8px;
    }
  }
}
.dialog-button {
  height: 44px;
  border-radius: 25px;
  font-size: 22px;
  margin: 40px auto 0;
  width: 280px;
}

.phone-code {
  :deep(.ElInput-group__prepend) {
    width: 120px;
  }
}
.phone-code .area-code {
  width: 120px;

  :deep {
    &.ElSelect {
      left: initial;
      top: initial;

      .ElInput {
        height: 36px;
      }
      &:hover {
        .el-input__wrapper {
          background-color: #2d333c;
          //box-shadow: 1px 0 0 0 $main-color inset, 1px 0 0 0 $main-color,
          //  0 1px 0 0 $main-color inset, 0 -1px 0 0 $main-color inset !important;
          //box-shadow: 0 0 0 1px $main-color inset !important;
        }
      }
    }
    .ElInput {
      width: 100%;

      border: none;
      .el-input__wrapper {
        background: #232a33;
        /* &:hover {
          --ElInput-hover-border-color: $main-color;
          box-shadow: 0 0 0 1px $main-color inset;
        } */
        .el-input__inner {
          font-size: 16px;
          color: #fff;
          &::placeholder {
            font-size: 14px;
            color: #8e99b6;
          }
        }
      }
    }
  }
}
</style>
