import { WebSocketStatus } from "@vueuse/core"

export enum SocketAction {
  PUSH_WN = "PUSH_WN",
  PUSH_DN = "PUSH_DN",
  NOTICE_CHANGE = "NOTICE_CHANGE",
  COIN_CHANGE = "COIN_CHANGE",
  DEPOSIT_COIN_CHANGE = "DEPOSIT_COIN_CHANGE",
}

type BaseListDataType<Data> = {
  current: `${number}`
  pages: `${number}`
  size: `${number}`
  total: `${number}`
  list: Data[]
}

type ToState<__State> = {
  [K in keyof __State]: __State[K] | null
}
/**
 * store 数据返回
 */
export declare namespace StoreTypes {
  type NumberString = `${number}.${number}`
  /** APP */
  namespace App {
    type Config = {
      id: number
      title: string
      titleZh: string
      value: string
    }
    type Dictionary = {}
    type State = {
      config: Config[]
      dictionary: Dictionary[]
    }
  }
  /** card */
  type Card<T> = {
    cardList: T[]
    configList: T[]
    withdrawConfig: T[]
    parseJson: number[]
  }
  /** google */
  namespace Google {
    type GoogleInfo = {
      qrCode?: string
      secret?: string
      providerInfo: {
        areaCode?: string
        facebookUserId?: unknown
        googleCodeStatus?: unknown | number
        googleLoginEmail?: unknown | string
        kycStatus?: number
        mobile?: unknown | string
        password?: string
        msg?: string
      }
    }
  }
  /** Game */
  type Game<T = any> = {
    collectionList: T[]
  }

  /** Help */
  namespace Help {
    type State = {
      detail: any | null
      typesList: {
        current: `${number}`
        list: {
          id: number
          imageUrl: string
          listHelpInfo: {
            content: string
            createBy: string
            createdAt: number
            helpTypeId: number
            helpTypeName: string | null
            id: number
            language: string
            sort: number
            status: number
            title: string
            updateBy: string
            updatedAt: number
          }[]
          typeName: string
        }[]
        pages: `${number}`
        size: `${number}`
        total: `${number}`
      } | null
      contentList: {
        list: {
          content: string
          createBy: string
          createdAt: number
          helpTypeId: number
          helpTypeName: string | null
          id: number
          language: string
          sort: number
          status: number
          title: string
          updateBy: string
          updatedAt: number
        }[]
        current: `${number}`
        pages: `${number}`
        size: `${number}`
        total: `${number}`
      } | null
    }
  }
  /** Home */
  type Home<T = any> = {
    bannerList: T[]
    jackpotList: T[]
    rankList: T[]
    classificationList: T[]
  }
  /** Message */
  type Message<T = any> = {
    noticeCountList: T[]
    noticeList: T[]
  }

  /** User */
  namespace User {
    type Info = {
      address: string
      apiToken: string
      areaCode: string
      avatar: string
      bindBank: number
      birthday: string | null
      coin: `${number}.${number}`
      coinCommission: `${number}.${number}`
      createdAt: number
      email: string
      fcoin: `${number}.${number}`
      googleCodeStatus: number
      id: number
      isPromoter: number
      kycStatus: number
      levelId: number
      mobile: string
      passwordCoin: string
      passwordHash: string
      promoCode: string
      realName: string
      role: number
      score: number
      sex: number
      signature: string
      status: number
      upgradeBalance: `${number}.${number}` | null
      username: string
      balance: number
      vipLevelCodeIcon: string
    }
    type __State = {
      isLogin: boolean
      info: Info
      isPlay: boolean
      vipInfo: any
      vipList: any[]
      withdrawConfig: any
      dialogType: string
    }
    type State = {
      [K in keyof __State]: __State[K] | null
    }
    type providerLogin = {
      authCode: string | unknown
      thirdType: string
      device: string
    }
  }

  /** Wallet */
  type Wallet<T = any> = {
    walletList: {
      allWithdrawalCoin?: string
      bonus: string
      bonusCode?: string
      mainCurrency: string
      needCodeCoin: string
      reelCoin: string
    } | null
    platAddress: string
    platsList: T[]
    channelList: T[]
    cryptoList: T[]
    depositList: T[]
    withdrawChannelList: T[]
  }

