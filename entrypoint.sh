/install_radix_cli.sh

if [[ "$*" == *"--token-environment"* ]]; then
  sh -c "rx $* 2>&1" > result.txt
else
  extended_options="--token-environment $*"
  sh -c "rx $extended_options 2>&1" > result.txt
fi
exit_code=$?

result=$(cat result.txt)

if [[ "$GITHUB_OUTPUT" == "" ]]; then
  cat result.txt
  exit $exit_code
fi

echo "result<<EOF" >> $GITHUB_OUTPUT
cat result.txt >> $GITHUB_OUTPUT
printf "\nEOF" >> $GITHUB_OUTPUT
rm -f result.txt

exit $exit_code