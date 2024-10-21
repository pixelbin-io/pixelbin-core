import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
* Video Upscaler Plugin

* returns Transformation
*/
export const upscale = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["vsr.upscale", "("];
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
    upscale,
};
