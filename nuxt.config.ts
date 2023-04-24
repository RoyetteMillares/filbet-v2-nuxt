import { resolve, dirname } from "node:path"
import { fileURLToPath } from "url"
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite"
import staticPlugins from "./meta"
const PROXY_SERVER_ADDRESS =
  process.env.MODE === "dev" ? process.env.API_ADDRESS : process.env.API_ADDRESS

const IS_DEV = process.env.MODE === "dev"

export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,
  // typescripts
  typescript: {
    strict: true,
    typeCheck: true,
  },
  components: [
    "~/components",
    {
      path: "~/views",
      prefix: "Views",
    },
    {
      path: "~/components/__root__",
      prefix: "Template_Root",
    },
  ],

  // css
  css: ["~/assets/sass/vendor.scss", "~/assets/sass/app.scss"],
  // build
  build: {
    transpile: ["@headlessui/vue"],
  },
  // modules
  modules: [
    "unplugin-icons/nuxt",
    "@intlify/nuxt3",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-windicss",
    "@element-plus/nuxt",
  ],
  router: {
    options: {
      strict: true,
    },
  },
  runtimeConfig: {
    public: {
      PROXY_SERVER_ADDRESS, // 客户端也可获取
    },
  },
  // vite plugins
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.js"),
        ],
      }),
    ],
  },
  // app config
  app: {
    // global transition
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      ...staticPlugins,
    },
  },

  // localization - i18n config
  intlify: {
    localeDir: "locales",
    vueI18n: {
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en"],
    },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // windicss
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      // server: {
      //   port: 4000,
      //   open: false,
      // },
    },
    scan: true,
  },
})
