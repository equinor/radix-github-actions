#!/bin/bash
sh -c "rx --token-environment --await-reconcile $*" 2>&1 | tee result.txt
result=$(cat result.txt)
echo "Resultat kopiert til variabel fra fil"
rm -f result.txt

if [[ "$result" == *"Error"* ]]; then
    echo "Dette er en test på at det virker"
    exit 1
fi

echo "Uventet"
echo ::set-output name=result::$result
