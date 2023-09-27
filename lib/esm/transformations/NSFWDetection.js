import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Detect NSFW content in images
 * @param {float} minimumConfidence - Minimum confidence
 * returns Transformation
 */
export const detect = function (config = {
    minimumConfidence: 0.5,
}) {
    const paramIdMap = {
        minimumConfidence: "m",
    };
    const params = ["minimumConfidence"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["nsfw.detect", "("];
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
