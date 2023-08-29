/install_radix_cli.sh

if [[ "$APP_SERVICE_ACCOUNT_TOKEN" == "" ]]; then
  echo "no env-var APP_SERVICE_ACCOUNT_TOKEN, exiting"
  exit 1
fi

set -o pipefail

if [[ "$*" == *"--token-environment"* ]]; then
  sh -c "rx $* 2>&1" | tee result.txt
else
  extended_options=" $* --token-environment "
  sh -c "rx $extended_options 2>&1" | tee result.txt
fi

result=$(cat result.txt)

if [[ "$GITHUB_OUTPUT" == "" ]]; then
  echo "no env-var GITHUB_OUTPUT, print result to stdout"
  cat result.txt
else
  echo "result<<EOF" >> $GITHUB_OUTPUT
  cat result.txt >> $GITHUB_OUTPUT
  printf "\nEOF" >> $GITHUB_OUTPUT
  rm -f result.txt
fi