<template>
  <div class="w-full max-w-1440px px-20px mx-auto mb-50px <sm:(mb-30px)">
    <h2
      class="text-$v-help-center-color text-36px font-semibold text-center mb-50px <md:(text-24px mb-40px) <sm:(text-16px mb-30px)"
    >
      {{ props.title }}
    </h2>
    <div>
      <HelpCenterAccordion
        v-for="(item, idx) in props.accordionList"
        :key="idx"
        :title="item.title"
        :content="item.content"
        :class="{
          'mb-30px <md:(mb-20px)': idx !== accordionList.length - 1,
        }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string
  accordionList: { title: string; content: string }[]
}>()
</script>
<style lang="scss"></style>
