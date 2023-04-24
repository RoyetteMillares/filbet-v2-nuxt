<template>
  <div
    class="p-20px mb-16px rounded-12px item-list <sm:(p-12px rounded-8px mb-8px) @sm:(p-14px rounded-10px mb-10px) @md:(p-16px rounded-12px mb-12px) @md:(p-18px rounded-14px mb-14px)"
    :class="{ 'item-list-active': item.isRead }"
  >
    <p
      class="font-600 item-title text-24px mb-8px <sm:(text-12px mb-4px) @sm:(text-14px mb-5px) @md:(text-18px mb-5px) @lg:(text-22px mb-6px)"
    >
      {{ item.title }}
    </p>
    <p class="item-time <sm:(text-12px) normal-text">
      {{ time(item.createdAt as number) }}
    </p>
    <p
      class="normal-text text-14px leading-18px show-2 mt-20px <sm:(mt-16px text-12px leading-16px) @sm:mt-17px @md:mt-18px @lg:mt-19px"
    >
      {{ item.content }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ item: MessageType }>()
</script>

<style lang="scss" scoped>
@mixin active {
  background: #13212d;
  color: #b3bad1;
}
.item-list {
  background: linear-gradient(180deg, #324353 0%, #233546 100%);
  box-shadow: 0px 2.65714px 6.64286px rgba(8, 20, 30, 0.3);
  //background: #13212d;
  color: #fff;
  position: relative;
  .item-title {
    position: relative;
    @apply pl-13px <sm:pl-7px;
    &:before {
      content: "";
      background: #df342d;
      @apply absolute w-10px h-10px <sm:(w-5px h-5px left-0px top-3px) rounded-1/2 left-0px top-5px;
    }
  }

  &-active {
    @include active;
    .item-title {
      @apply pl-0;
      &:before {
        display: none;
      }
    }
  }
  .normal-text {
    color: #b3bad1;
  }
}
</style>
