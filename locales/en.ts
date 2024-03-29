const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
export default {
  menu: {
    sports: "Sports",
    inPlay: "InPlay",
    Upcoming: "Upcoming",
    MyBet: "My bet",
    Casino: "Casino",
    Live: "Live",
    Slots: "Slots",
    Turbo: "Turbo",
    Club: `${VITE_APP_TITLE} Club`,
    Promotions: "Promotions",
    Affiliate: "Affiliate",
    Blog: "blog",
    Help: "Help",
    About: "About",
    liveChat: "Live chat",
    chess: "Chess",
    table: "Table",
    categories: "Categories",
    help: "Help",
    terms: "Terms",
    FAQ: "FAQ",
    follow: "Follow",
    methods: "Methods",
  },
  public: {
    Date: "Date",
    All: "All",
    Single: "Single",
    Multi: "Multi",
    Type: "Type",
    Select: "Select",
    Filter: "Filter",
    Inquire: "Inquire",
    Submit: "Submit",
    Loading: "Loading",
    Reminder: "Reminder",
    HaveNoMessages: "You Have No Messages",
    start: "start",
    EndDate: "End date",
    title: "title",
    Cancel: "Cancel",
    Confirm: "Confirm",
    EnterSearch: "Enter Search",
    timeout: "timeout",
    RequestFail: "Request Fail",
    NoRequest: "No request",
    ASC: "Ascending",
    DESC: "Descending",
    lastFewSeconds: "Just now",
    lastFewMinutes: "{min} minutes earlier",
    lastFewHours: "{hour} hours earlier",
  },
  game: {
    SeeAll: "See All",
    dondHaveGames: "You don’t have any games yet",
    needLoginFirst: "Before you start gaming you need to login first",
    EditSuccessfully: "Edit successfully",
    sureQuitGame: "Are you sure you want to quit this game?",
    sureChangeModel: "Are you sure you want to change play model?",
  },
  casino: {
    BestLiveCasinoGames: "Best Live Casino Games",
    BestSlotsGames: "Best Slots Games",
    TurboGames: "Turbo Games",
  },
  affiliate: {
    Notification: "The agency commission is settled every day at GMT{time}",
    banner: {
      TeamBenefits: "Team benefits",
      AddAnAgentToday: "Add An Agent Today",
      NumberOfAgents: "Number Of Agents",
      TotalCommission: "Total Commission",
      AllowWithdrawal: "Allow Withdrawal",
      Withdrawal: "Withdrawal",
      Transfer: "Transfer",
      agencyEarnings: "Your agency earnings",
      text: "The User Enters The Game Through The Link And Automatically Becomes Your Subordinate Agent",
      JoinAgent: "Join Agent",
    },
    invitationCodeLink: {
      InvitationCode: "Your Invitation Code",
      InviteLink: "Your Invite Link",
    },
    agentDetails: {
      agentLevel: "Agent level",
      commission: "commission amount",
      createdAt: "Registration time",
      details: "Personal sub-agent details",
    },
    commissionDetails: {
      CommissionDetails: "Commission Details",
      Username: "Username",
      Level: "Level",
      BettingTurnover: "Betting Turnover",
      CommissionUSD: "Commission",
      NoRecords: "You don’t have any Commission Details yet",
    },
    commissionBetting: {
      MyTeam: "My Team",
      CommissionDetails: "Commission Details",
      TotalCommission: "Total Commission",
      BettingTurnover: "Betting Turnover",
      Agent: "Agent",
    },
    transfer: {
      Transfer: "Transfer",
      TransferUSD: "Transfer PHP",
      AllowTransfers: "Allow Transfers",
      TransferAll: "Transfer All",
      Submit: "Submit",
      InsufficientBalance: "Insufficient balance",
      Cancel: "Cancel",
      Confirm: "Confirm",
    },
    about: {
      title: "AGENT RULES",
      aboutUs: "About Us",
      title00:
        'All players invited by "Promoters" will receive a certain percentage of platform advantage bonus for every wager.',
      title01: "The following are the proportions of the three levels",
      title02: "Example: Your subordinate player",
      title03: "TERMS & CONDITION",
      text01:
        "LEVEL 1: You will be eligible for 0.3 % benefits on the platform.",
      text02: "LEVEL 2: You will earn 0.1 % benefits on the platform.",
      text03: "LEVEL 3: You will receive 0.05% of the platform's benefits.",
      text04:
        "level 1: top up 1000p, total amount wagered during the period 30,000, you can get 0.3% which means the commission you will receive is 90P.",
      text05:
        "level 2: top up 1000p, total amount wagered during the period 30,000, you can get 0.1% which means the commission you will receive is 30P.",
      text06:
        "level 3: top up 1000p, total amount wagered during the period 30,000, you can get 0.05% which means the commission you will receive is 15P.",
      text07: "level 1 : 30,000*0.3%=90P.",
      text08: "level 2: 30,000*0.1%=30P.",
      text09: "level 3: 30,000*0.05%=15P.",
      text10:
        "The commission you can get is (30,000+30,000+30,000) X 0.45%=135P.",
      text11:
        "1.The salary is distributed at 10 a.m. on a daily commission basis.",
      text12:
        "2. Just 1peso turnover is enough to get commission，this is based on net turnover commission",
      text13:
        "3.Players under the age of 21 are not permitted to register or work as an agent.",
      text14:
        "4.Just contact our customer service on the website to join our agent plan.",
      text15:
        "5.if any form of cheating is discovered, the commission will be ineligible.",
      text16:
        "6.FILBET reserves the right to change the terms of this offer, cancel or renew it, and refuse participation in it at any time without prior notice.",
    },
  },
  mine: {
    Register: "Register",
    EnterYourAccount: "Username",
    eg: "e.g.example.com",
    GetCode: "Get Code",
    EnterCodeVerification: "Enter Code Verification",
    PhoneNumber: "Phone number",
    Password: "Password",
    InvitationCode: "Invitation code (optional)",
    confirmText:
      "I agree to the Terms & Conditions and Privacy Policy, including Cookie use.",
    CreateAccount: "Create account",
    HaveAccount: "Have an account ?",
    SignIn: "Sign in",
    PromoIncorrect: "Promo code was incorrect",
    UsernameOrEmail: "Username",
    ForgotPassword: "Forgot Password ?",
    DontHaveAccount: "Don’t have an account ?",
    ForgetPassword: "Forgot Password",
    GoogleAuthenticator: "Google Authenticator",
    IncorrectInput: "Incorrect input",
    EnterUsernameOrEmail: "Enter username",
    EnterPassword: "Enter password",
    WelcomeTo: "Welcome to",
    OfficialPartners: "Official Partners",
    CodeVerification: "Code Verification",
    SixdigitCodeToVerify: "Enter The Six-digit Code To Verify",
    AccountBindingEmail: "Account Binding Email",
    NewPassword: "New Password",
    information: {
      DeleteAll: "Delete All",
      MarkAllAsRead: "Mark All As Read",
      Notice: "Notice",
      Bulletin: "Bulletin",
      Information: "Information",
      sureDleteAll: "Are you sure to delete all message?",
      sureMarkAll: "Are you sure to mark all as read?",
      Reminder: "Reminder",
      Check: "Check",
    },
    adjust: {
      AccountHistory: "Account History",
      IncomeAndExpenditure: "Income And Expenditure",
      Date: "Date",
      DateTime: "Time",
      Type: "Trans Type",
      CreditDebit: "Credit/Debit",
      PreviousBalance: "Previous Balance",
      CurrentBalance: "Current Balance",
    },
    profile: {
      GoogleAuthenticator: "Google Authenticator",
      Email: "Email",
      Password: "Password",
      Phone: "Phone",
      Unbind: "Unbind",
      Opened: "Opened",
      Unopened: "Unopened",
      Bind: "Bind",
      Change: "Change",
      sureTurnOffGoogleAuthenticator:
        "Are you sure you want to turn off Google Authenticator",
      sureTurnONGoogleAuthenticator:
        "Are you sure you want to turn on Google Authenticator",
      Reminder: "Reminder",
      Withdrawal: "Withdrawal",
      Default: "Default",
      SetDefault: "Set default",
      AddUSDTAddress: "Add Address",
      sureDeleteCard: "Are you sure to delete this card?",
      sureSetCard: "Are you sure to set this card to be default",
      CryptoType: "Crypto type",
      PleaseSelect: "Please select",
      Address: "Address",
      EnterAddress: "Enter address",
      CryptoAddressIncorrect: "The Crypto address was incorrect",
      Mobile: "Mobile",
      PhoneNumber: "Phone number",
      OldPassword: "Old Password",
      NewPassword: "New Password",
      CurrentMail: "Current Mail",
      EnterMmail: "Enter your email",
      GetCode: "Get Code",
      CodeVerification: "Code Verification",
      NewEmail: "New Email",
      ToActivate: "To Activate, Scan The Qr Code Or Enter The Code Manually",
      KeyValue: "Key Value :",
      NextStep: "Next Step",
      selectID: "Select Valid ID",
      frontPhoto: "Front photo of ID",
      refuseReason: "Refuse Reason",
      reminders: "Reminders",
      kyc: "KYC Settings",
      valid: "Valid ID",
      unSetting: "Not Set",
      review: "In Review",
      description: `Update 1 valid ID (must be government issued and clear) with photo inside of frame<br/>
      Use original ID (not photocopied)<br/>
      Information of ID should include Name, Birthdate, photo is compulsory<br/>
      In legal age (21 years) and all the details provided are all true<br/>
      With the PAGCOR request, the website have the right to requires user to<br/>
      provide a video verification`,
    },
  },
  blog: {
    latestblog: "Latest blog",
    highlights: "Highlights",
    previousblog: "Previous blog",
    releaseTime: "Release Time",
    noData: "No Data!",
    Blogblog: "Blog blog",
    BlogDetail: "Blog Detail",
  },
  help: {
    title: "Hi. How Can We Help?",
    seeAll: "See All",
    GettingStarted: "Getting Started",
  },
  about: {
    tab: `About Us | Affiliates | ${VITE_APP_TITLE} Club`,
    clubhouse: "Xwin Clubhouse",
    aboutUs: {
      text01: `${VITE_APP_TITLE} was conceptualised to be the pre-eminent online destination for all your gaming and betting needs. Delivering a suite of industry-leading entertainment options that include online sports betting, live dealers, slots, high-end virtual casino and table games, we offer a complete i-gaming experience.`,
      text02:
        "Our strengths lie in understanding the needs of our valued players in their respective key markets to ensure we provide an i-gaming experience tailor made to their needs.",
      text03:
        "In line with this, we have created an innovative and comprehensive loyalty program with true rewards for real players coupled with generous promotions to ensure maximum entertainment for the first timer to the seasoned punter.",
      text04:
        "Our players are at the heart of everything we do, from providing provably fair games to cryptocurrency or traditional fiat Deposit and withdrawal options. Our state-of-the-art securely encrypted servers and 24/7/365 customer support work in unison to achieve our goal of giving YOU the best entertainment value possible.",
    },
    affiliates: {
      text01: `Join ${VITE_APP_TITLE}'s affiliate program and earn money for referring our brands! You will receive commission every time a user signs up and uses ${VITE_APP_TITLE} through your referral link. As an affiliate of ${VITE_APP_TITLE}, the commission earned will be based on all bets made by the referred user. This is different from traditional affiliate programs in that you get the same commission regardless of whether the referred user wins or loses! All bets are calculated using the following table to calculate your commission:`,
      text02:
        "If you are an Affiliate with exceptional influence and reach to the masses or can provide other special services, please contact our outstanding online support team. After discussion with the affiliate manager, we can customize an affiliate program for you which may include higher commissions!",
      thead:
        "Affiliate sub-levels | Commission rate | User bet amount * commission rate",
      Commission: "Commission",
      col: "{num}st level",
    },
    club: {
      text01:
        "Welcome to the club!<br/>Whether you're seasoned or just starting out, you're a winner in our Loyal Players Club!",
      text02: `${VITE_APP_TITLE} Club is a community dedicated to our valuable players, allowing them to enjoy all the promotions on the site at any time. You will earn Club Points for every bet, every spin and every hand of the game. Use the points you earn as you progress through the club, unlocking amazing rewards along the way.`,
      text03:
        "Every time you unlock a bonus, you can get free bets, free spins, free games or cash back, and special gifts, the higher the level, the more valuable the gifts you unlock!",
      text04:
        "Club tier determines the value and type of rewards you can claim. Your rewards will continue to increase as the club progresses through the ranks.",
      text05:
        "Early in the game, your game multiplier is 1, meaning you earn 1 point for every dollar wagered and as you level up, so does your point multiplier, meaning you can use the same amount to earn higher points and unlock higher value rewards!",
      text06:
        "If you do not collect the minimum points required for each tier within a month, you will be downgraded to the next tier the following month.",
      text07:
        "If you have more questions to answer, please contact our online customer service team, we will answer all your questions patiently until you are satisfied!",
      thead: "level | title | required points",
      keep: "keep grade points",
      multiplier: "Points multiplier",
      col: "copper | bronze | silver | gold | ruby | sapphire | diamond | VIP",
    },
    partnerLabel: "Official Partners",
    partnerTitle:
      "Official Partner of Digitain | Official Partner of LEAP | Official Partner of KSV Holstein",
    partnerCotent1:
      "Digitain is focused on delivering unique customer experiences with their product offerings.<br/>Their team of sports traders employ the latest AI and machine learning technology to incomplete sentence.",
    partnerCotent2:
      "A gaming provider of high-end virtual games for online, mobile and retail markets,LEAP is devoted to melding<br/>technology and gaming to engage users with original content and proprietary realistic 3D entertainment.",
    partnerCotent3:
      "As one of the most dominant sides in North Germany, KSV Holstein has been a force since the 1900's. This German association football and sports club based in Kiel has unmatched pedigree and been the breeding ground for a significant number of German and International sporting elite.<br/>We are proud to strengthen our presence in Europe through our sponsorship of KSV Holstein. The synergies between our association will ensure we are better positioned to further drive our brand recognition within the European continent.",
  },
  bet: {
    betDetails: {
      All: "All",
      Single: "Single",
      Multi: "Multi",
      ActiveBets: "Active Bets",
      SettledBets: "Settled Bets",
    },
    betItem: {
      Multi: "Multi",
      Odds: "Odds",
      Stake: "Stake",
      PotentialWin: "Potential win",
    },
    betrecord: {
      Single: "Single",
      Multi: "Multi",
      Time: "Time",
      Sport: "Sport",
      Type: "Type",
      StakeUSD: "Stake",
      PotentialWin: "Potential winme",
      TransactionID: "Transaction ID",
      NoRecords: "No valid records",
      NoActiveTickets: "You have no active tickets",
    },
  },
  wallet: {
    recharge: {
      RechargeUSDT: "Deposit",
      ChooseRechargeMethod: "Choose A Recharge Method",
      QuickAmount: "Quick Amount",
      DepositAmount: "Deposit Amount",
      REAL: "REAL",
      MinimumDepositAmountREAL: "Minimum Deposit amount: 10 REAL",
      pageTitle: "Deposit",
      title: "Choose a Deposit Method",
      label1: "Urawa Red Diamonds",
      error:
        "Please make sure you use only the TRC-20 network when depositing USDT, in order to receive your balance seamlessly.",
      label2: "Recharge Address",
      tip1: "Minimum Deposit amount: 10 USDT",
      tip2: "After the recharge is successful, USDT will be automatically converted into fiat currency (USD) into the account balance.",
      tip3: "The exchange rate is 1:",
      qrLabel:
        "Scan the QR code through the wallet app to complete the Deposit.",
    },
    myWallet: {
      pageTitle: "My Wallet",
      wallet: "Wallet",
      use: "Wallet In Use",
      allowWithdrawal: "Allow Withdrawal",
      bonus: "Bonus",
      assetsReal: "Assets Real",
      deposit: "Deposit",
      withdrawal: "withdrawal",
      useThis: "Use This Wallet",
      previousBets: "Previous Bets",
      filter: "Filter",
      sureChangeWallet: "Are you sure to change this wallet in use?",
      Reminder: "Reminder",
    },
    withdraw: {
      pageTitle: "Choose A Recharge Method",
      withdrawAs: "Withdraw As",
      assets: "Assets",
      withDrawType: "WithDraw {type}",
      settledBets: "Settled Bets",
      depositMainnet: "Deposit Mainnet",
      withDrawAddress: "Recharge Address",
      quantity: "Quantity",
      mainnetFees: "Mainnet Fees",
      exchangerateType: "{type} Exchangerate",
      actualType: "Actual Credited {type}",
      withdrawAll: "Withdraw All",
      WithdrawalSucceeded: "Withdrawal succeeded",
      Mainnet: "Mainnet",
      TransactionID: "Transaction ID",
      WithdrawUSD: "Withdraw USD",
      ExchangeRate: "Exchange Rate",
      ActualCredit: "Actual Credit",
      State: "State",
      Time: "Time",
    },
  },
  club: {
    title: "Welcome to the Club!",
    text01: `Exclusive Membership for Crypto Players! Whether you are on a hot streak or grinding hard, becoming a member of our ${VITE_APP_TITLE} Club will open the door to dazzling rewards and prizes.`,
    text02: "Your Membership Benefits",
    text03: "Your Road To Glory Starts Here!",
    TotalDeposits: "Accumulated Deposits",
    text04: "Distance To The Next Level : Vip",
    text05: "Deposit Required For Next Tire:",
    text06: "You Play, We Pay!",
    text07:
      "Switch to cryptocurrency to start accumulating points and accruing rewards with every bet.",
    Points: "Points",
    PointsMultiplier: "Points multiplier",
    TierRewards: "Tier rewards",
  },
  promote: {
    title: "Details",
    button01: "YOU HAVE OPTED IN",
    button02: "PLAY NOW",
    tooltip: "Successful application",
  },
  live: {
    MyFavourites: "My Favourites",
    HotPicks: "Hot Picks",
    AllGames: "All Games",
  },
  noData: {
    blog: "No data on the current page",
    modeGame: "You don’t have any games yet",
    helpDetail: "No more",
    gameCollection: "You don’t have any favorite games yet",
  },
  new: {
    start: "Start date",
    end: "End date",
    select: "Please select",
    currentProgress: "Current progress",
    home: "Home",
    footerText: `${VITE_APP_TITLE} is owned and operated by Mbet Solutions NV (Schout Bij Nacht Doormanweg 40, P.O. Box 4745, Curaçao). It is licensed and regulated by the Government of Curaçao under the gaming license 1668/JAZ. Some payment processes are handled by its wholly owned subsidiary, mProcessing Solutions Ltd, Cyprus (Menandrou 4, 1066, Nicosia, Cyprus).`,
    Register: "Register",
    signIn: "Sign in",
    Deposit: "Deposit",
    assets: "Balance",
    signOut: "Sign out",
    myAccount: "My Account",
    Amount: "Amount",
  },
  validator: {
    text01: "only alphanumeric char, no space, max of 10 characters",
    text02: "Please enter your account",
    text03: "Email was incorrect",
    text04: "Please enter your email",
    text05: "Password was incorrect",
    text06: "Please enter your password",
    text07: "The format is six digits",
    text08: "Please enter your code",
    text09: "The format was incorrect",
    text10: "Please enter your mobile number",
    text11: "Please enter your Amount",
    text12: "Code was incorrect",
    text13: "6 digits",
    text14: "required",
  },
  tooltips: {
    text01: "Verification code sent successfully",
    text02: "Reset successfully",
    text03: "Document Submitted",
    text04: "The size cannot exceed {m}m",
  },
  routerTitle: {
    PromotionsDetail: "Promotions Detail",
    Gameroom: "Game room",
    Withdraw: "Withdraw",
    Detail: "Detail",
  },
  vip: {
    VIP: "VIP",
    FullLevel: "Full level",
    SignIn: "Sign In",
    UpgradeMembership: "Upgrade Membership",
  },
  additional: {
    dontHaveWithdrawAccount: "You haven't bind any withdraw account",
    copySuccessfully: "Copy successfully",
    Mainnet: "Mainnet",
    Amount: "Amount",
    TransactionID: "Transaction ID",
    ExchangeRate: "Exchange Rate",
    AmountReceived: "Amount Received",
    Status: "Status",
    DateTime: "Date/Time",
    withAddress: "{name} Withdrawal Address",
    inputAccountNo: "Enter Account No",
    accountType: "Account Type",
    accountNo: "Account No",
    withdrawAddress: "Withdraw Address",
    chooseWithdraw: "Choose A Withdraw Method",
    enterAmount: "Please enter Amount",
    amountFormat: "Amount formatted incorrectly, only integers can be entered",
    insufficientAmount: "Insufficient balance available for withdrawal",
    correctAmount:
      "Minimum withdrawal amount {min} ,Maximum withdrawal amount {max}",
    withdrawSuccess: "Withdrawal succeeded",
    minAmount:
      "The limit per transaction is between {min} - {max} {mainCurrency}.",
    depositError:
      "Please make sure you use only the {channel} network when depositing {code}, in order to receive your balance seamlessly.",
    Maintenance: "The Deposit Channels Under Maintenance",
    changeWay: "Please Deposit with another way",
    state: "State",
    depositRecord: "Deposit record",
    withdrawRecord: "Withdraw record",
    MinimumDepositAmountREAL: "Minimum Deposit amount: {num} {currency}",
    channel: "Channel",
    // withAddress:"Withdraw Address"
    minimumAmountIs: "The minimum amount is", // 最小额度为
    errorTips01: "Dear User!",
    errorTips02:
      "Sorry, page is not available. Please contact customer service for further assistance. We apologize for the inconvenience. Thanks for your support and understanding!",
    Back2Home: "Back to Home",
    OfficialPartner: "Official Partners",
    Fees: "Fees",
    next: "Distance To The Next Level {name}",
    ConfirmNewPassword: "Confirm New Password",
    vipRequired: "Current EXP is {current}, EXP remaining {num} to level up",
    vipTips: "(EXP = Deposit Amount * EXP rate of current level)",
    Experience: "Experience",
    logout: "Are you sure you want to log out?",
    Delete: "Delete",
    Change: "Change",
    vipName: "VIP Level",
    range: "EXP Range",
    rate: "EXP Rate",
    TransactionList: "Trans List",
    Previous: "Previous",
    Next: "Next",
    unFinished:
      "You still have an unfinished order, do you continue to complete it?",
    insufficientWithdrawal: "Insufficient balance available for withdrawal",
    turnOver: "{amount} more bets needed ",
    resend: "Resend",
    continuePay: "Continue Pay",
    depositTips:
      "Please make sure that the input amount is the same as the final transfer amount to avoid recharge failure",
    accountNumber: "Please input correct account number",
    validateNo: "Please input correct account",
    realName: "Please input correct account name",
    accountName: "Account Name",
  },
  extra: {
    invite: "Your invite code",
    current: "Current",
    vip: " Member benefits",
    currentLevel: " Current level",
    message: "Your message",
    cockfight: "Cockfight",
    fishing: "Fishing",
    more: "More",
    hot: "Recommend",
    haveFun: "Classic mini games, happy to play",
    slots: "Total Slots Jackpots",
    todayReward: "Total Payout For Today",
    comingSoon: "Coming Soon",
    moreGame: "More Games",
    rank: "Ranking list",
    top: "Profit For Top 10",
    todayProfit: "Profit For Today",
    username: "Username",
    game: "Game Name",
    betAmount: "Amount",
    profit: "Profit",
    footer: `${VITE_APP_TITLE} Has passed all compliance reviews and is legally authorized to conduct entertainment operations of all wagering games.`,
    copyright: `© 2022 ${VITE_APP_TITLE} | Copyright Reserved`,
    gameBet: "In {name},bet {bet}",
    InProfit: "Profit {amount}",
    betRecord: "Bet Record",
    bet: "Bet Amount",
    payout: "Payout",
    orderId: "ID",
    promoText: "Non-stop activity prizes, non-stop cash collection",
    slotText: "Enjoy different fun with classic slot machines",
    liveText: "Beauty takes you to make money in the game",
    cockText: "animal world an endless enjoyment",
    manageAddress: "Manage Address",
    myLevel: "My Level",
    platform: "Game Platform",
    balance: "Balance",
    fishingTitle: "Happy Fishing",
    fishingText: "Get Rich Instantly with High Jackpots",
    collectSuccess: "collect success",
    cancelCollect: "collect canceled",
    registerTip:
      "Sign up for free bonus event, open for a limited time, waiting for you to participate",
    join: "Join",
    slideToRight: "Swipe right to complete verification",
    finished: "Please complete the security verification",
    verFail: "verification failed",
    verSuccess: "Verification successful",
    toBind: "To Bind",
    giveUp: "Give Up",
    rule: "Commission Rules",
    maintenance: "Maintenance",
    EstimatedTime: "Estimated Time",
  },
}
