import { defineStore } from "pinia"
import { dayjs } from "element-plus"
import Http from "~/request/server"
import { StoreTypes } from "~/types/store"
import { HttpUseFetch, RequestParam } from "~/types/http"

const initialValue: StoreTypes.Blog.State = {
  blogList: null,
  currentBlog: null,
}

export const useBlogStore = defineStore("blog", {
  state: (): StoreTypes.Blog.State => ({
    ...initialValue,
  }),
  getters: {},
  actions: {
    async INIT() {
      const result = await Promise.allSettled([
        this.GET_LIST({ current: 1, size: 5, data: { category: "" } }),
      ])
      const finalResult = result.map((res) =>
        res.status === "fulfilled" ? res.value : res.reason
      )
      return finalResult
    },
    async GET_LIST(payload: RequestParam.Blog.List.Payload) {
      const res: HttpUseFetch.Response<StoreTypes.Blog.State["blogList"]> =
        await Http.post("blog", payload)
      this.$patch({
        blogList: res.data,
      })
      return Promise.resolve(res)
    },

    async GET_LIST_BY_ID(id: number) {
      const payload: RequestParam.Blog.List.Payload = {
        current: 0,
        data: { category: "" },
      }
      const res: HttpUseFetch.Response<StoreTypes.Blog.State["blogList"]> =
        await Http.post("blog", payload)
      const blog = res.data?.list.find((b) => Number(b.id) === id)
      this.$patch({ currentBlog: blog })
      return blog
    },
  },
})
