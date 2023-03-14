# GitHub Action for Radix CLI

This Action for [Radix CLI](https://github.com/equinor/radix-cli) to integrate with the Radix platform from a GitHub Action workflow.

## Outputs

### `result`

The standard output from execution of the `rx` command.

## Usage

This Action can be used to run any `rx` command. The run make some assumptions:

- An environment variable with the `APP_SERVICE_ACCOUNT_TOKEN` is available to the app, and this token belongs to a user or service principal who has the appropriate privileges for the operations you want to execute in the Radix cluster. [See our documentation](https://www.radix.equinor.com/guides/deploy-only/example-github-action-using-ad-service-principal-access-token.html#example-of-using-ad-service-principal-to-get-access-to-a-radix-application-in-a-github-action) for example on how to acquire such a token in a GitHub Actions workflow. The environment variable can be set on a single step or on the entire flow.

All of the examples below pass the `github-token` argument to the Action. Passing this argument is optional. The caveat of *not* passing this argument is that it gets more likely that the workflow fails because the hourly GitHub API rate limit has been exhausted. The Action uses to GitHub API to determine the most recent version of the `rx` CLI.

Examples:

```yaml
- name: Deploy on Radix
  uses: equinor/radix-github-actions@master
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    args: >
      create job
      deploy
      -a application-name
      -e ${{ steps.getEnvironment.outputs.result }}
      -f
```

`-f` will ensure that the action step is followed, and won't continue until step is complete.

```yaml
- name: Deploy on Radix
  uses: equinor/radix-github-actions@master
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    args: >
      create job
      deploy
      --context playground
      -a application-name
      -e ${{ steps.getEnvironment.outputs.result }}
      -f
```

`--from-config` will read information such as application-name, branch mapping etc from your radixconfig.yaml

```yaml
- name: Deploy on radix
  uses: equinor/radix-github-actions@master
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    args: >
      create job
      deploy
      --from-config
      -e ${{ steps.getEnvironment.outputs.result }}
      -f
```

`--context playground` will communicate with playground cluster, if your application resides there.

```yaml
- name: Set component environment secret
  uses: equinor/radix-github-actions@master
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    args: >
      set environment-secret
      --from-config
      -e <your environment name>
      --component <your component name>
      -s <your secret name>
      -v '<your secret value>'
```

```yaml
- name: Get environment from branch mapping in Radix config for repository
  id: getEnvironment
  uses: equinor/radix-github-actions@master
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    args: >
      get-config branch-environment
      --from-config
      -b ${GITHUB_REF##*/}
- name: Print the environment
  run: echo "${{ steps.getEnvironment.outputs.result }}"
```

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).
