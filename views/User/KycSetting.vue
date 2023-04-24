<template>
  <section class="login-page form-container mt-40px <sm:(mt-20px)">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      status-icon
    >
      <ElFormItem prop="keyType" label="Account Type">
        <ElSelect
          v-model="ruleForm.keyType"
          :disabled="disabled"
          class="w-full"
          searchable
          :placeholder="t('public.Select')"
        >
          <ElOption
            v-for="item in list"
            :key="`register-form-item-option-${item.code}`"
            :label="`${item.title}`"
            :value="item.code"
          >
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem prop="imgFront" label="Front photo of ID">
        <section
          class="p-20px <sm:(p-12px rounded-5px) @sm:(p-14px rounded-6px) @md:(p-14px rounded-6px) @lg:(p-16px rounded-7px) key-type rounded-8px w-full"
        >
          <ElUpload
            :disabled="disabled"
            ref="uploadRef"
            :auto-upload="false"
            :show-file-list="false"
            class="w-full"
            :http-request="uploadRequestHandle"
            @change="handleAvatarSuccess"
          >
            <div
              class="upload-container w-full flex items-center justify-center rounded-8px h-200px <sm:(rounded-5px h-151px) @sm:(rounded-6px h-161px) @md:( h-171px rounded-6px) @lg:( h-181px rounded-7px)"
            >
              <div
                v-show="!ruleForm.imgFront"
                class="p-14px cursor-pointer upload-icon text-20px <sm:(p-12px text-18px) flex items-center"
              >
                <CommonSvgIcon name="upload" />
              </div>
              <img
                v-show="ruleForm.imgFront"
                class="w-full h-full"
                :src="imageUrl"
                alt=""
              />
            </div>
          </ElUpload>
        </section>
      </ElFormItem>
      <ElFormItem>
        <section class="text-12px text-left leading-20px <sm:(leading-14px)">
          <p class="text-16px font-500 mb-10px <sm:(text-13px mb-5px)">
            Reminders
          </p>
          <p>
            Update 1 valid ID (must be government issued and clear) with photo
            inside of frame
          </p>
          <p>Use original ID (not photocopied)</p>
          <p>
            Information of ID should include Name, Birthdate, photo is
            compulsory
          </p>
          <p>
            In legal age (21 years) and all the details provided are all true
          </p>
          <p>
            With the PAGCOR request, the website have the right to requires user
            to provide a video verification
          </p>
        </section>
        <!--        -->
        <p
          v-if="info.kycStatus === 3"
          class="kyc-error text-12px is-fail text-left"
        >
          {{ t("mine.profile.refuseReason") }} : {{ ruleForm.remark }}
        </p>
      </ElFormItem>
      <ElFormItem>
        <CommonButton
          :disabled="disabled"
          :loading="loading"
          class="login-button w-full justify-center"
          type="primary"
          @click.prevent="submitLogin"
        >
          Confirm
        </CommonButton>
      </ElFormItem>
    </ElForm>
    <div
      v-if="info.kycStatus === 1"
      class="absolute preview-status flex items-center justify-center w-3/5 py-4px text-12px top-0 left-1/2 transform -translate-x-1/2"
    >
      <CommonSvgIcon name="alert" />
      <span class="ml-8px">{{ getTitle(statusList, info.kycStatus) }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElOption,
  ElSelect,
  FormInstance,
  FormRules,
  ElUpload,
} from "element-plus"
import type {
  UploadProps,
  UploadInstance,
  UploadRequestOptions,
} from "element-plus"
import { useUserStore } from "~/stores/user"
const user = useUserStore()
const { t } = useLang()
const { getDirection, getTitle } = useDictionary()
const checkUpload = (rule: any, value: unknown | any, cb: any) => {
  if (!value) {
    // eslint-disable-next-line n/no-callback-literal
    cb("Please Select image")
  } else if (!value?.type?.includes("image/")) {
    // eslint-disable-next-line n/no-callback-literal
    cb("Upload file must be Image format!")
  } else if (value.size / 1024 / 1024 > 5) {
    // eslint-disable-next-line n/no-callback-literal
    cb("Image size can not exceed 5MB!")
  } else cb()
}
const rules: FormRules = {
  keyType: [
    {
      required: true,
      message: "Please Select",
      trigger: "change",
    },
  ],
  imgFront: [
    {
      required: true,
      validator: checkUpload,
      // message: "Please Select image",
      trigger: "change",
    },
  ],
}
type RuleFormType = {
  imgFront: any
  remark: string
  keyType: string
}
const list = computed(() => {
  const list = getDirection("dic_kyc_type") || []
  return list
})

const statusList = computed(() => {
  const list = getDirection("dic_kyc_status") || []
  return list
})
const imageUrl = computed(() => {
  const { imgFront } = ruleForm
  return typeof imgFront === "string" ? imgFront : URL.createObjectURL(imgFront)
})
const uploadRef = ref<UploadInstance>()

const loading = shallowRef<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm: RuleFormType = reactive({
  imgFront: "",
  keyType: "",
  remark: "",
})
const submitLogin = () => {
  ruleFormRef?.value?.validate(async (v: boolean) => {
    if (v) {
      await uploadRef?.value?.submit()
    }
  })
}
const info = computed(() => user.info! || {})
const disabled = computed(() => ![0, 3].includes(info?.value?.kycStatus))
const getKyc = async () => {
  const res = await user.GET_USER_KYC()
  if (res.code === 0 && res.data) {
    ruleForm.imgFront = res.data?.imgFront
    ruleForm.keyType = res.data?.keyType + ""
    ruleForm.remark = res.data?.remark
  }
}
// upload callback
const handleAvatarSuccess: UploadProps["onChange"] = (uploadFile) => {
  ruleForm.imgFront = uploadFile.raw
  ruleFormRef?.value?.validateField("imgFront")
}

const uploadRequestHandle = async ({ file }: UploadRequestOptions) => {
  try {
    const responseInfo = await user.UPLOAD(file)
    const params = {
      imgFront: responseInfo.url,
      keyType: ruleForm.keyType,
    }
    await user.SET_UPDATE_KYC(params)
    user.MODIFY_TYPE("")
    user.GET_USER_PROFILE()
  } catch (e) {
    console.log(e)
  }
}
onMounted(() => {
  getKyc()
})
</script>

<style lang="scss" scoped>
@import "form.container";
.form-container {
  @include formContainer;
  .key-type {
    background: #13212d;
    color: #fff;
    :deep(.el-upload) {
      width: 100%;
    }
    .upload-container {
      background: #263642;
      border: 1px dashed #a5acb8;
      .upload-icon {
        background: linear-gradient(
          180deg,
          #1999ee -9.78%,
          #115bca 26.02%,
          #0b3aa8 111.96%
        );
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 50%;
      }
    }
  }
}
.preview-status {
  background: linear-gradient(
    180deg,
    #1999ee -9.78%,
    #115bca 26.02%,
    #0b3aa8 111.96%
  );
  border-radius: 0 0 20px 20px;
}
</style>
