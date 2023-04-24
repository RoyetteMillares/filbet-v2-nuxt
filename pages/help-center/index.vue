<template>
  <Template_Root>
    <LazyViewsHelpCenterBanner
      :model-value="modelValue"
      :types-list="typesList"
      @change="hadleChange"
    />
    <LazyViewsHelpCenterContent
      :title="title"
      :accordion-list="accordionList"
    />
  </Template_Root>
</template>
<script setup lang="ts">
import { useHelpStore } from "~/stores/help"
definePageMeta(RouteRecord.HelpCenter)
const HelpStore = useHelpStore()
const typesParmas = reactive({ current: 1, size: 10 })
// types
const gethelpTypesList = async () => {
  await HelpStore.HELPTYPES(typesParmas)
}
await gethelpTypesList()

const typesList = computed(() => {
  if (HelpStore.typesList)
    return HelpStore.typesList.list.map((item: any) => {
      return {
        label: item.typeName,
        value: item.id,
        img: item.imageUrl,
      }
    })
  else return []
})

const modelValue = ref(typesList.value[0]?.value ?? 1)
const title = ref(typesList.value[0]?.label ?? "")
// content
const contentParmas = reactive({
  current: 1,
  data: { helpTypeId: modelValue },
  size: 100,
  sortKey: "DESC",
})
const getContentList = async () => {
  await HelpStore.HELPCONTENT(contentParmas)
}
await getContentList()

const accordionList = computed(() => {
  return (
    HelpStore.contentList?.list.map((item: any) => {
      return {
        title: item.title,
        content: item.content,
      }
    }) ?? []
  )
})

// detail

const hadleChange = (item: { label: string; value: number; img: string }) => {
  title.value = item.label
  modelValue.value = item.value
  getContentList()
}
</script>

<style lang="scss"></style>
