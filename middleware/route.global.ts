/**
 * 全局路由钩子函数
 */
import { getToken } from "~/utils/permission"
import { scrollToTop } from "~/utils/scrollTop"

export default defineNuxtRouteMiddleware((to, from) => {
  scrollToTop()

  // console.log(to, from, 12)
  // console.log(getToken, "to, from")
  // navigateTo() // 跳转
  // navigateTo (to: RouteLocationRaw | undefined | null, options?: { replace: boolean, redirectCode: number, external: boolean )
  // abortNavigation() // 终止跳转
})
