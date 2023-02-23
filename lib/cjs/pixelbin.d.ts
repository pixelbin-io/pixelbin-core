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
     * - EraseBG Background Removal Module
     */
    EraseBG: typeof EraseBG;
    /**
     * - Super Resolution Module
     */
    SuperResolution: typeof SuperResolution;
    /**
     * - Artifact Removal Plugin
     */
    Artifact: typeof Artifact;
    /**
     * - Watermark Removal Plugin
     */
    WatermarkRemoval: typeof WatermarkRemoval;
    /**
     * - Detect objects and text in images
     */
    AWSRekognitionPlugin: typeof AWSRekognitionPlugin;
    /**
     * - Detect content and text in images
     */
    GoogleVisionPlugin: typeof GoogleVisionPlugin;
    /**
     * - Watermark Detection Plugin
     */
    WatermarkDetection: typeof WatermarkDetection;
    /**
     * - Intelligent Crop Plugin
     */
    IntelligentCrop: typeof IntelligentCrop;
    /**
     * - OCR Module
     */
    TextDetectionandRecognition: typeof TextDetectionandRecognition;
    /**
     * - Number Plate Detection Plugin
     */
    NumberPlateDetection: typeof NumberPlateDetection;
    /**
     * - Image Centering Module
     */
    ImageCentering: typeof ImageCentering;
};
/**
 * @typedef {Object} transformations
 * @property {Basic} Basic - Basic Transformations
 * @property {RemoveBG} RemoveBG - Remove background from any image
 * @property {EraseBG} EraseBG - EraseBG Background Removal Module
 * @property {SuperResolution} SuperResolution - Super Resolution Module
 * @property {Artifact} Artifact - Artifact Removal Plugin
 * @property {WatermarkRemoval} WatermarkRemoval - Watermark Removal Plugin
 * @property {AWSRekognitionPlugin} AWSRekognitionPlugin - Detect objects and text in images
 * @property {GoogleVisionPlugin} GoogleVisionPlugin - Detect content and text in images
 * @property {WatermarkDetection} WatermarkDetection - Watermark Detection Plugin
 * @property {IntelligentCrop} IntelligentCrop - Intelligent Crop Plugin
 * @property {TextDetectionandRecognition} TextDetectionandRecognition - OCR Module
 * @property {NumberPlateDetection} NumberPlateDetection - Number Plate Detection Plugin
 * @property {ImageCentering} ImageCentering - Image Centering Module
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
            options: {};
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
        Artifact: typeof Artifact;
        WatermarkRemoval: typeof WatermarkRemoval;
        AWSRekognitionPlugin: typeof AWSRekognitionPlugin;
        GoogleVisionPlugin: typeof GoogleVisionPlugin;
        WatermarkDetection: typeof WatermarkDetection;
        IntelligentCrop: typeof IntelligentCrop;
        TextDetectionandRecognition: typeof TextDetectionandRecognition;
        NumberPlateDetection: typeof NumberPlateDetection;
        ImageCentering: typeof ImageCentering;
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
import * as Artifact from "./transformations/Artifact";
import * as WatermarkRemoval from "./transformations/WatermarkRemoval";
import * as AWSRekognitionPlugin from "./transformations/AWSRekognitionPlugin";
import * as GoogleVisionPlugin from "./transformations/GoogleVisionPlugin";
import * as WatermarkDetection from "./transformations/WatermarkDetection";
import * as IntelligentCrop from "./transformations/IntelligentCrop";
import * as TextDetectionandRecognition from "./transformations/TextDetectionandRecognition";
import * as NumberPlateDetection from "./transformations/NumberPlateDetection";
import * as ImageCentering from "./transformations/ImageCentering";
export namespace transformations {
    export { Basic };
    export { RemoveBG };
    export { EraseBG };
    export { SuperResolution };
    export { Artifact };
    export { WatermarkRemoval };
    export { AWSRekognitionPlugin };
    export { GoogleVisionPlugin };
    export { WatermarkDetection };
    export { IntelligentCrop };
    export { TextDetectionandRecognition };
    export { NumberPlateDetection };
    export { ImageCentering };
}
import Image from "./image.js";
export { Pixelbin as default, Transformation };
