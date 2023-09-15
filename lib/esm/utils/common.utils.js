import { PDKInvalidUrlError } from "../errors/PixelbinErrors";
import { version2Regex, pixelbinDomainRegex, customDomainRegex } from "./regex";
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
        if (version2Regex.test(parts[1])) {
            urlDetails["version"] = parts.splice(1, 1)[0];
        }
        else {
            throw new PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
        }
        if (customDomainRegex.urlWithWorkerAndZone.test(parts.join("/"))) {
            urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = "";
            urlDetails["filePath"] = "";
            urlDetails["worker"] = true;
            urlDetails["workerPath"] = parts.slice(2).join("/");
        }
        else if (customDomainRegex.urlWithWorker.test(parts.join("/"))) {
            urlDetails["pattern"] = "";
            urlDetails["filePath"] = "";
            urlDetails["worker"] = true;
            urlDetails["workerPath"] = parts.slice(2).join("/");
        }
        else if (customDomainRegex.urlWithZone.test(parts.join("/"))) {
            urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = parts.splice(1, 1)[0];
            urlDetails["filePath"] = parts.slice(1).join("/");
        }
        else if (customDomainRegex.urlWithoutZone.test(parts.join("/"))) {
            urlDetails["pattern"] = parts.splice(1, 1)[0];
            urlDetails["filePath"] = parts.slice(1).join("/");
        }
        else {
            throw new PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
        }
    }
    else {
        // parsing pixelbin urls
        if (version2Regex.test(parts[1])) {
            urlDetails["version"] = parts.splice(1, 1)[0];
        }
        if (!parts[1] || parts[1].length < 3)
            throw new PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
        if (pixelbinDomainRegex.urlWithWorkerAndZone.test(parts.join("/"))) {
            urlDetails["cloudName"] = parts.splice(1, 1)[0];
            urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = "";
            urlDetails["filePath"] = "";
            urlDetails["worker"] = true;
            urlDetails["workerPath"] = parts.slice(2).join("/");
        }
        else if (pixelbinDomainRegex.urlWithWorker.test(parts.join("/"))) {
            urlDetails["cloudName"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = "";
            urlDetails["filePath"] = "";
            urlDetails["worker"] = true;
            urlDetails["workerPath"] = parts.slice(2).join("/");
        }
        else if (pixelbinDomainRegex.urlWithZone.test(parts.join("/"))) {
            urlDetails["cloudName"] = parts.splice(1, 1)[0];
            urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = parts.splice(1, 1)[0];
            urlDetails["filePath"] = parts.slice(1).join("/");
        }
        else if (pixelbinDomainRegex.urlWithoutZone.test(parts.join("/"))) {
            urlDetails["cloudName"] = parts.splice(1, 1)[0];
            urlDetails["pattern"] = parts.splice(1, 1)[0];
            urlDetails["filePath"] = parts.slice(1).join("/");
        }
        else {
            throw new PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
        }
    }
    return urlDetails;
};
export { getUrlParts, version2Regex };
