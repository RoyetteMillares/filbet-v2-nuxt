<template>
  <ViewsMyAccountContainer
    class="<sm:mb-12px mb-16px @sm:mb-13px @md:mb-14px @lg:mb-15px"
  >
    <slot name="title" />
    <ul
      class="md:(grid items-center grid-rows-1 grid-cols-3 gap-27px) <md:(gap-12px flex items-stretch overflow-x-scroll)"
    >
      <transition-group appear-active-class="animated fadeIn">
        <li
          v-for="item in cardList"
          :key="item.id"
          class="col-span-1 rounded-12px p-32px @sm:(p-15px) @md:(p-15px) @lg:(p-20px) <md:(p-15px col-span-2 w-4/5 flex-shrink-0) item-list"
          :class="{ 'item-list-active': item.status === 1 }"
        >
          <p class="font-700 text-16px mb-20px <sm:(text-12px mb-12px)">
            {{ item.categoryTransferName }}
          </p>
          <p class="font-600 text-16px <sm:(text-12px )">Card Number</p>
          <p class="text-12px font-400 mt-4px">{{ item.title }}</p>
          <section
            class="flex justify-between items-center <sm:mt-16px mt-18px"
          >
            <div
              class="rounded-24px card-list min-w-139px py-6px px-13px text-12px text-center <sm:(rounded-4px py-4px min-w-130px px-8px ) @sm:(rounded-6px py-3px px-10px) @md:(rounded-6px py-4px px-12px)"
              :class="{
                'card-list-active': item.status === 1,
                'cursor-pointer': item.status !== 1,
              }"
              @click="setAsDefault(item)"
            >
              {{
                item.status === 1 ? "Has been set as default" : "Set as default"
              }}
            </div>
            <div
              class="text-16px <sm:text-14px cursor-pointer flex items-center"
              @click="deleteItem(item)"
            >
              <CommonSvgIcon name="delete" />
            </div>
          </section>
        </li>
        <li
          v-if="cardList.length < 3"
          class="item-list h-full cursor-pointer rounded-12px flex items-center justify-center col-span-1 p-32px <md:(p-15px col-span-2 w-4/5 flex-shrink-0 h-auto) item-list"
          @click="addCard"
        >
          <div
            class="add-icon flex items-center justify-center rounded-1/2 text-20px w-60px h-60px <sm:(text-14px w-40px h-40px)"
          >
            <CommonSvgIcon name="add" />
          </div>
        </li>
      </transition-group>
    </ul>
  </ViewsMyAccountContainer>
</template>

<script setup lang="ts">
import { useCard } from "~/stores/card"
import { dialogConfirm } from "~/components/custom-dialog/custom"
import HttpInstance from "~/request/server"
import { useUserStore } from "~/stores/user"
import { useWallet } from "~/stores/wallet"

const wallet = useWallet()
const card = useCard()
const user = useUserStore()
const cardList = computed<CardListType[]>(() => card.cardList) // 卡片列表

const deleteItem = (item: CardListType) => {
  dialogConfirm("Are you sure want delete this card?", "Reminder", {
    showCancelButton: true,
  }).then(async () => {
    try {
      const { code } = await HttpInstance.post("deleteWithdrawalAddress", {
        id: item.id,
      })
      if (code === 0) {
        Notify({
          title: "Successfully",
          message: "Deleted Successfully",
          type: "success",
          position: "top-left",
        })
        card.GET_USER_CARD()
      }
    } catch (e) {}
  })
}
const setAsDefault = (item: CardListType) => {
  dialogConfirm("Are you sure to set this card as default??", "Reminder", {
    showCancelButton: true,
  }).then(async () => {
    try {
      const { code } = await HttpInstance.post("updateWithdrawalAddress", {
        id: item.id,
      })
      if (code === 0) {
        Notify({
          title: "Successfully",
          message: "Edited Successfully",
          type: "success",
          position: "top-left",
        })
        card.GET_USER_CARD()
      }
    } catch (e) {}
  })
}
const addCard = () => {
  user.MODIFY_TYPE("createCard")
}
onMounted(() => {
  card.GET_USER_CARD()
  wallet.GET_WITHDRAW_PLATS()
  wallet.GET_WITHDRAW_CHANNEL()
})
</script>

<style lang="scss" scoped>
.item-list {
  background: url("../../../assets/images/bank/bank.png") no-repeat center
    center;
  background-size: 100% 100%;
  &-active {
    background-image: url("../../../assets/images/bank/bank-bg.png");
  }
}
.card-list {
  background: var(--v-my-account-card-bg);
  &-active {
    background: var(--v-my-account-card-active-bg);
    color: var(--v-my-account-card-active-color);
  }
}
.add-icon {
  background: linear-gradient(
    180deg,
    #1999ee -9.78%,
    #115bca 26.02%,
    #0b3aa8 111.96%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
