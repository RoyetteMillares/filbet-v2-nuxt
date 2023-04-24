import { Notify } from "~/composables/notification"
import { useUserStore } from "~/stores/user"

/**
 * 处理未登录弹框
 */

// 处理未登录
export const useUnLogin = () => {
  const userStore = useUserStore()
  const handleUnLogin = () => {
    if (!getToken()) {
      Notify({
        title: "Authenticator",
        message: "You haven't login please login first!",
        type: "error",
        position: "top-left",
      })
      userStore.MODIFY_TYPE("signIn")
      throw new Error("You haven't login please login first!")
    }
  }
  return {
    handleUnLogin,
  }
}
