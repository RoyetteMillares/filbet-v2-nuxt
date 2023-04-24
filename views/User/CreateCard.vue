<template>
  <section class="login-page form-container mt-40px <sm:(mt-20px)">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      status-icon
    >
      <ElFormItem prop="categoryTransfer" label="Account Type">
        <ElSelect
          class="w-full"
          v-model="ruleForm.categoryTransfer"
          searchable
          :placeholder="t('public.Select')"
        >
          <ElOption
            v-for="item in categoryList"
            :key="`register-form-item-option-${item.categoryTransfer}`"
            :label="`${item.categoryTransferName}`"
            :value="item.categoryTransfer"
          >
            <!--            <span>{{ `${item.en} +${item.code}` }}</span>-->
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <!--  -->
      <ElFormItem
        v-if="typeInfo && typeInfo.typeList"
        prop="accountType"
        :label="t('bet.betrecord.Type')"
      >
        <ElSelect
          @change="changeType"
          :teleported="false"
          searchable
          class="w-full"
          v-model="ruleForm.accountType"
          :placeholder="t('mine.profile.PleaseSelect')"
        >
          <ElOption
            :label="item.name"
            :value="item.type"
            v-for="(item, index) in typeInfo.typeList"
            :key="item.type"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem prop="realName" label="Account Name">
        <ElInput
          v-model="ruleForm.realName"
          maxlength="30"
          :placeholder="t('mine.EnterCodeVerification')"
        />
      </ElFormItem>
      <ElFormItem prop="accountNumber" label="Account Number">
        <ElInput
          v-model="ruleForm.accountNumber"
          type="number"
          :placeholder="t('mine.Password')"
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
  </section>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElSelect, ElInput, ElOption } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"
import { useUserStore } from "~/stores/user"
import { useWallet } from "~/stores/wallet"
import { Ref } from "vue"
import { useCard } from "~/stores/card"

const card = useCard()
const { checkMobile, checkRealName } = useCheck()

const rules: FormRules = {
  categoryTransfer: [
    {
      required: true,
      message: "Please Select",
      trigger: "change",
    },
  ],
  accountType: [
    {
      required: true,
      message: "Please Select",
      trigger: "change",
    },
  ],
  accountNumber: [{ required: true, validator: checkMobile, trigger: "blur" }],
  realName: [{ required: true, validator: checkRealName, trigger: "blur" }],
}
const { t } = useLang()
const wallet = useWallet()
const user: any = useUserStore()

// 提现类型列表
const categoryList = computed(() => {
  // const { code } = props
  const code = "1"
  const list = withdrawChannelList.value
  const newList: any = []
  list.forEach((item) => {
    if (item.categoryCurrency.toString() === code) {
      newList.push(item)
    }
  })
  return newList
}) as any as Ref<WithdrawType[]>

type RuleFormType = {
  categoryTransfer: string
  accountType: string
  realName: string
  accountNumber: string
}
const loading = shallowRef<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm: RuleFormType = reactive({
  categoryTransfer: "",
  accountType: "",
  realName: "",
  accountNumber: "",
})

type ParamsType = {
  address?: string
  categoryCurrency: string | number
  categoryTransfer: number | string
  accountNo?: number | string
}
const submitLogin = () => {
  ruleFormRef?.value?.validate(async (v: boolean) => {
    if (v) {
      const { categoryTransfer } = typeInfo.value
      const params: ParamsType = {
        categoryCurrency: typeInfo.value?.categoryCurrency,
        categoryTransfer,
      }
      // console.log(categoryTransfer, "categoryTransfer");
      switch (categoryTransfer) {
        case 1:
        case 2:
          // params.address = ruleForm.address
          break
        case 3:
        case 5:
          params.address = JSON.stringify({
            accountNumber: ruleForm.accountNumber,
            accountNo: ruleForm.realName,
          })
          break
        case 4:
          params.address = JSON.stringify({
            accountType: ruleForm.accountType,
            // accountNo: ruleForm.accountNo,
          })
      }
      const code = await card.CREATE_CARD(params)

      if (code === 0) {
        ruleFormRef?.value?.clearValidate()
        user.MODIFY_TYPE("")
        Notify({
          title: "Successfully",
          message: "Created Successfully",
          type: "success",
          position: "top-left",
        })
      }
    }
  })
}
const withdrawChannelList = computed(() => wallet.withdrawChannelList)
// 以及选中后的详情
const typeInfo = computed(
  () =>
    categoryList.value.find(
      (item: WithdrawType) =>
        ruleForm.categoryTransfer.toString() ===
        item.categoryTransfer.toString()
    ) ?? {}
) as unknown as Ref<WithdrawType>
const changeType = () => {
  ruleForm.accountNumber = ""
  ruleForm.realName = ""
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
