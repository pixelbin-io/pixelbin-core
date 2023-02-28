import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Detect objects and text in images
 * @param {integer} maximumLabels - Maximum labels* @param {integer} minimumConfidence - Minimum confidence
 * returns Transformation
 */
export const detectLabels = function (config = {
    maximumLabels: 5,
    minimumConfidence: 55,
}) {
    const paramIdMap = {
        maximumLabels: "l",
        minimumConfidence: "c",
    };
    const params = ["maximumLabels", "minimumConfidence"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["awsRek.detectLabels", "("];
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
 * Detect objects and text in images
 * @param {integer} minimumConfidence - Minimum confidence
 * returns Transformation
 */
export const moderation = function (config = {
    minimumConfidence: 55,
}) {
    const paramIdMap = {
        minimumConfidence: "c",
    };
    const params = ["minimumConfidence"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["awsRek.moderation", "("];
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
    detectLabels,
    moderation,
};
