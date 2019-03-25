# shopee-test-app

## requirement
docker docker-compose

## Running the app
```sh
$ docker-compose up --build -d
```

## For automation test
```sh
$ docker exec -it shopee-test-app_node_1 /bin/sh
$ npm run test
```

notes: database volume is persistent
