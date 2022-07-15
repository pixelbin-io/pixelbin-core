"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderation = exports.detectLabels = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
/**
 * AWS Rekognition Plugin
 * @param {integer} maximumLabels - Maximum labels* @param {integer} minimumConfidence - Minimum confidence
 * returns Transformation
 */
const detectLabels = function (config = {
    maximumLabels: 5,
    minimumConfidence: 55,
}) {
    const paramIdMap = {
        maximumLabels: "l",
        minimumConfidence: "c",
    };
    const params = ["maximumLabels", "minimumConfidence"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["awsRek.detectLabels", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.detectLabels = detectLabels;
/**
 * AWS Rekognition Plugin
 * @param {integer} minimumConfidence - Minimum confidence
 * returns Transformation
 */
const moderation = function (config = {
    minimumConfidence: 55,
}) {
    const paramIdMap = {
        minimumConfidence: "c",
    };
    const params = ["minimumConfidence"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["awsRek.moderation", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.moderation = moderation;
exports.default = {
    detectLabels: exports.detectLabels,
    moderation: exports.moderation,
};
