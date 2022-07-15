import Transformation from "../transformation.js";
/**
 * Google Vision Plugin
 * @param {integer} maximumLabels - Maximum labels
 * returns Transformation
 */
export const detectLabels = function (config = {
    maximumLabels: 5,
}) {
    const paramIdMap = {
        maximumLabels: "l",
    };
    const params = ["maximumLabels"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["googleVis.detectLabels", "("];
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
};
