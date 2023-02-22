#!/bin/sh
if [ "$1" != "" ]
then
  headers=$'--header \'authorization: Bearer '$1''\'''
else
  headers=""
fi

# this action may be run in consecutive steps in same workflow. To avoid duplicate downloads, we check
# if the rx cli tar file already exists
ls radix-cli_*_Linux_x86_64.tar.gz >/dev/null 2>&1 || {
    apk add --update curl
    VERSION=$(
      curl --silent ${headers} https://api.github.com/repos/equinor/radix-cli/releases/latest |
          grep '"tag_name":' |
          sed -E 's/.*"v([^"]+)".*/\1/'
    )
    wget https://github.com/equinor/radix-cli/releases/download/v${VERSION}/radix-cli_${VERSION}_Linux_x86_64.tar.gz
  }
tar zxvf $(readlink -f radix-cli_*_Linux_x86_64.tar.gz)
mv rx /usr/local/bin