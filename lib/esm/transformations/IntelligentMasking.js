import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Intelligent Masking
 * @param {file} replacementImage - Replacement image* @param {enum} detector - Detector* @param {enum} maskType - Mask type
 * returns Transformation
 */
export const mask = function (config = {
    replacementImage: "",
    detector: "number_plate",
    maskType: "fill_black",
}) {
    const paramIdMap = {
        replacementImage: "i",
        detector: "d",
        maskType: "m",
    };
    const params = ["replacementImage", "detector", "maskType"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["im.mask", "("];
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
    mask,
};
