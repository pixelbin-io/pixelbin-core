import Transformation from "../transformation.js";
/**
 * Super Resolution Module
 * @param {enum} type - Type
 * returns Transformation
 */
export const upscale = function (config = {
    type: "2x",
}) {
    const paramIdMap = {
        type: "t",
    };
    const params = ["type"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["sr.upscale", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
export default {
    upscale,
};
