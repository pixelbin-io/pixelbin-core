import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
* Classifies wear type and view type of products in the image

* returns Transformation
*/
export const detect = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["vd.detect", "("];
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
