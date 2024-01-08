"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bg = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * AI Background Generator
 * @param {custom} backgroundPrompt - Background prompt* @param {file} backgroundImageForShadow - Background image for shadow* @param {enum} focus - Focus* @param {custom} negativePrompt - Negative prompt* @param {integer} seed - Seed
 * returns Transformation
 */
const bg = function (config = {
    backgroundPrompt: "YSBmb3Jlc3QgZnVsbCBvZiBvYWsgdHJlZXMsd2l0aCBicmlnaHQgbGlnaHRzLCBzdW4gYW5kIGEgbG90IG9mIG1hZ2ljLCB1bHRyYSByZWFsaXN0aWMsIDhr",
    backgroundImageForShadow: "",
    focus: "Product",
    negativePrompt: "",
    seed: 123,
}) {
    const paramIdMap = {
        backgroundPrompt: "p",
        backgroundImageForShadow: "i",
        focus: "f",
        negativePrompt: "np",
        seed: "s",
    };
    const params = [
        "backgroundPrompt",
        "backgroundImageForShadow",
        "focus",
        "negativePrompt",
        "seed",
    ].filter((param) => config.hasOwnProperty(param));
    const transformation = ["generate.bg", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.bg = bg;
exports.default = {
    bg: exports.bg,
};
