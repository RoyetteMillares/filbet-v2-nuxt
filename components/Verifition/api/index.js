/**
 * 此处可直接引用自己项目封装好的 axios 配合后端联调
 */

import HttpInstance from "~/request/server"

// 获取验证图片  以及token
export function reqGet(data) {
  return HttpInstance.post("getCap", data)
}

// 滑动或者点选验证
export function reqCheck(data) {
  return HttpInstance.post("/captcha/check", data)
}
