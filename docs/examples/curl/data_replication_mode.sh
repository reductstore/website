#!/bin/bash
set -e

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Pause a replication task to queue transactions without sending them
curl -X PATCH \
  -d '{"mode":"paused"}' \
  -H "${AUTH_HEADER}" \
  "${API_PATH}"/replications/my_replication/mode

# Disable replication to ignore new transactions
curl -X PATCH \
  -d '{"mode":"disabled"}' \
  -H "${AUTH_HEADER}" \
  "${API_PATH}"/replications/my_replication/mode

# Switch back to enabled after maintenance to resume sending (and flush any queued transactions)
curl -X PATCH \
  -d '{"mode":"enabled"}' \
  -H "${AUTH_HEADER}" \
  "${API_PATH}"/replications/my_replication/mode
