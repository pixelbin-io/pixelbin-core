export type transformations = {
    /**
     * - Classifies the background of a product as plain, clean or busy
     */
    DetectBackgroundType: typeof DetectBackgroundType;
    /**
     * - Artifact Removal Plugin
     */
    Artifact: typeof Artifact;
    /**
     * - Detect objects and text in images
     */
    AWSRekognitionPlugin: typeof AWSRekognitionPlugin;
    /**
     * - AI Background Generator
     */
    BackgroundGenerator: typeof BackgroundGenerator;
    /**
     * - AI Variation Generator
     */
    VariationGenerator: typeof VariationGenerator;
    /**
     * - EraseBG Background Removal Module
     */
    EraseBG: typeof EraseBG;
    /**
     * - Detect content and text in images
     */
    GoogleVisionPlugin: typeof GoogleVisionPlugin;
    /**
     * - Image Centering Module
     */
    ImageCentering: typeof ImageCentering;
    /**
     * - Intelligent Crop Plugin
     */
    IntelligentCrop: typeof IntelligentCrop;
    /**
     * - Classifies whether objects in the image are single or multiple
     */
    ObjectCounter: typeof ObjectCounter;
    /**
     * - Detect NSFW content in images
     */
    NSFWDetection: typeof NSFWDetection;
    /**
     * - Number Plate Detection Plugin
     */
    NumberPlateDetection: typeof NumberPlateDetection;
    /**
     * - Detect bounding boxes of objects in the image
     */
    ObjectDetection: typeof ObjectDetection;
    /**
     * - Calculates the percentage of the main object area relative to image dimensions.
     */
    CheckObjectSize: typeof CheckObjectSize;
    /**
     * - OCR Module
     */
    TextDetectionandRecognition: typeof TextDetectionandRecognition;
    /**
     * - PDF Watermark Removal Plugin
     */
    PdfWatermarkRemoval: typeof PdfWatermarkRemoval;
    /**
     * - AI Product Tagging
     */
    ProductTagging: typeof ProductTagging;
    /**
     * - Classifies whether the product in the image is completely visible or not
     */
    CheckProductVisibility: typeof CheckProductVisibility;
    /**
     * - Basic Transformations
     */
    Basic: typeof Basic;
    /**
     * - AI Soft Shadow Generator
     */
    SoftShadowGenerator: typeof SoftShadowGenerator;
    /**
     * - Super Resolution Module
     */
    SuperResolution: typeof SuperResolution;
    /**
     * - Video Watermark Removal Plugin
     */
    VideoWatermarkRemoval: typeof VideoWatermarkRemoval;
    /**
     * - Classifies wear type and view type of products in the image
     */
    ViewDetection: typeof ViewDetection;
    /**
     * - Watermark Removal Plugin
     */
    WatermarkRemoval: typeof WatermarkRemoval;
    /**
     * - Watermark Detection Plugin
     */
    WatermarkDetection: typeof WatermarkDetection;
};
/**
 * @typedef {Object} transformations
 * @property {DetectBackgroundType} DetectBackgroundType - Classifies the background of a product as plain, clean or busy
 * @property {Artifact} Artifact - Artifact Removal Plugin
 * @property {AWSRekognitionPlugin} AWSRekognitionPlugin - Detect objects and text in images
 * @property {BackgroundGenerator} BackgroundGenerator - AI Background Generator
 * @property {VariationGenerator} VariationGenerator - AI Variation Generator
 * @property {EraseBG} EraseBG - EraseBG Background Removal Module
 * @property {GoogleVisionPlugin} GoogleVisionPlugin - Detect content and text in images
 * @property {ImageCentering} ImageCentering - Image Centering Module
 * @property {IntelligentCrop} IntelligentCrop - Intelligent Crop Plugin
 * @property {ObjectCounter} ObjectCounter - Classifies whether objects in the image are single or multiple
 * @property {NSFWDetection} NSFWDetection - Detect NSFW content in images
 * @property {NumberPlateDetection} NumberPlateDetection - Number Plate Detection Plugin
 * @property {ObjectDetection} ObjectDetection - Detect bounding boxes of objects in the image
 * @property {CheckObjectSize} CheckObjectSize - Calculates the percentage of the main object area relative to image dimensions.
 * @property {TextDetectionandRecognition} TextDetectionandRecognition - OCR Module
 * @property {PdfWatermarkRemoval} PdfWatermarkRemoval - PDF Watermark Removal Plugin
 * @property {ProductTagging} ProductTagging - AI Product Tagging
 * @property {CheckProductVisibility} CheckProductVisibility - Classifies whether the product in the image is completely visible or not
 * @property {Basic} Basic - Basic Transformations
 * @property {SoftShadowGenerator} SoftShadowGenerator - AI Soft Shadow Generator
 * @property {SuperResolution} SuperResolution - Super Resolution Module
 * @property {VideoWatermarkRemoval} VideoWatermarkRemoval - Video Watermark Removal Plugin
 * @property {ViewDetection} ViewDetection - Classifies wear type and view type of products in the image
 * @property {WatermarkRemoval} WatermarkRemoval - Watermark Removal Plugin
 * @property {WatermarkDetection} WatermarkDetection - Watermark Detection Plugin
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
        objToUrl: (obj: import("./utils").objToUrlInput) => string;
        urlToObj: (url: string, opts?: {
            isCustomDomain: boolean;
        }) => import("./utils").urlToObjResult;
    };
    /**
     *
     * @param {File} file
     * @param {Object} signedDetails generated with @pixelbin/core sdk
     * @param {Object} options
     * @param {Number} options.chunkSize default 1MB
     * @param {Number} options.maxRetries default 2
     * @param {Number} options.concurrency default 3
     * @returns Promise
     */
    static upload(file: File, signedDetails: any, options: {
        chunkSize: number;
        maxRetries: number;
        concurrency: number;
    }): Promise<any>;
    /**
     * provides access to pixelbin transformations
     * @returns {transformations}
     */
    static transformations: {
        DetectBackgroundType: typeof DetectBackgroundType;
        Artifact: typeof Artifact;
        AWSRekognitionPlugin: typeof AWSRekognitionPlugin;
        BackgroundGenerator: typeof BackgroundGenerator;
        VariationGenerator: typeof VariationGenerator;
        EraseBG: typeof EraseBG;
        GoogleVisionPlugin: typeof GoogleVisionPlugin;
        ImageCentering: typeof ImageCentering;
        IntelligentCrop: typeof IntelligentCrop;
        ObjectCounter: typeof ObjectCounter;
        NSFWDetection: typeof NSFWDetection;
        NumberPlateDetection: typeof NumberPlateDetection;
        ObjectDetection: typeof ObjectDetection;
        CheckObjectSize: typeof CheckObjectSize;
        TextDetectionandRecognition: typeof TextDetectionandRecognition;
        PdfWatermarkRemoval: typeof PdfWatermarkRemoval;
        ProductTagging: typeof ProductTagging;
        CheckProductVisibility: typeof CheckProductVisibility;
        Basic: typeof Basic;
        SoftShadowGenerator: typeof SoftShadowGenerator;
        SuperResolution: typeof SuperResolution;
        VideoWatermarkRemoval: typeof VideoWatermarkRemoval;
        ViewDetection: typeof ViewDetection;
        WatermarkRemoval: typeof WatermarkRemoval;
        WatermarkDetection: typeof WatermarkDetection;
    };
    static Transformation: typeof Transformation;
    /**
     * @param {Object} cloud-details takes detail for cloud name and zone
     */
    constructor({ cloudName, zone }: any);
    cloudName: any;
    zone: any;
    /**
    * @typedef ImageOptions
    * @type {object}
    * @param {Boolean} worker - use url translation worker
    * /
    
    /**
     * provides image on which transformation can be done.
     * @param {String} imageUri path of image.
     * @param {ImageOptions} options options for image.
     * returns Image
     */
    image(imageUri: string, options?: {}): Image;
}
import Transformation from "./transformation";
import * as DetectBackgroundType from "./transformations/DetectBackgroundType";
import * as Artifact from "./transformations/Artifact";
import * as AWSRekognitionPlugin from "./transformations/AWSRekognitionPlugin";
import * as BackgroundGenerator from "./transformations/BackgroundGenerator";
import * as VariationGenerator from "./transformations/VariationGenerator";
import * as EraseBG from "./transformations/EraseBG";
import * as GoogleVisionPlugin from "./transformations/GoogleVisionPlugin";
import * as ImageCentering from "./transformations/ImageCentering";
import * as IntelligentCrop from "./transformations/IntelligentCrop";
import * as ObjectCounter from "./transformations/ObjectCounter";
import * as NSFWDetection from "./transformations/NSFWDetection";
import * as NumberPlateDetection from "./transformations/NumberPlateDetection";
import * as ObjectDetection from "./transformations/ObjectDetection";
import * as CheckObjectSize from "./transformations/CheckObjectSize";
import * as TextDetectionandRecognition from "./transformations/TextDetectionandRecognition";
import * as PdfWatermarkRemoval from "./transformations/PdfWatermarkRemoval";
import * as ProductTagging from "./transformations/ProductTagging";
import * as CheckProductVisibility from "./transformations/CheckProductVisibility";
import * as Basic from "./transformations/Basic";
import * as SoftShadowGenerator from "./transformations/SoftShadowGenerator";
import * as SuperResolution from "./transformations/SuperResolution";
import * as VideoWatermarkRemoval from "./transformations/VideoWatermarkRemoval";
import * as ViewDetection from "./transformations/ViewDetection";
import * as WatermarkRemoval from "./transformations/WatermarkRemoval";
import * as WatermarkDetection from "./transformations/WatermarkDetection";
export namespace transformations {
    export { DetectBackgroundType };
    export { Artifact };
    export { AWSRekognitionPlugin };
    export { BackgroundGenerator };
    export { VariationGenerator };
    export { EraseBG };
    export { GoogleVisionPlugin };
    export { ImageCentering };
    export { IntelligentCrop };
    export { ObjectCounter };
    export { NSFWDetection };
    export { NumberPlateDetection };
    export { ObjectDetection };
    export { CheckObjectSize };
    export { TextDetectionandRecognition };
    export { PdfWatermarkRemoval };
    export { ProductTagging };
    export { CheckProductVisibility };
    export { Basic };
    export { SoftShadowGenerator };
    export { SuperResolution };
    export { VideoWatermarkRemoval };
    export { ViewDetection };
    export { WatermarkRemoval };
    export { WatermarkDetection };
}
import Image from "./image.js";
export { Pixelbin as default, Transformation };
