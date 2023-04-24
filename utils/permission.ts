export const getToken = (): string => {
  return useCookie(__cookie_filbet_token_name).value!
}
export const setToken = (value: string) => {
  useCookie(__cookie_filbet_token_name).value = value
  return Promise.resolve()
}
export const clearToken = () => {
  useCookie(__cookie_filbet_token_name).value = ""
}
