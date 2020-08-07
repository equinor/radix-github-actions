  
#!/bin/bash
set -e

sh -c "rx --token-environment --await-reconcile $*" 2>&1 | tee result.txt

echo "Obtain exit code"
EXIT_CODE=${PIPESTATUS[0]}
echo "Exit code is $EXIT_CODE"

if [[ $((EXIT_CODE)) != 0 ]]; then
    exit $((EXIT_CODE))
fi

result=$(cat result.txt)
rm -f result.txt

echo ::set-output name=result::$result
