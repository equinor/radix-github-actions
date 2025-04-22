import * as core from "@actions/core";
import exec from "@actions/exec";
import { getLatestVersion, getUrl, installRx } from "./utils";

async function run() {
	const authenticate = !core.getBooleanInput("skip_authenticate");
	const azureClientId = core.getInput("azure_client_id", {
		required: authenticate,
	});
	const azureClientSecret = core.getInput("azure_client_secret", {
		required: false,
	});
	const githubAuth = authenticate && !azureClientSecret;
	let version = core.getInput("version", { required: false }) || "latest";

	if (version.toLowerCase() === "latest" || version === "") {
		version = await getLatestVersion();
	}
	const rxUrl = await getUrl(version);

	console.log("Setup RX with config", {
		authenticate,
		version,
		rxUrl,
		azureClientId,
		githubAuth,
		azureClientSecret: azureClientSecret ? "configured" : "empty",
	});
	await installRx(version, rxUrl);

	if (authenticate) {
		if (azureClientSecret) {
			console.log("Authenticate with Azure Client ID and secret");
			await exec.exec("rx", [
				"login",
				"--azure-client-id",
				azureClientId,
				"--azure-client-secret",
				azureClientSecret,
			]);
		} else {
			console.log("Authenticate with GitHub Workload Identity");
			await exec.exec("rx", [
				"login",
				"--azure-client-id",
				azureClientId,
				"--use-github-credentials",
			]);
		}
	}
}

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
