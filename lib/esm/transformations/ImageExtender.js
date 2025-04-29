import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * AI Image Extender
 * @param {bbox} boundingBox - Bounding Box* @param {custom} prompt - Prompt* @param {integer} guidanceScale - Guidance Scale* @param {integer} numberOfInferenceSteps - Number of inference steps* @param {integer} seed - Seed
 * returns Transformation
 */
export const extend = function (config = {
    boundingBox: null,
    prompt: "",
    guidanceScale: 30,
    numberOfInferenceSteps: 50,
    seed: 123,
}) {
    const paramIdMap = {
        boundingBox: "bbox",
        prompt: "p",
        guidanceScale: "gs",
        numberOfInferenceSteps: "nis",
        seed: "sd",
    };
    const params = [
        "boundingBox",
        "prompt",
        "guidanceScale",
        "numberOfInferenceSteps",
        "seed",
    ].filter((param) => config.hasOwnProperty(param));
    const transformation = ["bg.extend", "("];
    params.map((param, idx) => {
        processParams(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length &&
        transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
export default {
    extend,
};
