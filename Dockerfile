# FROM docker.pkg.github.com/equinor/radix-cli/rx:latest
FROM ingeknudsen/rx

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
