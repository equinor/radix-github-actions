import exec from "@actions/exec";

async function cleanup() {
	await exec.exec("rx", ["logout"]);
}

cleanup().catch((e) => {
	console.error(e);
	process.exit(1);
});
