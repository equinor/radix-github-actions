import * as exec from "@actions/exec";
import { getOptions, getUrl, installRx } from "./utils";

async function run() {
	const envVars = Object.keys(process.env);
	console.log("Environment variables:", envVars);

	const {
		version,
		authenticate,
		azureClientId,
		azureClientSecret,
		githubAuth,
	} = await getOptions();
	const rxUrl = await getUrl(version);

	console.log("Setup RX with config", {
		authenticate,
		version,
		rxUrl,
		azureClientId,
		githubAuth,
		azureClientSecret: azureClientSecret ? "<REDACTED>" : "",
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
