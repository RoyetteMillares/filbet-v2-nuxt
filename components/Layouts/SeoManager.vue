<script setup lang="ts">
const route = useRoute()

type OutputType = Required<Parameters<typeof useHead>["0"]>

const head = computed(() => {
  switch (route.name) {
    case "Slots": {
      const output: OutputType = {
        title: "Filbet Slot Games | Register Now and Get 100% Bonus",
        meta: [
          {
            name: "description",
            content:
              "Were you looking for a thrilling online casino experience? Look no further than Filbet! Our top-rated casino offers a wide selection of exciting slot games, including popular titles from leading providers. Sign up today to claim your welcome bonus and start playing to win big!",
            key: "filbet slots",
          },
          {
            name: "keywords",
            content: "filbet slots",
          },
        ],
      }
      return output
    }
    case "Live": {
      const output: OutputType = {
        title: "Filbet Live Casino Experience the Thrill of Live Casino Gaming",
        meta: [
          {
            name: "description",
            content:
              "Live casino at Filbet! Blackjack, roulette, baccarat, and other popular table games will be explained to you by our highly qualified dealers. Take advantage of our big welcome bonus by joining the action today.",
            key: "filbet live",
          },
          {
            name: "keywords",
            content: "filbet live",
          },
        ],
      }
      return output
    }
    case "Fishing": {
      const output: OutputType = {
        title: "Filbet Fishing Games Catch Big Wins | Register Now",
        meta: [
          {
            name: "description",
            content:
              "Check out Filbet  fishing games! Our selection of fishing games allows you to cast your line and reel in big rewards while enjoying stunning graphics and exciting gameplay. ",
            key: "filbet fishing games",
          },
          {
            name: "keywords",
            content: "filbet fishing games",
          },
        ],
      }
      return output
    }
    case "Chess": {
      const output: OutputType = {
        title: "Filbet Chess | Play Chess Online and Win Big Rewards",
        meta: [
          {
            name: "description",
            content:
              "Filbet online casino is the perfect place to play chess online. Our user-friendly platform is designed for players of all skill levels, and our games are fair and secure. With generous bonuses and promotions, you could win big while mastering your chess strategy.",
            key: "filbet chess",
          },
          {
            name: "keywords",
            content: "filbet chess",
          },
        ],
      }
      return output
    }
    case "Sports": {
      const output: OutputType = {
        title: "Filbet Sports Betting | Bet on Your Favorite Teams and Win Big",
        meta: [
          {
            name: "description",
            content:
              "Sports betting has always been more challenging and enjoyable than at Filbet online casinos. Our sportsbook is designed with the player in mind, offering a seamless and intuitive experience.",
            key: "filbet sports",
          },
          {
            name: "keywords",
            content: "filbet sports",
          },
        ],
      }
      return output
    }
    case "Table": {
      const output: OutputType = {
        title: "Filbet Table Games Play Classic and Modern Casino Online",
        meta: [
          {
            name: "description",
            content:
              "Table games are a staple of any great casino experience, and Filbet online casino delivers on that promise. Our platform offers an extensive selection of table games, from the classics to the latest and most extraordinary variations.",
            key: "filbet table games",
          },
          {
            name: "keywords",
            content: "filbet table games",
          },
        ],
      }
      return output
    }
    case "Affiliate-Rule": {
      const output: OutputType = {
        title:
          "Filbet Affiliate Earn Passive Income Online Casino Affiliate Program",
        meta: [
          {
            name: "description",
            content:
              "Filbet online casino is proud to offer a generous and rewarding affiliate program to our partners. With competitive commission rates, easy tracking, and a range of promotional materials, our program makes it easy to earn passive income by promoting our casino to your audience.",
            key: "filbet affililiate",
          },
          {
            name: "keywords",
            content: "filbet affililiate",
          },
        ],
      }
      return output
    }
    case "Promotions": {
      const output: OutputType = {
        title:
          "Filbet Promotions Get Rewarded with Online Casino Latest Promotions",
        meta: [
          {
            name: "description",
            content:
              "At Filbet online casino, we believe in rewarding our players for their loyalty and dedication. That's why we offer a range of exciting promotions, including welcome bonuses, cashback offers, and free spins.",
            key: "filbet promotions",
          },
          {
            name: "keywords",
            content: "filbet promotions",
          },
        ],
      }
      return output
    }
    case "blog": {
      const output: OutputType = {
        title: "Filbet Blog | Your Source for Expert Insights in Online Casino",
        meta: [
          {
            name: "description",
            content:
              "Want to stay informed about the latest trends and news in the world of online gambling? Check out Filbet online casino's blog! Our team of experts shares their insights and experiences on a wide range of topics, from new game releases to tips and tricks for winning big.",
            key: "filbet blogs",
          },
          {
            name: "keywords",
            content: "filbet blogs",
          },
        ],
      }
      return output
    }
    case "Vip": {
      const output: OutputType = {
        title: "Filbet Vip Online Casino Program and Unlock Exclusive Rewards",
        meta: [
          {
            name: "description",
            content:
              "Ready to take your gaming experience to the next level? Join Filbet online casino's VIP program and enjoy exclusive benefits like personalized support, higher deposit and withdrawal limits, and access to exclusive games and promotions. Our VIP program is designed to reward our most loyal and dedicated players.",
            key: "filbet vip",
          },
          {
            name: "keywords",
            content: "filbet vip",
          },
        ],
      }
      return output
    }
    default: {
      const output: OutputType = {
        title: "Filbet Online Casino | Register Now & Get More Rewards",
        meta: [
          {
            name: "description",
            content:
              "Experience the thrill of online gambling at Filbet.com! Our premier casino offers a wide selection of games, from classic slots to live dealer tables. Join now to enjoy generous bonuses, fast payouts, and secure transactions.",
            key: "filbet home",
          },
          {
            name: "keywords",
            content: "filbet home",
          },
        ],
      }
      return output
    }
  }
})

useHead(head.value)
</script>
<template>
  <slot />
</template>
