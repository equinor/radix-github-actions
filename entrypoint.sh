#!/bin/bash
sh -c "rx --token-environment --await-reconcile $*" 2>&1 | tee result.txt
result=$(cat result.txt)
rm -f result.txt

case "$result" in *"Error"*)
    exit 1
    ;;
esac

echo ::set-output name=result::$result
