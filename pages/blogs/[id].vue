<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="info-bg w-full min-h-100vh <sm:(py-12px px-16px ) @sm:(py-20px px-26px) @md:(py-16px px-22px) @lg:(py-24px px-22px) @xl:(py-29px px-26px) py-38px"
  >
    <CommonContainer
      class="info-bg-container p-40px <sm:(p-16px) @sm:(p-20px) @md:(p-24px) @lg:(p-30px) rounded-12px"
    >
      <p
        class="<sm:(text-14px) @sm:(text-16px) @md:(text-20px) font-700 lg:(text-32px)"
      >
        {{ blogStore.currentBlog?.title ?? "" }}
      </p>
      <p class="font-400 text-12px mt-12px md:(mt-30px text-16px) time-display">
        {{ dateTime(blogStore.currentBlog?.createdAt ?? Date.now()) }}
      </p>
      <img
        :src="blogStore.currentBlog?.image ?? ''"
        class="w-full <sm:(mt-16px mb-12px) @sm:(mt-20px mb-14px) @md:(mt-24px mb-16px) lg:( mt-40px mb-20px)"
        alt=""
      />

      <div
        class="mt-25px lh-15px <sm:(text-12px leading-relaxed) @sm:(mt-20px mb-14px leading-relaxed)"
        v-html="blogStore.currentBlog?.content ?? ''"
      ></div>
    </CommonContainer>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from "~~/stores/blog"

const route = useRoute()
const { t } = useLang()
definePageMeta({
  ...RouteRecord.blogInformation,
})
const blogStore = useBlogStore()
await blogStore.GET_LIST_BY_ID(Number(route.params.id ?? 0))
</script>

<style lang="scss" scoped>
.info-bg {
  background: var(--v-promotion-bg-color);
  color: var(--v-promotions-text-color);
  &-container {
    background: var(--v-promotions-info-container-bg);
  }
  .time-display {
    color: var(--v-promotions-time-color);
  }
}
</style>
