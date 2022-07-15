import { PDKIllegalArgumentError } from "./errors/PixelbinErrors";
/**
 * class to create a Transformation object
 */
class Transformation {
    /**
     * @param {Transformation} _transformation
     */
    constructor(_transformation) {
        this._transformation = _transformation || [];
    }
    /**
     * provides functionality to append transformation.
     * @param {Transformation} transformation.
     * returns Transformation
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
     * provides functionality to get all transformation.
     * returns Transformation list
     */
    getTransformation() {
        return this._transformation;
    }
    /**
     * allows the user to generate a custom transformation with the input parameters.
     * @param {Object} arg - custom transformation
     * @param {string} arg.plugin - transformation plugin
     * @param {string} arg.method - transformation method
     * @param {Array<Object>} arg.values - transformation parameter object
     * @param {string} [arg.values[].key] - transformation parameter key
     * @param {string} [arg.values[].value] - transformation parameter value
     * @param {boolean} [arg.isPreset] - whether the transformation is a preset
     * returns Transformation
     */
    static customTransformation({ plugin, name, values = [] }) {
        if (!(values instanceof Array))
            throw new PDKIllegalArgumentError(`Expected values to be an Array. Got ${typeof values} instead`);
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
export default Transformation;
