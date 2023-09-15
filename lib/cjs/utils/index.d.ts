export type urlToObjResult = {
    /**
     * - Base path of the URL. Example: "https://cdn.pixelbin.io".
     */
    baseURL: string;
    /**
     * - Path to the file on Pixelbin. Example: "__playground/playground-default.jpeg".
     */
    filePath: string;
    /**
     * - Version of the URL. Currently supports "v1" and "v2".
     */
    version: string;
    /**
     * - Cloud name from the URL.
     */
    cloudName: string;
    /**
     * - A list of transformation objects.
     */
    transformations: any[];
    /**
     * - Zone slug from the URL.
     */
    zone: string;
    /**
     * - Transformation pattern extracted from the URL.
     */
    pattern: string;
    /**
     * - Indicates if the URL is a URL Translation Worker URL.
     */
    worker: boolean;
    /**
     * - Input path to a URL Translation Worker.
     */
    workerPath: string;
    /**
     * - Query parameters added, such as "dpr" and "f_auto".
     */
    options: any;
};
export type objToUrlInput = {
    /**
     * - Base path of the URL. Example: "https://cdn.pixelbin.io".
     */
    baseURL: string;
    /**
     * - Indicates if the URL belongs to a custom domain.
     */
    isCustomDomain: boolean;
    /**
     * - Version of the URL. Currently supports "v1" and "v2".
     */
    version: string;
    /**
     * - Cloud name of the org.
     */
    cloudName: string | null;
    /**
     * - Zone slug of the zone.
     */
    zone: string | null;
    /**
     * - Transformation pattern extracted from the URL.
     */
    pattern: string;
    /**
     * - Path to the file on Pixelbin. Example: "__playground/playground-default.jpeg".
     */
    filePath: string;
    /**
     * - A list of transformation objects.
     */
    transformations: any[];
    /**
     * - Indicates if the URL is a URL Translation Worker URL.
     */
    worker: boolean;
    /**
     * - Input path to a URL Translation Worker.
     */
    workerPath: string;
    /**
     * - Query parameters added, such as "dpr" and "f_auto".
     */
    options: any;
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
export function urlToObj(url: string, opts?: {
    isCustomDomain: boolean;
}): urlToObjResult;
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
export function objToUrl(obj: objToUrlInput): string;
