import { defineStore } from "pinia"
import Http from "~/request/server"
import { StoreTypes } from "~/types/store"
import { AppInitConfigID } from "~/utils/constant"

export const useAppStore = defineStore("app", {
  state: (): StoreTypes.App.State => ({
    config: [],
    dictionary: [],
  }),
  getters: {
    websocketURL(): string | null {
      const url =
        this.config.find((c) => c.id === AppInitConfigID.ws_server)?.value ??
        null
      return url
    },
  },
  actions: {
    async GET_CONFIG() {
      const res = await Http.post("init")
      this.$patch({
        config: res?.data,
      })
      // const value = res.data.find(
      //   (item: any) => item.title === "customerScript"
      // )?.value
      // if (value) load(value)
      return res?.data
    },
    GET_CONFIG_BY_ID(id: AppInitConfigID) {
      return this.config.find((c) => c.id === id)
    },
    async GET_DICTIONARY() {
      const res = await Http.post("getDictionary")
      if (res.code === 0)
        this.$patch({
          dictionary: res.data,
        })
      return res.code
    },
  },
})
