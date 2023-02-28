import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Intelligent Crop Plugin
 * @param {integer} requiredWidth - Required width* @param {integer} requiredHeight - Required height* @param {integer} paddingPercentage - Padding percentage* @param {boolean} maintainOriginalAspect - Maintain original aspect* @param {string} aspectRatio - Aspect Ratio (16_9 or 2 or 0.25)* @param {enum} gravityTowards - Gravity towards* @param {enum} preferredDirection - Preferred direction* @param {enum} objectType - Object Type (if Gravity is object)
 * returns Transformation
 */
export const crop = function (config = {
    requiredWidth: 0,
    requiredHeight: 0,
    paddingPercentage: 0,
    maintainOriginalAspect: false,
    aspectRatio: "",
    gravityTowards: "none",
    preferredDirection: "center",
    objectType: "person",
}) {
    const paramIdMap = {
        requiredWidth: "w",
        requiredHeight: "h",
        paddingPercentage: "p",
        maintainOriginalAspect: "ma",
        aspectRatio: "ar",
        gravityTowards: "g",
        preferredDirection: "d",
        objectType: "obj",
    };
    const params = [
        "requiredWidth",
        "requiredHeight",
        "paddingPercentage",
        "maintainOriginalAspect",
        "aspectRatio",
        "gravityTowards",
        "preferredDirection",
        "objectType",
    ].filter((param) => config.hasOwnProperty(param));
    const transformation = ["ic.crop", "("];
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
    crop,
};
