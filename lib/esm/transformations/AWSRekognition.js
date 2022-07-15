import Transformation from "../transformation.js";
/**
 * AWS Rekognition Plugin
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
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
/**
 * AWS Rekognition Plugin
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
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
export default {
    detectLabels,
    moderation,
};
