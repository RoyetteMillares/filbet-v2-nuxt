import { defineStore } from "pinia"
import Http from "~/request/server"
import { StoreTypes } from "~/types/store"
export const useHomeStore = defineStore("home", {
  state: (): StoreTypes.Home => ({
    bannerList: [], // banner list in home index
    jackpotList: [],
    rankList: [],
    classificationList: [],
  }),
  actions: {
    async GET_BANNER(params = {}) {
      const res = await Http.post("getBannerList", params)
      this.$patch({
        bannerList: res.data,
      })
      return res
    },
    async GET_JACKPOT() {
      const res = await Http.post("getJackpotAndPayout")
      this.$patch({
        bannerList: res.data,
      })
      return res
    },
    async GET_RANK(params: any = {}) {
      const res = await Http.post("rankingList", params)
      this.$patch({
        rankList:
          params.category === 0 ? res.data.slice(0, 10) : res.data.slice(0, 20),
      })
      return res
    },
    async GET_CLASSIFICATION(params: any = {}) {
      const res = await Http.post("gameClassifyList", params)
      this.$patch({
        classificationList: res.data,
      })
      return res
    },
  },
})
