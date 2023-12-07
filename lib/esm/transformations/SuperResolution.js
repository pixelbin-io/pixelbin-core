import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Super Resolution Module
 * @param {enum} type - Type* @param {boolean} enhanceFace - Enhance face* @param {enum} model - Model* @param {boolean} enhanceQuality - Enhance quality
 * returns Transformation
 */
export const upscale = function (config = {
    type: "2x",
    enhanceFace: false,
    model: "Picasso",
    enhanceQuality: false,
}) {
    const paramIdMap = {
        type: "t",
        enhanceFace: "enhance_face",
        model: "model",
        enhanceQuality: "enhance_quality",
    };
    const params = ["type", "enhanceFace", "model", "enhanceQuality"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["sr.upscale", "("];
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
