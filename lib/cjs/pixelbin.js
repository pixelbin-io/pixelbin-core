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
require("core-js/stable");
require("regenerator-runtime/runtime");
const image_js_1 = __importDefault(require("./image.js"));
const transformation_1 = __importDefault(require("./transformation"));
exports.Transformation = transformation_1.default;
const utils_1 = require("./utils");
const upload_1 = require("./upload");
const Basic = __importStar(require("./transformations/Basic"));
const RemoveBG = __importStar(require("./transformations/RemoveBG"));
const EraseBG = __importStar(require("./transformations/EraseBG"));
const SuperResolution = __importStar(require("./transformations/SuperResolution"));
const ArtifactRemoval = __importStar(require("./transformations/ArtifactRemoval"));
const WatermarkRemoval = __importStar(require("./transformations/WatermarkRemoval"));
const AWSRekognition = __importStar(require("./transformations/AWSRekognition"));
const GoogleVision = __importStar(require("./transformations/GoogleVision"));
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
        return new image_js_1.default(imageUri, this.cloudName, this.zone);
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
     * @returns Promise
     */
    static upload(file, signedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, upload_1.upload)(file, signedDetails);
        });
    }
}
exports.default = Pixelbin;
/**
 * provides access to pixelbin transformations
 * @returns {transformations}
 */
Pixelbin.transformations = {
    Basic,
    RemoveBG,
    EraseBG,
    SuperResolution,
    ArtifactRemoval,
    WatermarkRemoval,
    AWSRekognition,
    GoogleVision,
};
Pixelbin.Transformation = transformation_1.default;
const transformations = Pixelbin.transformations;
exports.transformations = transformations;
