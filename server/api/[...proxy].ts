import axios from "axios"
import FormData from "form-data"

const runtimeConfig = useRuntimeConfig()
const targetUrl = runtimeConfig.public.PROXY_SERVER_ADDRESS

export default eventHandler(async (event) => {
  try {
    const url = getRequestURL(event)
    const rewrite = url.pathname.replaceAll(/^\/api\/proxy/g, "/api")
    const target = `${targetUrl}${rewrite}`
    const headersOrigin = new Headers(await getProxyRequestHeaders(event))
    if (headersOrigin.get("Content-Type")?.includes("multipart/form-data")) {
      // @ts-ignore
      const formItems = (await readMultipartFormData(event)) as {
        data: Buffer
        filename: string
        type: string
        name: string
      }[]
      const method = await getMethod(event)
      const form = new FormData()
      formItems.forEach((item) => {
        form.append(item.name, item.data, {
          filename: item.filename,
          contentType: item.type,
          knownLength: item.data.length,
        })
      })
      headersOrigin.delete("Content-Type")
      headersOrigin.delete("Content-Length")
      const headers = Object.fromEntries(headersOrigin.entries())

      const resp = await axios.request({
        url: target,
        data: form,
        method,
        headers,
      })

      return resp.data
    }
    const resp = await proxyRequest(event, target, {})
    return resp
  } catch (__error) {
    const error = __error as Error & { code: number }
    return {
      code: error.code,
      msg: error.message,
      message: error.message,
    }
  }
})
