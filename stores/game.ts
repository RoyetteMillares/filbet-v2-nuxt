import { defineStore } from "pinia"
import Http from "~/request/server"
import { StoreTypes } from "~/types/store"
import { HttpUseFetch } from "~/types/http"

export const useGame = defineStore("game", {
  state: (): StoreTypes.Game => ({
    collectionList: [],
  }),
  getters: {},
  actions: {
    async GAME_COLLECTION(params = {}) {
      try {
        const { code }: HttpUseFetch.Response = await Http.post(
          "gameFavorite",
          params
        )
        // this.GET_COLLECTION_LIST()
        return Promise.resolve(code)
      } catch (e) {
        return Promise.reject()
      }
    },
    async GET_COLLECTION_LIST() {
      const params = {
        current: 1,
        size: 100,
        data: {
          category: 3,
          name: "",
        },
      }
      const res: HttpUseFetch.Response = await Http.post("slotGameList", params)
      if (res.code === 0) {
        this.$patch({
          collectionList: res.data.list,
        })
      }
      return res
    },
    async START_GAME(params: any): Promise<any> {
      try {
        const res: HttpUseFetch.Response = await Http.post("startGame", params)
        return Promise.resolve(res)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async GET_GAME_INFO(params: {}) {
      try {
        const res: HttpUseFetch.Response = await Http.post("details", params)
        return Promise.resolve(res)
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
})
