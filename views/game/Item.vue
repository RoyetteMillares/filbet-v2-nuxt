<template>
  <li
    @click="startGame"
    v-ground="item.img || item.icon"
    class="game-item cursor-pointer relative rounded-16px game-list h-220px <sm:(h-144px rounded-12px ) @sm:(h-160px) @md:(h-200px) '"
    :class="[
      !isSearch &&
        'h-240px flex-shrink-0 w-180px <sm:(h-144px w-107px) @sm:(h-164px w-125px) @md:(h-204px w-150px) @lg:(h-220px w-170px)',
    ]"
    :style="{ backgroundImage: `url(${item.img || item.icon})` }"
  >
    <div
      class="game-shadow absolute text-28px w-full h-full rounded-16px left-0 top-0 flex justify-center items-center"
    >
      <div
        class="absolute right-12px top-12px text-20px"
        @click.stop="favoriteGame"
      >
        <CommonSvgIcon v-show="item.isFavorite" name="favorite-clicked" />
        <CommonSvgIcon v-show="!item.isFavorite" name="favorite-unclick" />
      </div>

      <div
        class="text-center show-game-name absolute w-full bottom-20px text-center left-0"
      >
        <div @click="startGame" class="flex justify-center w-full">
          <CommonSvgIcon name="play-icon" />
        </div>
        <p
          class="font-800 text-32px <sm:text-20px @sm:text-20px @md:text-20px @lg:text-24px mt-40px show-2"
        >
          {{ item?.name }}
        </p>
        <p class="text-14px mt-5px">{{ item?.platName }}</p>
      </div>
    </div>
    <!--    h5显示-->
    <!--    <div-->
    <!--      class="h5-show show-game-name absolute w-full bottom-0 left-0 p-8px md:hidden text-center"-->
    <!--    >-->
    <!--      <p class="font-800 text-16px show-2">-->
    <!--        {{ item?.name }}-->
    <!--      </p>-->
    <!--      <p class="text-14px mt-5px">{{ item?.platName }}</p>-->
    <!--    </div>-->
  </li>
</template>

<script setup lang="ts">
import { useUnLogin } from "~/composables/unLogin"
import { useUserStore } from "~/stores/user"
import { useGame } from "~/stores/game"

const { handleUnLogin } = useUnLogin()
const game = useGame()
const userStore = useUserStore()
const router = useRouter()

const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    },
  },
  isSearch: {
    type: Boolean,
    default: false,
  },
})
// 收藏游戏
const favoriteGame = async () => {
  try {
    await handleUnLogin()
    const { item } = props
    const params = {
      direction: item.isFavorite ? 0 : 1,
      gameId: item.gameId,
      gameSlotId: item.id,
    }
    await game.GAME_COLLECTION(params)
    item.isFavorite = item.isFavorite ? 0 : 1
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
  // if (!userStore.isLogin) {
  //   Notify({
  //     title: "Authenticator",
  //     message: "You haven't login please login first!",
  //     type: "error",
  //     position: "top-left",
  //     // duration: 1000,
  //   })
  //   userStore.MODIFY_TYPE("signIn")
  // }
}
const startGame = async () => {
  try {
    await handleUnLogin()
    const {
      item: { status, id, gameId },
    } = props
    if (status === 1) router.push({ name: "GameRoom", params: { id, gameId } })
  } catch (e) {}
}
</script>

<style lang="scss" scoped>
.game-item {
  background-image: url("../../assets/default/loading.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto 100%;
  .game-shadow {
    background: linear-gradient(
      180deg,
      rgba(143, 208, 255, 0.9) 0%,
      rgba(10, 75, 172, 0.9) 100%
    );
    backdrop-filter: blur(1px);
    opacity: 0;
  }
  @screen md {
    &:hover {
      transform: translateY(-10px);
      background-size: auto 103%;
      .game-shadow {
        opacity: 1;
      }
    }
  }

  .show-game-name {
    color: var(--v-game-item-name);
    word-break: break-word;
  }
}
</style>
