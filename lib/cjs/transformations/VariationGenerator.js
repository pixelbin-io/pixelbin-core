"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * AI Variation Generator
 * @param {custom} generateVariationPrompt - Generate variation prompt* @param {integer} noOfVariations - No. of variations* @param {integer} seed - Seed* @param {boolean} autoscale - Autoscale input if it exceeds maximum resolution
 * returns Transformation
 */
const generate = function (config = {
    generateVariationPrompt: "",
    noOfVariations: 1,
    seed: 0,
    autoscale: true,
}) {
    const paramIdMap = {
        generateVariationPrompt: "p",
        noOfVariations: "v",
        seed: "s",
        autoscale: "auto",
    };
    const params = ["generateVariationPrompt", "noOfVariations", "seed", "autoscale"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["vg.generate", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.generate = generate;
exports.default = {
    generate: exports.generate,
};
