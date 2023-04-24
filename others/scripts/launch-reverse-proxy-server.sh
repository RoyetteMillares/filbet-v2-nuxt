COMPOSE_FILE_DIR=$OTHERS_DIR/reverse-proxy-server/filbet-nginx.docker-compose.yaml

docker-compose -f $COMPOSE_FILE_DIR down
docker-compose -f $COMPOSE_FILE_DIR up --build -d
