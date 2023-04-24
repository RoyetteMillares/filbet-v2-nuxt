/**
 * @author django
 * @description 防抖函数
 * @param callback 回調函式
 * @param wait 毫秒數
 * @return {debounced}
 */
export function debounce(callback: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined

  function debounced() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback()
    }, wait)
  }
  // 返回一个闭包
  return debounced
}

/**
 * @description 节流函数
 * @param callback 回調函式
 * @param wait 毫秒數
 */
export function throttle(callback: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback()
    }, wait)
  }
}
