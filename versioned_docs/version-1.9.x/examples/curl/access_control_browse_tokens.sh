#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Browse all tokens and print their information
curl -H "$AUTH_HEADER" "$API_PATH/tokens"

# Get detailed information about a specific token
curl -H "$AUTH_HEADER" "$API_PATH/tokens/my-token"