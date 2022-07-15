import Transformation from "../transformation.js";
/**
* RemoveBG Background Removal Module

* returns Transformation
*/
export const bg = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["remove.bg", "("];
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
