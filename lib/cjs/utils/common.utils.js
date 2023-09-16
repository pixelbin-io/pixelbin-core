"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version2Regex = exports.getUrlParts = void 0;
const PixelbinErrors_1 = require("../errors/PixelbinErrors");
const regex_1 = require("./regex");
Object.defineProperty(exports, "version2Regex", { enumerable: true, get: function () { return regex_1.version2Regex; } });
const getUrlParts = function (pixelbinUrl, config) {
    const { protocol, host, pathname, search } = new URL(pixelbinUrl);
    const urlDetails = {
        protocol,
        host,
        search,
        version: "v1",
        worker: false,
        workerPath: "",
    };
    const parts = pathname.split("/");
    if (config.isCustomDomain) {
        // parsing custom domains url
        if (regex_1.version2Regex.test(parts[1])) {
            urlDetails["version"] = parts.splice(1, 1)[0];
        }
        else {
            throw new PixelbinErrors_1.PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
        }
        if (regex_1.customDomainRegex.urlWithWorkerAndZone.test(parts.join("/"))) {
            urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = "";
            urlDetails["filePath"] = "";
            urlDetails["worker"] = true;
            urlDetails["workerPath"] = parts.slice(2).join("/");
        }
        else if (regex_1.customDomainRegex.urlWithWorker.test(parts.join("/"))) {
            urlDetails["pattern"] = "";
            urlDetails["filePath"] = "";
            urlDetails["worker"] = true;
            urlDetails["workerPath"] = parts.slice(2).join("/");
        }
        else if (regex_1.customDomainRegex.urlWithZone.test(parts.join("/"))) {
            urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = parts.splice(1, 1)[0];
            urlDetails["filePath"] = parts.slice(1).join("/");
        }
        else if (regex_1.customDomainRegex.urlWithoutZone.test(parts.join("/"))) {
            urlDetails["pattern"] = parts.splice(1, 1)[0];
            urlDetails["filePath"] = parts.slice(1).join("/");
        }
        else {
            throw new PixelbinErrors_1.PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
        }
    }
    else {
        // parsing pixelbin urls
        if (regex_1.version2Regex.test(parts[1])) {
            urlDetails["version"] = parts.splice(1, 1)[0];
        }
        if (!parts[1] || parts[1].length < 3)
            throw new PixelbinErrors_1.PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
        if (regex_1.pixelbinDomainRegex.urlWithWorkerAndZone.test(parts.join("/"))) {
            urlDetails["cloudName"] = parts.splice(1, 1)[0];
            urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = "";
            urlDetails["filePath"] = "";
            urlDetails["worker"] = true;
            urlDetails["workerPath"] = parts.slice(2).join("/");
        }
        else if (regex_1.pixelbinDomainRegex.urlWithWorker.test(parts.join("/"))) {
            urlDetails["cloudName"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = "";
            urlDetails["filePath"] = "";
            urlDetails["worker"] = true;
            urlDetails["workerPath"] = parts.slice(2).join("/");
        }
        else if (regex_1.pixelbinDomainRegex.urlWithZone.test(parts.join("/"))) {
            urlDetails["cloudName"] = parts.splice(1, 1)[0];
            urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = parts.splice(1, 1)[0];
            urlDetails["filePath"] = parts.slice(1).join("/");
        }
        else if (regex_1.pixelbinDomainRegex.urlWithoutZone.test(parts.join("/"))) {
            urlDetails["cloudName"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = parts.splice(1, 1)[0];
            urlDetails["filePath"] = parts.slice(1).join("/");
        }
        else {
            throw new PixelbinErrors_1.PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
        }
    }
    return urlDetails;
};
exports.getUrlParts = getUrlParts;
