import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * AI Image Extender
 * @param {bbox} boundingBox - Bounding Box* @param {custom} prompt - Prompt* @param {custom} negativePrompt - Negative Prompt* @param {float} strength - Strength* @param {integer} guidanceScale - Guidance Scale* @param {integer} numberOfInferenceSteps - Number of inference steps* @param {boolean} colorAdjust - Color Adjust* @param {integer} seed - Seed
 * returns Transformation
 */
export const extend = function (config = {
    boundingBox: null,
    prompt: "",
    negativePrompt: "",
    strength: 0.999,
    guidanceScale: 8,
    numberOfInferenceSteps: 10,
    colorAdjust: false,
    seed: 123,
}) {
    const paramIdMap = {
        boundingBox: "bbox",
        prompt: "p",
        negativePrompt: "np",
        strength: "s",
        guidanceScale: "gs",
        numberOfInferenceSteps: "nis",
        colorAdjust: "ca",
        seed: "sd",
    };
    const params = [
        "boundingBox",
        "prompt",
        "negativePrompt",
        "strength",
        "guidanceScale",
        "numberOfInferenceSteps",
        "colorAdjust",
        "seed",
    ].filter((param) => config.hasOwnProperty(param));
    const transformation = ["bg.extend", "("];
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
    extend,
};
