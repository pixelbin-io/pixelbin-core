"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upscale = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
/**
 * Super Resolution Module
 * @param {enum} type - Type
 * returns Transformation
 */
const upscale = function (config = {
    type: "2x",
}) {
    const paramIdMap = {
        type: "t",
    };
    const params = ["type"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["sr.upscale", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.upscale = upscale;
exports.default = {
    upscale: exports.upscale,
};
