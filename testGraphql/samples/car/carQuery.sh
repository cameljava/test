#!/usr/local/bin/bash

curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:4000/ \
  --data '{"query":"query car($carId: Int!){\n  car(id: $carId) {\n    id,\n    make,\n    build,\n    color,\n    owner {\n      id,\n      name\n    }\n  }\n}","variables":{"carId":1}}' | jq
