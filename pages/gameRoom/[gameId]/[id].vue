<template>
  <div
    class="w-full pt-20px <sm:pt-20px @sm:pt-30px @md:pt-50px @lg:pt-70px relative"
  >
    <section
      ref="fullscreenContainer"
      class="min-h-700px xl:min-h-800px <md:min-h-600px w-full z-100 flex flex-col app-loader-container overflow-hidden rounded-12px"
    >
      <!--    v-show="!isLoaded"-->
      <div
        v-show="!isLoaded"
        class="flex-1 w-full h-full flex items-center justify-center"
      >
        <img class="loading" src="../../../assets/default/loading.gif" alt="" />
      </div>
      <template v-if="gameInfo.status === 1">
        <iframe
          v-show="isLoaded"
          ref="frame"
          class="w-full h-full flex-1 left-0 top-0"
          :allowfullscreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowtransparency="true"
          auto="autoplay"
          muted="muted"
          frameborder="0"
          :src="gameUrl"
        ></iframe>
        <div
          v-show="gameInfo.status === 1 && isLoaded"
          class="w-full bottom-0 text-20px <sm:(text-14px py-10px px-12px) left-0 py-14px px-32px shadow-edit flex items-center justify-between"
        >
          <CommonSvgIcon
            v-show="gameInfo.isFavorite"
            class="cursor-pointer"
            name="favorite-clicked"
            @click="modifyFav"
          />
          <CommonSvgIcon
            v-show="!gameInfo.isFavorite"
            class="cursor-pointer"
            name="favorite-unclick"
            @click="modifyFav"
          />
          <CommonSvgIcon
            class="cursor-pointer <md:hidden"
            name="fullscreen"
            @click="toggle"
          />
        </div>
      </template>

      <ViewsGameMaintance v-if="gameInfo.status && gameInfo.status !== 1" />
    </section>

    <LazyViewsHomeProfitLeaderboard class="mt-20px" />
  </div>
</template>

<script setup lang="ts">
import { api as fullscreen } from "vue-fullscreen"
import { Ref } from "vue"
import { useGame } from "~/stores/game"
import { dialogConfirm } from "~/components/custom-dialog/custom"
import { useUserStore } from "~/stores/user"

definePageMeta(RouteRecord.GameRoom)

const { t } = useLang()
const gameUrl = ref("")
const route = useRoute()
const isLoaded = ref(false)
const frame = ref<HTMLIFrameElement>()
const user = useUserStore()
const loading = ref(true)
const mtt = ref(false)
const game = useGame()
const fullscreenContainer = ref<HTMLBaseElement>()

const gameInfo = shallowRef({}) as Ref<GamePlatform>

const { id, gameId } = route.params
const startGame = async () => {
  try {
    const res = await game.START_GAME({ id, gameId, playMode: 1 })
    gameUrl.value = res.data
    frame.value!.onload = function () {
      isLoaded.value = true
    }
  } catch (e) {
    console.log(e, 992)
  }
}

const getGameInfo = async () => {
  try {
    const { id, gameId } = route.params
    const { code, data } = await game.GET_GAME_INFO({ id, gameId, playMode: 1 })
    gameInfo.value = data
    if (code === 0 && data && data.status === 1) startGame()
    else isLoaded.value = true
  } catch (e) {
    isLoaded.value = true
  }
}

setTimeout(async () => {
  await getGameInfo()
})
const modifyFav = async () => {
  try {
    const params = {
      direction: gameInfo.value?.isFavorite ? 0 : 1,
      gameId: gameInfo.value?.gameId,
      gameSlotId: gameInfo.value?.id,
    }
    await game.GAME_COLLECTION(params)
    gameInfo.value.isFavorite = gameInfo.value?.isFavorite ? 0 : 1
    Notify({
      title: "Successfully",
      message: "Edit successfully",
      type: "success",
      position: "top-left",
    })
  } catch (e) {
    Notify({
      title: "Failed",
      message: "Edit Failed",
      type: "error",
      position: "top-left",
    })
    // console.log(e)
  }
}

const toggle = () => {
  console.log(fullscreenContainer.value)
  fullscreen.toggle(fullscreenContainer.value, {
    teleport: true,
    // pageOnly: true,
    callback: () => {},
  })
}

onBeforeRouteLeave(async (): Promise<boolean> => {
  const flag = await dialogConfirm(
    t("game.sureQuitGame"),
    t("public.Reminder"),
    { showCancelButton: true }
  )
  if (flag) user.GET_USER_PROFILE()
  return flag as boolean
})
</script>

<style lang="scss" scoped>
.shadow-edit {
  background: linear-gradient(
    180deg,
    rgba(19, 33, 45, 0) 0%,
    rgba(19, 33, 45, 0.51) 100%
  );
}
.app-loader-container {
  background: rgba(19, 33, 45, 0.51);
}
</style>
