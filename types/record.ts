type DirectionType = {
  title?: string
  code?: string
}
type RecordType = {
  type: string
  label: string
  list?: DirectionType[]
  modelValue: string | number | string[]
  change?: Function
}

type RecordItem = {
  createdAt: number
  exchangeRate: string
  orderId: string
  payAddress: string
  payAmount: string
  platName: string
  realAmount: string
  status: number
}

type SearchListType = {
  label: string
  prop: string
  custom?: unknown
}
type AccountItem = {
  category: number
  coin: string
  coinAfter: string
  coinBefore: string
  createdAt: number
  outIn: number
}
type BetRecord = {
  coinBefore: string
  createdAt: number
  gameId: number
  id: string | number
  payout: string
  stake: string
  updatedAt: number
  xbStatus: number
  xbUsername: string
}
type StatisticsInfoType = {
  payOutSum: string
  stakeSum: string
}
type CardListType = {
  title: string
  address: string
  categoryCurrency: number
  categoryTransfer: number
  categoryTransferName: string
  id: number
  status: number
}
type WithdrawType = {
  categoryCurrency: number
  categoryTransfer: any
  categoryTransferName: string
  typeList: null | any[]
}
type AccountInfoType = {
  label: string
  title: string
  value?: string | unknown
  icon: string
  edit?: string
  key: string
  googleCodeStatus?: number
}
type MessageType = {
  category?: number | string
  content?: string
  createdAt?: number
  id?: number
  isRead?: boolean
  read?: boolean
  title?: string
}

type DepositListType = {
  channelAppShowName: string
  chips: string
  code: string
  currency: string
  logoUrl: string
  maxCoin: number
  minCoin: number
  name: string
  rate: string
  skipCategory: number
  sort: number
}
