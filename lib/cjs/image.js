"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * class to create a Image object
 */
class Image {
    /**
     * @param {String} _imageUri path of image
     * @param {String} _cloudName cloud name
     * @param {String} _zone cloud zone
     */
    constructor(_imageUri, _cloudName, _zone) {
        this.imageUri = _imageUri;
        this.cloudName = _cloudName;
        this.zone = _zone;
        this.transformation = [];
        this.host = "https://cdn.pixelbin.io";
    }
    /**
     * Set transformation to be performed on Image.
     * @param {Transformation} transformation Image transformation
     * returns Image
     */
    setTransformation(transformation) {
        this.transformation = transformation.getTransformation();
        return this;
    }
    /**
     * Get Transformation CDN link
     * @param {Transformation} transformation Image transformation
     * returns String
     */
    getUrl() {
        let operations = this.transformation.join("~").replace(/ /g, "") || "original";
        return `${this.host}/${this.cloudName}/${this.zone ? `${this.zone}/` : ""}${operations}/${this.imageUri}`;
    }
}
exports.default = Image;
