declare type RouteName =
  | "Home"
  | "404"
  | "HelpCenter"
  | "Affiliate-ID"
  | "Affiliate-Rule"
  | "Vip"
  | "VipCenter"
  | "VipDetail"
  | "Slots"
  | "Live"
  | "Fishing"
  | "Chess"
  | "blog"
  | "blogAll"
  | "blogDigitalCurrency"
  | "blogEntertainment"
  | "blogGaming"
  | "blogInformation"
  | "blogSports"
  | "blogContent"
  | "Bingo"
  | "Table"
  | "Sports"
  | "Favorites"
  | "Recent"
  | "Originals"
  | "Promotions"
  | "PromotionInfo"
  | "My"
  | "Wallet"
  | "AccountHistory"
  | "BetRecord"
  | "Information"
  | "MyAccount"
  | "Deposit"
  | "Withdraw"
  | "GameRoom"
declare module "*.png"
declare module "*.svg"
declare module "*.jpg"
declare module "*.jpeg"

type TableSchemaConfig = {
  label: string
  format?(data: any): string
  slot?: boolean
}
type TableSchema<DataType> = Partial<Record<keyof DataType, TableSchemaConfig>>

type DefineTableSchema<DataType extends Object> = TableSchema<DataType>
