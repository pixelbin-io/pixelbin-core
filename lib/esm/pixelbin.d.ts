export type transformations = {
    /**
     * - Basic Transformations
     */
    Basic: typeof Basic;
    /**
     * - Remove background from any image
     */
    RemoveBG: typeof RemoveBG;
    /**
     * - Remove background from any image
     */
    EraseBG: typeof EraseBG;
    /**
     * - Upscale image resolution
     */
    SuperResolution: typeof SuperResolution;
    /**
     * - Remove JPEG compression artifact noise and get cleaner images
     */
    ArtifactRemoval: typeof ArtifactRemoval;
    /**
     * - Produce watermark free images
     */
    WatermarkRemoval: typeof WatermarkRemoval;
    /**
     * - Detect objects in images.
     */
    AWSRekognition: typeof AWSRekognition;
    /**
     * - Detect objects in images.
     */
    GoogleVision: typeof GoogleVision;
};
/**
 * @typedef {Object} transformations
 * @property {Basic} Basic - Basic Transformations
 * @property {RemoveBG} RemoveBG - Remove background from any image
 * @property {EraseBG} EraseBG - Remove background from any image
 * @property {SuperResolution} SuperResolution - Upscale image resolution
 * @property {ArtifactRemoval} ArtifactRemoval - Remove JPEG compression artifact noise and get cleaner images
 * @property {WatermarkRemoval} WatermarkRemoval - Produce watermark free images
 * @property {AWSRekognition} AWSRekognition - Detect objects in images.
 * @property {GoogleVision} GoogleVision - Detect objects in images.
 */
/**
 * class to create a Pixelbin object
 */
declare class Pixelbin {
    /**
     * provides access to url utilities
     * returns Object
     */
    static get utils(): {
        objToUrl: (obj: any) => string;
        urlToObj: (url: any) => {
            baseUrl: string;
            filePath: any;
            pattern: any;
            version: string;
            zone: any;
            cloudName: any;
        };
    };
    /**
     *
     * @param {File} file
     * @param {Object} signedDetails generated with @pixelbin/core sdk
     * @returns Promise
     */
    static upload(file: File, signedDetails: any): Promise<void>;
    /**
     * provides access to pixelbin transformations
     * @returns {transformations}
     */
    static transformations: {
        Basic: typeof Basic;
        RemoveBG: typeof RemoveBG;
        EraseBG: typeof EraseBG;
        SuperResolution: typeof SuperResolution;
        ArtifactRemoval: typeof ArtifactRemoval;
        WatermarkRemoval: typeof WatermarkRemoval;
        AWSRekognition: typeof AWSRekognition;
        GoogleVision: typeof GoogleVision;
    };
    static Transformation: typeof Transformation;
    /**
     * @param {Object} cloud-details takes detail for cloud name and zone
     */
    constructor({ cloudName, zone }: any);
    cloudName: any;
    zone: any;
    /**
     * provides image on which transformation can be done.
     * @param {String} imageUri path of image.
     * returns Image
     */
    image(imageUri: string): Image;
}
import Transformation from "./transformation";
import * as Basic from "./transformations/Basic";
import * as RemoveBG from "./transformations/RemoveBG";
import * as EraseBG from "./transformations/EraseBG";
import * as SuperResolution from "./transformations/SuperResolution";
import * as ArtifactRemoval from "./transformations/ArtifactRemoval";
import * as WatermarkRemoval from "./transformations/WatermarkRemoval";
import * as AWSRekognition from "./transformations/AWSRekognition";
import * as GoogleVision from "./transformations/GoogleVision";
export namespace transformations {
    export { Basic };
    export { RemoveBG };
    export { EraseBG };
    export { SuperResolution };
    export { ArtifactRemoval };
    export { WatermarkRemoval };
    export { AWSRekognition };
    export { GoogleVision };
}
import Image from "./image.js";
export { Pixelbin as default, Transformation };
