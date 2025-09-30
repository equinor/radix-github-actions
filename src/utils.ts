import os from "node:os";
import * as core from "@actions/core";

import * as tc from "@actions/tool-cache";
import type { OsArch } from "./types";

export async function getUrl(version: string): Promise<string> {
    if (!version) {
        throw new Error("version is required");
    }
    if (version.startsWith("v")) {
        version = version.substring(1);
    }

    const filename = getDistFileName(version);
    return `https://github.com/equinor/radix-cli/releases/download/v${version}/${filename}`;
}

export async function getLatestVersion(githubToken: string): Promise<string> {
    const headers: HeadersInit = {};
    if (githubToken) {
        headers.Authorization = `Bearer ${githubToken}`;
    }

    const response = await fetch("https://api.github.com/repos/equinor/radix-cli/releases/latest", { headers });
    if (response.status === 403 || response.status === 429) {
        console.error("Rate limit exceeded when fetching latest version");
        console.error(`Please use "gh_token: \${{GITHUB_TOKEN}}" in your workflow to increase rate limit.`);
        process.exit(1);
    }

    if (response.status !== 200) {
        const body = await response.text();
        throw new Error(`Failed to get latest version from GitHub, status code: ${response.status}, body: ${body}`);
    }

    const releases = await response.json();
    return releases.tag_name;
}

function getDistFileName(version: string): string {
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
    switch (os.arch() as OsArch) {
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

export async function installRx(version: string, filename: string, githubToken: string): Promise<void> {
    // https://github.com/actions/toolkit/tree/main/packages/tool-cache

    let rxDir = tc.find("rx", version);
    if (!rxDir) {
        const headers: HeadersInit = {};
        if (githubToken) {
            headers.Authorization = `Bearer ${githubToken}`;
        }

        console.log("Download RX from", filename);
        const rxPathTar = await tc.downloadTool(filename, undefined, undefined, headers);
        const rxPath = await tc.extractTar(rxPathTar, "radix-cli-setup-folder");
        rxDir = await tc.cacheDir(rxPath, "rx", version);
    } else {
        console.log("Found RX in cache", rxDir);
    }
    core.addPath(rxDir);
}

export async function getOptions() {
    const args = core.getInput("args");
    if (args) {
        console.log(
            "Action input `args` is removed and not supported. Either pin your action to v1, or upgrade your GitHub Workflow file to use the new configuration. See the README for more details https://github.com/equinor/radix-github-actions",
        );
        process.exit(2);
    }

    const githubToken = core.getInput("gh_token");

    let version = core.getInput("version");
    if (!version || version.toLowerCase() === "latest" || version === "") {
        version = await getLatestVersion(githubToken);
    }

    const azureClientId = core.getInput("azure_client_id");
    const azureClientSecret = core.getInput("azure_client_secret");
    const githubAuth = !!azureClientId && !azureClientSecret;
    const authenticate = Boolean(!!azureClientId);

    return {
        version,
        authenticate,
        azureClientId,
        azureClientSecret,
        githubAuth,
        githubToken,
    };
}
