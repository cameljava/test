#!/usr/local/bin/bash

curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:4000/ \
  --data '{"query":"query user($userId: Int!) {\n  user(id: $userId) {\n    id\n    name\n    car {\n      build\n      make\n      id\n      color\n      owner {\n        id\n        name\n        car {\n          id\n          build\n          owner {\n            __typename\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n}","variables":{"userId":1}}' | jq
