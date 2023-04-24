import * as validate from "~/utils/validate"
import i18n from "~/utils/lang"
import { isRealName } from "~/utils/validate"
const t = i18n.global.t
const checkUsername = (
  rule: any,
  value: string,
  cb: (arg?: string) => void
) => {
  let cbArg
  if (!value) cbArg = "Username is required"
  else if (validate.isUsername(value)) cbArg = undefined
  else cbArg = "Username is invalid"

  cb(cbArg)
}
const checkPassword = (rule: any, value: string, cb: Function) => {
  let cbArg
  if (!value) cbArg = "Password is required"
  else if (validate.isPassword(value)) cbArg = undefined
  else cbArg = "Password is invalid"
  cb(cbArg)
}

/** 校验用户名 */
export const checkGoogleCode = (
  rule: any,
  value: string,
  cb: (arg?: string) => void
) => {
  if (value) {
    if (validate.isCode(value)) cb()
    else cb(t("validator.text07"))
  } else cb(t("validator.text08"))
}
export const checkMobile = (
  rule: any,
  value: string,
  cb: (arg?: string) => void
) => {
  if (value) {
    if (validate.isMobile(value)) cb()
    else cb(t("validator.text09"))
  } else cb(t("validator.text10"))
}
export const checkAmount = (
  rule: any,
  value: string,
  cb: (arg?: string) => void
) => {
  if (value) {
    if (validate.isAmount(value)) cb()
    else cb(t("additional.amountFormat"))
  } else cb(t("validator.text11"))
}

export const checkAmountOrBet = (
  rule: any,
  value: string,
  cb: (arg?: string) => void
) => {
  if (value) {
    if (validate.isCoin(value)) cb()
    if (validate.isBetAmount(value)) cb()
    else cb(t("additional.amountFormat"))
  } else cb(t("validator.text11"))
}
export const checkVerify = (
  rule: any,
  value: string,
  cb: (arg?: string) => void
) => {
  if (value) {
    if (validate.isVerify(value)) cb()
    else cb(t("validator.text13"))
  } else cb(t("validator.text08"))
}

export const checkEmail = (rule: any, value: string, cb: Function) => {
  if (value) {
    if (validate.isEmail(value)) cb()
    else cb(t("validator.text03"))
  } else cb(t("validator.text04"))
}

export const checkRechargeAmount = (
  rule: any,
  value: string,
  cb: Function
) => {}

// 校验真实姓名
export const checkRealName = (
  rule: any,
  value: string,
  cb: (arg?: string) => void
) => {
  let cbArg
  if (!value) cbArg = "Account name is required"
  else if (validate.isRealName(value)) cbArg = undefined
  else cbArg = "Account name is invalid"

  cb(cbArg)
}
export const useCheck = () => {
  return {
    checkUsername,
    checkPassword,
    checkMobile,
    checkAmount,
    checkAmountOrBet,
    checkVerify,
    checkEmail,
    checkRechargeAmount,
    checkGoogleCode,
    checkRealName,
  }
}
