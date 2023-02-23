"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crop = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * Intelligent Crop Plugin
 * @param {integer} requiredWidth - Required width* @param {integer} requiredHeight - Required height* @param {integer} paddingPercentage - Padding percentage* @param {boolean} maintainOriginalAspect - Maintain original aspect* @param {string} aspectRatio - Aspect Ratio (16_9 or 2 or 0.25)* @param {enum} gravityTowards - Gravity towards* @param {enum} preferredDirection - Preferred direction* @param {enum} objectType - Object Type (if Gravity is object)
 * returns Transformation
 */
const crop = function (config = {
    requiredWidth: 0,
    requiredHeight: 0,
    paddingPercentage: 0,
    maintainOriginalAspect: false,
    aspectRatio: "",
    gravityTowards: "none",
    preferredDirection: "center",
    objectType: "person",
}) {
    const paramIdMap = {
        requiredWidth: "w",
        requiredHeight: "h",
        paddingPercentage: "p",
        maintainOriginalAspect: "ma",
        aspectRatio: "ar",
        gravityTowards: "g",
        preferredDirection: "d",
        objectType: "obj",
    };
    const params = [
        "requiredWidth",
        "requiredHeight",
        "paddingPercentage",
        "maintainOriginalAspect",
        "aspectRatio",
        "gravityTowards",
        "preferredDirection",
        "objectType",
    ].filter((param) => config.hasOwnProperty(param));
    const transformation = ["ic.crop", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.crop = crop;
exports.default = {
    crop: exports.crop,
};
