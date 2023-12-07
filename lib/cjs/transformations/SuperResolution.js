"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upscale = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * Super Resolution Module
 * @param {enum} type - Type* @param {boolean} enhanceFace - Enhance face* @param {enum} model - Model* @param {boolean} enhanceQuality - Enhance quality
 * returns Transformation
 */
const upscale = function (config = {
    type: "2x",
    enhanceFace: false,
    model: "Picasso",
    enhanceQuality: false,
}) {
    const paramIdMap = {
        type: "t",
        enhanceFace: "enhance_face",
        model: "model",
        enhanceQuality: "enhance_quality",
    };
    const params = ["type", "enhanceFace", "model", "enhanceQuality"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["sr.upscale", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.upscale = upscale;
exports.default = {
    upscale: exports.upscale,
};
