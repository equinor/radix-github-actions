/install_radix_cli.sh
echo 'show all args ----------------------------'
echo $*
echo 'start rx command ----------------------------'
rx $* --token-environment --verbose 2>&1