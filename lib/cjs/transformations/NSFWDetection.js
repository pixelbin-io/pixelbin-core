"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detect = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * Detect NSFW content in images
 * @param {float} minimumConfidence - Minimum confidence
 * returns Transformation
 */
const detect = function (config = {
    minimumConfidence: 0.5,
}) {
    const paramIdMap = {
        minimumConfidence: "m",
    };
    const params = ["minimumConfidence"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["nsfw.detect", "("];
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
