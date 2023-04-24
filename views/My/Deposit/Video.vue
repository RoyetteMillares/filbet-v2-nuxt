<template>
  <ViewsMyDepositContainer title="How to deposit">
    <section id="d-player" ref="dPlayer" class="w-full"></section>
  </ViewsMyDepositContainer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import DPlayerClass from "dplayer"
import { useAppStore } from "~/stores/app"

const { getDirection, getTitle } = useDictionary()

const videoUrl = computed(() =>
  getTitle(getDirection("dic_config_url"), "deposit_video_url")
)
const videoPic = computed(() =>
  getTitle(getDirection("dic_config_url"), "deposit_video_banner_url")
)
const { t, locale } = useI18n()
const dp = ref<DPlayerClass>()
const dPlayer = ref<HTMLElement>()
onMounted(async () => {
  const DPlayer = (await import("dplayer")).default
  try {
    const url = getDirection("dic_config_url")
    if (!url) await useAppStore().GET_DICTIONARY()

    const options: ConstructorParameters<typeof DPlayerClass>["0"] = {
      container: dPlayer.value ?? null,
      lang: locale?.value,
      hotkey: true,
      preload: "auto",
      loop: true,
      autoplay: false,
      video: {
        pic: videoPic.value,
        url: videoUrl.value,
      },
    }
    dp.value = new DPlayer(options)
  } catch (e) {
    console.log(e)
  }
})
onBeforeUnmount(() => {
  dp.value && dp.value?.destroy()
})
</script>

<style scoped></style>
