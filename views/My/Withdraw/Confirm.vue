<template>
  <ViewsMyWalletContainer v-if="card.cardList.length">
    <ViewsMyWithdrawQuickAmount v-model="modelValue" @change="changeAmount" />
    <section class="form-container max-w-400px">
      <p
        class="mb-20px mt-40px font-600 text-16px <sm:(text-12px mb-10px mt-24px)"
      >
        Withdraw Amount
      </p>
      <client-only>
        <ElForm
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          status-icon
        >
          <ElFormItem prop="amount">
            <ElInput
              v-model="ruleForm.amount"
              type="number"
              placeholder="Please enter the amount"
            >
              <template #append>
                <span>PHP</span>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem>
            <div
              class="flex text-14px mt-10px items-center justify-between w-full <sm:(mt-7px text-12px)"
            >
              <span
                >Allow Withdraw: {{ currentConfig?.allWithdrawalCoin }}</span
              >
              <span class="cursor-pointer withdraw-all">withdraw all</span>
            </div>
            <div
              class="w-full mt-10px text-14px items-center justify-between flex <sm:(mt-7px text-12px)"
            >
              <span>PHP exchange rate</span>
              <span>{{ currentConfig?.withdrawalRate || "1" }}</span>
            </div>
            <div
              class="w-full mt-10px text-14px items-center justify-between flex <sm:(mt-7px text-12px)"
            >
              <span>Actual Credited PHP</span>
              <span>{{ actualCryptoNum }}</span>
            </div>
          </ElFormItem>

          <ElFormItem>
            <CommonButton
              :loading="loading"
              class="login-button w-full justify-center"
              type="primary"
              @click.prevent="submitWithdraw"
            >
              Withdraw
            </CommonButton>
          </ElFormItem>
        </ElForm>
      </client-only>
    </section>
  </ViewsMyWalletContainer>
</template>

<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInput,
  FormInstance,
  FormRules,
} from "element-plus"
import { useWallet } from "~/stores/wallet"
import { useCard } from "~/stores/card"
import { useUserStore } from "~/stores/user"

const { t } = useLang()
const wallet = useWallet()
const card = useCard()
const route = useRoute()
const user = useUserStore()

const walletList = computed(() => wallet?.walletList || {})

const modelValue = shallowRef("")

const ruleFormRef = ref<FormInstance>()
const loading = shallowRef(false)

type RuleFormType = {
  amount: number | string
}

const ruleForm: RuleFormType = reactive({
  amount: "",
})
const checkAmount = (rule: any, value: string, cb: (arg?: string) => void) => {
  const { minWithdrawalCoin, maxWithdrawalCoin, allWithdrawalCoin } =
    currentConfig.value
  if (!value) cb(t("additional.enterAmount"))
  else if (isAmount(value)) {
    if (+value && +value <= +allWithdrawalCoin) {
      if (+value >= +minWithdrawalCoin && +value <= +maxWithdrawalCoin) cb()
      else
        cb(
          t("additional.correctAmount", {
            min: minWithdrawalCoin,
            max: maxWithdrawalCoin,
          })
        )
    } else cb(t("additional.insufficientAmount"))
  } else cb(t("additional.amountFormat"))
}

const rules: FormRules = {
  amount: [{ required: true, validator: checkAmount, trigger: "blur" }],
}
// 提款汇率配置
const withdrawConfig = computed(() => card.withdrawConfig ?? [])
// 默认卡
const cardDefaultInfo = computed(
  () => card.cardList.find((item) => item.status === 1) || {}
) // 默认的卡
// 当前提现渠道的配置
const currentConfig = computed(() => {
  // console.log(withdrawConfig.value, withdrawConfig, "withdrawConfig")
  const obj =
    withdrawConfig.value.find(
      (item) =>
        cardDefaultInfo.value?.categoryTransfer === item.categoryTransfer
    ) ?? {}
  return obj
})
// 实际到账金额
const actualCryptoNum = computed(() => {
  const { amount } = ruleForm
  let num = "0.00"
  const { withdrawFeeType, withdrawFee } = currentConfig.value
  if (withdrawFeeType === 2) {
    num = (+amount * (1 - withdrawFee)).toFixed(2) || "0.00"
  } else if (withdrawFeeType === 1) {
    num = (+amount - withdrawFee * 1).toFixed(2) || "0.00"
  }
  return +num >= 0 ? num : "0.00"
})

const changeAmount = (val: number) => {
  ruleForm.amount = val
}
// 获取提现配置
const getWithdrawConfig = () => {
  card.GET_WITHDRAW_CONFIG({
    withdrawalType: route.query.type ? "0" : "1",
  })
}

const submitWithdraw = () => {
  ruleFormRef?.value?.validate(async (v: boolean) => {
    if (v) {
      const { address, categoryTransfer, categoryCurrency } =
        cardDefaultInfo.value
      const result = await wallet.WITHDRAWAL({
        withdrawalAddress: address,
        withdrawalAmount: ruleForm.amount,
        category: route.query.type ? "0" : "1",
        categoryCurrency,
        categoryTransfer,
      })
      user.GET_USER_PROFILE()
      getWithdrawConfig()
      Notify({
        title: "Successfully",
        message: "You have submit successfully ,please wait to processed!",
        type: "success",
        position: "top-left",
      })
      modelValue.value = ""
      ruleForm.amount = ""
    }
  })
}

onMounted(() => {
  getWithdrawConfig()
})
</script>

<style lang="scss" scoped>
@import "views/User/form.container";
@include formContainer;
.withdraw-all {
  color: #34a9ff;
}
</style>
