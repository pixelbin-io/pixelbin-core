import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * AI Soft Shadow Generator
 * @param {file} backgroundImage - Background image* @param {color} backgroundColor - Background color* @param {float} shadowAngle - Shadow angle* @param {float} shadowIntensity - Shadow intensity
 * returns Transformation
 */
export const gen = function (config = {
    backgroundImage: null,
    backgroundColor: "ffffff",
    shadowAngle: 120,
    shadowIntensity: 0.5,
}) {
    const paramIdMap = {
        backgroundImage: "bgi",
        backgroundColor: "bgc",
        shadowAngle: "a",
        shadowIntensity: "i",
    };
    const params = ["backgroundImage", "backgroundColor", "shadowAngle", "shadowIntensity"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["shadow.gen", "("];
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
    gen,
};
