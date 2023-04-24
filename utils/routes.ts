type PageMeta = Parameters<typeof definePageMeta>["0"]
type PageMetaCustom = Pick<
  PageMeta,
  | "path"
  | "redirect"
  | "alias"
  | "validate"
  | "scrollToTop"
  | "keepalive"
  | "pageTransition"
  | "layoutTransition"
  | "key"
> & {
  layout?: PageMeta["layout"]
  name: RouteName
  children?: PageMetaCustom[]
}

const defaultMeta: Partial<PageMetaCustom> = {
  layout: "default",
}

type IRouteRecord = {
  [K in RouteName]: PageMetaCustom
}

const addDefaultMeta = (record: IRouteRecord) => {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key,
      { ...defaultMeta, ...value },
    ])
  )
}

export const RouteRecord = addDefaultMeta({
  Home: {
    name: "Home",
  },
  404: {
    layout: "blank",
    name: "404",
  },
  HelpCenter: {
    layout: "default-full",
    name: "HelpCenter",
  },
  "Affiliate-ID": {
    layout: "default-full",
    name: "Affiliate-ID",
  },
  "Affiliate-Rule": {
    layout: "default-full",
    name: "Affiliate-Rule",
  },
  blog: {
    name: "blog",
  },
  blogAll: {
    name: "blogAll",
  },
  blogDigitalCurrency: {
    name: "blogDigitalCurrency",
  },
  blogEntertainment: {
    name: "blogEntertainment",
  },
  blogGaming: {
    name: "blogGaming",
  },
  blogInformation: {
    name: "blogInformation",
  },
  blogSports: {
    name: "blogSports",
  },
  blogContent: {
    name: "blogContent",
  },
  Slots: {
    layout: "default-full",
    name: "Slots",
  },
  Live: {
    layout: "default-full",
    name: "Live",
  },
  Fishing: {
    layout: "default-full",
    name: "Fishing",
  },
  Chess: {
    layout: "default-full",
    name: "Chess",
  },
  Bingo: {
    layout: "default-full",
    name: "Bingo",
  },
  Table: {
    layout: "default-full",
    name: "Table",
  },
  Sports: {
    layout: "default-full",
    name: "Sports",
  },
  Favorites: {
    layout: "default-full",
    name: "Favorites",
  },
  Recent: {
    layout: "default-full",
    name: "Recent",
  },
  Originals: {
    layout: "default-full",
    name: "Originals",
  },
  Promotions: {
    layout: "default-full",
    name: "Promotions",
  },
  PromotionInfo: {
    layout: "default-full",
    name: "PromotionInfo",
  },
  Vip: {
    layout: "default-full",
    name: "Vip",
  },
  VipCenter: {
    name: "VipCenter",
  },
  VipDetail: {
    name: "VipDetail",
  },
  My: {
    // layout: "default-full",
    name: "My",
  },
  Wallet: {
    name: "Wallet",
  },
  AccountHistory: {
    name: "AccountHistory",
  },
  BetRecord: {
    name: "BetRecord",
  },
  Information: {
    name: "Information",
  },
  MyAccount: {
    name: "MyAccount",
  },
  Deposit: {
    name: "Deposit",
  },
  Withdraw: {
    name: "Withdraw",
  },
  GameRoom: {
    name: "GameRoom",
  },
}) as IRouteRecord
