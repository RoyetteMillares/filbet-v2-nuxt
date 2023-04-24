<template>
  <custom-dialog
    v-model="showVisible"
    :before-close="beforeClose"
    :title="title"
    :show-footer="false"
    @confirm="confirm"
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
        <p class="form-label fs-14">{{ t("mine.CodeVerification") }}</p>
        <ElFormItem prop="googleCode">
          <ElInput
            v-model="ruleForm.googleCode"
            :placeholder="t('mine.CodeVerification')"
          />
        </ElFormItem>
        <p class="code-of-tips fs-14">{{ t("mine.SixdigitCodeToVerify") }}</p>
      </ElForm>
      <ElButton class="dialog-button" type="primary" @click="confirm">
        {{ t("public.Submit") }}
      </ElButton>
    </section>
  </custom-dialog>
</template>

<script setup>
import { ElButton, ElForm, ElFormItem, ElInput } from "element-plus"
import { computed, reactive, ref } from "vue"
// import { useI18n } from "vue-i18n";
const { t } = useLang()
// const { t } = useI18n();
const props = defineProps({
  modelVisible: {
    type: Boolean,
  },
  title: {
    type: String,
    default: "",
  },
  params: {
    type: Object,
    default() {
      return {}
    },
  },
  login: {
    type: Function,
    default() {
      return () => {}
    },
  },
})
const ruleFormRef = ref(null)
const showVisible = computed({
  get() {
    return props.modelVisible
  },
  set(val) {
    emit("update:modelValue", val)
  },
})
const emit = defineEmits(["update:modelValue"])
const beforeClose = () => {
  emit("update:modelValue", false)
}
const ruleForm = reactive({
  googleCode: "",
})
const rules = reactive({
  googleCode: [{ required: true, validator: checkGoogleCode, trigger: "blur" }],
})
const confirm = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validate((v) => {
      if (v) {
        const data = { ...props.params, ...ruleForm }
        props.login(data)
        // beforeClose();
      }
    })
  }
  // console.log(9999);
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  color: #8e99b6;
  text-align: left;
  .form-label {
    text-align: left;
    margin-bottom: 13px;
  }
  // .code-of-tips {
  //   //margin-bottom: 100px;
  // }
  :deep(.el-input__suffix-inner) {
    display: none;
  }

  :deep(.el-input) {
    height: 40px;
  }
}
.dialog-button {
  height: 50px;
  border-radius: 25px;
  font-size: 22px;
  margin-top: 100px;
  width: 393px;
}
</style>
