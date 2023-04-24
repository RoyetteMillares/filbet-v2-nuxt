<template>
  <div class="inline-flex flex-col justify-center m-auto h-full w-full">
    <div
      class="jackpot-number w-full"
      :class="{
        [`c-${props.color ?? 'blue'}`]: true,
      }"
    >
      <div
        class="left-0 top-0 relative h-full w-full"
        :class="{
          'c-inner-box': true,
          'inline-flex': true,
          'font-bold': true,
          'bg-clip-text': true,
        }"
        :data-number="props.number"
      >
        <div class="c-shadow">{{ props.number }}</div>
        <div class="c-bottom">{{ props.number }}</div>
        <div class="c-top">{{ props.number }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  /**
   * {number} px
   */
  size?: number
  color?: "blue" | "red"
  number?: number
}>()
</script>
<style lang="scss" scoped>
@mixin blue {
}
@mixin red {
}

.jackpot-number {
  .c-inner {
    left: 0;
    right: 0;
    position: absolute;
    background-clip: text;
  }
  .c-inner-box {
    .c-shadow {
      left: 0;
      right: 0;
      position: absolute;
      text-shadow: 6px 6px 6px #1c0a0a;
    }
    .c-top {
      @extend .c-inner;
      content: attr(data-number);
      -webkit-text-fill-color: transparent;
    }
    .c-bottom {
      @extend .c-inner;
      content: attr(data-number);
      -webkit-text-stroke: 6px transparent;
    }
  }

  &.c-blue {
    .c-inner-box {
      .c-top {
        background-image: var(--v-jackpot-text-bg-blue);
      }
      .c-bottom {
        background-image: var(--v-jackpot-text-border-blue);
        color: #76c1fb;
      }
    }
  }
  &.c-red {
    .c-inner-box {
      .c-top {
        background-image: var(--v-jackpot-text-bg-red);
      }
      .c-bottom {
        background-image: var(--v-jackpot-text-border-red);
        color: #fb9176;
      }
    }
  }
}
</style>
