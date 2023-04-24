import { hash } from "ohash"
import { ElMessageBox, ElNotification } from "element-plus"
import { Apis } from "./Apis"
import { useUserStore } from "~/stores/user"
import { HttpUseFetch } from "~~/types/http"
import { useAppStore } from "~/stores/app"
import { isFormData } from "~/utils/others"

type UseFetchResponseType = {
  code: number | string
  msg: string
  data: any
  repCode?: string
}

/**
 * api请求封装
 * @param { String } reqUrl 请求地址
 * @param { Object } options useFetch第二个参数
 * @param { Object } headers 自定义header头, 单独设置headers区分请求参数，也好设置类型
 */
const fetch = async (
  reqUrl: string,
  options: Required<Parameters<typeof useFetch<UseFetchResponseType>>>["1"],
  headers?: any
) => {
  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
  const key = hash(JSON.stringify(options) + reqUrl)

  // 可以设置默认headers例如
  const customHeaders = {
    Authorization: `Bearer ${getToken()}`,
    // "Accept-Language":sessionStorage.lang || "en",
    Accept: "application/json",
    // @ts-ignore
    "Accept-Device": "d",
    "Accept-Theme": "dark",
    "Accept-Language": "en",
  }

  const prefix = "/api/proxy"
  const baseURL = prefix

  try {
    const { data, error } = await useFetch<UseFetchResponseType>(reqUrl, {
      ...options,
      body: options.body ?? {},
      key,
      baseURL,
      headers: { ...customHeaders, ...headers },
    })
    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
        message: error.value.message,
      })
    }
    const statusCode: any = Number(
      data.value?.code ?? data.value?.repCode ?? 500
    )
    const message = data.value?.msg ?? "Request Error"
    // 0000 滑块验证码
    if (statusCode !== 0) {
      ElNotification({
        position: "top-left",
        title: "Error",
        message,
        type: "error",
      })

      // 这里处理错你自定义的错误，例如code !== 1
      if (statusCode === 401) {
        try {
          useUserStore().LOGOUT()
          ElMessageBox.confirm(
            "Your token was expired,please login",
            "Tips"
          ).then(() => {
            useUserStore().MODIFY_TYPE("signIn")
          })
        } catch (e) {
          console.log(e)
        }
      }
      throw createError({
        statusCode,
        statusMessage: reqUrl,
        message,
      })
    } else {
      return data.value as HttpUseFetch.Response
    }
  } catch (__error) {
    console.log(__error, "__error")
    const error = __error as ReturnType<typeof createError>
    throw error
  }
}
type KeyOf<T extends object> = Extract<keyof T, string>
type ApiKey = KeyOf<typeof Apis>
// type ApiKey = Extract<keyof typeof Apis, string>
class Http {
  get(url: ApiKey, params?: any, headers?: any) {
    return fetch(url, { method: "get", params }, headers)
  }

  async post<T = ApiKey>(url: T, params?: any, headers?: any) {
    const fullLink = Apis[url as ApiKey]
    const init = useAppStore()
    const initList = init.config
    let ENCRYPTION = "1"
    try {
      ENCRYPTION = initList?.find(
        (item: DirectionType) => item.title === "encrypt"
      )?.value!
    } catch (e) {
      console.log(e)
    }
    const parameters = isFormData(params)
      ? params
      : params
      ? trim(deleteKey({ ...params }))
      : {}
    // const query = {
    //   ...parameters,
    // sign: ENCRYPTION === "1" ? Encrypt(parameters) : "",
    // }

    return fetch(fullLink, { method: "post", body: parameters }, headers)
  }

  put(url: ApiKey, params?: any, headers?: any) {
    return fetch(url, { method: "put", params }, headers)
  }

  delete(url: ApiKey, params?: any, headers?: any) {
    return fetch(url, { method: "delete", params }, headers)
  }
}

const HttpInstance = new Http()

export default HttpInstance
