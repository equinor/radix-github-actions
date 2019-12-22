FROM alpine

RUN echo "Version 0.0.10 of Radix CLI"
COPY install_radix_cli.sh install_radix_cli.sh
RUN sh install_radix_cli.sh

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["sh","/entrypoint.sh"]
