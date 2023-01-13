#!/bin/bash
sh -c "rx --token-environment --await-reconcile $*" 2>&1 | tee result.txt
result=$(cat result.txt)
rm -f result.txt

case "$result" in *"Error: Radix CLI executed with error"*)
    exit 1
    ;;
esac

echo result=$result >> $GITHUB_OUTPUT
