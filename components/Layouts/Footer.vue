<!--底部组件-->
<template>
  <div
    class="bg-$v-footer-bg py-12px relative flex items-center w-full items-end -mb-20px"
  >
    <div class="w-full max-w-1440px mx-auto p-40px <lg:(p-20px) <md:(pb-60px)">
      <div
        class="flex justify-between pb-40px mb-24px border-$v-footer-border border-b-2 <lg:(flex-col-reverse items-center border-none pb-0 mb-18px) <md:(mb-12px)"
      >
        <section
          class="<lg:(w-full flex justify-between items-center) <md:(flex-col)"
        >
          <img
            :src="PLAT_LOGO"
            alt=""
            class="w-250px <lg:(w-220px) <md:(w-240px)"
          />
          <img
            :src="brand"
            alt=""
            class="w-250px mt-12px <lg:(w-200px) <md:(w-180px)"
          />
        </section>
        <section
          class="footer-right w-[50%] <xl:(w-[55%]) <lg:(w-full pb-24px mb-24px border-$v-footer-border border-b-1) <sm:(pb-0)"
        >
          <div class="flex justify-between <md:(flex-wrap)">
            <div
              v-for="(item, idx) in list"
              v-show="!item.hidden"
              :key="item.id"
              class="<sm:(w-[50%] mb-24px)"
              :class="{
                follow: idx === 2,
                methods: idx === 3,
              }"
            >
              <p class="text-16px text-$v-footer-title-color font-bold mb-14px">
                {{ item.label ? t(item.label) : "" }}
              </p>
              <ul
                class="flex"
                :class="{ 'flex-col': idx !== 2, '<md:(flex-row)': idx === 3 }"
              >
                <li
                  v-for="(subItem, __idx) in item.children"
                  v-show="!subItem.hidden"
                  :key="subItem.id"
                  class="text-$v-footer-color text-14px font-medium cursor-pointer"
                  :class="{
                    'mb-10px': idx !== 2,
                    'mr-20px <sm:(mr-10px)':
                      idx === 2 && __idx !== item.children.length - 1,
                    '<md:(mb-0 mr-12px)':
                      idx === 3 && __idx !== item.children.length - 1,
                  }"
                  @click="pageTo(subItem)"
                >
                  {{ subItem.label ? t(subItem.label) : "" }}
                  <img
                    v-show="subItem.src"
                    :src="subItem.src"
                    :class="{
                      '<sm:(w-20px)': idx === 2,
                      '<sm:(w-[60px])': idx === 3,
                    }"
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- <SwitchLanguage /> -->
      </div>
      <footer class="flex justify-between <lg:(flex-col) <md:(items-center)">
        <p
          class="text-[#B3BAD1] text-14px font-bold <lg:(mb-20px) <md:(font-medium mb-16px text-center)"
        >
          Copyright © 2023 Filbet.com All rights reserved.
        </p>
        <ul class="flex items-center">
          <li
            class="text-$v-footer-color text-14px font-bold cursor-pointer mr-40px <md:(text-12px font-medium mr-30px text-center)"
          >
            Live Customer Support
          </li>
          <li
            class="text-$v-footer-color text-14px font-bold cursor-pointer mr-40px <md:(text-12px font-medium mr-30px text-center)"
          >
            Privacy Policy
          </li>
          <li
            class="text-$v-footer-color text-14px font-bold cursor-pointer <md:(text-12px font-medium text-center)"
          >
            Contact Us
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { useConfig } from "~/composables/platform"
import brand from "@/assets/images/footer/brand.png"

import facebook from "@/assets/images/footer/facebook.svg"
import instagram from "@/assets/images/footer/instagram.svg"
import twitter from "@/assets/images/footer/twitter.svg"
import gcash from "@/assets/images/footer/gcash.svg"
import grabpay from "@/assets/images/footer/grabpay.svg"
import maya from "@/assets/images/footer/maya.svg"

const { PLAT_LOGO } = useConfig()

const { t } = useI18n()
const router = useRouter()

const list = reactive([
  {
    id: 0,
    label: "menu.categories",
    children: [
      {
        id: 0,
        label: "menu.Slots",
        key: "slots",
      },
      {
        id: 1,
        label: "menu.Live",
        key: "live",
      },
      {
        id: 2,
        label: "extra.fishing",
        key: "fishing",
      },
      {
        id: 3,
        label: "menu.sports",
        key: "sports",
      },
    ],
  },
  {
    id: 1,
    label: "menu.help",
    children: [
      {
        id: 0,
        label: "menu.terms",
        key: "helpCenter",
      },
      {
        id: 1,
        label: "menu.About",
        key: "helpCenter",
      },
      {
        id: 2,
        label: "menu.FAQ",
        key: "helpCenter",
      },
      {
        id: 3,
        label: "menu.Affiliate",
        key: "helpCenter",
      },
      {
        id: 4,
        label: "vip.VIP",
        key: "helpCenter",
      },
    ],
  },
  {
    id: 2,
    label: "menu.follow",
    children: [
      {
        id: 0,
        src: facebook,
        url: "https://web.facebook.com/filbet.philippines",
      },
      {
        id: 1,
        src: instagram,
        url: "https://www.instagram.com/filbetph_official/",
      },
      {
        id: 3,
        src: twitter,
        url: "https://twitter.com/Filbet_ph",
      },
    ],
  },
  {
    id: 2,
    label: "menu.methods",
    children: [
      {
        id: 0,
        src: gcash,
      },
      {
        id: 1,
        src: grabpay,
      },
      {
        id: 2,
        src: maya,
      },
    ],
  },
])

const Sponsor = ["digitain", "leap", "Sponsor"]
const pageTo = (item) => {
  // console.log(item);
  if (item.url) window.open(item.url)
  if (!item.disabled) router.push({ name: item.key })
}
</script>

<style lang="scss" scoped>
@media (max-width: 500px) {
  .follow {
    width: 35%;
  }
  .methods {
    width: 65%;
  }
}
</style>
