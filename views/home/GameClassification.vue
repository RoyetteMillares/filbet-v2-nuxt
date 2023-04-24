<template>
  <!--  <section class="mt-32px <sm:(mt-16px) @sm:(mt-16px) @md:(mt-22px)">-->
  <!--    <ul class="p-4px">-->
  <!--      <section-->
  <!--        class="Classification-inner p-4px overflow-x-scroll rounded-32px flex items-center"-->
  <!--      >-->
  <!--        <li-->
  <!--          class="py-10px rounded-24px game-info cursor-pointer px-14px font-500 <sm:(py-7px px-10px text-14px) @sm:(py-7px px-10px) flex flex-shrink-0 items-center"-->
  <!--          :class="{ 'game-info-active': routeName === item.name }"-->
  <!--          v-for="item in list"-->
  <!--          :key="item.label"-->
  <!--        >-->
  <!--          <CommonSvgIcon :name="item.icon" />-->
  <!--          <span class="<sm:(ml-8px) ml-12px">{{ item.label }}</span>-->
  <!--        </li>-->
  <!--      </section>-->
  <!--    </ul>-->
  <!--  </section>-->
  <CommonTab
    @change="changeTab"
    v-model="modelValue"
    class="mt-32px <sm:(mt-10px) @sm:(mt-16px) @md:(mt-22px)"
    :list="list"
  />
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const routeName = computed(() => route.name ?? "")
const modelValue = shallowRef(routeName.value)

interface ListSectionType {
  label: string
  icon: string
  value: RouteName
}
const list = [
  { label: "Home", icon: "Home", value: "Home" },
  { label: "Filbet Originals", icon: "filbet_original", value: "Originals" },
  { label: "Slot Games", icon: "slot_game", value: "Slots" },
  { label: "Live Casino", icon: "live_casino", value: "Live" },
  { label: "Fishing", icon: "fishing", value: "Fishing" },
  { label: "Chess", icon: "chess", value: "Chess" },
  { label: "Sports", icon: "Sports", value: "Sports" },
  { label: "Table Games", icon: "table_game", value: "Table" },
]

const changeTab = (item: ListSectionType) => {
  router.push({ name: item.value })
}
</script>

<style lang="scss" scoped>
@mixin active {
  color: var(--v-class-game-active-color);
  background: linear-gradient(180deg, #324353 0%, #233546 100%);
  box-shadow: 0px 2px 4px #142a3a;
}
.Classification-inner {
  background: var(--v-class-inner-bg);
  width: fit-content;
  max-width: 100%;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .game-info {
    color: var(--v-class-game-color);
    &-active {
      @include active;
    }
    &:hover {
      @include active;
    }
  }
}
</style>
