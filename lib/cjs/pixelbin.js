"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformations = exports.Transformation = exports.default = void 0;
const image_js_1 = __importDefault(require("./image.js"));
const transformation_1 = __importDefault(require("./transformation"));
exports.Transformation = transformation_1.default;
const errors = __importStar(require("./errors/PixelbinErrors"));
const utils_1 = require("./utils");
const upload_1 = require("./upload");
const DetectBackgroundType = __importStar(require("./transformations/DetectBackgroundType"));
const Basic = __importStar(require("./transformations/Basic"));
const Artifact = __importStar(require("./transformations/Artifact"));
const AWSRekognitionPlugin = __importStar(require("./transformations/AWSRekognitionPlugin"));
const BackgroundGenerator = __importStar(require("./transformations/BackgroundGenerator"));
const ImageExtender = __importStar(require("./transformations/ImageExtender"));
const VariationGenerator = __importStar(require("./transformations/VariationGenerator"));
const EraseBG = __importStar(require("./transformations/EraseBG"));
const GoogleVisionPlugin = __importStar(require("./transformations/GoogleVisionPlugin"));
const ImageCentering = __importStar(require("./transformations/ImageCentering"));
const IntelligentCrop = __importStar(require("./transformations/IntelligentCrop"));
const IntelligentMasking = __importStar(require("./transformations/IntelligentMasking"));
const ObjectCounter = __importStar(require("./transformations/ObjectCounter"));
const NSFWDetection = __importStar(require("./transformations/NSFWDetection"));
const NumberPlateDetection = __importStar(require("./transformations/NumberPlateDetection"));
const ObjectDetection = __importStar(require("./transformations/ObjectDetection"));
const CheckObjectSize = __importStar(require("./transformations/CheckObjectSize"));
const TextDetectionandRecognition = __importStar(require("./transformations/TextDetectionandRecognition"));
const PdfWatermarkRemoval = __importStar(require("./transformations/PdfWatermarkRemoval"));
const ProductTagging = __importStar(require("./transformations/ProductTagging"));
const CheckProductVisibility = __importStar(require("./transformations/CheckProductVisibility"));
const QRCode = __importStar(require("./transformations/QRCode"));
const SoftShadowGenerator = __importStar(require("./transformations/SoftShadowGenerator"));
const SuperResolution = __importStar(require("./transformations/SuperResolution"));
const VertexAI = __importStar(require("./transformations/VertexAI"));
const VideoWatermarkRemoval = __importStar(require("./transformations/VideoWatermarkRemoval"));
const VideoUpscalerPlugin = __importStar(require("./transformations/VideoUpscalerPlugin"));
const ViewDetection = __importStar(require("./transformations/ViewDetection"));
const WatermarkRemoval = __importStar(require("./transformations/WatermarkRemoval"));
const WatermarkDetection = __importStar(require("./transformations/WatermarkDetection"));
/**
 * @typedef {Object} transformations
 * @property {DetectBackgroundType} DetectBackgroundType - Classifies the background of a product as plain, clean or busy
 * @property {Basic} Basic - Basic Transformations
 * @property {Artifact} Artifact - Artifact Removal Plugin
 * @property {AWSRekognitionPlugin} AWSRekognitionPlugin - Detect objects and text in images
 * @property {BackgroundGenerator} BackgroundGenerator - AI Background Generator
 * @property {ImageExtender} ImageExtender - AI Image Extender
 * @property {VariationGenerator} VariationGenerator - AI Variation Generator
 * @property {EraseBG} EraseBG - EraseBG Background Removal Module
 * @property {GoogleVisionPlugin} GoogleVisionPlugin - Detect content and text in images
 * @property {ImageCentering} ImageCentering - Image Centering Module
 * @property {IntelligentCrop} IntelligentCrop - Intelligent Crop Plugin
 * @property {IntelligentMasking} IntelligentMasking - Intelligent Masking
 * @property {ObjectCounter} ObjectCounter - Classifies whether objects in the image are single or multiple
 * @property {NSFWDetection} NSFWDetection - Detect NSFW content in images
 * @property {NumberPlateDetection} NumberPlateDetection - Number Plate Detection Plugin
 * @property {ObjectDetection} ObjectDetection - Detect bounding boxes of objects in the image
 * @property {CheckObjectSize} CheckObjectSize - Calculates the percentage of the main object area relative to image dimensions.
 * @property {TextDetectionandRecognition} TextDetectionandRecognition - OCR Module
 * @property {PdfWatermarkRemoval} PdfWatermarkRemoval - PDF Watermark Removal Plugin
 * @property {ProductTagging} ProductTagging - AI Product Tagging
 * @property {CheckProductVisibility} CheckProductVisibility - Classifies whether the product in the image is completely visible or not
 * @property {QRCode} QRCode - QRCode Plugin
 * @property {SoftShadowGenerator} SoftShadowGenerator - AI Soft Shadow Generator
 * @property {SuperResolution} SuperResolution - Super Resolution Module
 * @property {VertexAI} VertexAI - Vertex AI based transformations
 * @property {VideoWatermarkRemoval} VideoWatermarkRemoval - Video Watermark Removal Plugin
 * @property {VideoUpscalerPlugin} VideoUpscalerPlugin - Video Upscaler Plugin
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
        return new image_js_1.default(imageUri, this.cloudName, this.zone, options.worker);
    }
    /**
     * provides access to url utilities
     * returns Object
     */
    static get utils() {
        return { objToUrl: utils_1.objToUrl, urlToObj: utils_1.urlToObj };
    }
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
    static upload(file, signedDetails, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, upload_1.upload)(file, signedDetails, options);
        });
    }
}
exports.default = Pixelbin;
/**
 * provides access to pixelbin transformations
 * @returns {transformations}
 */
Pixelbin.transformations = {
    DetectBackgroundType,
    Basic,
    Artifact,
    AWSRekognitionPlugin,
    BackgroundGenerator,
    ImageExtender,
    VariationGenerator,
    EraseBG,
    GoogleVisionPlugin,
    ImageCentering,
    IntelligentCrop,
    IntelligentMasking,
    ObjectCounter,
    NSFWDetection,
    NumberPlateDetection,
    ObjectDetection,
    CheckObjectSize,
    TextDetectionandRecognition,
    PdfWatermarkRemoval,
    ProductTagging,
    CheckProductVisibility,
    QRCode,
    SoftShadowGenerator,
    SuperResolution,
    VertexAI,
    VideoWatermarkRemoval,
    VideoUpscalerPlugin,
    ViewDetection,
    WatermarkRemoval,
    WatermarkDetection,
};
Pixelbin.Transformation = transformation_1.default;
const transformations = Pixelbin.transformations;
exports.transformations = transformations;
