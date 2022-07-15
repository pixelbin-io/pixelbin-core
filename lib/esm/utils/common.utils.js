import { PDKInvalidUrlError } from "../errors/PixelbinErrors";
import { version2Regex, urlWithZone, urlWithoutZone } from "./regex";
const getUrlParts = function (pixelbinUrl) {
    const { protocol, host, pathname, search } = new URL(pixelbinUrl);
    const urlDetails = {
        protocol,
        host,
        search,
        version: "v1",
    };
    const parts = pathname.split("/");
    if (version2Regex.test(parts[1])) {
        urlDetails["version"] = parts.splice(1, 1)[0];
    }
    if (parts[1].length < 3)
        throw new PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
    if (urlWithZone.test(parts.join("/"))) {
        urlDetails["cloudName"] = parts.splice(1, 1)[0];
        urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
        urlDetails["pattern"] = parts.splice(1, 1)[0];
        urlDetails["filePath"] = parts.slice(1).join("/");
    }
    else if (urlWithoutZone.test(parts.join("/"))) {
        urlDetails["cloudName"] = parts.splice(1, 1)[0];
        urlDetails["pattern"] = parts.splice(1, 1)[0];
        urlDetails["filePath"] = parts.slice(1).join("/");
    }
    else {
        throw new PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
    }
    return urlDetails;
};
export { getUrlParts, version2Regex };
