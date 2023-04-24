/**
 * @description 存储相关
 */

export const useStorage = () => {
  const getValue = (name: string) => {
    return useCookie(name).value
  }
  const setValue = (name: string, value: string) => {
    useCookie(name).value = value
  }
  return {
    // 获取value
    getValue,
    // 设置cookie
    setValue,
  }
}
