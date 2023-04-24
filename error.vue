<template>
  <Template_Root>
    <ViewsOthers404 v-if="statusCode === '404'" />
    <div v-else>{{ JSON.stringify(error) }}</div>
  </Template_Root>
</template>
<script setup lang="ts">
import { Ref } from "vue"

const error = useError() as unknown as Ref<{
  url: string
  statusCode: string
  statusMessage: string
  message: string
  description: string
  data?: any
}>

const statusCode = computed(() => error.value.statusCode)
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins&family=Rubik&display=swap");
.title {
  color: #1999ee;
}
@media (min-width: 750px) {
  .text-side {
    width: 472px;
  }
  .main-cont {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title {
    font-size: 52px;
  }
  .subtitle {
    font-size: 24px;
  }
  .text-side {
    margin-right: 23px;
  }
  .content {
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 400;
    width: 80%;
  }
}
@media (max-width: 750px) {
  .main-cont {
    text-align: center;
    padding-top: 60px;
  }
  .maintenance {
    max-width: 350px;
  }
  .title {
    font-size: 30px;
    margin-bottom: 2px;
  }
  .content {
    font-weight: 400;
    margin-top: 20px;
    margin: 20px 0px 40px 0px;
    display: flex;
    justify-content: center;
  }
  .top {
    margin-bottom: -14px;
    margin-top: 80px;
  }
  .subtitle,
  .content {
    font-size: 14px;
  }
}

.main-cont {
  background: var(--404-bg);
  font-family: "Rubik", sans-serif;
}
.btn {
  background-color: #13212d;
  color: #1999ee;
}
.primary {
  color: white;
  background: linear-gradient(
    180deg,
    #1999ee -9.78%,
    #115bca 26.02%,
    #0b3aa8 111.96%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  color: #b3bad1;
}
</style>
