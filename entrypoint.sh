#!/bin/bash
set -e

sh -c "rx --token-environment --await-reconcile $*" 2>&1 | tee result.txt

EXIT_CODE=${PIPESTATUS[0]}

if [[ $((EXIT_CODE)) != 0 ]]; then
    exit $((EXIT_CODE))
fi

result=$(cat result.txt)
rm -f result.txt

echo ::set-output name=result::$result
