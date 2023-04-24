<template>
  <ViewsMyAccountContainer>
    <ul
      class="grid grid-cols-2 gap-20px @sm:(gap-10px grid-cols-1) <sm:(gap-8px) <md:(grid-cols-1 gap-14px)"
    >
      <transition-group appear-active-class="animated fadeIn">
        <li
          :key="item.key"
          class="py-40px px-32px <sm:(py-20px px-16px) @sm:(py-22px px-18px) @md:(py-24px px-20px) @lg:(py-26px px-22px) rounded-12px account-item flex justify-between items-center"
          v-for="item in playerInfoList"
        >
          <div class="flex items-center">
            <div
              class="flex items-center <sm:(text-22px) @sm:(text-26px) @md:(text-26px) @lg:(text-28px) text-30px"
            >
              <client-only>
                <CommonSvgIcon :name="item.icon" />
              </client-only>
            </div>
            <div
              class="ml-20px <sm:(ml-12px) @sm:(ml-14px) @md:(ml-16px) @lg:(ml-18px)"
            >
              <p
                class="font-700 <sm:(text-13px font-500) @sm:(text-16px) @md:(text-18px) text-22px @lg:text-20px"
              >
                {{ item.label }}
              </p>
              <p
                class="font-500 text-16px <sm:(text-12px) @sm:(text-13px) @md:(text-14px)"
              >
                {{ item.value }}
              </p>
            </div>
          </div>
          <div
            @click="settingItem(item)"
            class="modify-button cursor-pointer <sm:(py-6px text-13px px-15px ) @sm:(py-8px text-14px px-16px ) @md:(py-10px text-16px px-18px ) @lg:(py-12px text-18px px-22px ) rounded-24px font-500 text-20px py-15px px-37px"
          >
            {{ item.edit }}
          </div>
        </li>
      </transition-group>
    </ul>
  </ViewsMyAccountContainer>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"
import { Ref } from "vue"
import { dialogConfirm } from "~/components/custom-dialog/custom"
import { useGoogle } from "~/stores/google"

const route = useRoute()
const google = useGoogle()
const user = useUserStore()
const { getDirection, getTitle } = useDictionary()
const { t } = useLang()
const info = computed(() => user.info)
const statusList = computed(() => {
  const list = getDirection("dic_kyc_status") || []
  return list
})
const playerInfoList = computed(() => [
  {
    label: t("mine.profile.Password"),
    title: "Password",
    value: "*******",
    icon: "password",
    edit: t("additional.Change"),
    key: "changePassword",
  },
  {
    label: t("mine.profile.Phone"),
    title: "Phone Number",
    icon: "mobile",
    value: `${info.value?.areaCode} ${info.value?.mobile}`,
    edit: t("additional.Change"),
    key: "changeMobile",
  },
  // {
  //   label: t("mine.profile.GoogleAuthenticator"),
  //   title: "Google Authenticator",
  //   icon: "gmail",
  //   value:
  //     info.value?.googleCodeStatus === -1
  //       ? t("mine.profile.Unbind")
  //       : info.value?.googleCodeStatus === 1
  //       ? t("mine.profile.Opened")
  //       : t("mine.profile.Unopened"),
  //   edit:
  //     info.value?.googleCodeStatus === -1
  //       ? t("mine.profile.Bind")
  //       : t("mine.profile.Change"),
  //   key: "authenticator",
  //   googleCodeStatus: info.value?.googleCodeStatus,
  // },
  {
    label: t("mine.profile.kyc"),
    title: t("mine.profile.kyc"),
    icon: "kyc",
    value: t("mine.profile.valid"),
    edit: getTitle(statusList.value, info.value?.kycStatus),
    key: "kycSetting",
  },
  {
    label: "Google, Facebook",
    icon: "bindIcon",
    value: "Bind Account",
    edit: "Set",
    key: "providerAccount",
  },
]) as Ref<AccountInfoType[]>
const settingItem = (item: AccountInfoType) => {
  if (item.googleCodeStatus !== undefined) {
    if (item.googleCodeStatus === -1) user.MODIFY_TYPE(item.key)
    else {
      let message: string = ""
      // 已开启状态
      if (info.value?.googleCodeStatus === 1) {
        message = "Are you sure you want to turn off Google Authenticator"
      } else message = "Are you sure you want to turn on Google Authenticator"
      dialogConfirm(message, "Reminder", { showCancelButton: true }).then(
        async () => {
          const code = await google.MODIFY_GOOGLE_STATUS({
            status: item.googleCodeStatus === 0 ? 1 : 0,
          })
          if (code === 0) {
            Notify({
              title: "Successfully",
              message: "Edit successfully",
              type: "success",
              position: "top-left",
            })
            user.GET_USER_PROFILE()
          }
        }
      )
    }
  } else user.MODIFY_TYPE(item.key)
}

onMounted(async () => {
  if (route.query.code) {
    try {
      const thirdType = useCookie("thirdType")
      const params = {
        thirdType,
        authCode: route.query.code,
        device: "d",
      }
      await user.BINDING(params)
      Notify({
        title: "Successfully",
        message: "Binding successfully",
        duration: 1000,
        type: "success",
        position: "top-left",
      })
    } catch (e) {}

    // $post("binding", {...data.para, authCode: route.query.code, thirdType: localStorage.getItem('thirdType') }).then(res=> {
    //   if (res.code === 0) {
    //     getinfo()
    //     emit('success')
    //   }
    // })
  }
})
</script>

<style lang="scss" scoped>
.account-item {
  background: #263642;
  color: #b3bad1;
}
.modify-button {
  background: linear-gradient(180deg, #324353 0%, #233546 100%);
  box-shadow: 0px 2px 5px rgba(8, 20, 30, 0.3);
}
</style>
