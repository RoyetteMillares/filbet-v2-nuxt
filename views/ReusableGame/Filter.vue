<template>
  <div class="<sm:(mt-20px) @sm:(mt-24px) @md:(mt-30px) @lg:(mt-35px) mt-40px">
    <section class="flex items-center justify-between">
      <div class="flex items-center">
        <div
          class="flex items-center mr-16px text-20px <sm:(mr-10px text-14px )"
        >
          <CommonSvgIcon name="filter" />
          <span
            class="text-14px filter-text font-600 ml-10px <:sm(ml-4px text-12px font-100)"
            >Filter By</span
          >
        </div>
        <CommonSelect
          :model-value="modelValue"
          :status-list="gameList"
          @change="changePlatform"
        ></CommonSelect>
      </div>
      <div class="flex items-center">
        <div
          class="flex items-center mr-16px text-20px <sm:(mr-10px text-14px hidden)"
        >
          <CommonSvgIcon name="filter" />
          <span
            class="text-14px filter-text font-600 ml-10px <sm:(ml-4px text-12px font-100)"
            >Sort By</span
          >
        </div>
        <CommonSelect
          :model-value="sortKey"
          :status-list="sortList"
          @change="changeSort"
        ></CommonSelect>
      </div>
    </section>
    <!--        game-->
    <ul
      class="items-center mt-20px gap-12px grid grid-cols-7 <sm:(grid-cols-3 ) @sm:(grid-cols-3 ) @md:(grid-cols-4 ) @lg:grid-cols-6 @xl:grid-cols-6"
    >
      <ViewsGameItem
        class="animated jello"
        v-for="(item, i) in compatibleGameList"
        :style="{ 'animation-delay': `${i * 0.2}s` }"
        :key="`ViewsGameItem-${i}`"
        is-search
        :item="item"
      />

      <ViewsGameSkeleton
        v-for="item in 6"
        v-show="loading"
        :key="`ViewsGameSkeleton-${item}`"
      />
    </ul>
    <!--    load more-->
    <p
      class="mt-41px mb-12px font-500 text-14px text-center display-count <sm:(mt-20px mb-8px)"
    >
      Displaying {{ allGameList.length }} of {{ state.total }} games
    </p>
    <div
      v-show="allGameList.length < state.total"
      :class="{ 'pointer-events-none': loading }"
      class="font-600 size-16px cursor-pointer flex items-center justify-center load-more m-auto w-172px h-42px <sm:(w-125px text-12px h-30px mb-32px) mb-40px @sm:(w-140px h-34px) @md:(w-150px h-36px) @lg:(w-160px h-37px)"
      @click="loadMore"
    >
      Load More
    </div>
  </div>
</template>

<script setup lang="ts">
// 获取游戏平台
import HttpInstance from "~/request/server"
const props = defineProps<{
  groups?: number[]
  title?: string
  isSport?: boolean
  category?: number
}>()
type Parameters = {
  current: number
  size: number
  data: {
    ids?: unknown | number[] | string[]
    category?: number
  }
  groups?: number[]
  sortKey?: string
  sortField?: string[]
}
const gameList = shallowRef<GamePlatform[]>([])
const modelValue = shallowRef("")
const allGameList = ref([]) // 所有游戏列表
const loading = shallowRef<boolean>(true)
const isLoad = shallowRef<boolean>(false) // 是否加载更多
const route = useRoute()
const router = useRouter()
const sortKey = shallowRef("")

// 兼容收藏游戏列表
const compatibleGameList = computed(() => {
  return allGameList.value.filter((item: GamePlatform) =>
    props.category === 3 ? item.isFavorite : item
  )
})
const state = reactive({
  current: 1,
  size: 30,
  total: 0,
})
const getGamePlatform = async () => {
  try {
    const { code, data } = await HttpInstance.post("gameList", {
      groups: props.groups,
    })
    if (code === 0) {
      gameList.value = data.map((item: GamePlatform) => {
        item.title = item.name
        item.code = String(item.id)
        return item
      })
      gameList.value.unshift({ title: "All Providers", code: "" })
    }
  } catch (e) {
    console.log(e)
  }
}
const ids = computed(() => {
  if (modelValue.value) return [modelValue.value]
  else
    return gameList.value
      .map((item: GamePlatform) => item.id)
      .filter((item) => item)
})
const sortList = [
  { title: "All", code: "" },
  { title: "Ascending", code: "ASC" },
  { title: "Descending", code: "DESC" },
]
const getAllGameList = async () => {
  loading.value = true
  const { current, size } = state
  const params: Parameters = {
    current,
    size,
    data: {
      ids: ids.value,
      category: props.category ?? 1,
    },
    sortKey: sortKey.value,
    sortField: ["hotStar"],
  }
  // if (!modelValue.value) delete params.data.ids
  if (props.isSport) {
    // @ts-ignore
    params.groups = props.groups
  }
  try {
    // if (props.isSport)
    const { code, data } = await HttpInstance.post(
      // props.isSport ? "sportGameList" : "slotGameList",
      "slotGameList",
      params
    )
    if (code === 0) {
      if (isLoad.value) allGameList.value = allGameList.value.concat(data.list)
      else allGameList.value = data?.list || data
      state.total = +data?.total ?? data.length
    }
  } catch (e) {
  } finally {
    loading.value = false
    isLoad.value = false
  }
}
// 切换游戏
const changePlatform = (val: string) => {
  router.push({ name: route.name, query: { ...route.query, id: val } })
  modelValue.value = val

  state.current = 1
  getAllGameList()
}
const changeSort = (val: string) => {
  sortKey.value = val
  router.push({ name: route.name, query: { ...route.query, sort: val } })
  getAllGameList()
}
// 加载更多
const loadMore = () => {
  isLoad.value = true
  state.current++
  getAllGameList()
}

onMounted(async () => {
  // if (!props.isSport) await getGamePlatform()
  await getGamePlatform()
  const { id, sort } = route.query

  if (id) modelValue.value = id as string
  if (sort) sortKey.value = sort as string
  getAllGameList()
})
</script>

<style lang="scss" scoped>
.filter-text {
  color: var(--v-filter-text-color);
}
.display-count {
  color: var(--v-display-color);
}
.load-more {
  background: url(../../assets/images/common/button.png) no-repeat center center;
  background-size: cover;
  color: var(--v-load-more-color);
}
</style>
