"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detect = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * Image Centering Module
 * @param {integer} distancePercentage - Distance percentage
 * returns Transformation
 */
const detect = function (config = {
    distancePercentage: 10,
}) {
    const paramIdMap = {
        distancePercentage: "dist_perc",
    };
    const params = ["distancePercentage"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["imc.detect", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.detect = detect;
exports.default = {
    detect: exports.detect,
};
