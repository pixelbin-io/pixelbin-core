import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * AI Background Generator
 * @param {custom} backgroundPrompt - Background prompt* @param {enum} focus - Focus* @param {custom} negativePrompt - Negative prompt* @param {integer} seed - Seed
 * returns Transformation
 */
export const bg = function (config = {
    backgroundPrompt: "YSBmb3Jlc3QgZnVsbCBvZiBvYWsgdHJlZXMsd2l0aCBicmlnaHQgbGlnaHRzLCBzdW4gYW5kIGEgbG90IG9mIG1hZ2ljLCB1bHRyYSByZWFsaXN0aWMsIDhr",
    focus: "Product",
    negativePrompt: "",
    seed: 123,
}) {
    const paramIdMap = {
        backgroundPrompt: "p",
        focus: "f",
        negativePrompt: "np",
        seed: "s",
    };
    const params = ["backgroundPrompt", "focus", "negativePrompt", "seed"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["generate.bg", "("];
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
