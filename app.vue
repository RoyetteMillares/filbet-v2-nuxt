<script lang="ts" setup>
import { ITheme } from "./utils/theme"

const theme: ITheme = "dark"
const locale = useState<string>("locale.setting")
</script>

<template>
  <LayoutsSeoManager>
    <LayoutsInitialize>
      <LayoutsCookieConsent>
        <Html
          :class="['h-full', `${theme === 'dark' ? 'dark' : 'light'}`]"
          :lang="locale"
        >
          <Body
            class="transition-colors antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white h-full dark:bg-gray-900"
          >
            <NuxtLayout>
              <NuxtLoadingIndicator
                :height="5"
                :duration="3000"
                :throttle="400"
              />
              <NuxtPage />
            </NuxtLayout>
          </Body>
          <!--      登陆弹框-->
          <!--      <div-->
          <!--        id="g_id_onload"-->
          <!--        data-client_id="23997781556-ceuhje7a3iof8n5jf8m57nv6tdsj5jkk.apps.googleusercontent.com"-->
          <!--        data-context="signin"-->
          <!--        data-login_uri="https://test-web.filbet.network/"-->
          <!--        data-auto_select="true"-->
          <!--        data-itp_support="true"-->
          <!--      ></div>-->
        </Html>
        <ViewsUser />
        <LoadingMask />
      </LayoutsCookieConsent>
    </LayoutsInitialize>
  </LayoutsSeoManager>
</template>
<style lang="scss" scoped>
.transition-colors {
  background: var(--v-m);
}
</style>
