import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Vertex AI based transformations
 * @param {custom} backgroundPrompt - Background prompt* @param {custom} negativePrompt - Negative prompt* @param {integer} seed - Seed* @param {integer} guidanceScale - Guidance Scale (controls how much the model adheres to the text prompt)
 * returns Transformation
 */
export const generateBG = function (config = {
    backgroundPrompt: "YSBmb3Jlc3QgZnVsbCBvZiBvYWsgdHJlZXMsd2l0aCBicmlnaHQgbGlnaHRzLCBzdW4gYW5kIGEgbG90IG9mIG1hZ2ljLCB1bHRyYSByZWFsaXN0aWMsIDhr",
    negativePrompt: "",
    seed: 22,
    guidanceScale: 60,
}) {
    const paramIdMap = {
        backgroundPrompt: "p",
        negativePrompt: "np",
        seed: "s",
        guidanceScale: "gs",
    };
    const params = ["backgroundPrompt", "negativePrompt", "seed", "guidanceScale"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["vertexAi.generateBG", "("];
    params.map((param, idx) => {
        processParams(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
/**
* Vertex AI based transformations

* returns Transformation
*/
export const removeBG = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["vertexAi.removeBG", "("];
    params.map((param, idx) => {
        processParams(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
/**
 * Vertex AI based transformations
 * @param {enum} type - Type
 * returns Transformation
 */
export const upscale = function (config = {
    type: "x2",
}) {
    const paramIdMap = {
        type: "t",
    };
    const params = ["type"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["vertexAi.upscale", "("];
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
    generateBG,
    removeBG,
    upscale,
};
