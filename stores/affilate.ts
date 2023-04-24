import { defineStore } from "pinia"
import { dayjs } from "element-plus"
import Http from "~/request/server"
import { StoreTypes } from "~/types/store"
import { HttpUseFetch, RequestParam } from "~/types/http"

const initialValue: StoreTypes.Affiliate.State = {
  commissionRateList: null,
  teamBenefits: null,
  subordinateDetails: null,
  commissionRecords: null,
}

export const useAffiliateStore = defineStore("affiliate", {
  state: (): StoreTypes.Affiliate.State => ({
    ...initialValue,
  }),
  getters: {},
  actions: {
    async INIT() {
      const result = await Promise.allSettled([
        this.GET_COMMISSION_RATE_LIST(),
        this.GET_TEAM_BENEFITS(),
        this.GET_SUBORDINATE_DETAILS(),
        this.TRANSFER_COIN(),
        this.GET_COMMISSION_RECORDS(),
      ])
      const finalResult = result.map((res) =>
        res.status === "fulfilled" ? res.value : res.reason
      )
      return finalResult
    },
    async GET_COMMISSION_RATE_LIST() {
      const res: HttpUseFetch.Response<
        StoreTypes.Affiliate.__State["commissionRateList"]
      > = await Http.post("commissionRateList")
      this.$patch({
        commissionRateList: res.data,
      })
      return res
    },
    async GET_TEAM_BENEFITS() {
      const res: HttpUseFetch.Response<
        StoreTypes.Affiliate.__State["teamBenefits"]
      > = await Http.post("teamBenefits")
      this.$patch({
        teamBenefits: res.data,
      })
      return res
    },
    async GET_SUBORDINATE_DETAILS() {
      const res: HttpUseFetch.Response<
        StoreTypes.Affiliate.__State["subordinateDetails"]
      > = await Http.post("subordinateDetails")
      this.$patch({
        subordinateDetails: res.data,
      })

      return res
    },
    async GET_COMMISSION_RECORDS(
      __payload?: Partial<RequestParam.Affiliate.CommissionRecord.Payload>
    ) {
      const defaultPayload: typeof __payload = {
        current: 1,
        data: {
          // endTime: dayjs().unix(),
          // level: 0,
          // startTime: dayjs().subtract(1, "year").unix(),
        },
        size: 10,
        sortField: [],
        sortKey: "ASC",
      }
      const payload: typeof __payload =
        { ...defaultPayload, ...__payload } ?? defaultPayload
      const res: HttpUseFetch.Response<
        StoreTypes.Affiliate.__State["subordinateDetails"]
      > = await Http.post("commissionRecords", payload)
      this.$patch({
        commissionRecords: res.data as never,
      })
      return res
    },
    async TRANSFER_COIN() {
      const res: HttpUseFetch.Response = await Http.post("coinTransfer")
      return res
    },
  },
})
