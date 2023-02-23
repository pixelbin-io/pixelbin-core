import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Watermark Detection Plugin
 * @param {boolean} detectText - Detect text
 * returns Transformation
 */
export const detect = function (config = {
    detectText: false,
}) {
    const paramIdMap = {
        detectText: "detect_text",
    };
    const params = ["detectText"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["wmc.detect", "("];
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
    detect,
};
