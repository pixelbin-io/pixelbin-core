const version2Regex = /^v[1-2]$/;
const urlWithZone = /^\/([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]{6})\/(.+)\/(.*)$/;
const urlWithoutZone = /\/([a-zA-Z0-9_-]*)\/(.+)\/(.*)/;
const zoneSlug = /([a-zA-Z0-9_-]{6})/;
export { version2Regex, urlWithZone, urlWithoutZone, zoneSlug };