  namespace Socket {
    type MessageMap = {
      [SocketAction.PUSH_WN]: {
        count: `${number}`
      }
      [SocketAction.PUSH_DN]: {
        count: `${number}`
      }
      [SocketAction.NOTICE_CHANGE]: {
        title: string
        content: string
      }
      [SocketAction.COIN_CHANGE]: {
        uuid: string
        coin: number
      }
      [SocketAction.DEPOSIT_COIN_CHANGE]: {
        uuid: string
        coin: number
      }
    }
    type Data = {
      action: SocketAction
      divice: "D"
      message: MessageMap[Data["action"]]
    }
    type State = {
      data: Data | null
      ws: WebSocket | null
      status: WebSocketStatus | "NONE"
    }
  }

  namespace Affiliate {
    type CommissionRate = {
      agentLevel: Number
      agentLevelRate: NumberString
    }
    type LevelDetails = {
      bettingTurnOver: NumberString
      commission: NumberString
      nums: number
    }
    type CommissionRecord = {
      agentLevel: 1
      bettingTurnOver: NumberString
      commissionUsd: NumberString
      createdAt: number
      currency: null
      updatedAt: number
      username: string
    }
    type __State = {
      commissionRateList: CommissionRate[]
      teamBenefits: {
        allowWithdrawal: NumberString
        todayIncreaseAgentNum: number
        totalAgentNum: number
        totalCommission: NumberString
      }
      subordinateDetails: {
        bettingTurnOver: NumberString
        commission: NumberString
      } & {
        [K in `level${1 | 2 | 3}`]: LevelDetails
      }
      commissionRecords: BaseListDataType<CommissionRecord>
    }

    type State = {
      [K in keyof __State]: __State[K] | null
    }
  }

  namespace Vip {
    type State = {
      userLevelInfo: {
        betPercentage: `${number}`
        betSum: NumberString
        birthdayReward: number
        code: string
        depositPercentage: NumberString
        depositSum: NumberString
        depositUpgradeMax: number
        depositUpgradeMin: number
        icon: string
        id: number
        monthReward: number
        name: string
        needBet: NumberString
        needDeposit: NumberString
        scoreUpgradeMax: number
        scoreUpgradeMin: number
        upgradeReward: number
        userLevelBasicInfoList: { id: number; name: string }[]
        weekReward: number
        withdrawalCoin: number
        withdrawalCount: number
      } | null
      userLeveReward:
        | {
            category: number
            coin: NumberString
            id: `${number}`
            receiveAt: number
            status: number
          }[]
        | null
      userLevelBenefits:
        | {
            birthdayReward: number
            depositUpgrade: number
            id: number
            monthReward: number
            name: string
            scoreRelegation: number
            scoreUpgrade: number
            upgradeReward: number
            weekReward: number
            withdrawalCoin: number
            withdrawalCount: number
          }[]
        | null
      userLevelDetails: {
        userLevelInfoList: {
          icon: string
          id: number
          name: string
          relegationDay: number
          scoreRelegation: number
          scoreUpgrade: number
        }[]
        userLevelRebateConfigList: {
          groupId: number
          userLevelRebateList: {
            id: number
            name: string
            rebateRate: NumberString
          }[]
        }[]
        userLevelWithdrawalInfo: {
          id: number
          name: string
          withdrawalCoin: number
          withdrawalCount: number
        }[]
      } | null
      memberShipDetails: {
        accumulatedDeposit: NumberString
        code: string
        name: string
        nextCode: string
        nextName: string
        score: number
        scoreUpgradeMax: number
        scoreUpgradeMin: number
      } | null
      memberShipLevelDetails:
        | {
            code: string
            icon: string
            id: number
            name: string
            points: number
            pointsMultiplier: number
            tierReward: number
          }[]
        | null
    }
  }
  namespace Blog {
    type Blog = {
      id: number
      lang: string
      category: string
      image: string
      title: string
      titleSub: string
      content: string
      recommend: number
      status: number
      sort: number
      createBy: string
      updateBy: string
      createdAt: number
      updatedAt: number
    }

    type __State = {
      blogList: BaseListDataType<Blog>
      currentBlog: Blog
    }
    type State = ToState<__State>
  }
}
