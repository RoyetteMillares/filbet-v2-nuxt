# Filbet ( `RWD` & `SSR` )
> 基於 [Nuxt 3 Awesome Starter](https://github.com/viandwi24/nuxt3-awesome-starter) 建立的腳手架

## 開發環境
- Docker
- Docker Compose
- Node == 19.1

## 生產環境
- 同「開發環境」

## 常用命令
```sh
# 安裝
pnpm i
# 開發前預先建置
npx nuxi prepare
# 開發
pnpm dev
# 生產啟動
pnpm start
# 反向代理日誌查詢
pnpm proxy:log
# 生成 png/svg keys
pnpm generate:assetkeys

# 備注：
# 開發和生產的啟動皆會重新啟動「反向代理」程序
```

## 環境變數
```env
# 反向代理地址
PROXY_SERVER_ADDRESS=http://localhost:18001
```

## 反向代理設定
```nginx
server {
    listen 80;
    listen [::]:80;

    location / {
        # 反向代理地址
        proxy_pass https://test-mobile.filbet.network;
        # 其他客製化請求表頭
        proxy_ssl_server_name on;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass_request_headers on;
    }
}
```
## Docker Compose
```yaml
version: "3"

services:
  filbet-proxy-service:
    container_name: filbet-proxy-service
    build:
      dockerfile: filbet-nginx.dockerfile
      context: .
    ports:
      # 埠號銜接
      - 18001:80
    restart: always
    logging:
      options:
        max-size: 200k
        max-file: 10

```
## 路由 - utils/routes.ts
- 路由名稱列在 types/global.d.ts
- 路由配置列在 utils/routes.ts
- layout 默認為 layouts/default.ts
- vue-router 型別覆寫（override）寫在 typing.d.ts

## 狀態管理 - stores, types/stores.ts
- 狀態都放在 stores 底下
- 狀態型別都放在 types/stores.ts 用 namespace 做區分

## 組件 - components, views
- 組件的設計
  - 獨立無依賴組件請放在 components 底下，可以另外用 page 的範圍來區分
  - 有依賴的組件請放在 views 底下

## 開發注意事項
- 客戶端才能獲取的資料請用 onMounted 包覆
- 代傳參數請保持在一層，只有父子傳遞，不要隔代傳遞


## 相關鏈結
-  [Nuxt 3](https://nuxt.com/docs)
-  [Nuxt 3 Awesome Starter](https://github.com/viandwi24/nuxt3-awesome-starter)