"use strict";
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
exports.upload = void 0;
const axios_1 = __importDefault(require("axios"));
function signedUpload(url, form) {
    return __awaiter(this, void 0, void 0, function* () {
        return axios_1.default
            .post(url, form)
            .then((res) => {
            Promise.resolve(res);
        })
            .catch((err) => {
            return Promise.reject(err);
        });
    });
}
/**
 *
 * @param {File} file
 * @param {Object} signedDetails generated with @pixelbin/core sdk
 * @returns Promise
 */
function upload(file, signedDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        // get presigned POST Url for upload
        const { url, fields } = signedDetails;
        if (!url || !Object.keys(fields).length)
            return Promise.reject(new Error("Please provide the correct object. Refer upload api docs for details."));
        const form = new FormData();
        Object.entries(fields).forEach(([k, v]) => {
            form.append(k, v);
        });
        form.append("file", file);
        return signedUpload(url, form);
    });
}
exports.upload = upload;
