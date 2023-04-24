/**
 * http 数据返回
 */
export declare namespace HttpUseFetch {
  interface Response<T = any> {
    code?: number
    data?: T
    msg?: string
  }
}

export declare namespace RequestParam {
  type SortKey = "ASC" | "DESC"
  namespace Blog {
    type Category =
      | "DIG_CURRENCY"
      | "ENTERTAINMENT"
      | "GAMING"
      | "SPORTS"
      | "1XWIN"

    namespace List {
      interface Data {
        category: Category | String
      }

      interface Payload {
        current: number
        data: Data
        size?: number
        sortField?: string[]
        sortKey?: SortKey | String
      }
    }
  }

  namespace Affiliate {
    namespace CommissionRecord {
      interface Data {
        endTime?: number
        level?: number
        startTime?: number
      }
      interface Payload {
        current: number
        data: Data
        size: number
        sortField?: string[]
        sortKey?: SortKey
      }
    }
  }
}
