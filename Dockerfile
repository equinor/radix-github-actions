FROM docker.pkg.github.com/equinor/radix-cli/rx:latest

LABEL version="1.0.0"
LABEL repository="https://github.com/equinor/radix-github-actions"
LABEL homepage="https://github.com/equinor/radix-github-actions"
LABEL maintainer="Inge Knudsen <iknu@equinor.com>"

LABEL com.github.actions.name="Radix Command-Line Interface"
LABEL com.github.actions.description="Wraps Radix CLI to enable common commands."
LABEL com.github.actions.icon="triangle"
LABEL com.github.actions.color="purple"

COPY . .

ENTRYPOINT ["/entrypoint.sh"]
