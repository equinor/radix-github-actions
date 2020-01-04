# GitHub Action for Radix CLI

This Action for [Radix CLI](https://github.com/equinor/radix-cli) to integrate with the Radix platform from a github action workflow.

## Outputs

### `result`

The standard output from execution of the `rx` command.

## Usage

This Action can be used to run any `rx` command. The run make some assumptions:

- There is a Radix config file in the repository that it can use as input (--from-config in radix-cli is set as argument on the action)
- There is a defined environment variable set `APP_SERVICE_ACCOUNT_TOKEN`, with the token of the service account provided to administer the application. The environment variable can be set on a single step or on the entire flow.
- The service account token will only have access to single application in a single cluster/context, and will be provided in the Radix web console

Examples:

```yaml
- name: Build and deploy API on Radix
  uses: equinor/radix-github-actions@master
  with:
    args: >
      build-deploy
      -b ${GITHUB_REF##*/}
      -f
```

`-f` will ensure that the action step is followed, and won't continue until step is complete.

```yaml
- name: Build and deploy API on Radix
  uses: equinor/radix-github-actions@master
  with:
    args: >
      build-deploy
      --context playground
      -b ${GITHUB_REF##*/}
      -f
```

`--context playground` will communicate with playground cluster, if your application resides there.

```yaml
- name: List Radix apps in custom cluster
  uses: equinor/radix-github-actions@master
  env:
    APP_SERVICE_ACCOUNT_TOKEN: ${{ secrets.<the name of your secret holding token> }}
  with:
    args: >
      list applications
      --cluster <cluster-name>
      --api-environment <api-environment>
```

```yaml
- name: Set component environment secret
  uses: equinor/radix-github-actions@master
  with:
    args: >
      set environment-secret
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
    args: >
      get-config branch-environment
      -b ${GITHUB_REF##*/}
- name: Print the environment
  run: echo "${{ steps.getEnvironment.outputs.result }}"
```

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).
