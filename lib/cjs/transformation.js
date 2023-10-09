"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PixelbinErrors_1 = require("./errors/PixelbinErrors");
/**
 * Class to create a Transformation object
 */
class Transformation {
    /**
     * @param {Array<Object>} _transformation - Array of transformation operations.
     */
    constructor(_transformation) {
        this._transformation = _transformation || [];
    }
    /**
     * Provides functionality to append a transformation.
     * @param {Transformation} transformation - Transformation to append.
     * @returns {Transformation}
     */
    pipe(transformation) {
        if (transformation instanceof Transformation) {
            return new Transformation([
                ...this._transformation,
                ...transformation.getTransformation(),
            ]);
        }
        throw new Error("Argument Should Be Instance of Transformation");
    }
    /**
     * Provides functionality to get all transformations.
     * @returns {Array<Object>} - Transformation list.
     */
    getTransformation() {
        return this._transformation;
    }
    /**
     * Allows the user to generate a custom transformation with the input parameters.
     * @param {Object} arg - Custom transformation.
     * @param {string} arg.plugin - Transformation plugin.
     * @param {string} arg.name - Transformation name.
     * @param {Array<Object>} arg.values - Transformation parameter object.
     * @param {string} [arg.values[].key] - Transformation parameter key.
     * @param {string} [arg.values[].value] - Transformation parameter value.
     * @returns {Transformation}
     */
    static customTransformation({ plugin, name, values = [] }) {
        if (!(values instanceof Array))
            throw new PixelbinErrors_1.PDKIllegalArgumentError(`Expected values to be an Array. Got ${typeof values} instead`);
        const patternArr = [];
        if (plugin === "p") {
            patternArr.push(`${plugin}:${name}`);
            return new Transformation(patternArr.join(""));
        }
        patternArr.push(`${plugin}.${name}`);
        patternArr.push("(");
        patternArr.push(values.map(({ key, value }) => `${key}:${value}`).join(","));
        patternArr.push(")");
        return new Transformation(patternArr.join(""));
    }
}
exports.default = Transformation;
