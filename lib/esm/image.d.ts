export default Image;
/**
 * Class to create a Image object
 */
declare class Image {
    /**
     * @param {String} _imageUri path of image
     * @param {String} _cloudName cloud name
     * @param {String} _zone cloud zone
     * @param {Boolean} _worker enable/disable url translation worker
     */
    constructor(_imageUri: string, _cloudName: string, _zone: string, _worker: boolean);
    imageUri: string;
    cloudName: string;
    zone: string;
    transformation: any[];
    host: string;
    version: string;
    worker: boolean;
    /**
     * Set transformation to be performed on the Image.
     * @param {import('./transformation.js').default} transformation - Image transformation.
     * @returns {Image}
     */
    setTransformation(transformation: import('./transformation.js').default): Image;
    /**
     * Get Transformation CDN link.
     * @returns {String}
     */
    getUrl(): string;
}
