<template>
  <div class="main-cont h-full px-40px">
    <div class="text-side">
      <h1 class="title font-bold -mb-30px">Oooops...</h1>
      <h1 class="title font-bold">Page not found</h1>
      <p class="subtitle fw-400">
        The page you requested has either been moved or removed from the site.
      </p>

      <div class="content">
        <div
          class="btn w-126px text-center py-11px rounded-3xl"
          @click="router.back()"
        >
          <p>Go Back</p>
        </div>
        <div
          class="primary ml-12px w-126px text-center py-11px rounded-3xl"
          @click="router.push('/')"
        >
          <p>Home</p>
        </div>
      </div>
    </div>
    <div>
      <img src="~/assets/images/error/404.png" alt="" class="maintenance" />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style scoped>
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
