var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Image from "./image.js";
import Transformation from "./transformation";
import * as errors from "./errors/PixelbinErrors";
import { urlToObj, objToUrl } from "./utils";
import { upload } from "./upload";
import * as DetectBackgroundType from "./transformations/DetectBackgroundType";
import * as Artifact from "./transformations/Artifact";
import * as AWSRekognitionPlugin from "./transformations/AWSRekognitionPlugin";
import * as BackgroundGenerator from "./transformations/BackgroundGenerator";
import * as EraseBG from "./transformations/EraseBG";
import * as GoogleVisionPlugin from "./transformations/GoogleVisionPlugin";
import * as ImageCentering from "./transformations/ImageCentering";
import * as IntelligentCrop from "./transformations/IntelligentCrop";
import * as ObjectCounter from "./transformations/ObjectCounter";
import * as NumberPlateDetection from "./transformations/NumberPlateDetection";
import * as ObjectDetection from "./transformations/ObjectDetection";
import * as CheckObjectSize from "./transformations/CheckObjectSize";
import * as TextDetectionandRecognition from "./transformations/TextDetectionandRecognition";
import * as PdfWatermarkRemoval from "./transformations/PdfWatermarkRemoval";
import * as ProductTagging from "./transformations/ProductTagging";
import * as CheckProductVisibility from "./transformations/CheckProductVisibility";
import * as RemoveBG from "./transformations/RemoveBG";
import * as Basic from "./transformations/Basic";
import * as SuperResolution from "./transformations/SuperResolution";
import * as ViewDetection from "./transformations/ViewDetection";
import * as WatermarkRemoval from "./transformations/WatermarkRemoval";
import * as WatermarkDetection from "./transformations/WatermarkDetection";
/**
 * @typedef {Object} transformations
 * @property {DetectBackgroundType} DetectBackgroundType - Classifies the background of a product as plain, clean or busy
 * @property {Artifact} Artifact - Artifact Removal Plugin
 * @property {AWSRekognitionPlugin} AWSRekognitionPlugin - Detect objects and text in images
 * @property {BackgroundGenerator} BackgroundGenerator - AI Background Generator
 * @property {EraseBG} EraseBG - EraseBG Background Removal Module
 * @property {GoogleVisionPlugin} GoogleVisionPlugin - Detect content and text in images
 * @property {ImageCentering} ImageCentering - Image Centering Module
 * @property {IntelligentCrop} IntelligentCrop - Intelligent Crop Plugin
 * @property {ObjectCounter} ObjectCounter - Classifies whether objects in the image are single or multiple
 * @property {NumberPlateDetection} NumberPlateDetection - Number Plate Detection Plugin
 * @property {ObjectDetection} ObjectDetection - Detect bounding boxes of objects in the image
 * @property {CheckObjectSize} CheckObjectSize - Calculates the percentage of the main object area relative to image dimensions.
 * @property {TextDetectionandRecognition} TextDetectionandRecognition - OCR Module
 * @property {PdfWatermarkRemoval} PdfWatermarkRemoval - PDF Watermark Removal Plugin
 * @property {ProductTagging} ProductTagging - AI Product Tagging
 * @property {CheckProductVisibility} CheckProductVisibility - Classifies whether the product in the image is completely visible or not
 * @property {RemoveBG} RemoveBG - Remove background from any image
 * @property {Basic} Basic - Basic Transformations
 * @property {SuperResolution} SuperResolution - Super Resolution Module
 * @property {ViewDetection} ViewDetection - Classifies wear type and view type of products in the image
 * @property {WatermarkRemoval} WatermarkRemoval - Watermark Removal Plugin
 * @property {WatermarkDetection} WatermarkDetection - Watermark Detection Plugin
 */
/**
 * class to create a Pixelbin object
 */
class Pixelbin {
    /**
     * @param {Object} cloud-details takes detail for cloud name and zone
     */
    constructor({ cloudName, zone }) {
        this.cloudName = cloudName;
        this.zone = zone === "default" ? "" : zone || "";
    }
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
    image(imageUri, options = {}) {
        return new Image(imageUri, this.cloudName, this.zone, options.worker);
    }
    /**
     * provides access to url utilities
     * returns Object
     */
    static get utils() {
        return { objToUrl, urlToObj };
    }
    /**
     *
     * @param {File} file
     * @param {Object} signedDetails generated with @pixelbin/core sdk
     * @returns Promise
     */
    static upload(file, signedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return upload(file, signedDetails);
        });
    }
}
/**
 * provides access to pixelbin transformations
 * @returns {transformations}
 */
Pixelbin.transformations = {
    DetectBackgroundType,
    Artifact,
    AWSRekognitionPlugin,
    BackgroundGenerator,
    EraseBG,
    GoogleVisionPlugin,
    ImageCentering,
    IntelligentCrop,
    ObjectCounter,
    NumberPlateDetection,
    ObjectDetection,
    CheckObjectSize,
    TextDetectionandRecognition,
    PdfWatermarkRemoval,
    ProductTagging,
    CheckProductVisibility,
    RemoveBG,
    Basic,
    SuperResolution,
    ViewDetection,
    WatermarkRemoval,
    WatermarkDetection,
};
Pixelbin.Transformation = Transformation;
const transformations = Pixelbin.transformations;
export { Pixelbin as default, Transformation, transformations };
