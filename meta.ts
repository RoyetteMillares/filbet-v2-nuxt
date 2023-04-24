// module.exports = {
//   meta: [
//     {
//       name: "viewport",
//       content:
//         "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0",
//     },
//     {
//       name: "apple-mobile-web-app-capable",
//       content: "yes",
//     },
//     {
//       name: "apple-mobile-web-app-status-bar-style",
//       content: "black",
//     },
//     {
//       name: "format-detection",
//       content: "telephone=no, email=no",
//     },
//     {
//       name: "keywords",
//       property: "keywords",
//       content: "slots, games, casino",
//     },
//     {
//       name: "twitter:creator",
//       content: "Filbet Casino",
//     },
//   ],
// }
const title = "Filbet Online Casino | Register Now & Get More Rewards"
const description =
  "Experience the thrill of online gambling at Filbet.com! Our premier casino offers a wide selection of games, from classic slots to live dealer tables. Join now to enjoy generous bonuses, fast payouts, and secure transactions."
export default {
  title,
  meta: [
    {
      charset: "UTF-8",
    },
    {
      name: "viewport",
      content:
        "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "description",
      content: description,
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black",
    },
    {
      name: "format-detection",
      content: "telephone=no, email=no",
    },
    {
      name: "keywords",
      property: "keywords",
      content: "slots, games, casino",
    },
    {
      name: "twitter:creator",
      content: "Filbet Casino",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black",
    },
    {
      name: "format-detection",
      content: "telphone=no, email=no",
    },
    {
      name: "renderer",
      content: "webkit",
    },
    {
      name: "X-UA-Compatible",
      content: "IE=edge",
    },
    {
      name: "HandheldFriendly",
      content: "true",
    },
    {
      name: "MobileOptimized",
      content: "320",
    },
    {
      name: "screen-orientation",
      content: "portrait",
    },
    {
      name: "x5-orientation",
      content: "portrait",
    },
    {
      name: "full-screen",
      content: "yes",
    },
    {
      name: "x5-fullscreen",
      content: "true",
    },
    {
      name: "browsermode",
      content: "application",
    },
    {
      name: "x5-page-mode",
      content: "app",
    },
    {
      name: "msapplication-tap-highlight",
      content: "no",
    },
    {
      name: "application-name",
      content: "Filbet",
    },
    {
      name: "msapplication-tooltip",
      content: title,
    },
    {
      itemprop: "name",
      content: title,
    },
    {
      itemprop: "description",
      content: description,
    },
    {
      itemprop: "image",
      content: "/fav/default.png",
    },
    {
      name: "twitter:card",
      content: "/fav/default.png",
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:image",
      content: "/fav/default.png",
    },
    {
      property: "og:site_name",
      content: title,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://filbet.com",
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:image",
      content: "/fav/default.png",
    },
    {
      robot: "og:image",
      content: "index,follow,archive",
    },
    {
      name: "google-site-verification",
      content: "wBifbZX19gmZC9r87qNleSNAYAJS4g-Wsnd0ISkF9UU",
    },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/fav/default.png" },
    { rel: "canonical", type: "image/x-icon", href: "https://filbet.com/" },
  ],
  script: [
    {
      src: "https://accounts.google.com/gsi/client",
      async: true,
      defer: true,
    },
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-4F3S0PV27F",
      async: true,
      defer: true,
    },
    {
      src: "./script.ts",
      async: true,
      defer: true,
    },
  ],
}
