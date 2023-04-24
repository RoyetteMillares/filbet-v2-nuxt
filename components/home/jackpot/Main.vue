<template>
  <div
    ref="mainRef"
    :style="{
      height: `${scale * 81}px`,
    }"
  >
    <div
      class="jackpot-main relative inline-flex justify-center items-center h-min-81px w-min-335px overflow-hidden w-full"
      :class="{
        [`${color ?? 'red'}`]: true,
      }"
      :style="{
        transform: `scale(${scale})`,
        transformOrigin: 'left top',
      }"
    >
      <div class="z-1">
        <div class="font-bold text-17px">TOTAL SLOT’S JACKPOT</div>
        <div class="mt-4px">
          <HomeJackpotPanel
            :value="props.value ?? dynamicNumber"
            :size="20"
            :color="color"
          />
        </div>
      </div>
      <div
        class="inline-flex flex-col justify-center items-center ml-16px h-full my-auto z-1"
      >
        <CommonAsset :name="props.iconName ?? 'icons-treasure'" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  iconName?: "icons-treasure" | "icons-trophy"
  type?: "slot" | "total"
  value?: number
}>()

const mainRef = ref<HTMLDivElement>()

const scale = ref(1)

const color = computed(() => {
  switch (props.type) {
    case "slot": {
      return "blue"
    }
    case "total": {
      return "red"
    }
    default: {
      return "red"
    }
  }
})

const getSeconds = () =>
  Number(
    Math.floor(Date.now() / 1000)
      .toFixed(0)
      .slice(2, 10)
  )
const dynamicNumber = ref(getSeconds())

useResizeObserver(mainRef.value, (entries) => {
  const [entry] = entries
  const width = entry.contentRect.width
  scale.value = width / 335
})

onMounted(() => {
  setInterval(() => {
    dynamicNumber.value = getSeconds()
  }, 1000)

  if (mainRef.value) {
    useResizeObserver(mainRef.value, (entries) => {
      const [entry] = entries
      const width = entry.contentRect.width
      scale.value = width / 335
    })
  }
})
</script>
<style lang="scss" scoped>
@import "~/assets/sass/mixins.scss";
.jackpot-main {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(~/assets/icons/jackpot-background.svg);
    background-blend-mode: soft-light;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 28%;
  }
  border-radius: 8px;
  &.blue {
    --bg: #00192d;
    color: #b0b7ce;
    @include background-border(
      linear-gradient(to right, var(--bg) 0%, #000000cc 45%, var(--bg) 80%),
      linear-gradient(to bottom, #436082, #1f334a),
      2px
    );
  }
  &.red {
    --bg: #230d0d;
    color: #b0b7ce;
    @include background-border(
      linear-gradient(to right, var(--bg) 0%, #000000cc 45%, var(--bg) 80%),
      linear-gradient(to bottom, #655250, #292b36),
      2px
    );
  }
}
</style>
