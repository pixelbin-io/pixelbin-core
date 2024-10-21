"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scan = exports.generate = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
const transformation_utils_js_1 = require("../utils/transformation.utils.js");
/**
 * QRCode Plugin
 * @param {integer} width - Width* @param {integer} height - Height* @param {custom} image - Logo URL* @param {integer} margin - Margin around QR* @param {integer} qRTypeNumber - QR Type Number* @param {enum} qrErrorCorrectionLevel - QR Error Correction Level* @param {float} imageSize - Logo Size* @param {integer} imageMargin - Margin around Logo* @param {color} dotsColor - Dots Color* @param {enum} dotsType - Dots Type* @param {color} dotsBgColor - Dots Background Color* @param {color} cornerSquareColor - Corner Square Color* @param {enum} cornerSquareType - Corner Square Type* @param {color} cornerDotsColor - Corner Dots Color* @param {enum} cornerDotsType - Corner Dots Type
 * returns Transformation
 */
const generate = function (config = {
    width: 300,
    height: 300,
    image: "",
    margin: 0,
    qRTypeNumber: 0,
    qrErrorCorrectionLevel: "Q",
    imageSize: 0.4,
    imageMargin: 0,
    dotsColor: "000000",
    dotsType: "square",
    dotsBgColor: "ffffff",
    cornerSquareColor: "000000",
    cornerSquareType: "square",
    cornerDotsColor: "000000",
    cornerDotsType: "dot",
}) {
    const paramIdMap = {
        width: "w",
        height: "h",
        image: "i",
        margin: "m",
        qRTypeNumber: "qt",
        qrErrorCorrectionLevel: "qe",
        imageSize: "is",
        imageMargin: "im",
        dotsColor: "ds",
        dotsType: "dt",
        dotsBgColor: "bg",
        cornerSquareColor: "csc",
        cornerSquareType: "cst",
        cornerDotsColor: "cdc",
        cornerDotsType: "cdt",
    };
    const params = [
        "width",
        "height",
        "image",
        "margin",
        "qRTypeNumber",
        "qrErrorCorrectionLevel",
        "imageSize",
        "imageMargin",
        "dotsColor",
        "dotsType",
        "dotsBgColor",
        "cornerSquareColor",
        "cornerSquareType",
        "cornerDotsColor",
        "cornerDotsType",
    ].filter((param) => config.hasOwnProperty(param));
    const transformation = ["qr.generate", "("];
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
/**
* QRCode Plugin

* returns Transformation
*/
const scan = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["qr.scan", "("];
    params.map((param, idx) => {
        (0, transformation_utils_js_1.processParams)(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.scan = scan;
exports.default = {
    generate: exports.generate,
    scan: exports.scan,
};
