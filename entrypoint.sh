/install_radix_cli.sh "$github_token"
sh -c "rx --token-environment --await-reconcile $*" 2>&1 | tee result.txt
result=$(cat result.txt)

case "$result" in *"Error: Radix CLI executed with error"*)
    exit 1
    ;;
esac

echo "result<<EOF" >> $GITHUB_OUTPUT
cat result.txt >> $GITHUB_OUTPUT
printf "\nEOF" >> $GITHUB_OUTPUT
rm -f result.txt