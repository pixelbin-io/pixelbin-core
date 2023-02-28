import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Detect content and text in images
 * @param {integer} maximumLabels - Maximum labels
 * returns Transformation
 */
export const detectLabels = function (config = {
    maximumLabels: 5,
}) {
    const paramIdMap = {
        maximumLabels: "l",
    };
    const params = ["maximumLabels"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["googleVis.detectLabels", "("];
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
    detectLabels,
};
