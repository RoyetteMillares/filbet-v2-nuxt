Filbet (RWD & SSR)
A scaffold based on Nuxt 3 Awesome Starter

Development Environment
Docker
Docker Compose
Node == 19.1

Production Environment
Same as "Development Environment"

## Common Commands
```sh
# Install dependencies
pnpm i
# Pre-build before development
npx nuxi prepare
# Start development
pnpm dev
# Start production
pnpm start
# View reverse proxy logs
pnpm proxy:log
# Generate PNG/SVG keys
pnpm generate:assetkeys

# Note:
# Starting in both development and production will restart the "reverse proxy" process.
```

## Environment Variables
```env
# Reverse proxy address
PROXY_SERVER_ADDRESS=http://localhost:18001
```

## Reverse Proxy Configuration
```nginx
server {
    listen 80;
    listen [::]:80;

    location / {
        # Reverse proxy address
        proxy_pass https://test-mobile.filbet.network;
        # Custom request headers
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
      # Port mapping
      - 18001:80
    restart: always
    logging:
      options:
        max-size: 200k
        max-file: 10

```
## Routes - utils/routes.ts
- Route names are listed in types/global.d.ts
- Route configurations are listed in utils/routes.ts
- The default layout is layouts/default.ts
- Vue Router type overrides are written in typing.d.ts

## State Management - stores, types/stores.ts
- All states are stored under the stores directory.
- State types are stored in types/stores.ts, using namespaces for differentiation.

## Components - components, views
- Component Design:
  Independent, dependency-free components should be placed under the components directory and can be organized by page scope.
Components with dependencies should be placed under the views directory.

## Development Notes
Data that can only be fetched on the client should be wrapped with onMounted.
When passing parameters, maintain a single layer of communication—only parent-child interactions. Avoid skipping generations.


## Relevant Links
-  [Nuxt 3](https://nuxt.com/docs)
-  [Nuxt 3 Awesome Starter](https://github.com/viandwi24/nuxt3-awesome-starter)
