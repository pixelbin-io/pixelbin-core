import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Calculates the percentage of the main object area relative to image dimensions.
 * @param {integer} objectThresholdPercent - Object threshold percent
 * returns Transformation
 */
export const detect = function (config = {
    objectThresholdPercent: 50,
}) {
    const paramIdMap = {
        objectThresholdPercent: "obj_threshold_perc",
    };
    const params = ["objectThresholdPercent"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["cos.detect", "("];
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
