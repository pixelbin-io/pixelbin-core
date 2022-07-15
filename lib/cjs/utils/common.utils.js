"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version2Regex = exports.getUrlParts = void 0;
const PixelbinErrors_1 = require("../errors/PixelbinErrors");
const regex_1 = require("./regex");
Object.defineProperty(exports, "version2Regex", { enumerable: true, get: function () { return regex_1.version2Regex; } });
const getUrlParts = function (pixelbinUrl) {
    const { protocol, host, pathname, search } = new URL(pixelbinUrl);
    const urlDetails = {
        protocol,
        host,
        search,
        version: "v1",
    };
    const parts = pathname.split("/");
    if (regex_1.version2Regex.test(parts[1])) {
        urlDetails["version"] = parts.splice(1, 1)[0];
    }
    if (parts[1].length < 3)
        throw new PixelbinErrors_1.PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
    if (regex_1.urlWithZone.test(parts.join("/"))) {
        urlDetails["cloudName"] = parts.splice(1, 1)[0];
        urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
        urlDetails["pattern"] = parts.splice(1, 1)[0];
        urlDetails["filePath"] = parts.slice(1).join("/");
    }
    else if (regex_1.urlWithoutZone.test(parts.join("/"))) {
        urlDetails["cloudName"] = parts.splice(1, 1)[0];
        urlDetails["pattern"] = parts.splice(1, 1)[0];
        urlDetails["filePath"] = parts.slice(1).join("/");
    }
    else {
        throw new PixelbinErrors_1.PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
    }
    return urlDetails;
};
exports.getUrlParts = getUrlParts;
