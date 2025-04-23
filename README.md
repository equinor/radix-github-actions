# GitHub Action for Radix CLI

This Action for [Radix CLI](https://github.com/equinor/radix-cli) to integrate with the Radix platform from a GitHub Action workflow.

## Contribution

Want to contribute? Read our [contributing guidelines](./CONTRIBUTING.md)

## Usage

This Action will install `rx` into your workflow and optionally authenticate against Radix. 

Arguments:
- `version`: The version of `rx` to install. If not specified, the latest version will be installed.
- `azure_client_id`: The Azure client ID of the service principal to use for authentication.
- `azure_client_secret`: The Azure client secret of the service principal to use for authentication. 

Note: If `azure_client_id` is not set the action will not authenticate against Radix.

### GitHub Workload Identity / Federated Credentials

If you are using [GitHub Workload Identity](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-github-workload-identity) to authenticate against Azure, you need to set the `azure_client_id` input parameter and leave the `azure_client_secret`  empty.

When the `azure_client_secret` is blank, we default to signing in using GitHub workload identity.

See the second example below for a complete example.

### Examples:

```yaml
name: Validate Radix Config

on:
  workflow_dispatch:
     
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - uses: equinor/radix-github-actions@v2
    - run: rx validate radix-config
```

```yaml
name: Deploy on Radix # Authenticate with Federated Credentials

on:
  workflow_dispatch:

permissions:
  contents: read
  id-token: write # required to get a GitHub federated credential

jobs:

  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
      
    - uses: equinor/radix-github-actions@v2
      with:
        azure_client_id: "00000000-0000-0000-0000-000000000000"
        
    - run: rx create pipeline-job deploy
       --application application-name
       --environment qa
       --follow # `--follow` will ensure that the action step is followed, and won't continue until step is complete.
       #--context platform,platform2 or playground
```

```yaml
name: Deploy on Radix # Authenticate with Client Secret

on:
  workflow_dispatch:

jobs:

  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
      
    - uses: equinor/radix-github-actions@github-login
      with:
        azure_client_id: "00000000-0000-0000-0000-000000000000"
        azure_client_secret: ${{ secrets.AZURE_CLIENT_SECRET }}
        
    - run: rx create pipeline-job deploy
       --environment qa
       --follow 
       --from-config # will read information such as application-name, branch mapping etc from your radixconfig.yaml
```

```yaml
name: Configure secret # Authenticate with Federated Credentials

on:
   workflow_dispatch:

permissions:
   contents: read
   id-token: write # required to get a GitHub federated credential

jobs:
   update-secret:
      runs-on: ubuntu-latest
      steps:
         - uses: actions/checkout@v4

         - uses: equinor/radix-github-actions@v2
           with:
              azure_client_id: "00000000-0000-0000-0000-000000000000"

         - run: rx set environment-secret
               --from-config
               --environment prod
               --component backend
               --secret <your secret name>
               --value '<your secret value>'
```

```yaml
name: Get environment from branch mapping in Radix config for repository

on:
   workflow_dispatch:

jobs:

   get-environment:
      runs-on: ubuntu-latest
      steps:
         - uses: actions/checkout@v4

         - uses: equinor/radix-github-actions@v2

         - id: getEnvironment
           run: rx get config branch-environment 
                --from-config
                --branch ${GITHUB_REF##*/}
                > env.txt

         - name: Print the environment
           run: cat env.txt
```

## Development

We must run `npm run build` before commiting to ensure that the `lib` folder is up to date.

## Release

Tag a new version in the format `vX.Y.Z` and push it to the repository. 

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).

## Security

This is how we handle [security issues](./SECURITY.md)
