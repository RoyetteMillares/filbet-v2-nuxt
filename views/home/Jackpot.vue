<template>
  <div
    :class="`
    view-jackpot
    flex
    flex-nowrap
    justify-between
    
    children:w-1/2
    
    space-x-$gap
    p-$gap
    rounded-1rem

    <sm:children:w-full
    <sm:flex-col
    <sm:space-x-0
    <sm:space-y-$gap
    <sm:rounded-12px
    `"
  >
    <HomeJackpotMain type="slot" icon-name="icons-treasure" />
    <HomeJackpotMain type="total" icon-name="icons-trophy" />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.view-jackpot {
  background: #13212d;
  --gap: 1rem;
}
@media (max-width: 1280px) {
  .view-jackpot {
    --gap: 10px;
  }
}
@media (max-width: 1024px) {
  .view-jackpot {
    --gap: 8px;
  }
}
@media (max-width: 768px) {
  .view-jackpot {
    --gap: 6px;
  }
}
@media (max-width: 640px) {
  .view-jackpot {
    --gap: 4px;
  }
}
</style>
