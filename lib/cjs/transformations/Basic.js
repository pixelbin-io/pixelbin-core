"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.toFormat = exports.tint = exports.grey = exports.modulate = exports.linear = exports.normalise = exports.negate = exports.flatten = exports.blur = exports.median = exports.sharpen = exports.flop = exports.flip = exports.rotate = exports.trim = exports.extract = exports.extend = exports.compress = exports.resize = void 0;
const transformation_js_1 = __importDefault(require("../transformation.js"));
/**
 * Basic Image Library Module
 * @param {integer} height - Height* @param {integer} width - Width* @param {enum} fit - Fit* @param {color} background - Background* @param {enum} position - Position* @param {enum} algorithm - Algorithm
 * returns Transformation
 */
const resize = function (config = {
    height: 0,
    width: 0,
    fit: "cover",
    background: "000000",
    position: "center",
    algorithm: "lanczos3",
}) {
    const paramIdMap = {
        height: "h",
        width: "w",
        fit: "f",
        background: "b",
        position: "p",
        algorithm: "k",
    };
    const params = ["height", "width", "fit", "background", "position", "algorithm"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.resize", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.resize = resize;
/**
 * Basic Image Library Module
 * @param {integer} quality - Quality
 * returns Transformation
 */
const compress = function (config = {
    quality: 80,
}) {
    const paramIdMap = {
        quality: "q",
    };
    const params = ["quality"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.compress", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.compress = compress;
/**
 * Basic Image Library Module
 * @param {integer} top - Top* @param {integer} left - Left* @param {integer} bottom - Bottom* @param {integer} right - Right* @param {color} background - Background
 * returns Transformation
 */
const extend = function (config = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
    background: "000000",
}) {
    const paramIdMap = {
        top: "t",
        left: "l",
        bottom: "b",
        right: "r",
        background: "bc",
    };
    const params = ["top", "left", "bottom", "right", "background"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.extend", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.extend = extend;
/**
 * Basic Image Library Module
 * @param {integer} top - Top* @param {integer} left - Left* @param {integer} height - Height* @param {integer} width - Width
 * returns Transformation
 */
const extract = function (config = {
    top: 10,
    left: 10,
    height: 50,
    width: 20,
}) {
    const paramIdMap = {
        top: "t",
        left: "l",
        height: "h",
        width: "w",
    };
    const params = ["top", "left", "height", "width"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.extract", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.extract = extract;
/**
 * Basic Image Library Module
 * @param {integer} threshold - Threshold
 * returns Transformation
 */
const trim = function (config = {
    threshold: 10,
}) {
    const paramIdMap = {
        threshold: "t",
    };
    const params = ["threshold"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.trim", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.trim = trim;
/**
 * Basic Image Library Module
 * @param {integer} angle - Angle* @param {color} background - Background
 * returns Transformation
 */
const rotate = function (config = {
    angle: 0,
    background: "000000",
}) {
    const paramIdMap = {
        angle: "a",
        background: "b",
    };
    const params = ["angle", "background"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.rotate", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.rotate = rotate;
/**
* Basic Image Library Module

* returns Transformation
*/
const flip = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.flip", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.flip = flip;
/**
* Basic Image Library Module

* returns Transformation
*/
const flop = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.flop", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.flop = flop;
/**
 * Basic Image Library Module
 * @param {integer} sigma - Sigma* @param {integer} flat - Flat* @param {integer} jagged - Jagged
 * returns Transformation
 */
const sharpen = function (config = {
    sigma: 1,
    flat: 1,
    jagged: 2,
}) {
    const paramIdMap = {
        sigma: "s",
        flat: "f",
        jagged: "j",
    };
    const params = ["sigma", "flat", "jagged"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.sharpen", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.sharpen = sharpen;
/**
 * Basic Image Library Module
 * @param {integer} size - Size
 * returns Transformation
 */
const median = function (config = {
    size: 3,
}) {
    const paramIdMap = {
        size: "s",
    };
    const params = ["size"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.median", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.median = median;
/**
 * Basic Image Library Module
 * @param {integer} sigma - Sigma
 * returns Transformation
 */
const blur = function (config = {
    sigma: 1,
}) {
    const paramIdMap = {
        sigma: "s",
    };
    const params = ["sigma"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.blur", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.blur = blur;
/**
 * Basic Image Library Module
 * @param {color} background - Background
 * returns Transformation
 */
const flatten = function (config = {
    background: "000000",
}) {
    const paramIdMap = {
        background: "b",
    };
    const params = ["background"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.flatten", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.flatten = flatten;
/**
* Basic Image Library Module

* returns Transformation
*/
const negate = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.negate", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.negate = negate;
/**
* Basic Image Library Module

* returns Transformation
*/
const normalise = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.normalise", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.normalise = normalise;
/**
 * Basic Image Library Module
 * @param {integer} a - A* @param {integer} b - B
 * returns Transformation
 */
const linear = function (config = {
    a: 1,
    b: 0,
}) {
    const paramIdMap = {
        a: "a",
        b: "b",
    };
    const params = ["a", "b"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.linear", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.linear = linear;
/**
 * Basic Image Library Module
 * @param {integer} brightness - Brightness* @param {integer} saturation - Saturation* @param {integer} hue - Hue
 * returns Transformation
 */
const modulate = function (config = {
    brightness: 1,
    saturation: 1,
    hue: 90,
}) {
    const paramIdMap = {
        brightness: "b",
        saturation: "s",
        hue: "h",
    };
    const params = ["brightness", "saturation", "hue"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.modulate", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.modulate = modulate;
/**
* Basic Image Library Module

* returns Transformation
*/
const grey = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.grey", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.grey = grey;
/**
 * Basic Image Library Module
 * @param {color} color - Color
 * returns Transformation
 */
const tint = function (config = {
    color: "000000",
}) {
    const paramIdMap = {
        color: "c",
    };
    const params = ["color"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.tint", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.tint = tint;
/**
 * Basic Image Library Module
 * @param {enum} format - Format
 * returns Transformation
 */
const toFormat = function (config = {
    format: "jpeg",
}) {
    const paramIdMap = {
        format: "f",
    };
    const params = ["format"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.toFormat", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.toFormat = toFormat;
/**
 * Basic Image Library Module
 * @param {enum} mode - Mode* @param {file} image - Image* @param {color} background - Background* @param {integer} height - Height* @param {integer} width - Width* @param {integer} top - Top* @param {integer} left - Left* @param {enum} gravity - Gravity* @param {enum} blend - Blend* @param {boolean} tile - Tile
 * returns Transformation
 */
const merge = function (config = {
    mode: "overlay",
    image: "",
    background: "00000000",
    height: 0,
    width: 0,
    top: 0,
    left: 0,
    gravity: "center",
    blend: "over",
    tile: false,
}) {
    const paramIdMap = {
        mode: "m",
        image: "i",
        background: "bg",
        height: "h",
        width: "w",
        top: "t",
        left: "l",
        gravity: "g",
        blend: "b",
        tile: "r",
    };
    const params = [
        "mode",
        "image",
        "background",
        "height",
        "width",
        "top",
        "left",
        "gravity",
        "blend",
        "tile",
    ].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.merge", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1)
            transformation.push(",");
    });
    transformation.push(")");
    return new transformation_js_1.default([transformation.join("")]);
};
exports.merge = merge;
exports.default = {
    resize: exports.resize,
    compress: exports.compress,
    extend: exports.extend,
    extract: exports.extract,
    trim: exports.trim,
    rotate: exports.rotate,
    flip: exports.flip,
    flop: exports.flop,
    sharpen: exports.sharpen,
    median: exports.median,
    blur: exports.blur,
    flatten: exports.flatten,
    negate: exports.negate,
    normalise: exports.normalise,
    linear: exports.linear,
    modulate: exports.modulate,
    grey: exports.grey,
    tint: exports.tint,
    toFormat: exports.toFormat,
    merge: exports.merge,
};
