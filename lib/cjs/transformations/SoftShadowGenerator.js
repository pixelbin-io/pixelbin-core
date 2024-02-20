"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * AI Soft Shadow Generator
 * @param {file} backgroundImage - Background image* @param {color} backgroundColor - Background color* @param {float} shadowAngle - Shadow angle* @param {float} shadowIntensity - Shadow intensity
 * returns Transformation
 */
const gen = function (config = {
    backgroundImage: null,
    backgroundColor: "ffffff",
    shadowAngle: 120,
    shadowIntensity: 0.5,
}) {
    const paramIdMap = {
        backgroundImage: "bgi",
        backgroundColor: "bgc",
        shadowAngle: "a",
        shadowIntensity: "i",
    };
    const params = ["backgroundImage", "backgroundColor", "shadowAngle", "shadowIntensity"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["shadow.gen", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.gen = gen;
exports.default = {
    gen: exports.gen,
};
