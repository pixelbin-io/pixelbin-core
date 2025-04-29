import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Watermark Removal Plugin
 * @param {boolean} removeText - Remove text* @param {boolean} removeLogo - Remove logo* @param {string} box_1 - Box 1* @param {string} box_2 - Box 2* @param {string} box_3 - Box 3* @param {string} box_4 - Box 4* @param {string} box_5 - Box 5
 * returns Transformation
 */
export const remove = function (config = {
    removeText: false,
    removeLogo: false,
    box_1: "0_0_100_100",
    box_2: "0_0_0_0",
    box_3: "0_0_0_0",
    box_4: "0_0_0_0",
    box_5: "0_0_0_0",
}) {
    const paramIdMap = {
        removeText: "rem_text",
        removeLogo: "rem_logo",
        box_1: "box1",
        box_2: "box2",
        box_3: "box3",
        box_4: "box4",
        box_5: "box5",
    };
    const params = [
        "removeText",
        "removeLogo",
        "box_1",
        "box_2",
        "box_3",
        "box_4",
        "box_5",
    ].filter((param) => config.hasOwnProperty(param));
    const transformation = ["wm.remove", "("];
    params.map((param, idx) => {
        processParams(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length &&
        transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
export default {
    remove,
};
