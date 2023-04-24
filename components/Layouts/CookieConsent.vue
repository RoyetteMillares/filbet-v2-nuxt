<script setup lang="ts">
useScriptTag(
  "https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js",
  () => {
    // @ts-ignore
    const cc = window.cookieconsent
    cc.initialise({
      container: document.getElementById("cookie-consent"),
      palette: {
        popup: {
          background: "#252e39",
        },
        button: {
          background: "#14a7d0",
        },
      },
      theme: "classic",
      revokable: false,
      law: {
        regionalLaw: false,
      },
      location: true,
    })
  },
  {
    async: true,
  }
)
</script>
<template>
  <Head>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
    />
  </Head>
  <div id="cookie-consent"></div>
  <slot />
</template>
