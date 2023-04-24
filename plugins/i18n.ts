// import { createI18n } from 'vue-i18n'
// import en from '~/locales/en'
// import zh from '~/locales/zh'
import i18n from "~/utils/lang"

export default defineNuxtPlugin(({ vueApp }) => {
  // const i18n = createI18n({
  //   legacy: false,
  //   globalInjection: true,
  //   locale: 'en',
  //   messages: {
  //     en,
  //     zh
  //   }
  // })
  // console.log(vueApp,'vueApp');
  vueApp.use(i18n)
})
