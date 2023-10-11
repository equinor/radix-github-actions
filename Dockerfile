FROM alpine:3.18 as builder
ARG RX_VERSION="1.9.0"
RUN apk add --update curl
RUN wget "https://github.com/equinor/radix-cli/releases/download/v${RX_VERSION}/radix-cli_${RX_VERSION}_Linux_x86_64.tar.gz"
RUN tar zxvf $(readlink -f radix-cli_*_Linux_x86_64.tar.gz) 1>/dev/null

FROM alpine:3.18
COPY --from=builder /rx /usr/local/bin/rx
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["sh","/entrypoint.sh"]
