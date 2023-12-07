const version2Regex = /^v[1-2]$/;
const pixelbinDomainRegex = {
    urlWithZone: /^\/([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]{6})\/(.+)\/(.*)$/,
    urlWithoutZone: /^\/([a-zA-Z0-9_-]*)\/(.+)\/(.*)/,
    urlWithWorkerAndZone: /^\/([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]{6})\/wrkr\/(.*)$/,
    urlWithWorker: /^\/([a-zA-Z0-9_-]*)\/wrkr\/(.*)$/,
};
const customDomainRegex = {
    urlWithZone: /^\/([a-zA-Z0-9_-]{6})\/(.+)\/(.*)$/,
    urlWithoutZone: /^\/(.+)\/(.*)/,
    urlWithWorkerAndZone: /^\/([a-zA-Z0-9_-]{6})\/wrkr\/(.*)$/,
    urlWithWorker: /^\/wrkr\/(.*)$/,
};
const zoneSlug = /([a-zA-Z0-9_-]{6})/;
export { version2Regex, pixelbinDomainRegex, customDomainRegex, zoneSlug };
