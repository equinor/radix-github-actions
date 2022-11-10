#!/bin/bash
set -e

sh -c '"rx --token-environment --await-reconcile $*" 2>&1 | tee result.txt ; echo ${PIPESTATUS[0]}'

echo "Obtain exit code"
echo "Exit code is ${PIPESTATUS}"
EXIT_CODE=${PIPESTATUS[0]}
echo "Obtained exit code"

if [[ $((EXIT_CODE)) != 0 ]]; then
    exit $((EXIT_CODE))
fi

result=$(cat result.txt)
rm -f result.txt

run: echo "{name}={value}" >> $GITHUB_OUTPUT
