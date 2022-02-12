#!/usr/local/bin/bash

curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:4000/ \
  --data '{"query":"query cars{\n  cars {\n    id,\n    build,\n    color,\n    owner {\n      id,\n      name\n    }\n  }\n}","variables":{}}' | jq
