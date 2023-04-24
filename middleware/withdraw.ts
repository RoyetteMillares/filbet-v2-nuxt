/**
 * 需要登录的 middleware
 */
import { useUserStore } from "~/stores/user"
import { getToken } from "~/utils/permission"
import { Notify } from "~/composables/notification"
import { StoreTypes } from "~/types/store"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useUserStore()
  const info = computed(() => user.info)
  if (!getToken()) {
    return navigateTo("/")
  } else {
    try {
      if (!info.value) await user.GET_USER_PROFILE()
      const { kycStatus, passwordHash, mobile }: any = info.value
      if (!mobile) {
        Notify({
          title: "Error",
          message: "Please completed your mobile setting first!",
          position: "top-left",
        })
        user.MODIFY_TYPE("changeMobile")
        return abortNavigation()
      }
      if (!passwordHash) {
        Notify({
          title: "Error",
          message: "Please complete your password setting first!",
          position: "top-left",
        })
        user.MODIFY_TYPE("changePassword")
        return abortNavigation()
      }
      // 未上传kyc
      if (kycStatus !== 2) {
        const message =
          kycStatus === 0
            ? "Please complete your KYC setting first!"
            : kycStatus === 1
            ? "Please wait for your KYC to be processed!"
            : "Please resubmit your KYC setting"
        Notify({
          title: "Error",
          message: message,
          position: "top-left",
        })
        user.MODIFY_TYPE("kycSetting")
        return abortNavigation()
      }
    } catch (e) {}
  }
  // console.log(useUserStore())

  // if (!getToken()) {
  //   return navigateTo("/")
  // }
  // return navigateTo(to.fullpath)
  // return abortNavigation()
  // console.log(to, from, 34)
  // console.log(getToken, "to, from")
  //  // 跳转
  // navigateTo (to: RouteLocationRaw | undefined | null, options?: { replace: boolean, redirectCode: number, external: boolean )
  // 终止跳转
})
