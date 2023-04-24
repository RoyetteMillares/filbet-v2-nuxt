import { defineStore } from "pinia"
import Http from "~/request/server"
import { StoreTypes } from "~/types/store"
import { HttpUseFetch } from "~/types/http"

const initialValue: StoreTypes.Vip.State = {
  userLevelInfo: null,
  userLeveReward: null,
  userLevelBenefits: null,
  userLevelDetails: null,
  memberShipDetails: null,
  memberShipLevelDetails: null,
}

export const useVipStore = defineStore("vip", {
  state: (): StoreTypes.Vip.State => ({
    ...initialValue,
  }),
  getters: {},
  actions: {
    async INIT() {
      const result = await Promise.allSettled([
        this.GET_User_Level_Info(),
        this.GET_User_Leve_Reward({ receiveCategory: 0 }),
        this.GET_User_Level_Benefits(),
        this.GET_User_Level_Details(),
        this.GET_Member_Ship_Details(),
        this.GET_Member_Ship_Level_Details(),
      ])
      const finalResult = result.map((res) =>
        res.status === "fulfilled" ? res.value : res.reason
      )
      return finalResult
    },
    async GET_User_Level_Info() {
      const res: HttpUseFetch.Response<StoreTypes.Vip.State["userLevelInfo"]> =
        await Http.post("userLevelInfo")
      this.$patch({
        userLevelInfo: res.data,
      })
      return res
    },
    async GET_User_Leve_Reward(params: { receiveCategory: number }) {
      const res: HttpUseFetch.Response<StoreTypes.Vip.State["userLeveReward"]> =
        await Http.post("userLeveReward", params)
      this.$patch({
        userLeveReward: res.data,
      })
      return res
    },
    async GET_User_Level_Benefits() {
      const res: HttpUseFetch.Response<
        StoreTypes.Vip.State["userLevelBenefits"]
      > = await Http.post("userLevelBenefits")
      this.$patch({
        userLevelBenefits: res.data,
      })
      return res
    },
    async GET_User_Level_Details() {
      const res: HttpUseFetch.Response<
        StoreTypes.Vip.State["userLevelDetails"]
      > = await Http.post("userLevelDetails")
      this.$patch({
        userLevelDetails: res.data,
      })
      return res
    },
    async GET_Member_Ship_Details() {
      const res: HttpUseFetch.Response<
        StoreTypes.Vip.State["memberShipDetails"]
      > = await Http.post("memberShipDetails")
      this.$patch({
        memberShipDetails: res.data,
      })
      return res
    },
    async GET_Member_Ship_Level_Details() {
      const res: HttpUseFetch.Response<
        StoreTypes.Vip.State["memberShipLevelDetails"]
      > = await Http.post("memberShipLevelDetails")
      this.$patch({
        memberShipLevelDetails: res.data,
      })
      return res
    },
  },
})
