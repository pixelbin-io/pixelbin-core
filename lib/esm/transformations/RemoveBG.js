import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
* Remove background from any image

* returns Transformation
*/
export const bg = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["remove.bg", "("];
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
    bg,
};
