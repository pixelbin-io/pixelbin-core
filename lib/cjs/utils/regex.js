"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoneSlug = exports.customDomainRegex = exports.pixelbinDomainRegex = exports.version2Regex = void 0;
const version2Regex = /^v[1-2]$/;
exports.version2Regex = version2Regex;
const pixelbinDomainRegex = {
    urlWithZone: /^\/([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]{6})\/(.+)\/(.*)$/,
    urlWithoutZone: /^\/([a-zA-Z0-9_-]*)\/(.+)\/(.*)/,
    urlWithWorkerAndZone: /^\/([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]{6})\/wrkr\/(.*)$/,
    urlWithWorker: /^\/([a-zA-Z0-9_-]*)\/wrkr\/(.*)$/,
};
exports.pixelbinDomainRegex = pixelbinDomainRegex;
const customDomainRegex = {
    urlWithZone: /^\/([a-zA-Z0-9_-]{6})\/(.+)\/(.*)$/,
    urlWithoutZone: /^\/(.+)\/(.*)/,
    urlWithWorkerAndZone: /^\/([a-zA-Z0-9_-]{6})\/wrkr\/(.*)$/,
    urlWithWorker: /^\/wrkr\/(.*)$/,
};
exports.customDomainRegex = customDomainRegex;
const zoneSlug = /([a-zA-Z0-9_-]{6})/;
exports.zoneSlug = zoneSlug;
