"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objToUrl = exports.urlToObj = void 0;
const transformation_utils_1 = require("./transformation.utils");
const config = {
    operationSeparator: "~",
    parameterSeparator: ",",
};
const urlToObj = function (url) {
    return (0, transformation_utils_1.getObjFromUrl)(url, config, false);
};
exports.urlToObj = urlToObj;
const generatePixelbinPattern = function (transformationList) {
    return (0, transformation_utils_1.getPatternFromTransformations)(transformationList, config);
};
const objToUrl = function (obj) {
    return (0, transformation_utils_1.getUrlFromObj)(obj, config);
};
exports.objToUrl = objToUrl;
