import { getObjFromUrl, getUrlFromObj, getPatternFromTransformations, } from "./transformation.utils";
const config = {
    operationSeparator: "~",
    parameterSeparator: ",",
};
/**
@typedef {Object} urlToObjResult
@property {string} baseURL - Base path of the URL. Example: "https://cdn.pixelbin.io".
@property {string} filePath - Path to the file on Pixelbin. Example: "__playground/playground-default.jpeg".
@property {string} version - Version of the URL. Currently supports "v1" and "v2".
@property {string} cloudName - Cloud name from the URL.
@property {Object[]} transformations - A list of transformation objects.
@property {string} zone - Zone slug from the URL.
@property {string} pattern - Transformation pattern extracted from the URL.
@property {boolean} worker - Indicates if the URL is a URL Translation Worker URL.
@property {string} workerPath - Input path to a URL Translation Worker.
@property {Object} options - Query parameters added, such as "dpr" and "f_auto".
*/
/**
Converts a URL to an object representation.
@param {string} url - The URL to be converted.
@param {Object} opts - Options for the conversion (default: { isCustomDomain: false }).
@param {boolean} opts.isCustomDomain - Indicates if the URL belongs to a custom domain (default: false).
@returns {urlToObjResult} - The object representation of the URL.
*/
const urlToObj = function (url, opts = { isCustomDomain: false }) {
    return getObjFromUrl(url, {
        operationSeparator: config.operationSeparator,
        parameterSeparator: config.parameterSeparator,
        isCustomDomain: opts.isCustomDomain,
    }, false);
};
const generatePixelbinPattern = function (transformationList) {
    return getPatternFromTransformations(transformationList, config);
};
/**
@typedef {Object} objToUrlInput
@property {string} baseURL - Base path of the URL. Example: "https://cdn.pixelbin.io".
@property {boolean} isCustomDomain - Indicates if the URL belongs to a custom domain.
@property {string} version - Version of the URL. Currently supports "v1" and "v2".
@property {string | null} cloudName - Cloud name of the org.
@property {string | null} zone - Zone slug of the zone.
@property {string} pattern - Transformation pattern extracted from the URL.
@property {string} filePath - Path to the file on Pixelbin. Example: "__playground/playground-default.jpeg".
@property {Object[]} transformations - A list of transformation objects.
@property {boolean} worker - Indicates if the URL is a URL Translation Worker URL.
@property {string} workerPath - Input path to a URL Translation Worker.
@property {Object} options - Query parameters added, such as "dpr" and "f_auto".
*/
/**
Converts an object to a URL representation.
@param {objToUrlInput} obj - The object to be converted.
@returns {string} - The URL representation of the object.
*/
const objToUrl = function (obj) {
    return getUrlFromObj(obj, config);
};
export { urlToObj, objToUrl };
