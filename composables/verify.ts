/**
 * @author django
 * @description 获取邮箱验证码 以及倒计时
 */

export const useVerify = () => {
  // const user = useUserStore()
  const countTime = 60
  interface State {
    timer: any
    count: number
  }
  const state = reactive<State>({
    timer: null,
    count: countTime,
  })
  /**
   * 关闭倒计时
   */
  const closeTimer = () => {
    if (state.timer) {
      clearInterval(state.timer)
      state.timer = null
    }
  }
  /**
   * 开启倒计时
   */
  const startTimer = () => {
    closeTimer()
    state.timer = setInterval(() => {
      if (state.count > 0) state.count--
      else {
        closeTimer()
        state.count = countTime
      }
    }, 1000)
  }
  /**
   * 赋值响应式给页面使用
   */
  const blogtate = toRefs(state)
  return {
    blogtate,
    startTimer,
    closeTimer,
  }
}
