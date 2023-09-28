#!/bin/sh
VERSION="1.8.1"

# this action may be run in consecutive steps in same workflow. To avoid duplicate downloads, we check
# if the rx cli tar file already exists
ls radix-cli_*_Linux_x86_64.tar.gz >/dev/null 2>&1 || {
    apk add --update curl
    wget https://github.com/equinor/radix-cli/releases/download/v${VERSION}/radix-cli_${VERSION}_Linux_x86_64.tar.gz
  }
tar zxvf $(readlink -f radix-cli_*_Linux_x86_64.tar.gz) 1>/dev/null
mv rx /usr/local/bin
