import Transformation from "../transformation.js";
import { processParams } from "../utils/transformation.utils.js";
/**
 * Basic Transformations
 * @param {integer} height - Height* @param {integer} width - Width* @param {enum} fit - Fit* @param {color} background - Background* @param {enum} position - Position* @param {enum} algorithm - Algorithm* @param {float} dpr - Dpr
 * returns Transformation
 */
export const resize = function (config = {
    height: 0,
    width: 0,
    fit: "cover",
    background: "000000",
    position: "center",
    algorithm: "lanczos3",
    dpr: 1,
}) {
    const paramIdMap = {
        height: "h",
        width: "w",
        fit: "f",
        background: "b",
        position: "p",
        algorithm: "k",
        dpr: "dpr",
    };
    const params = ["height", "width", "fit", "background", "position", "algorithm", "dpr"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.resize", "("];
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
 * Basic Transformations
 * @param {integer} quality - Quality
 * returns Transformation
 */
export const compress = function (config = {
    quality: 80,
}) {
    const paramIdMap = {
        quality: "q",
    };
    const params = ["quality"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.compress", "("];
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
 * Basic Transformations
 * @param {integer} top - Top* @param {integer} left - Left* @param {integer} bottom - Bottom* @param {integer} right - Right* @param {color} background - Background* @param {enum} borderType - Border type* @param {float} dpr - Dpr
 * returns Transformation
 */
export const extend = function (config = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
    background: "000000",
    borderType: "constant",
    dpr: 1,
}) {
    const paramIdMap = {
        top: "t",
        left: "l",
        bottom: "b",
        right: "r",
        background: "bc",
        borderType: "bt",
        dpr: "dpr",
    };
    const params = ["top", "left", "bottom", "right", "background", "borderType", "dpr"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.extend", "("];
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
 * Basic Transformations
 * @param {integer} top - Top* @param {integer} left - Left* @param {integer} height - Height* @param {integer} width - Width* @param {bbox} boundingBox - Bounding box
 * returns Transformation
 */
export const extract = function (config = {
    top: 10,
    left: 10,
    height: 50,
    width: 20,
    boundingBox: null,
}) {
    const paramIdMap = {
        top: "t",
        left: "l",
        height: "h",
        width: "w",
        boundingBox: "bbox",
    };
    const params = ["top", "left", "height", "width", "boundingBox"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.extract", "("];
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
 * Basic Transformations
 * @param {integer} threshold - Threshold
 * returns Transformation
 */
export const trim = function (config = {
    threshold: 10,
}) {
    const paramIdMap = {
        threshold: "t",
    };
    const params = ["threshold"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.trim", "("];
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
 * Basic Transformations
 * @param {integer} angle - Angle* @param {color} background - Background
 * returns Transformation
 */
export const rotate = function (config = {
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
        processParams(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
/**
* Basic Transformations

* returns Transformation
*/
export const flip = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.flip", "("];
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
* Basic Transformations

* returns Transformation
*/
export const flop = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.flop", "("];
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
 * Basic Transformations
 * @param {float} sigma - Sigma
 * returns Transformation
 */
export const sharpen = function (config = {
    sigma: 1.5,
}) {
    const paramIdMap = {
        sigma: "s",
    };
    const params = ["sigma"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.sharpen", "("];
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
 * Basic Transformations
 * @param {integer} size - Size
 * returns Transformation
 */
export const median = function (config = {
    size: 3,
}) {
    const paramIdMap = {
        size: "s",
    };
    const params = ["size"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.median", "("];
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
 * Basic Transformations
 * @param {float} sigma - Sigma* @param {float} dpr - Dpr
 * returns Transformation
 */
export const blur = function (config = {
    sigma: 0.3,
    dpr: 1,
}) {
    const paramIdMap = {
        sigma: "s",
        dpr: "dpr",
    };
    const params = ["sigma", "dpr"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.blur", "("];
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
 * Basic Transformations
 * @param {color} background - Background
 * returns Transformation
 */
export const flatten = function (config = {
    background: "000000",
}) {
    const paramIdMap = {
        background: "b",
    };
    const params = ["background"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.flatten", "("];
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
* Basic Transformations

* returns Transformation
*/
export const negate = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.negate", "("];
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
* Basic Transformations

* returns Transformation
*/
export const normalise = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.normalise", "("];
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
 * Basic Transformations
 * @param {integer} a - A* @param {integer} b - B
 * returns Transformation
 */
export const linear = function (config = {
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
        processParams(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
/**
 * Basic Transformations
 * @param {float} brightness - Brightness* @param {float} saturation - Saturation* @param {integer} hue - Hue
 * returns Transformation
 */
export const modulate = function (config = {
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
        processParams(config, params, transformation, paramIdMap, param, idx);
    });
    if (transformation.length && transformation[transformation.length - 1] === ",") {
        transformation.pop();
    }
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};
/**
* Basic Transformations

* returns Transformation
*/
export const grey = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.grey", "("];
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
 * Basic Transformations
 * @param {color} color - Color
 * returns Transformation
 */
export const tint = function (config = {
    color: "000000",
}) {
    const paramIdMap = {
        color: "c",
    };
    const params = ["color"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.tint", "("];
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
 * Basic Transformations
 * @param {enum} format - Format* @param {enum} quality - Quality
 * returns Transformation
 */
export const toFormat = function (config = {
    format: "jpeg",
    quality: "75",
}) {
    const paramIdMap = {
        format: "f",
        quality: "q",
    };
    const params = ["format", "quality"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.toFormat", "("];
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
 * Basic Transformations
 * @param {integer} density - Density
 * returns Transformation
 */
export const density = function (config = {
    density: 300,
}) {
    const paramIdMap = {
        density: "d",
    };
    const params = ["density"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.density", "("];
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
 * Basic Transformations
 * @param {enum} mode - Mode* @param {file} image - Image* @param {custom} transformation - Transformation* @param {color} background - Background* @param {integer} height - Height* @param {integer} width - Width* @param {integer} top - Top* @param {integer} left - Left* @param {enum} gravity - Gravity* @param {enum} blend - Blend* @param {boolean} tile - Tile* @param {bboxList} listOfBboxes - List of bboxes* @param {polygonList} listOfPolygons - List of polygons
 * returns Transformation
 */
export const merge = function (config = {
    mode: "overlay",
    image: "",
    transformation: "",
    background: "00000000",
    height: 0,
    width: 0,
    top: 0,
    left: 0,
    gravity: "center",
    blend: "over",
    tile: false,
    listOfBboxes: null,
    listOfPolygons: null,
}) {
    const paramIdMap = {
        mode: "m",
        image: "i",
        transformation: "tr",
        background: "bg",
        height: "h",
        width: "w",
        top: "t",
        left: "l",
        gravity: "g",
        blend: "b",
        tile: "r",
        listOfBboxes: "bboxes",
        listOfPolygons: "polys",
    };
    const params = [
        "mode",
        "image",
        "transformation",
        "background",
        "height",
        "width",
        "top",
        "left",
        "gravity",
        "blend",
        "tile",
        "listOfBboxes",
        "listOfPolygons",
    ].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.merge", "("];
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
    resize,
    compress,
    extend,
    extract,
    trim,
    rotate,
    flip,
    flop,
    sharpen,
    median,
    blur,
    flatten,
    negate,
    normalise,
    linear,
    modulate,
    grey,
    tint,
    toFormat,
    density,
    merge,
};
