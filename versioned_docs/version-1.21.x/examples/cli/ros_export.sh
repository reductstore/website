#!/bin/sh

set -eu

export_dir=$(mktemp -d)
trap 'rm -rf "$export_dir"' 0
cd "$export_dir"

# ros-native-export-start
reduct-cli cp \
  https://reductstore@play.reduct.store/replica/orion \
  ./orion-native \
  --entries 'right_ir/rotated/*' \
  --limit 1
# ros-native-export-end

native_file=$(find ./orion-native -type f -print -quit)
test -n "$native_file"
test -s "$native_file"

# ros-mcap-export-start
reduct-cli cp \
  https://reductstore@play.reduct.store/replica/orion \
  ./orion-mcap \
  --entries 'right_ir/rotated/image_raw' \
  --limit 1 \
  --when '{"#ext":{"ros":{"export":{"format":"mcap"}}}}'
# ros-mcap-export-end

mcap_file=$(find ./orion-mcap -type f -name '*.mcap' -print -quit)
test -n "$mcap_file"
test -s "$mcap_file"

mcap_magic=$(od -An -tx1 -N8 "$mcap_file" | tr -d ' \n')
test "$mcap_magic" = '894d434150300d0a'
