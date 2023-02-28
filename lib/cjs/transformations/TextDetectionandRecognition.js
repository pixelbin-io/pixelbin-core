"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * OCR Module
 * @param {boolean} detectOnly - Detect only
 * returns Transformation
 */
const extract = function (config = {
    detectOnly: false,
}) {
    const paramIdMap = {
        detectOnly: "detect_only",
    };
    const params = ["detectOnly"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["ocr.extract", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.extract = extract;
exports.default = {
    extract: exports.extract,
};
