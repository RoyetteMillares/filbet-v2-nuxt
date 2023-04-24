import { defineStore } from "pinia"
import Http from "~/request/server"
import { StoreTypes } from "~/types/store"
export const useMessage = defineStore("message", {
  state: (): StoreTypes.Message => ({
    noticeCountList: [],
    noticeList: [],
  }),
  getters: {
    noticeCount: (state) => {
      let num = 0
      if (state.noticeCountList.length) {
        state.noticeCountList.forEach((item) => {
          num += item.count * 1
        })
      }
      return num
    },
  },
  actions: {
    // get notice count
    async GET_NOTICE_COUNT() {
      const res = await Http.post("getNoticeCount")
      if (res.code === 0) {
        this.$patch({
          noticeCountList: res.data,
        })
        return res.data
      }
    },
    //  message as read
    async READ_MESSAGE(params = {}) {
      try {
        const res = await Http.post("updateMessageStatus", params)
        if (res.code === 0) {
          this.noticeCountList = res.data
        }
        return Promise.resolve(res.code)
      } catch (e) {}
    },
    // delete all message
    async DELETE_MESSAGE(params = {}) {
      try {
        const res = await Http.post("deleteMessageStatus", params)

        this.noticeCountList = res.data
        return Promise.resolve(res.code)
      } catch (e) {}
    },
    // get notice in home page
    async GET_NOTICE(params = {}) {
      const res = await Http.post("getLampList", params)
      if (res.code === 0) {
        this.$patch({
          noticeList: res.data,
        })
      }
    },
    async GET_MESSAGE_LIST(params = {}) {
      try {
        const res = await Http.post("getMessageList", params)
        return Promise.resolve(res)
      } catch (e) {}
    },
  },
})
