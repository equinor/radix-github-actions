#!/bin/bash
set -e

sh -c "rx --token-environment --await-reconcile $*" 2>&1 | tee result.txt
result=$(cat result.txt)
rm -f result.txt

echo ::set-output name=result::$result
