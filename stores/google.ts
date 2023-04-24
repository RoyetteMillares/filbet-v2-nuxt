import Http from "~/request/server"
import { StoreTypes } from "~/types/store"
import { defineStore } from "pinia"

export const useGoogle = defineStore("google", {
  state: (): StoreTypes.Google.GoogleInfo => ({
    qrCode: '',
    secret: '',
    providerInfo: {},
  }),
  actions: {
    // 获取google code
    async GET_GOOGLE_CODE(params = {}) {
      try {
        const { code, data } = await Http.post("createGoogleCode", {
          ...params,
        })
        this.$patch({ qrCode: data.qrCode, secret: data.secret })
        return Promise.resolve(code)
      } catch (e) {
        console.log(e)
      }
    },
    // bindGoogleCode
    async BIND_GOOGLE_CODE(params = {}) {
      try {
        const { code, data } = await Http.post("bindGoogleCode", {
          ...params,
        })
        return Promise.resolve(code)
      } catch (e) {
        console.log(e)
      }
    },
    async MODIFY_GOOGLE_STATUS(params = {}) {
      try {
        const { code, data } = await Http.post("openOrCloseGoogleCode", {
          ...params,
        })
        return Promise.resolve(code)
      } catch (e) {
        console.log(e)
      }
    },
    // 获取三方登陆详情
    async GET_PROVIDER_INFO(params = {}) {
      try {
        const { code, data } = await Http.post("userStatusInfo", {
          ...params,
        })
        this.$patch({ providerInfo: data })
        return Promise.resolve(code)
      } catch (e) {
        console.log(e)
      }
    },
  },
})
