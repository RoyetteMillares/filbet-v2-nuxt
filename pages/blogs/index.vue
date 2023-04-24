<!-- eslint-disable vue/no-v-html -->
<template>
  <Template_Root>
    <CommonTab
      v-model="query.category"
      value="code"
      class="mt-40px <sm:(mt-10px) @sm:(mt-16px) @md:(mt-22px)"
      :list="categoryList"
      @change="inquire"
    />
    <div
      class="bg-$v-blog-container-bg mt-32px mb-40px rounded-lg mx-auto lg:(p-32px) <md:(p-20px) @md:(p-20px) <sm:(p-8px)"
    >
      <div
        v-for="item in blogStore.blogList?.list ?? []"
        :key="`${item.id}`"
        class="blog-content bg-$v-blog-content-bg rounded-lg flex mb-16px hover:(cursor-pointer scale-10) lg:(p-24px) <md:(p-10px) @md:(p-10px) <sm:(p-8px)"
        @click="checkInfo(item as never)"
      >
        <div
          class="lg:(h-176px min-w-300px mr-17px) <md:(h-100px min-w-200px mr-10px) @md:(h-100px min-w-200px mr-10px) <sm:(h-80px min-w-100px mr-10px)"
        >
          <img
            :src="item.image"
            class="rounded-lg w-full lg:(h-176px ) <md:(h-100px) @md:(h-100px) <sm:(h-80px w-108px)"
          />
        </div>
        <div class="flex justify-between flex-col blog-snippet">
          <div class="lg:(pt-20px)">
            <p
              class="lg:(text-20px) <md:(text-15px) @md:(text-15px) <sm:(text-12px) blog-title"
            >
              {{ item.title }}
            </p>
            <p
              class="font-thin lg:(text-12px mt-10px) <md:(text-10px mt-7px) @md:(text-10px mt-7px) <sm:(text-8px)"
            >
              {{ dateTime(item.createdAt) }}
            </p>
          </div>
          <div
            class="text-white lg:(text-14px) <md:(text-12px) @md:(text-12px) <sm:(text-10px) blog"
            v-html="item.content"
          ></div>
        </div>
      </div>
      <CommonPagination
        :="{ page: query.page, total: pageInfo.total, size: pageInfo.size }"
        @handle-current-change="handleCurrentChange"
      />
    </div>
  </Template_Root>
</template>

<script setup lang="ts">
import { useBlogStore } from "~~/stores/blog"
const router = useRouter()
const blogStore = useBlogStore()
const { t } = useLang()
definePageMeta(RouteRecord.blog)

type ListType = {
  title: string
  code: string
  label?: string
  value?: string
}

const { getDirection } = useDictionary() // dic_blog_category
const categoryList = computed(() => {
  let list = [{ title: t("public.All"), code: "" }]
  list = list.concat(getDirection("dic_blog_category") || [])
  return list.map((item: ListType) => {
    item.label = item.title
    item.value = item.code
    return item
  })
})
const checkInfo = (item: blog) => {
  router.push({ name: "blogInformation", params: { id: item.id } })
}

const pageInfo = computed(() => ({
  size: Number(blogStore.blogList?.size ?? 0),
  total: Number(blogStore.blogList?.total ?? 0),
}))

const query = reactive({
  category: (router.currentRoute.value.query.category as string) ?? "",
  page: Number(router.currentRoute.value.query.page ?? 0),
})

const parameters = computed(() => ({
  current: query.page,
  data: {
    category: query.category,
  },
  size: 6,
}))

const handleCurrentChange = (val: number) => {
  query.page = Number(val)
  router.push({
    ...router.currentRoute.value,
    name: "blog",
    query: { ...query },
  })
}

const inquire = () => {
  query.page = 1
  router.push({
    ...router.currentRoute.value,
    name: "blog",
    query: { ...query },
  })
}
watch([router.currentRoute], async () => {
  query.category = router.currentRoute.value.query.category as string
  await blogStore.GET_LIST(parameters.value)
})
await blogStore.GET_LIST(parameters.value)
</script>
<style scoped lang="scss">
.blog-content:hover {
  background: var(--v-blog-active-content-bg);
  animation: 3s ease linear;
  transform: scale(1.01);
}
.blog-snippet .blog,
.blog-snippet .blog-title {
  color: white;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.blog-snippet .blog {
  -webkit-line-clamp: 3;
}
.blog-snippet .blog-title {
  -webkit-line-clamp: 1;
}
</style>
