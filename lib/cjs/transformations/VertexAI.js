"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upscale = exports.removeBG = exports.generateBG = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * Vertex AI based transformations
 * @param {custom} backgroundPrompt - Background prompt* @param {custom} negativePrompt - Negative prompt* @param {integer} seed - Seed* @param {integer} guidanceScale - Guidance Scale (controls how much the model adheres to the text prompt)
 * returns Transformation
 */
const generateBG = function (config = {
    backgroundPrompt: "YSBmb3Jlc3QgZnVsbCBvZiBvYWsgdHJlZXMsd2l0aCBicmlnaHQgbGlnaHRzLCBzdW4gYW5kIGEgbG90IG9mIG1hZ2ljLCB1bHRyYSByZWFsaXN0aWMsIDhr",
    negativePrompt: "",
    seed: 22,
    guidanceScale: 60,
}) {
    const paramIdMap = {
        backgroundPrompt: "p",
        negativePrompt: "np",
        seed: "s",
        guidanceScale: "gs",
    };
    const params = ["backgroundPrompt", "negativePrompt", "seed", "guidanceScale"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["vertexAi.generateBG", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.generateBG = generateBG;
/**
* Vertex AI based transformations

* returns Transformation
*/
const removeBG = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["vertexAi.removeBG", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.removeBG = removeBG;
/**
 * Vertex AI based transformations
 * @param {enum} type - Type
 * returns Transformation
 */
const upscale = function (config = {
    type: "x2",
}) {
    const paramIdMap = {
        type: "t",
    };
    const params = ["type"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["vertexAi.upscale", "("];
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
    generateBG: exports.generateBG,
    removeBG: exports.removeBG,
    upscale: exports.upscale,
};
