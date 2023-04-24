<template>
  <transition
    leave-active-class="animated fadeOut"
    enter-active-class="animated fadeIn"
  >
    <div
      v-show="modelValue"
      class="form-container fixed w-full h-full overlay justify-center top-0 left-0 z-100 flex items-center py-100px px-12px overflow-y-scroll"
      @click.self="close"
    >
      <section
        class="main-container p-32px <sm:p-16px @sm:p-19px @md:p-22px @lg:p-25px @xl:p-29px rounded-12px max-w-660px w-full"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img
              class="w-40px max-h-40px <sm:(w-20px max-h-20px) @sm:(w-22px max-h-22px) @md:(w-26px max-h-26px) @md:(w-30px max-h-30px)"
              :src="itemInfo?.logoUrl"
              alt=""
            />
            <span
              class="font-600 text-24px ml-20px @sm:(text-15px ml-12px) @md:(text-16px ml-14px) @lg:(text-16px ml-14px) @xl:(text-18px ml-16px) <sm:(text-14px ml-10px)"
              >{{ itemInfo?.channelAppShowName }}</span
            >
          </div>
          <div
            class="flex text-20px items-center <sm:(text-15px) @sm:(text-16px) @md:text-17px @lg:text-18px"
            @click="close"
          >
            <CommonSvgIcon name="close" />
          </div>
        </div>
        <ElForm
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          class="mt-22px <sm:mt-10px @sm:mt-12px @md:mt-14px @lg:mt-16px"
          status-icon
        >
          <ElFormItem prop="coin">
            <ElInput
              v-model="ruleForm.coin"
              type="number"
              placeholder="Please enter the amount"
            />
          </ElFormItem>
          <ElFormItem>
            <p
              class="text-18px deposit-tips font-400 <sm:(text-12px font-100) @sm:(text-14px) @md:(text-16px) @lg:(text-18px)"
            >
              Deposit Limit: ₱{{ itemInfo?.minCoin }} - ₱{{ itemInfo?.maxCoin }}
            </p>
          </ElFormItem>
          <ElFormItem>
            <ul class="grid grid-cols-5 gap-8px <sm:gap-6px @sm:gap-7px w-full">
              <li
                v-for="item in itemInfo?.chips?.split(',')"
                :key="`confirm-li-${item}`"
                class="grid-item cursor-pointer font-600 text-16px flex items-center justify-center rounded-8px py-13px <sm:(py-7px rounded-4px text-12px) @sm:(py-8px rounded-6px text-13px) @md:(py-9px rounded-8px text-14px) @lg:(py-10px text-15px)"
                :class="{ 'grid-item-active': fastAmount === item }"
                @click="selectAmount(item)"
              >
                {{ item }}
              </li>
            </ul>
          </ElFormItem>
          <ElFormItem>
            <p class="text-right w-full">
              Total Received: ₱{{
                (Number(itemInfo?.rate) * Number(ruleForm.coin)).toFixed(2)
              }}
            </p>
          </ElFormItem>
          <ElFormItem>
            <CommonButton
              :loading="loading"
              class="login-button w-full justify-center"
              type="primary"
              @click.prevent="submitDeposit"
            >
              Confirm
            </CommonButton>
          </ElFormItem>
        </ElForm>
      </section>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInput,
  FormInstance,
  FormRules,
} from "element-plus"

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    itemInfo?: Partial<DepositListType>
    openAddress: (arg: number | string) => any
  }>(),
  {
    modelValue() {
      return false
    },
    itemInfo() {
      return {}
    },
    openAddress() {
      return () => {}
    },
  }
)
const emit = defineEmits(["update:modelValue"])

const checkAmount = (rule: any, value: string, cb: (arg?: string) => void) => {
  // eslint-disable-next-line n/no-callback-literal
  if (!value) cb("Please input amount")
  else {
    const { minCoin, maxCoin } = props.itemInfo as DepositListType
    if (+value >= +minCoin && +value <= +maxCoin) cb()
    // eslint-disable-next-line n/no-callback-literal
    else cb(`Minimum amount is p${minCoin},maximum amount is ${maxCoin}`)
  }
}

const rules: FormRules = {
  coin: [{ required: true, validator: checkAmount, trigger: "blur" }],
}

const fastAmount = shallowRef()

type RuleFormType = {
  coin: number | string
}
const loading = shallowRef<boolean>(false)

const ruleFormRef = ref<FormInstance>()
const ruleForm: RuleFormType = reactive({
  coin: "",
})
const selectAmount = (val: string) => {
  fastAmount.value = val
  ruleForm.coin = val
}
const close = () => {
  emit("update:modelValue", false)
}
const submitDeposit = () => {
  ruleFormRef?.value?.validate(async (v: boolean) => {
    if (v) {
      const code = await props.openAddress(ruleForm.coin)
      if (code === 0) {
        fastAmount.value = ""
        ruleForm.coin = ""
        close()
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import "views/User/form.container";
@mixin active {
  background: linear-gradient(
    180deg,
    #1999ee -9.78%,
    #115bca 26.02%,
    #0b3aa8 111.96%
  );
  box-shadow: 0px 2.07879px 2.07879px rgba(0, 0, 0, 0.25);
}
.overlay {
  @include formContainer;
  background: rgba(0, 8, 20, 0.4);
  backdrop-filter: blur(2px);
  .main-container {
    background: #1e2c37;
  }
  .deposit-tips {
    color: #b3bad1;
  }
  .grid-item {
    background: linear-gradient(180deg, #324353 0%, #233546 100%);
    box-shadow: 0px 1.38091px 3.45227px rgba(8, 20, 30, 0.3);
    color: #fff;
    &-active {
      @include active;
    }
    &:hover {
      @include active;
    }
  }
}
</style>
