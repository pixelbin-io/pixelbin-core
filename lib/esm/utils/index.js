import { getObjFromUrl, getUrlFromObj, getPatternFromTransformations, } from "./transformation.utils";
const config = {
    operationSeparator: "~",
    parameterSeparator: ",",
};
const urlToObj = function (url) {
    return getObjFromUrl(url, config, false);
};
const generatePixelbinPattern = function (transformationList) {
    return getPatternFromTransformations(transformationList, config);
};
const objToUrl = function (obj) {
    return getUrlFromObj(obj, config);
};
export { urlToObj, objToUrl };
