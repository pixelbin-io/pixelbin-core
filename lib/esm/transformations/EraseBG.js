import Transformation from "../transformation.js";
/**
 * EraseBG Background Removal Module
 * @param {enum} industryType - Industry type
 * returns Transformation
 */
export const bg = function (config = {
    industryType: "general",
}) {
    const paramIdMap = {
        industryType: "i",
    };
    const params = ["industryType"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["erase.bg", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
export default {
    bg,
};
