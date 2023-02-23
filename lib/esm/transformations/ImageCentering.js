import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Image Centering Module
 * @param {integer} distancePercentage - Distance percentage
 * returns Transformation
 */
export const detect = function (config = {
    distancePercentage: 10,
}) {
    const paramIdMap = {
        distancePercentage: "dist_perc",
    };
    const params = ["distancePercentage"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["imc.detect", "("];
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
