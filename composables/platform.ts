import { computed, toRefs, shallowReactive } from "vue"
import { useAppStore } from "~/stores/app"
// import defaultLogo from "~/assets/images/logo/logo.png";
/**
 * 注册是否需要邀请码
 */
const LOGIN_REGISTER = computed(() => {
  let config = {}
  try {
    config = JSON.parse(getConfigValue("register_login_config"))
  } catch (e) {
    config = {}
  }
  return config
})
/**
 * 注册是否需要 邀请码
 */
const IS_NEED_PROMOTE = computed(() => {
  let value = "0"
  if (useAppStore().config.length) value = getConfigValue("registerInviteCode")
  return value
})
/**
 * 注册是否需要 手机号码
 */
const IS_NEED_MOBILE = computed(() => {
  let value = "0"
  if (useAppStore().config.length) value = getConfigValue("registerMobile")
  return value
})
/**
 * 平台logo
 */
const PLAT_LOGO = computed(() => {
  let value = ""
  if (useAppStore().config.length) value = getConfigValue("platLogo")
  return value
})
/**
 * 是否自动触发活动
 */
const IS_AUTO = computed(() => {
  let value = "1"
  if (useAppStore().config.length) value = getConfigValue("isAuto")
  return value
})
/**
 * 结算时间 agentSettle
 */
const SETTLE_TIME = computed(() => {
  let value = "4:00"
  if (useAppStore().config.length) value = getConfigValue("agent_settle")
  return value
})
/**
 * 是否需要验证码 （滑动）
 */
const VERIFY_CODE = computed(() => {
  let value = "1"
  if (useAppStore().config.length) value = getConfigValue("verifyCode")
  return value
})
/**
 * 是否需要验证码 （手机号）
 */
const VERIFY_MOBILE_CODE = computed(() => {
  let value = "1"
  if (useAppStore().config.length) value = getConfigValue("verifyMobile")
  return value
})
/**
 * 获取配置
 */
const getConfigValue = (code: string) =>
  useAppStore().config.find((item) => item.title === code)?.value ?? ""
export const useConfig = () => {
  return toRefs(
    shallowReactive({
      getConfigValue,
      LOGIN_REGISTER,
      IS_NEED_PROMOTE,
      IS_NEED_MOBILE,
      PLAT_LOGO,
      IS_AUTO,
      VERIFY_CODE,
      VERIFY_MOBILE_CODE,
      SETTLE_TIME,
    })
  )
}
