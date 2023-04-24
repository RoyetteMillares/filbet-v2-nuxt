<template>
  <section
    class="w-full max-w-1440px mx-auto mb-50px <lg:(mb-30px) <sm:(mb-20px)"
  >
    <p class="text-$v-vip-text text-16px font-bold mb-20px <sm:(mb-10px)">
      Activity Rules
    </p>
    <p
      v-for="(item, idx) in rule"
      :key="idx"
      class="text-$v-vip-rules-text text-14px <sm:(text-12px)"
      :class="{ 'mb-10px': idx !== rule.length - 1 }"
    >
      {{ idx + 1 }}.
      <span
        v-if="item.title !== ''"
        class="text-$v-vip-text font-semibold <sm:(text-12px font-medium)"
        >{{ item.title }}:</span
      >
      {{ item.content }}
    </p>
  </section>
</template>

<script setup lang="ts">
const rule = [
  {
    title: "Promotion criteria",
    content:
      "Members can be promoted to the corresponding VIP level before 24:00 of the next day when the accumulated effective betting amount meets the requirements of the corresponding level.",
  },
  {
    title: "Promotion sequence:",
    content:
      "VIP level can be promoted when the corresponding requirements are met. If members meet multiple promotion conditions at the same time, they can receive VIP rewards after each successful upgrade.",
  },
  {
    title: "Requirements for relegation",
    content:
      "After reaching a certain VIP level, members must fulfill the requirements for relegation within 30 days of placing bets. If the promotion is completed during this period, the relegation requirement will be recalculated according to the current level.",
  },
  {
    title: "Downgrade standard",
    content:
      "If the member does not complete the corresponding effective betting amount required for level protection within 30 days, the system will automatically downgrade one level at 00:00:00 the next day, and the corresponding recharge, cash withdrawal and rebate will also be reduced to downgraded grade.",
  },
  {
    title: "Promotion bonus",
    content:
      "After the member reaches the membership level, the promotion bonus can be collected on the personal VIP interface. The system will open the collection after 00:00:00 the next day after the member is promoted. The upgrade bonus of each level is per member It can only be obtained once (upgrade bonus 1 times turnover can be withdrawn).",
  },
  {
    title: "Birthday bonus",
    content:
      "Members who celebrate their birthday within 30 days of registration will not be able to receive birthday bonus this year. Members who have registered for more than 30 days need to self-collect on the VIP page on their birthday, and can collect it once a year (the birthday bonus can be withdrawn by 1 times turnover).",
  },
  {
    title: "Weekly gift money",
    content:
      "The corresponding weekly gift money will be issued based on the latest user VIP level updated at 0:00 every Monday, and can be collected once a week (weekly gift money can be withdrawn once the turnover is 1 times).",
  },
  {
    title: "Monthly gift money",
    content:
      "From 00:00 on the first day of the natural month to 23:59:59 on the last day, the corresponding monthly gift money will be issued to the user according to the latest VIP level, which can be received once a month (the monthly gift money can be withdrawn by 1 times turnover )",
  },
  {
    title: "",
    content:
      "After the rewards for promotion, birthday, weekly, and monthly are distributed at 0:00, members need to collect them within 72 hours, otherwise they will be considered expired and cannot be claimed.",
  },
  {
    title: "",
    content:
      "This site reserves the right to modify, stop and interpret the event.",
  },
]
</script>
