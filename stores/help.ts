import { defineStore } from "pinia"
import Http from "~/request/server"
import { StoreTypes } from "~/types/store"

const initialValue = {
  detail: null,
  typesList: null,
  contentList: null,
} as StoreTypes.Help.State

export const useHelpStore = defineStore("help", {
  state: (): StoreTypes.Help.State => ({
    ...initialValue,
  }),
  getters: {},
  actions: {
    HELPTYPES(params = {}) {
      return new Promise((resolve, reject) => {
        Http.post("helpTypes", params)
          .then((res) => {
            if (res.code === 0) {
              this.typesList = res.data
            }
            resolve(res.code)
          })
          .catch((error) => reject(error))
      })
    },
    HELPCONTENT(params = {}) {
      return new Promise((resolve, reject) => {
        Http.post("helpContent", params)
          .then((res) => {
            if (res.code === 0) this.contentList = res.data
            resolve(res.data)
          })
          .catch((error) => reject(error))
      })
    },
    HELPDETAIL(params = {}) {
      return new Promise((resolve, reject) => {
        Http.post("helpDetail", params)
          .then((res) => {
            if (res.code === 0) this.detail = res.data
            resolve(res.code)
          })
          .catch((error) => reject(error))
      })
    },
  },
})
