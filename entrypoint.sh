#!/bin/bash
sh -c "rx --token-environment --await-reconcile $*" 2>&1 | tee result.txt
result=$(cat result.txt)
rm -f result.txt

if [[ $result == *"Error"* ]]; then
    exit 1
fi

echo ::set-output name=result::$result
