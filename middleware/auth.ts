/**
 * 需要登录的 middleware
 */
import { getToken } from "~/utils/permission"

export default defineNuxtRouteMiddleware((to, from) => {
  if (!getToken()) {
    return navigateTo("/")
  }
  // return navigateTo(to.fullpath)
  // return abortNavigation()
  // console.log(to, from, 34)
  // console.log(getToken, "to, from")
  //  // 跳转
  // navigateTo (to: RouteLocationRaw | undefined | null, options?: { replace: boolean, redirectCode: number, external: boolean )
  // 终止跳转
})
