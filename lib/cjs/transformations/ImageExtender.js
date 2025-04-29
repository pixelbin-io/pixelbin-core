"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extend = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * AI Image Extender
 * @param {bbox} boundingBox - Bounding Box* @param {custom} prompt - Prompt* @param {integer} guidanceScale - Guidance Scale* @param {integer} numberOfInferenceSteps - Number of inference steps* @param {integer} seed - Seed
 * returns Transformation
 */
const extend = function (config = {
    boundingBox: null,
    prompt: "",
    guidanceScale: 30,
    numberOfInferenceSteps: 50,
    seed: 123,
}) {
    const paramIdMap = {
        boundingBox: "bbox",
        prompt: "p",
        guidanceScale: "gs",
        numberOfInferenceSteps: "nis",
        seed: "sd",
    };
    const params = [
        "boundingBox",
        "prompt",
        "guidanceScale",
        "numberOfInferenceSteps",
        "seed",
    ].filter((param) => config.hasOwnProperty(param));
    const transformation = ["bg.extend", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length &&
        transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.extend = extend;
exports.default = {
    extend: exports.extend,
};
