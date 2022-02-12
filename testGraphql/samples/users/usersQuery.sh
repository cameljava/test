#!/usr/local/bin/bash

curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:4000/ \
  --data '{"query":"query users{\n  users {\n    id,\n    name,\n    car {\n      id,\n      build,\n      color,\n      make,\n      owner {\n        id,\n        name\n      }\n    }\n  }\n}"}' | jq
