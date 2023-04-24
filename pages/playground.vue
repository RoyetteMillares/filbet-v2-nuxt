<template>
  <div>
    <HomeJackpotMain />

    <!-- <div class="border"></div> -->
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "blank",
})
</script>
<style lang="scss" scoped>
@import "~/assets/sass/mixins.scss";
.border {
  display: flex;
  align-items: center;
  //width: 50vw;
  width: 90%;
  margin: auto;
  max-width: 22em;

  position: relative;
  padding: 30% 2em;
  box-sizing: border-box;
  border-radius: 8px;

  @include background-border(
    linear-gradient(#1f334a, #1f334a),
    linear-gradient(to bottom, #436082, #1f334a),
    4px
  );
}
/* .border {
  display: flex;
  align-items: center;
  //width: 50vw;
  width: 90%;
  margin: auto;
  max-width: 22em;

  position: relative;
  padding: 30% 2em;
  box-sizing: border-box;
  border-radius: 5px;
  --border-color: linear-gradient(to bottom, #436082, #1f334a);
  @include special-border(var(--border-color), 5px);
} */
</style>
