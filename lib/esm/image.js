/**
 * Class to create a Image object
 */
class Image {
    /**
     * @param {String} _imageUri path of image
     * @param {String} _cloudName cloud name
     * @param {String} _zone cloud zone
     * @param {Boolean} _worker enable/disable url translation worker
     */
    constructor(_imageUri, _cloudName, _zone, _worker) {
        this.imageUri = _imageUri;
        this.cloudName = _cloudName;
        this.zone = _zone;
        this.transformation = [];
        this.host = "https://cdn.pixelbin.io";
        this.version = "v2";
        this.worker = _worker;
    }
    /**
     * Set transformation to be performed on the Image.
     * @param {import('./transformation.js').default} transformation - Image transformation.
     * @returns {Image}
     */
    setTransformation(transformation) {
        this.transformation = transformation.getTransformation();
        return this;
    }
    /**
     * Get Transformation CDN link.
     * @returns {String}
     */
    getUrl() {
        let operations = this.transformation.join("~").replace(/ /g, "") || "original";
        if (this.worker)
            operations = "wrkr";
        return `${this.host}/${this.version}/${this.cloudName}/${this.zone ? `${this.zone}/` : ""}${operations}/${this.imageUri}`;
    }
}
export default Image;
