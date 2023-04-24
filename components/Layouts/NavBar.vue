<template>
  <div
    class="layouts-navbar z-20 <md:( fixed t-0 l-0 z-100) w-200px t-98px l-8px h-full"
    :class="{ 'w-70px <md:w-0': !isOpen }"
  >
    <div
      class="w-full h-full px-12px relative navbar-main flex z-10"
      :class="{ '<md:px-0': !isOpen }"
    >
      <!--      logo 和 展开按钮-->
      <div
        class="show-logo flex flex-row flex-nowrap justify-between items-center pt-22px pb-22px"
      >
        <img class="show-logo w-118px r" :src="PLAT_LOGO" />
        <div
          class="relative flex rotate-0 transform cursor-pointer items-center justify-center min-w-36px h-28px rounded-16px expand"
          :class="{
            'rotate-180 <md:hidden': !isOpen,
            [isOpen ? '<md:-right-27px -right-27px' : '-left-6px']: true,
          }"
          @click="modifyLock"
        >
          <CommonSvgIcon name="expand" />
          <!--          <CommonSvgIcon name="expand" />-->
        </div>
      </div>
      <!--      list-->
      <ul class="menu-main flex-1 relative">
        <div class="w-full absolute h-full left-0 top-0 overflow-y-scroll">
          <li v-for="item in menuList" :key="item.label" @click="pageTo(item)">
            <LayoutsMenuItem
              v-if="!item.extraBottom"
              :is-open="isOpen"
              :route-name="item.name"
              :icon-name="item.icon"
              :disabled="item.auth && !isLogin"
              :is-active="item.isActive"
            >
              <p
                class="overflow-hidden menu-label"
                :style="{ width: isOpen ? 'auto' : 0 }"
              >
                {{ item.label }}
              </p>
            </LayoutsMenuItem>
            <p v-if="item.extraBottom" class="line my-24px"></p>
          </li>
        </div>
      </ul>
    </div>
    <!--    shadow-->
    <div
      v-show="isOpen"
      class="fixed w-full h-full top-0 left-0 fixed-shadow -z-2 hidden <lg:flex"
      @click.stop="modifyLock"
    ></div>
    <!--    tab bar-->
    <ul
      class="fixed -z-10 w-full tab-bar hidden <md:(grid px-0 py-10px) @sm:(px-20px py-15px) grid-cols-5 top-auto left-0 bottom-0 right-0"
    >
      <li
        v-for="item in TabBarList"
        :key="`TabBarItem-${item.name}`"
        class="flex cursor-pointer text-20px @sm:(text-23px) @md:(text-25px) flex-col items-center tab-bar-item"
        :class="{ 'tab-bar-item-active': routePath.includes(item.path as string) }"
        @click="tabClick(item)"
      >
        <CommonSvgIcon :name="item.icon" />
        <span class="text-12px mt-7px font-400">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationNamedRaw } from "vue-router"
import { useUserStore } from "~/stores/user"

const { PLAT_LOGO } = useConfig()
const route = useRoute()
const router = useRouter()
const routeName = computed(() => route.name)
const routePath = computed(() => route.path)
const user = useUserStore()
const isOpen = shallowRef<boolean>(true)
const isLogin = computed(() => user.isLogin)
const { setValue, getValue } = useStorage()
interface ListOptions {
  label?: string
  icon?: string
  name?: RouteName | String
  extraBottom?: boolean
  options?: Omit<RouteLocationNamedRaw, "name">
  auth?: boolean
  isActive?: () => boolean
  path?: string
  key?: string
}

const menuList = computed<ListOptions[]>(() => [
  { label: "Favorites", icon: "Favorites", name: "Favorites", auth: true },
  { label: "Recent", icon: "Recent", name: "Recent", auth: true },
  { extraBottom: true },
  { label: "Home", icon: "Home", name: "Home" },
  {
    label: "Filbet Originals",
    icon: "filbet_original",
    name: "Originals",
  },
  { label: "Slot Games", icon: "slot_game", name: "Slots" },
  { label: "Bingo", icon: "bingo", name: "Bingo" },
  { label: "Live Casino", icon: "live_casino", name: "Live" },
  { label: "Fishing", icon: "fishing", name: "Fishing" },
  { label: "Chess", icon: "chess", name: "Chess" },
  { label: "Sports", icon: "Sports", name: "Sports" },
  { label: "Table Games", icon: "table_game", name: "Table" },
  { extraBottom: true },
  {
    label: "Affiliate",
    icon: "Affiliate",
    name: "Affiliate-ID",
    options: {
      params: {
        id: `${user.info?.id ?? 0}`,
      },
    },
  },
  { label: "Promotions", icon: "Promotions", name: "Promotions" },
  { label: "Blogs", icon: "News", name: "blog" },
  {
    label: "VIP",
    icon: "vip",
    name: isLogin ? "VipCenter" : "Vip",
    isActive() {
      const condition = [
        router.currentRoute.value.name === "VipCenter",
        router.currentRoute.value.name === "VipDetail",
        router.currentRoute.value.name === "Vip",
      ]
      return condition.some((c) => c)
    },
  },
  { label: "Help Center", icon: "help_center", name: "HelpCenter" },
  { label: "Customer Service", icon: "custom_service" },
])
const TabBarList = reactive([
  { label: "Menu", icon: "menu", key: "menu" },
  {
    label: "Originals",
    icon: "filbet_original",
    path: "originals",
    key: "Originals",
  },
  { label: "Deposit", icon: "Deposit", path: "deposit", key: "Deposit" },
  {
    label: "Promotions",
    icon: "Promo",
    path: "promotions",
    name: "Promotions",
  },
  { label: "Profile", icon: "Profile", path: "my", key: "My" },
])
const pageTo = (row: ListOptions) => {
  if (routeName.value === row.name) return
  router.push({ name: row.name as RouteName, ...row.options })
  if (window && window.innerWidth <= 640) {
    isOpen.value = false
  }
}
const tabClick = ({ key }: ListOptions) => {
  if (key === "menu") {
    isOpen.value = !isOpen.value
    console.log(isOpen.value)
    setValue("isOpen", isOpen.value ? "1" : "0")
  } else {
    isOpen.value = false
    router.push({ name: key as RouteName })
  }
}
const modifyLock = () => {
  isOpen.value = !isOpen.value
  setValue("isOpen", isOpen.value ? "1" : "0")
}

isOpen.value = getValue("isOpen") == "1"
onMounted(() => {
  // if (window && window.innerWidth <= 640) isOpen.value = false
})
</script>

<style lang="scss" scoped>
.layouts-navbar {
  background: var(--v-navbar-bg);
  .navbar-main {
    background: var(--v-navbar-bg);
    flex-direction: column;
    .show-logo {
      .expand {
        background: var(--v-nav-expand-bg);
      }
    }
    .menu-label {
      white-space: nowrap;
      transition: width 0.3s;
    }
    .line {
      height: 1px;
      background: var(--v-navbar-extra-b);
    }
  }
  .fixed-shadow {
    background: rgba(0, 8, 20, 0.4);
    backdrop-filter: blur(2px);
  }
  .tab-bar {
    background: var(--v-tab-bar-bg);
    box-shadow: 0px -4px 4px rgba(11, 31, 48, 0.2);
    height: calc(60px + env(safe-area-inset-bottom, 0));
    padding-bottom: env(safe-area-inset-bottom, 0);
    .tab-bar-item {
      transition: all 0.1s;
      color: var(--v-tab-bar-text-color);
      &-active {
        color: var(--v-tab-bar-text-active-color);
      }
    }
  }
}
</style>
