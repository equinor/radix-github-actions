/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 730:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const exec = __importStar(__nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/exec'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
const utils_1 = __nccwpck_require__(798);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const { version, authenticate, azureClientId, azureClientSecret, githubAuth, githubToken } = yield (0, utils_1.getOptions)();
        const rxUrl = yield (0, utils_1.getUrl)(version);
        console.log("Setup RX with config", {
            authenticate,
            version,
            rxUrl,
            azureClientId,
            githubAuth,
            azureClientSecret: azureClientSecret ? "<REDACTED>" : "",
            githubToken: githubToken ? "<REDACTED>" : "",
        });
        yield (0, utils_1.installRx)(version, rxUrl, githubToken);
        if (authenticate) {
            if (azureClientSecret) {
                console.log("Authenticate with Azure Client ID and secret");
                yield exec.exec("rx", [
                    "login",
                    "--azure-client-id",
                    azureClientId,
                    "--azure-client-secret",
                    azureClientSecret,
                ]);
            }
            else {
                console.log("Authenticate with GitHub Workload Identity");
                yield exec.exec("rx", ["login", "--azure-client-id", azureClientId, "--use-github-credentials"]);
            }
        }
    });
}
run().catch((e) => {
    console.error(e);
    process.exit(1);
});


/***/ }),

/***/ 798:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUrl = getUrl;
exports.getLatestVersion = getLatestVersion;
exports.installRx = installRx;
exports.getOptions = getOptions;
const node_os_1 = __importDefault(__nccwpck_require__(161));
const core = __importStar(__nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
const tc = __importStar(__nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/tool-cache'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
function getUrl(version) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!version) {
            throw new Error("version is required");
        }
        if (version.startsWith("v")) {
            version = version.substring(1);
        }
        const filename = getDistFileName(version);
        return `https://github.com/equinor/radix-cli/releases/download/v${version}/${filename}`;
    });
}
function getLatestVersion(githubToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {};
        if (githubToken) {
            headers.Authorization = `Bearer ${githubToken}`;
        }
        const response = yield fetch("https://api.github.com/repos/equinor/radix-cli/releases/latest", { headers });
        if (response.status === 403 || response.status === 429) {
            console.error("Rate limit exceeded when fetching latest version");
            console.error(`Please use "gh_token: \${{GITHUB_TOKEN}}" in your workflow to increase rate limit.`);
            process.exit(1);
        }
        if (response.status !== 200) {
            const body = yield response.text();
            throw new Error(`Failed to get latest version from GitHub, status code: ${response.status}, body: ${body}`);
        }
        const releases = yield response.json();
        return releases.tag_name;
    });
}
function getDistFileName(version) {
    const radixArch = getRadixType();
    const radixOs = getRadixOs();
    return `radix-cli_${version}_${radixOs}_${radixArch}.tar.gz`;
}
function getRadixOs() {
    switch (node_os_1.default.platform()) {
        case "linux":
            return "Linux";
        case "darwin":
            return "Darwin";
        case "win32":
            return "Windows";
        default:
            throw new Error(`Unexpected OS '${node_os_1.default.platform()}'`);
    }
}
function getRadixType() {
    switch (node_os_1.default.arch()) {
        case "arm":
            return "armv6";
        case "arm64":
            return "arm64";
        case "x64":
            return "x86_64";
        case "ia32":
            return "i386";
        default:
            throw new Error(`Unexpected architecture '${node_os_1.default.arch()}'`);
    }
}
function installRx(version, filename, githubToken) {
    return __awaiter(this, void 0, void 0, function* () {
        // https://github.com/actions/toolkit/tree/main/packages/tool-cache
        let rxDir = tc.find("rx", version);
        if (!rxDir) {
            const headers = {};
            if (githubToken) {
                headers.Authorization = `Bearer ${githubToken}`;
            }
            console.log("Download RX from", filename);
            const rxPathTar = yield tc.downloadTool(filename, undefined, undefined, headers);
            const rxPath = yield tc.extractTar(rxPathTar, "radix-cli-setup-folder");
            rxDir = yield tc.cacheDir(rxPath, "rx", version);
        }
        else {
            console.log("Found RX in cache", rxDir);
        }
        core.addPath(rxDir);
    });
}
function getOptions() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = core.getInput("args");
        if (args) {
            console.log("Action input `args` is removed and not supported. Either pin your action to v1, or upgrade your GitHub Workflow file to use the new configuration. See the README for more details https://github.com/equinor/radix-github-actions");
            process.exit(2);
        }
        const githubToken = core.getInput("gh_token");
        let version = core.getInput("version");
        if (!version || version.toLowerCase() === "latest" || version === "") {
            version = yield getLatestVersion(githubToken);
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
    });
}


/***/ }),

/***/ 161:
/***/ ((module) => {

module.exports = require("node:os");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(730);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;