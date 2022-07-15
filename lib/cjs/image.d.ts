export default Image;
/**
 * class to create a Image object
 */
declare class Image {
    /**
     * @param {String} _imageUri path of image
     * @param {String} _cloudName cloud name
     * @param {String} _zone cloud zone
     */
    constructor(_imageUri: string, _cloudName: string, _zone: string);
    imageUri: string;
    cloudName: string;
    zone: string;
    transformation: any[];
    host: string;
    /**
     * Set transformation to be performed on Image.
     * @param {Transformation} transformation Image transformation
     * returns Image
     */
    setTransformation(transformation: Transformation): Image;
    /**
     * Get Transformation CDN link
     * @param {Transformation} transformation Image transformation
     * returns String
     */
    getUrl(): string;
}
