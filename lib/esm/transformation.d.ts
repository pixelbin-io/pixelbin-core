export default Transformation;
/**
 * Class to create a Transformation object
 */
declare class Transformation {
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
    static customTransformation({ plugin, name, values }: {
        plugin: string;
        name: string;
        values: Array<any>;
    }): Transformation;
    /**
     * @param {Array<Object>} _transformation - Array of transformation operations.
     */
    constructor(_transformation: Array<any>);
    _transformation: any[];
    /**
     * Provides functionality to append a transformation.
     * @param {Transformation} transformation - Transformation to append.
     * @returns {Transformation}
     */
    pipe(transformation: Transformation): Transformation;
    /**
     * Provides functionality to get all transformations.
     * @returns {Array<Object>} - Transformation list.
     */
    getTransformation(): Array<any>;
}
