<template>
  <div
    class="lds-spinner-wrap relative"
    :style="{
      [`--scale`]: `${ratio}`,
    }"
  >
    <div class="lds-spinner">
      <div
        v-for="(_, index) in Array(countOfBars)"
        :key="`spinner-dot-${index}`"
        :style="`
               transform: rotate(${getRotateDeg(index)}deg);
               animation-duration: ${animeDuration}ms;
               animation-delay: ${getDelayMillis(index + 1)}ms;
               opacity: ${0};
             `"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ size?: number }>()
// 圓點數量
const countOfBars = 11
// 一圈幾毫秒
const animeDuration = 1000
// 速度
const speed = animeDuration / countOfBars
// 角度
const degree = 360 / countOfBars
// 比例
const ratio = Number(((props.size ?? 100) / 100).toPrecision(3))

const getRotateDeg = (times: number) => (degree * times).toPrecision(3)
const getDelayMillis = (times: number) => (speed * times).toPrecision(3)
</script>
<style lang="scss" scoped>
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
}
.lds-spinner-wrap {
  width: calc(100px * var(--scale));
  height: calc(100px * var(--scale));
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.lds-spinner {
  scale: (var(--scale));
  color: official;
  display: inline-block;
  position: relative;
  transform-origin: center;
}
.lds-spinner div {
  animation-name: lds-spinner;
  animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
  animation-iteration-count: infinite;
}
.lds-spinner div:after {
  content: "";
  display: block;
  position: absolute;
  left: 37px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #fff;
}
</style>
