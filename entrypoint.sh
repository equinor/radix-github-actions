#!/bin/bash

sh -c "echo ${1} | rx --token-environment --from-config $*"
