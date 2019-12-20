FROM docker.pkg.github.com/equinor/radix-cli/rx:latest

COPY entrypoint.sh /entrypoint.sh
chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
