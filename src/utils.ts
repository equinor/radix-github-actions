import os from "node:os";
import * as core from "@actions/core";

import * as tc from "@actions/tool-cache";

export async function getUrl(version: string): Promise<string> {
    if (version.startsWith("v")) {
        // biome-ignore lint/style/noParameterAssign: we want to override the version
        version = version.substring(1);
    }

    const filename = getDistFileName(version);
    return `https://github.com/equinor/radix-cli/releases/download/v${version}/${filename}`;
}

export async function getLatestVersion(): Promise<string> {
    const releases = await fetch(
        "https://api.github.com/repos/equinor/radix-cli/releases/latest",
    ).then((res) => res.json());
    return releases.tag_name;
}

function getDistFileName(version: string): string {
    if (version.startsWith("v")) {
        // biome-ignore lint/style/noParameterAssign: we want to override the version
        version = version.substring(1);
    }
    const radixArch = getRadixType();
    const radixOs = getRadixOs();

    return `radix-cli_${version}_${radixOs}_${radixArch}.tar.gz`;
}

function getRadixOs() {
    switch (os.platform()) {
        case "linux":
            return "Linux";
        case "darwin":
            return "Darwin";
        case "win32":
            return "Windows";
        default:
            throw new Error(`Unexpected OS '${os.platform()}'`);
    }
}

function getRadixType() {
    switch (
        os.arch() as
            | "arm"
            | "arm64"
            | "ia32"
            | "loong64"
            | "mips"
            | "mipsel"
            | "ppc"
            | "ppc64"
            | "riscv64"
            | "s390"
            | "s390x"
            | "x64"
        ) {
        case "arm":
            return "armv6";
        case "arm64":
            return "arm64";
        case "x64":
            return "x86_64";
        case "ia32":
            return "i386";
        default:
            throw new Error(`Unexpected architecture '${os.arch()}'`);
    }
}

export async function installRx(version: string, filename: string) {
    // https://github.com/actions/toolkit/tree/main/packages/tool-cache

    let rxDir = tc.find("rx", version);
    if (!rxDir) {
        console.log("Download RX from", filename);
        const rxPathTar = await tc.downloadTool(filename);
        const rxPath = await tc.extractTar(rxPathTar, "radix-cli-setup-folder");
        rxDir = await tc.cacheDir(rxPath, "rx", version);
    } else {
        console.log("Found RX in cache", rxDir);
    }
    core.addPath(rxDir);
}


export async function getOptions() {
    let version = core.getInput("version");
    if (version.toLowerCase() === "latest" || version === "") {
        version = await getLatestVersion();
    }

    let skipAuth = false;
    if (core.getInput("skip_authenticate") !== "") {
        skipAuth = core.getBooleanInput("skip_authenticate");
    }

    const azureClientId = core.getInput("azure_client_id");
    const azureClientSecret = core.getInput("azure_client_secret");
    const githubAuth = !skipAuth && !azureClientSecret;
    return {version, authenticate: !skipAuth, azureClientId, azureClientSecret, githubAuth};
}
