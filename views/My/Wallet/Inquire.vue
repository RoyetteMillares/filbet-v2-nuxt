<template>
  <div
    class="flex justify-between items-center gap-20px <sm:(gap-8px) flex-wrap"
  >
    <div>
      <slot></slot>
    </div>
    <div class="flex flex-wrap gap-20px <sm:(gap-8px)">
      <ul class="flex items-center gap-20px <sm:(gap-10px) flex-wrap">
        <li v-for="item in searchList" :key="`inquire-li-${item.label}`">
          <template v-if="item.type === 'select'">
            <CommonSelect
              v-model="item.modelValue"
              class="filter-select"
              :label="item.label"
              :status-list="item.list"
              @change="item.change"
            />
          </template>
          <template v-if="item.type === 'date'">
            <CommonDate
              @change="item?.change"
              v-model="item.modelValue"
              :label="item.label"
            />
          </template>
        </li>
        <div
          class="button-inquire cursor-pointer py-14px px-44px rounded-24px <sm:(py-8px px-30px text-12px) <md:(text-13px) font-500 text-14px"
          @click="inquire"
        >
          Filter
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ searchList: RecordType[] }>()
const emit = defineEmits(["inquire"])
const inquire = () => {
  emit("inquire")
  // console.log(props.searchList);
}
</script>

<style lang="scss" scoped>
.button-inquire {
  background: var(--v-my-wallet-inquire-bg);
  box-shadow: 0px 0.9px 2.25px rgba(8, 20, 30, 0.3);
}
.filter-select {
  :deep(.el-input__wrapper) {
    border-radius: 16px;
    @apply w-154px <sm:( h-28px) @sm:( h-30px) @md:( h-34px) @lg:( h-38px) h-46px;
  }
}
</style>
