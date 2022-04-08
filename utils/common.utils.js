import { PDKInvalidUrlError } from "../errors/PixelbinErrors";

const version2Regex = /^v[1-2]$/;
const urlWithZone = /^\/(.*)\/([a-zA-Z0-9_-]{6})\/(.+)\/(.*)$/;
const urlWithoutZone = /\/(.*)\/(.+)\/(.*)/;

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
    if (urlWithZone.test(pathname)) {
        urlDetails["cloudName"] = parts.splice(1, 1)[0];
        urlDetails["zoneSlug"] = parts.splice(1, 1)[0];
        urlDetails["pattern"] = parts.splice(1, 1)[0];
        urlDetails["filePath"] = parts.slice(1).join("/");
    } else if (urlWithoutZone.test(pathname)) {
        urlDetails["cloudName"] = parts.splice(1, 1)[0];
        urlDetails["pattern"] = parts.splice(1, 1)[0];
        urlDetails["filePath"] = parts.slice(1).join("/");
    } else {
        throw new PDKInvalidUrlError("Invalid pixelbin url. Please make sure the url is correct.");
    }
    return urlDetails;
};

export { getUrlParts, version2Regex };
