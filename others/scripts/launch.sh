export OTHERS_DIR=./others
export CURRENT_DIR=$(pwd)
export MODE=$1

cat <<EOF >.env.docker
ContextPath=$CURRENT_DIR
MainServerPath=$CURRENT_DIR/others/main-server
EnvPath=$CURRENT_DIR/.env
EOF

# sh $OTHERS_DIR/scripts/launch-reverse-proxy-server.sh
if [[ $MODE == dev ]]; then
  pnpm nuxt:dev
elif [[ $MODE == docker ]]; then
  docker-compose --env-file $CURRENT_DIR/.env.docker -f $CURRENT_DIR/others/main-server/docker-compose.yml up --build -d
  docker logs -f filbet-ssr
else
  pnpm nuxt:build
  pnpm nuxt:start
fi
