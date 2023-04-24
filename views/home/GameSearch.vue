<template>
  <section>
    <div
      class="mt-32px <sm:(mt-16px py-6px px-12px text-13px) @sm:(mt-16px) @md:(mt-22px) rounded-40px game-search py-12px px-24px relative flex items-center"
      :class="{
        'z-10001': isFocus,
      }"
    >
      <div class="fs-20px mr-12px">
        <CommonSvgIcon name="search" />
      </div>
      <input
        v-model="modelValue"
        maxlength="30"
        type="text"
        placeholder="Search your game"
        class="inner-input w-full h-17px fs-14px font-600"
        @input="inputSearch"
        @focus="focusInput"
      />
      <span
        v-show="modelValue && isFocus"
        class="text-12px absolute cursor-pointer right-24px"
        @click="clearInput"
      >
        <CommonSvgIcon name="close" />
      </span>
      <section
        v-show="isFocus"
        class="absolute w-full max-h-496px overflow-y-scroll left-0 top-50px min-h-200px rounded-4px search-content"
      >
        <p
          v-show="modelValue.length < 3"
          class="fs-14px font-600 tips-text text-center <sm:mt-15px mt-40px"
        >
          Search requires at least 3 characters.
        </p>
        <ul
          v-show="loading"
          class="items-center gap-12px grid grid-cols-8 p-22px <sm:(grid-cols-3 p-11px) @sm:(grid-cols-3 p-15px) @md:(grid-cols-4 p-18px) @lg:grid-cols-6 @xl:grid-cols-6"
        >
          <ViewsGameSkeleton
            v-for="item in 6"
            :key="`ViewsGameSkeleton-${item}`"
          />
        </ul>
        <ul v-show="!searchGameList.length">
          <li
            v-for="(item, i) in localGameKeywordsList"
            :key="`localGameKeywordItem-${i}`"
            class="px-24px search-item py-11px flex justify-between items-center"
            @click="selectLocale(item)"
          >
            <div class="flex items-center">
              <CommonSvgIcon name="historyIcon" />
              <span class="pl-17px">{{ item }}</span>
            </div>
            <span class="text-12px" @click.stop="closeLocale(item, i)">
              <CommonSvgIcon name="close" />
            </span>
          </li>
        </ul>
        <!--        game-->
        <ul
          v-show="!loading"
          class="items-center gap-12px grid grid-cols-8 p-22px <sm:(grid-cols-3 p-11px) @sm:(grid-cols-3 p-15px) @md:(grid-cols-4 p-18px) @lg:grid-cols-6 @xl:grid-cols-6"
        >
          <ViewsGameItem
            v-for="(item, i) in searchGameList"
            :key="`ViewsGameItem-${i}`"
            is-search
            :item="item"
          />
        </ul>
      </section>
    </div>
    <div
      v-show="isFocus"
      class="fixed z-10000 w-full h-full left-0 top-0 search-shadow"
      @click.self="isFocus = false"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { debounce } from "~/utils/debonce"
import Http from "~/request/server"

const isFocus = shallowRef<boolean>(false)
const modelValue = shallowRef<string>("")
const searchGameList = shallowRef<any[]>([]) // 已搜索的游戏列表
const { getValue, setValue } = useStorage()
const cookieGameValue = shallowRef<string>(getValue("gameName") ?? "")
const loading = shallowRef<boolean>(false) // loading
const localGameKeywordsList = computed<string[]>(() => {
  return (cookieGameValue?.value && cookieGameValue?.value?.split("#")) || []
})

const searchGame = async () => {
  const params: SearchType = {
    current: 1,
    size: 100,
    data: {
      name: modelValue.value,
      // category: 1,
    },
    sign: "",
  }
  try {
    searchGameList.value = []
    if (modelValue.value.length < 3) return
    loading.value = true
    const { data, code } = await Http.post("searchGameList", params)
    if (code === 0) {
      searchGameList.value = data?.list
      saveSearchKeywords()
    }
    // console.log(data, code, 9999)
  } catch (e) {
  } finally {
    // 优化太快闪屏
    setTimeout(() => {
      loading.value = false
    }, 100)
  }
}
const debounceFn = debounce(searchGame, 500)
const focusInput = () => {
  isFocus.value = true
}
// 保存搜索关键字
const saveSearchKeywords = () => {
  const localKeywords = getValue("gameName") || null
  if (localKeywords) {
    try {
      const list = localKeywords?.split("#") ?? ""
      const index =
        list &&
        list.findIndex((item: string) => modelValue.value.includes(item))
      if (index >= 0) {
        list.splice(index, 1)
        list.unshift(modelValue.value)
      } else {
        list.unshift(modelValue.value)
      }
      const saveList = [...list].slice(0, 5).join("#")
      setValue("gameName", saveList)
      cookieGameValue.value = saveList
    } catch (e) {
      console.log(e, "error")
    }
  } else {
    setValue("gameName", modelValue.value)
    cookieGameValue.value = modelValue.value
  }
}
const inputSearch = () => {
  // searchGameList.value = []
  if (modelValue.value?.length >= 3) debounceFn()
  else searchGameList.value = []
  //
}
// 选择
const selectLocale = (item: string) => {
  modelValue.value = item
  inputSearch()
}
// 关闭
const closeLocale = (item: string, index: number) => {
  const list = [...localGameKeywordsList.value]
  list.splice(index, 1)
  const string = list.join("#")
  setValue("gameName", string)
  cookieGameValue.value = string
  // console.log(item)
}
const clearInput = () => {
  modelValue.value = ""
  searchGameList.value = []
}
</script>

<style lang="scss" scoped>
.game-search {
  border: 1px solid var(--v-search-border);
  background: var(--v-search-bg);
}
.search-shadow {
  background: rgba(0, 8, 20, 0.4);
  backdrop-filter: blur(2px);
}
.inner-input {
  outline: none;
  background: transparent;
  color: var(--v-search-inner-text);
  &::placeholder {
    color: var(--v-search-placeholder-text);
  }
}
.search-content {
  background: var(--v-search-content-bg);
  .tips-text {
    color: var(--v-search-tips-text-color);
  }
  .search-item {
    cursor: pointer;
    &:hover {
      background: var(--v-search-bg-hover);
    }
  }
}
.game-list {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto 100%;
}
</style>
