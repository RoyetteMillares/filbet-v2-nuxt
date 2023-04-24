<template>
  <section class="information-container">
    <section
      class="flex items-center justify-between w-full flex-wrap gap-10px"
    >
      <ul class="flex gap-10px <sm:(gap-8px) <md:w-full">
        <li
          class="cursor-pointer flex items-center justify-center px-24px py-12px rounded-24px text-14px font-500 information-item @sm:(px-14px py-6px) @md:(px-16px py-8px) @lg:(px-18px py-10px) <sm:(text-12px py-5px font-0 px-0 w-1/3)"
          :class="{ 'information-item-active': state.category === item.code }"
          v-for="item in noticeTitleList"
          @click="changeName(item)"
        >
          <span>{{ item.title }}</span>
          <span
            v-if="+item.count"
            class="unread-count rounded-4px text-12px ml-3px p-2px"
          >
            {{ item.count }}
          </span>
        </li>
      </ul>
      <!--    message-content-->
      <div class="message-edit flex gap-10px items-center <md:w-full">
        <!--        v-show="state.messageList.length && state.category != 1"-->
        <div
          class="flex edit-item items-center"
          v-show="state.messageList.length && state.category != 1"
          @click="deleteAll"
        >
          <CommonSvgIcon name="delete" />
          <span class="delete-text ml-5px">{{
            t("mine.information.DeleteAll")
          }}</span>
        </div>
        <span
          class="edit-item flex items-center"
          @click="readAsAll"
          v-if="state.messageList.length"
          >{{ t("mine.information.MarkAllAsRead") }}</span
        >
      </div>
    </section>

    <ul
      class="p-32px rounded-16px mt-20px <sm:(p-8px rounded-12px mt-8px) @sm:(p-10px rounded-14px mt-10px) @md:(p-12px rounded-15px mt-14px) @lg:(p-16px rounded-16px mt-18px) list-container"
    >
      <NuxtPage v-if="routeParams" />
      <template v-else>
        <ViewsMyInformationItem
          @click="pageTo(item)"
          class="animated zoomIn cursor-pointer"
          :style="{ animationDelay: `${i * 0.2}s` }"
          :key="item.id"
          :item="item"
          v-for="(item, i) in state.messageList"
        />
      </template>
    </ul>
    <CommonPagination
      :="{ page: state.page, size: state.size, total: state.total }"
      @handle-current-change="handleCurrentChange"
    />
  </section>
</template>

<script setup lang="ts">
import { useMessage } from "~/stores/message"
import { dialogConfirm } from "~/components/custom-dialog/custom"

definePageMeta({
  middleware: ["auth"],
  ...RouteRecord.Information,
})

const router = useRouter()
const { t } = useLang()
const route = useRoute()
const { getDirection, getTitle } = useDictionary()
const message = useMessage()

const { setValue } = useStorage()
interface StateType {
  category: string | number | unknown
  page: number
  total: number
  size: number
  messageList: MessageType[]
}
interface ItemType {
  title: string
  code: string
  count?: number
}

const state = reactive<StateType>({
  category: "1",
  page: 1,
  total: 0,
  size: 10,
  messageList: [],
})

const routeParams = computed(() => route.params.id)
const noticeCount = computed(() => message.noticeCount || [])
const titleList = computed(() => getDirection("dic_notice_category") || [])
const noticeTitleList = computed(() => {
  let list = []
  const noticeCountList = message.noticeCountList || []
  list = titleList.value.map((item: ItemType) => {
    noticeCountList.forEach((val) => {
      if (item.code === val.category.toString()) {
        item.count = val.count
      }
    })
    return item
  })
  return list
})
const getMessageList = async () => {
  const params = {
    current: state.page,
    size: state.size,
    data: { category: state.category },
  }
  const res = await message.GET_MESSAGE_LIST(params)
  if (res?.code === 0) {
    state.messageList = res.data.list
    state.total = +res.data.total
  }
}
const deleteAll = () => {
  dialogConfirm(
    t("mine.information.sureDleteAll"),
    t("mine.information.Reminder"),
    {
      showCancelButton: true,
    }
  ).then(async () => {
    const code = await message.DELETE_MESSAGE({
      category: state.category,
    })
    if (code === 0) getMessageList()
  })
}
const changeName = (item: ItemType) => {
  router.push("/my/information")
  state.category = item.code
  state.page = 1
  getMessageList()
}
const handleCurrentChange = (val: number) => {
  state.page = val
  getMessageList()
}
const readAsAll = () => {
  dialogConfirm(
    t("mine.information.sureMarkAll"),
    t("mine.information.Reminder"),
    {
      showCancelButton: true,
    }
  ).then(async () => {
    const code = await message.READ_MESSAGE({ category: state.category })
    if (code === 0) getMessageList()
  })
}
const checkAsRead = (id: number) => {
  message.READ_MESSAGE({ id })
}
const pageTo = async (item: MessageType) => {
  if (!item.isRead) checkAsRead(item.id as number)
  await setValue("information", JSON.stringify(item))
  router.push(`/my/information/${item.id}`)
}
onMounted(async () => {
  if (route.query.category) {
    state.category = route.query.category
  } else {
    const { code, data } = await message.GET_NOTICE_COUNT()
    if (code === 0 && data.length) state.category = data[0].category
  }
  getMessageList()
})
</script>

<style lang="scss" scoped>
.information-container {
  .information-item {
    background: var(--v-information-list-bg);
    color: var(--information-list-color);
    .unread-count {
      background: #df342d;
      color: #fff;
    }
    &-active {
      color: #fff;
      background: var(--information-list-color);
      box-shadow: 0px 0.9px 2.25px rgba(8, 20, 30, 0.3);
    }
  }
  .list-container {
    background: #263642;
  }
  .edit-item {
    @apply px-24px py-12px rounded-24px text-14px font-500 information-item @sm:(px-14px py-6px) @md:(px-16px py-8px) @lg:(px-18px py-10px) <sm:(text-12px py-5px font-0 px-0 w-1/3) justify-center;
    background: var(--information-list-color);
    box-shadow: 0px 0.9px 2.25px rgba(8, 20, 30, 0.3);
  }
}
</style>
