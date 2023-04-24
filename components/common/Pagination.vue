<template>
  <div
    v-show="total >= size || page > 1"
    class="flex-box my-42px <sm:(my-20px) <md:my-25px <lg:my-30px flex justify-center items-center"
  >
    <ElPagination
      :current-page="page"
      :page-size="size"
      :small="false"
      :disabled="false"
      :prev-text="t('additional.Previous')"
      :next-text="t('additional.Next')"
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import { ElPagination } from "element-plus"
const { t } = useI18n()
const props = defineProps({
  page: {
    type: [Number, String],
    default() {
      return []
    },
  },
  size: {
    type: [Number, String],
    default() {
      return []
    },
  },
  total: {
    type: [Number, String],
    default() {
      return []
    },
  },
})
const emit = defineEmits(["handleCurrentChange"])

const handleCurrentChange = (val) => {
  emit("handleCurrentChange", val)
}
</script>

<style lang="scss" scoped>
@mixin button {
  @screen md {
    width: 108px;
    height: 38px;
    border-radius: 24px;
  }
  @screen <md {
    width: 68px;
    height: 28px;
    border-radius: 12px;
    font-size: 12px;
  }
}
.flex-box {
  :deep(.el-pagination) {
    .btn-prev {
      box-shadow: 0px 2px 5px rgba(8, 20, 30, 0.3);
      background: linear-gradient(180deg, #324353 0%, #233546 100%);
      color: #fff;
      @include button;
      &:disabled {
        background: #30373f;
        color: #8e99b6;
      }
      &:hover {
        color: #fff;
      }
    }
  }
  :deep(.btn-next) {
    box-shadow: 0px 2px 5px rgba(8, 20, 30, 0.3);
    background: linear-gradient(180deg, #324353 0%, #233546 100%);
    color: #fff;
    @include button;
    &:disabled {
      background: #13212d;
      color: #fff;
    }
    &:hover {
      color: #fff;
    }
  }
  :deep(.el-pager) {
    .is-active {
      background: #344452;
      color: #fff;
      font-size: 14px;
    }
    li {
      //padding: 3px 7px;
      @apply <md:(p-0 !text-12px min-w-0 !w-22px h-22px !mx-2px);
      border-radius: 50%;
      background: transparent;
      margin: 0 6px;
      color: #a5acb8;
      box-sizing: border-box;
      //color: $main-text-color;
    }
  }
}
</style>
