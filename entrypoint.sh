/install_radix_cli.sh

if [[ "$*" == *"--token-environment"* ]]; then
    rx $* 2>&1
else
    #rx $* --token-environment 2>&1
    echo "no token"
fi
