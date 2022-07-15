"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLabels = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
/**
 * Google Vision Plugin
 * @param {integer} maximumLabels - Maximum labels
 * returns Transformation
 */
const detectLabels = function (config = {
    maximumLabels: 5,
}) {
    const paramIdMap = {
        maximumLabels: "l",
    };
    const params = ["maximumLabels"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["googleVis.detectLabels", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.detectLabels = detectLabels;
exports.default = {
    detectLabels: exports.detectLabels,
};
