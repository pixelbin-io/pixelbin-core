import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * AI Variation Generator
 * @param {custom} generateVariationPrompt - Generate variation prompt* @param {integer} noOfVariations - No. of variations* @param {integer} seed - Seed* @param {boolean} autoscale - Autoscale input if it exceeds maximum resolution
 * returns Transformation
 */
export const generate = function (config = {
    generateVariationPrompt: "",
    noOfVariations: 1,
    seed: 0,
    autoscale: true,
}) {
    const paramIdMap = {
        generateVariationPrompt: "p",
        noOfVariations: "v",
        seed: "s",
        autoscale: "auto",
    };
    const params = ["generateVariationPrompt", "noOfVariations", "seed", "autoscale"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["vg.generate", "("];
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
    generate,
};
