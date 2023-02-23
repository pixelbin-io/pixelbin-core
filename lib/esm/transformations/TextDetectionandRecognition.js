import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * OCR Module
 * @param {boolean} detectOnly - Detect only
 * returns Transformation
 */
export const extract = function (config = {
    detectOnly: false,
}) {
    const paramIdMap = {
        detectOnly: "detect_only",
    };
    const params = ["detectOnly"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["ocr.extract", "("];
    params.map((param, idx) => {
        processParams(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
export default {
    extract,
};
