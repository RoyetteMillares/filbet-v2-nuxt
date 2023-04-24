import { defineStore } from "pinia"
import { StoreTypes } from "~/types/store"
import Http from "~/request/server"
import { HttpUseFetch } from "~/types/http"
export const useCard = defineStore("card", {
  state: (): StoreTypes.Card<any> => ({
    cardList: [],
    configList: [],
    withdrawConfig: [],
    // 4 PIX 5 G-CASH
    parseJson: [4, 5], // 需要解析的transfer类型 categoryTransfer
  }),
  actions: {
    GET_USER_CARD(params = {}) {
      return new Promise((resolve, reject) => {
        Http.post("withdrawalAddressList", params)
          .then((res: HttpUseFetch.Response) => {
            if (res.code === 0) {
              this.cardList = res.data.map((item: any) => {
                let title = ""
                if (item.categoryTransfer === 1 || item.categoryTransfer === 2)
                  title = item.address
                if (
                  (item.categoryTransfer === 3 ||
                    item.categoryTransfer === 5) &&
                  item.address
                ) {
                  title = JSON.parse(item.address)?.accountNumber
                }
                if (item.categoryTransfer === 4 && item.address) {
                  title = JSON.parse(item.address)?.accountNo
                }
                item.title = title
                return item
              })
            }
            resolve(res)
          })
          .catch((error) => reject(error))
      })
    },
    GET_PLAT_CONFIG() {
      Http.post("getPlatConfigList").then((res: HttpUseFetch.Response) => {
        if (res.code === 0) this.configList = res.data
      })
    },
    async CREATE_CARD(params = {}) {
      try {
        const { code } = await Http.post("addWithdrawalAddress", params)
        if (code === 0) this.GET_USER_CARD()
        return Promise.resolve(code)
      } catch (e) {}
    },
    GET_WITHDRAW_CONFIG(params = {}) {
      return new Promise((resolve, reject) => {
        Http.post("getWithdrawalChannelList", params)
          .then((res: HttpUseFetch.Response) => {
            if (res.code === 0) this.withdrawConfig = res.data
            resolve(res)
          })
          .catch((error) => reject(error))
      })
    },
  },
})
