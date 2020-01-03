#!/bin/bash

result=$(sh -c "rx --token-environment --from-config $*")
echo ::set-output name=result::$result
