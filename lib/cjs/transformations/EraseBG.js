"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bg = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * EraseBG Background Removal Module
 * @param {enum} industryType - Industry type* @param {boolean} addShadow - Add Shadow (cars only)
 * returns Transformation
 */
const bg = function (config = {
    industryType: "general",
    addShadow: false,
}) {
    const paramIdMap = {
        industryType: "i",
        addShadow: "shadow",
    };
    const params = ["industryType", "addShadow"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["erase.bg", "("];
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
