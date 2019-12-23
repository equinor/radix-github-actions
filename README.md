# GitHub Action for Radix CLI

This Action for [Radix CLI](https://github.com/equinor/radix-cli) to integrate with the Radix platform from a github action workflow.

## Usage

This Action can be used to run any `rx` command. The run make some assumptions:

- There is a Radix config file in the repository that it can use as input (--from-config in radix-cli is set as argument on the action)
- There is a defined environment variable set `APP_SERVICE_ACCOUNT_TOKEN`, with the token of the service account provided to administer the application

Examples:

```yaml
- name: Build Radix app in prod
  uses: equinor/radix-github-actions@master
  env:
    APP_SERVICE_ACCOUNT_TOKEN: ${{ secrets.<the name of your secret holding the service account token in production for the application> }}
  with:
    args: "build -b master"
```

```yaml
- name: Build Radix app in playground
  uses: equinor/radix-github-actions@master
  env:
    APP_SERVICE_ACCOUNT_TOKEN: ${{ secrets.<the name of your secret holding the service account token in playground for the application> }}
  with:
    args: "build -c playground -b master"
```

```yaml
- name: List Radix apps in custom cluster
  uses: equinor/radix-github-actions@master
  env:
    APP_SERVICE_ACCOUNT_TOKEN: ${{ secrets.<the name of your secret holding the service account token in custom cluster for the application> }}
  with:
    args: "list applications --cluster <cluster-name> --environment <api-environment>"
```

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).
