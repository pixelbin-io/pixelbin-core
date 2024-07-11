import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * EraseBG Background Removal Module
 * @param {enum} industryType - Foreground Type* @param {boolean} addShadow - Add Shadow (cars only)* @param {boolean} refine - Refine Output
 * returns Transformation
 */
export const bg = function (config = {
    industryType: "general",
    addShadow: false,
    refine: true,
}) {
    const paramIdMap = {
        industryType: "i",
        addShadow: "shadow",
        refine: "r",
    };
    const params = ["industryType", "addShadow", "refine"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["erase.bg", "("];
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
