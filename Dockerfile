FROM alpine
COPY install_radix_cli.sh /install_radix_cli.sh
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["sh","/entrypoint.sh"]