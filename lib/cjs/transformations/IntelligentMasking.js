"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mask = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * Intelligent Masking
 * @param {file} replacementImage - Replacement image* @param {enum} detector - Detector* @param {enum} maskType - Mask type
 * returns Transformation
 */
const mask = function (config = {
    replacementImage: "",
    detector: "number_plate",
    maskType: "fill_black",
}) {
    const paramIdMap = {
        replacementImage: "i",
        detector: "d",
        maskType: "m",
    };
    const params = ["replacementImage", "detector", "maskType"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["im.mask", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.mask = mask;
exports.default = {
    mask: exports.mask,
};
