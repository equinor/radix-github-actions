#!/bin/bash
apk add --update curl
VERSION=$(
    curl --silent "https://api.github.com/repos/equinor/radix-cli/releases/latest" |
        grep '"tag_name":' |
        sed -E 's/.*"v([^"]+)".*/\1/'
)

wget https://github.com/equinor/radix-cli/releases/download/v${VERSION}/radix-cli_${VERSION}_Linux_x86_64.tar.gz

tar zxvf radix-cli_${VERSION}_Linux_x86_64.tar.gz
mv rx /usr/local/bin
