import md5 from "blueimp-md5"
// eslint-disable-next-line camelcase
export const __cookie_filbet_token_name = md5("__cookie_filbet_token_name")

export enum AppInitConfigID {
  /**
   * 平台名称
   */
  title = 1,

  /**
   * Socket Address
   */
  ws_server = 4,

  /**
   * Online Service
   */
  online_server = 6,

  /**
   * 提款最低金额
   */
  minCoin = 7,

  /**
   * 充值流水倍数
   */
  deposit_multiple = 8,

  /**
   * 系统调账流水倍数
   */
  transfer_multiple = 9,

  /**
   * 最大提款金额
   */
  maxCoin = 10,

  /**
   * 手续费
   */
  fees = 11,

  /**
   * 谷歌验证配置
   */
  verificationOfGoogle = 14,

  /**
   * 平台logo
   */
  platLogo = 15,

  /**
   * 注册邀请码
   */
  registerInviteCode = 16,

  /**
   * 登录方式
   */
  loginType = 17,

  /**
   * 手机显示方式
   */
  registerMobile = 18,

  /**
   * 平台币种
   */
  mainCurrency = 19,

  /**
   * SES配置
   */
  sesConfig = 20,

  /**
   * 邀请链接配置
   */
  inviteLink = 21,

  /**
   * mock排行排
   */
  mockRank = 22,

  /**
   * 邮箱验证码
   */
  sesCode = 23,

  /**
   * 是否需要充值
   */
  isDeposit = 24,

  /**
   * IP限制
   */
  ipLimit = 25,

  /**
   * 验证方式
   */
  regVerification = 26,

  /**
   * 提款最低充值金额
   */
  depositTotalCoin = 27,

  /**
   * 手续费比例
   */
  feesRate = 28,

  /**
   * 手续费模式1-金额，2-比例
   */
  feesType = 29,

  /**
   * 国家
   */
  country = 30,

  /**
   * 维护信息
   */
  maintenance = 31,

  /**
   * 首充是否自动领取1:是 0:否
   */
  firstDepositIsAuto = 32,

  /**
   * 续充是否自动领取 1:是 0:否
   */
  secondDepositIsAuto = 33,

  /**
   * 周末首充是否自动领取1:是 0:否
   */
  weekIsAuto = 34,

  /**
   * 验证手机号：1是0否
   */
  verifyMobile = 35,

  /**
   * 图形 验证码：1是，0否
   */
  verifyCode = 36,

  /**
   * 代理结算时间
   */
  agent_settle = 40,

  /**
   * h5帮助中心
   */
  h5_help_center = 43,

  /**
   * h5网站排行榜
   */
  h5_website_rank = 44,

  /**
   * 年龄限制提示开关(0关闭1开启)
   */
  ageLimitPopUpsSwitch = 46,

  /**
   * 语言
   */
  lang = -1,

  /**
   * 是否开启自动领取
   */
  isAuto = -1,

  /**
   * 是否开启加解密
   */
  encrypt = -1,
}
