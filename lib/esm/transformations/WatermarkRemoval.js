import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Watermark Removal Plugin
 * @param {boolean} removeText - Remove text* @param {boolean} removeLogo - Remove logo* @param {string} box1 - Box 1* @param {string} box2 - Box 2* @param {string} box3 - Box 3* @param {string} box4 - Box 4* @param {string} box5 - Box 5
 * returns Transformation
 */
export const remove = function (config = {
    removeText: false,
    removeLogo: false,
    box1: "0_0_100_100",
    box2: "0_0_0_0",
    box3: "0_0_0_0",
    box4: "0_0_0_0",
    box5: "0_0_0_0",
}) {
    const paramIdMap = {
        removeText: "rem_text",
        removeLogo: "rem_logo",
        box1: "box1",
        box2: "box2",
        box3: "box3",
        box4: "box4",
        box5: "box5",
    };
    const params = ["removeText", "removeLogo", "box1", "box2", "box3", "box4", "box5"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["wm.remove", "("];
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
    remove,
};
