"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
/**
* Watermark Removal Plugin

* returns Transformation
*/
const remove = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["wm.remove", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.remove = remove;
exports.default = {
    remove: exports.remove,
};
