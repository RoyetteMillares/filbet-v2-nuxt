import { defineStore } from "pinia"
import { computed } from "vue"
import { UploadRequestOptions } from "element-plus"
import { useWallet } from "./wallet"
import { useSocketStore } from "./socket"

import Http from "~/request/server"
import { StoreTypes } from "~/types/store"

const initialValue = {
  isLogin: null,
  info: null,
  withdrawConfig: null,
  isPlay: null,
  vipInfo: null, // vip信息
  vipList: null,
  dialogType: "",
}

export const useUserStore = defineStore("user", {
  state: (): StoreTypes.User.State => {
    return {
      ...initialValue,
    }
  },
  getters: {
    // get player vip icon
    USER_VIP_ICON(state) {
      const iconInfo = computed(() => {
        const info = state.info
        const vipList = state.vipList
        return vipList?.find((item) => item.id === info?.levelId)
      })?.value
      return iconInfo
    },
  },
  actions: {
    // login
    async LOGIN(params: {}) {
      const res = await Http.post("login", params)
      await setToken(res.data.apiToken)
      this.SAVE_PROFILE(res.data)
      this.GET_USER_VIP_INFO()
      this.GET_VIP_INFO()
      useWallet().GET_USER_BALANCE() // 登陆成功请求钱包
      return Promise.resolve(res)
    },
    // player register
    async REGISTER(params: {}) {
      const res = await Http.post("register", params)
      await setToken(res.data.apiToken)
      this.SAVE_PROFILE(res.data)
      this.GET_USER_VIP_INFO()
      this.GET_VIP_INFO()
      useWallet().GET_USER_BALANCE() // 请求钱包
      return Promise.resolve(res.code)
    },
    // save player information without call api
    SAVE_PROFILE(__data: any) {
      const data = {
        ...__data,
        kycStatus: __data.kycStatus || 0,
      }
      this.$patch({
        isLogin: true,
        info: data,
      })
    },
    // get player information
    async GET_USER_PROFILE() {
      // useWallet().GET_USER_BALANCE(); // 请求钱包
      const res = await Http.post("profile")
      if (res.code === 0) {
        this.SAVE_PROFILE(res.data)
        useWallet().GET_USER_BALANCE() // 请求钱包
      }
      return res.code
    },
    // player logout
    async LOGOUT() {
      try {
        const res = await Http.post("logout")
        if (res.code === 0) {
          useSocketStore().CLOSE_SOCKET()
          clearToken()
          this.$patch({
            isLogin: false,
            info: null,
          })
        }
        this.MODIFY_TYPE("") // 关闭弹框
        return Promise.resolve(res.code)
      } catch (e) {
      } finally {
        useRouter().push("/")
      }
    },

    CHANGE_LOGIN(type: boolean) {
      this.isLogin = type
    },
    // check the player if need the code of google
    async CHECK_NEED_GOOGLE(params = {}) {
      const res = await Http.post("checkOpenGoogleCode", params)
      return res
    },
    // send the verification code of email
    SEND_CODE(params: any) {
      return new Promise((resolve, reject) => {
        resolve(0)
        // Http.post("checkOpenGoogleCode", params).then((res) => {
        //   if (res.code === "0") {
        //     resolve(res.data);
        //   } else resolve(1);
        // });
      })
    },
    // 获取用户vip信息
    GET_USER_VIP_INFO() {
      return new Promise((resolve, reject) => {
        Http.post("memberShipDetails")
          .then((res) => {
            if (res.code === 0) this.vipInfo = res.data
            resolve(res.code)
          })
          .catch((error) => reject(error))
      })
    },
    GET_VIP_INFO() {
      return new Promise((resolve, reject) => {
        Http.post("memberShipLevelDetails")
          .then((res) => {
            if (res.code === 0) this.vipList = res.data
            resolve(res.code)
          })
          .catch((error) => reject(error))
      })
    },
    // 发送邮箱验证码
    GET_EMAIL_CODE(params = {}) {
      return new Promise((resolve, reject) => {
        Http.post("sendSesCode", params)
          .then((res) => {
            if (res.code === 0) {
              // customPopup(t("tooltips.text01"), "", { isSuccess: true });
            }
            resolve(res)
          })
          .catch((error) => reject(error))
      })
    },
    // 发送短信验证码
    GET_PHONE_CODE(params: {}) {
      return new Promise((resolve, reject) => {
        Http.post("sendSnsCode", params)
          .then((res) => {
            resolve(res)
          })
          .catch((error) => reject(error))
      })
    },
    // 发送手机验证码
    GET_MOBILE_CODE(params: {}) {
      return new Promise((resolve, reject) => {
        Http.post("sendSmsCode", params)
          .then((res) => {
            if (res.code === 0) {
              // customPopup(t("tooltips.text01"), "", { isSuccess: true });
            }
            resolve(res)
          })
          .catch((error) => reject(error))
      })
    },
    FORGET_PASSWORD(params: {}) {
      return new Promise((resolve, reject) => {
        Http.post("forgotPassword", { ...params }, true)
          .then((res) => {
            if (res.code === 0)
              // customPopup(t("tooltips.text02"), "", { isSuccess: true });
              resolve(res)
          })
          .catch((error) => reject(error))
      })
    },
    RESET_PASSWORD(params: {}) {
      return new Promise((resolve, reject) => {
        Http.post("resetPassword", { ...params })
          .then((res) => {
            if (res.code === 0)
              // customPopup(t("tooltips.text02"), "", { isSuccess: true });
              resolve(res)
          })
          .catch((error) => reject(error))
      })
    },
    async RESET_MOBILE(params: {}) {
      try {
        const { code } = await Http.post("resetMobile", { ...params })
        return Promise.resolve(code)
      } catch (e) {
        console.log(e)
      }
    },
    GET_SPORT_TOKEN() {
      return new Promise((resolve, reject) => {
        Http.post("getSportToken")
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    // 检查是否存在充值
    async CHECK_DEPOSIT(params: {}) {
      try {
        const res = await Http.post("checkPixDeposit", params)
        return Promise.resolve(res)
      } catch (e) {
        console.log(e)
      }
      // return new Promise((resolve, reject) => {
      //   Http.post("checkDeposit", params)
      //     .then((res) => {
      //       resolve(res)
      //     })
      //     .catch((err) => reject(err))
      // })
    },
    // 活动在申请
    APPLY_PROMOTION(params: {}) {
      return new Promise((resolve, reject) => {
        Http.post("promotionsApplyAgain", params)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    adjustCoin(info: StoreTypes.User.Info) {
      this.$patch({
        info: {
          ...this.info,
          ...info,
        },
      })
    },
    updateInfo(info: StoreTypes.User.Info) {
      this.$patch({
        info: {
          ...this.info,
          ...info,
        },
      })
    },
    // upload
    async UPLOAD(file: File) {
      const form = new FormData()
      form.append("file", file)
      try {
        const responseInfo = await Http.post("uploadFile", form, {
          "content-length": file.length,
        })
        return Promise.resolve(responseInfo.data)
      } catch (e) {
        console.log(e, 9999)
      }
    },
    // updatekyc
    async SET_UPDATE_KYC(data = {}) {
      try {
        const responseInfo = await Http.post("setOrUpdateKyc", { ...data })
        return Promise.resolve(responseInfo)
      } catch (e) {
        console.log(e)
        return Promise.reject(e)
      }
      // return new Promise((resolve, reject) => {
      //   Http.post("setOrUpdateKyc", data)
      //     .then((res) => {
      //       resolve(res)
      //     })
      //     .catch((err) => reject(err))
      // })
    },
    // getkyc
    async GET_USER_KYC(data = {}) {
      try {
        const responseInfo = await Http.post("getUserKyc", { ...data })
        return Promise.resolve(responseInfo)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    // 切换类型
    MODIFY_TYPE(type: string) {
      const query = { ...useRoute().query }
      query.dialogType = type
      if (!type && !query.dialogType) {
        delete query.dialogType
      }
      useRouter().push({
        name: useRoute().name,
        query: { ...query },
      })
      this.$patch({ dialogType: type })
    },
    // 三方登录 获取三方地址
    async PROVIDER_LOGIN(data: {}) {
      const responseInfo = await Http.post("thirdAuthUrl", { ...data })
      return responseInfo
    },
    async PROVIDER_BINDING(data: {}) {
      const responseInfo = await Http.post("bindingUrl", { ...data })
      return responseInfo
    },
    //
    async BINDING(data: {}) {
      const responseInfo = await Http.post("binding", { ...data })
      return responseInfo
    },
    async InitInfo(data: StoreTypes.User.Info) {
      await setToken(data.apiToken)
      this.SAVE_PROFILE(data)
      this.GET_USER_VIP_INFO()
      this.GET_VIP_INFO()
      useWallet().GET_USER_BALANCE() // 登陆成功请求钱包
      // useSocket().CONNECT_SOCKET(); // 连接socket
    },

    // 三方登录成功 跳转回主页
    async SAVE_PROVIDER_INFO(data: StoreTypes.User.providerLogin) {
      const responseInfo = await Http.post("thirdLogin", { ...data })
      return responseInfo
    },
  },
})
