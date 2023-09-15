import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";

/**
 * AI Background Generator
 * @param {custom} backgroundPrompt - Background prompt* @param {file} backgroundImageForShadow - Background image for shadow* @param {enum} focus - Focus* @param {custom} negativePrompt - Negative prompt* @param {integer} seed - Seed
 * returns Transformation
 */
export const bg = function (
    config = {
        backgroundPrompt:
            "cmVhbGlzdGljIGdyZWVuIGdyYXNzLCBsYXduIGZpZWxkIG9mIGdyYXNzLCBibHVlIHNreSB3aXRoIHdoaXRlIGNsb3Vkcw",
        backgroundImageForShadow: "",
        focus: "Product",
        negativePrompt: "",
        seed: 123,
    },
) {
    const paramIdMap = {
        backgroundPrompt: "p",
        backgroundImageForShadow: "i",
        focus: "f",
        negativePrompt: "np",
        seed: "s",
    };
    const params = [
        "backgroundPrompt",
        "backgroundImageForShadow",
        "focus",
        "negativePrompt",
        "seed",
    ].filter((param) => config.hasOwnProperty(param));
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
