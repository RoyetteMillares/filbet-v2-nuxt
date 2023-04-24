export const Apis = {
  login: "/v1/user/login", // 登录
  getSportToken: "/v1/bet/getSportToken", // 取得三方體育登录用的 token
  checkOpenGoogleCode: "/v1/user/checkOpenGoogleCode", // 校验是否需要谷歌验证器
  register: "/v1/user/register", // 注册
  profile: "/v1/user/userProfile", // 获取用户详情
  logout: "/v1/user/logout", // 登出
  notice: "/v1/home/notice", // 公告
  createGoogleCode: "/v1/user/createGoogleCode", // 获取验证器
  bindGoogleCode: "/v1/user/bindGoogleCode", // 绑定谷歌验证码
  openOrCloseGoogleCode: "/v1/user/openOrCloseGoogleCode", // 开启或者关闭Google验证器
  sendEmailCode: "/v1/user/sendEmailCode", // 获取验邮箱验证码
  resetPassword: "/v1/user/resetPassword", // 重置密码
  forgotPassword: "/v1/user/forgotPassword", // 忘记密码
  resetMobile: "/v1/user/resetMobile", // 修改手机号
  updateUserProfile: "/v1/user/updateUserProfile", // 更新用户信息
  getWithdrawalPlat: "/v1/wallet/getWithdrawalPlat", // 获取币种提款平台
  withdrawalAddressList: "/v1/wallet/withdrawalAddressList", // 提款地址列表
  getPlatConfigList: "/v1/wallet/getPlatConfigList", // 获取支付平台列表
  addWithdrawalAddress: "/v1/wallet/addWithdrawalAddress", // 新增提款地址
  deleteWithdrawalAddress: "/v1/wallet/deleteWithdrawalAddress", // 删除提款地址
  updateWithdrawalAddress: "/v1/wallet/updateWithdrawalAddress", // 设置默认提款地址
  getDictionary: "/v1/dictionary/getDictionary", // 获取字典
  gameList: "/v1/platform/gameList", // gameList
  slotGameList: "/v1/platform/slotGameList", // 游戏列表
  gameFavorite: "/v1/platform/gameFavorite", // 游戏收藏/取消
  platList: "/v1/platform/platList", // 平台列表
  helpTypes: "/v1/help/pageHelpType", // 帮助类型
  helpContent: "/v1/help/pageHelpInfo", // 帮助类型下的内容
  helpDetail: "/v1/help/helpInfoById", // 帮助内容详情
  blog: "/v1/blog/list", // 博客列表
  init: "/v1/home/init", // 初始化接口
  getCurrencyCoin: "/v1/wallet/getCurrencyCoin", // 获取钱包余额
  getDepositRecord: "/v1/wallet/getDepositRecord", // 获取充值记录
  getWithdrawalRecord: "/v1/wallet/getWithdrawalRecord", // 获取充值记录
  getDepositPlats: "/v1/wallet/getDepositPlat", // 获取充值渠道列表
  startGame: "/v1/platform/startGame", // 获取游戏启动url
  getDepositAddress: "/v1/wallet/deposit", // 获取充值二维码地址
  queryMyBets: "/v1/bet/queryMyBets", // 我的注单
  updateMainWallet: "/v1/wallet/updateMainWallet", // 设置主钱包
  getMessageList: "/v1/notice/getMessageList",
  getNoticeCount: "/v1/notice/getNoticeCount", // 每个类型消息数量
  updateMessageStatus: "/v1/notice/updateMessageStatus", // 修改消息状态
  deleteMessageStatus: "/v1/notice/deleteMessageStatus", // 删除全部消息
  getCoinLogList: "/v1/wallet/getCoinLogList", // 获取帐变记录
  getLampList: "/v1/notice/getLampList", // 跑马灯信息,
  getPromotionList: "/v1/promotions/promotionsList", // 优惠活动列表
  applyPromotion: "/v1/promotions/promotionsInfo", // 申请活动
  // 代理
  coinTransfer: "/v1/agent/coinTransfer", // 转账
  commissionRecords: "/v1/agent/commissionRecords", // 佣金流水
  subordinateDetails: "/v1/agent/subordinateDetails", // 佣金明细
  teamBenefits: "/v1/agent/teamBenefits", // TeamBenefits
  commissionRateList: "/v1/agent/commissionRateList",
  //
  queryMySportBets: "/v1/bet/queryMySportBets", // queryMySportBets
  casinoList: "/v1/platform/casinoList", // casino列表
  // vip
  receive: "/v1/vip/receive", // vip領取獎勵
  userLevelInfo: "/v1/vip/userLevelInfo", // vip中心-使用者vip資訊
  userLeveReward: "v1/vip/userLeveReward", // vip中心領獎表
  userLevelBenefits: "/v1/vip/userLevelBenefits", // vip等級獎勵詳情
  userLevelDetails: "/v1/vip/userLevelDetails", // vip詳情資訊
  memberShipDetails: "/v1/vip/memberShipDetails", // vip中心-MemberShip
  memberShipLevelDetails: "/v1/vip/memberShipLevelDetails", // vip中心-MemberShip Level
  withdrawal: "/v1/wallet/withdrawal", // 在线提款
  sendSesCode: "/v1/user/sendSesCode", // 获取邮箱验证码
  resetEmail: "/v1/user/resetEmail", // 重置邮箱地址
  listLevel: "/v1/user/listLevel",
  blogSearch: "/v1/blog/search", // 博客搜索
  getWithdrawalChannelList: "/v1/wallet/getWithdrawalChannelList", //
  checkPixDeposit: "/v1/wallet/checkDeposit", // 检查充值
  getDepositChannelList: "/v1/wallet/getDepositChannelList",
  getWithdrawalAddressType: "/v1/wallet/getWithdrawalAddressType", // 获取提款地址类型
  getBannerList: "/v1/home/getBannerList",
  getJackpotAndPayout: "/v1/home/getJackpotAndPayout", //
  rankingList: "/v1/home/rankingList", // 排行榜
  betLists: "/v1/bet/betList",
  hotGameList: "/v1/platform/hotGameList",
  sendSmsCode: "/v1/user/sendSmsCode", // 发送手机验证码
  getCap: "/captcha/get",
  promotionsApplyAgain: "/v1/promotions/promotionsApplyAgain",
  sendSnsCode: "/v1/user/sendSnsCode",
  getUserKyc: "/v1/user/getUserKyc", // 获取kyc信息
  uploadFile: "/v1/upload/uploadFile", // kyc id上传
  setOrUpdateKyc: "/v1/user/setOrUpdateKyc", // 更新kyc信息
  sportGameList: "/v1/platform/gameSlotList",
  searchGameList: "/v1/platform/searchGameList",
  gameClassifyList: "/v1/platform/gameClassifyList", // 分类接口
  thirdLogin: "/thirdLogin/auth", // 三方登录token
  thirdAuthUrl: "/thirdLogin/authUrl", // 三方登录
  betStatistics: "v1/bet/betStatistics",
  userStatusInfo: "/v1/user/userStatusInfo", // 谷歌脸书绑定状态
  bindingUrl: "/thirdLogin/bindingUrl", // 获取绑定三方账号url
  binding: "/thirdLogin/binding", // 绑定三方账号
  details: "/v1/platform/details", // 游戏详情
}
