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
class Pixelbin {
    /**
     * @param {Object} cloud-details takes detail for cloud name and zone
     */
    constructor({ cloudName, zone }) {
        this.cloudName = cloudName;
        this.zone = zone === "default" ? "" : zone || "";
    }
    /**
     * provides image on which transformation can be done.
     * @param {String} imageUri path of image.
     * returns Image
     */
    image(imageUri) {
        return new Image(imageUri, this.cloudName, this.zone);
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
    Basic,
    RemoveBG,
    EraseBG,
    SuperResolution,
    Artifact,
    WatermarkRemoval,
    AWSRekognitionPlugin,
    GoogleVisionPlugin,
    WatermarkDetection,
    IntelligentCrop,
    TextDetectionandRecognition,
    NumberPlateDetection,
    ImageCentering,
};
Pixelbin.Transformation = Transformation;
const transformations = Pixelbin.transformations;
export { Pixelbin as default, Transformation, transformations };
