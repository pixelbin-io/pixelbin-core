var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { default as FormData } from "form-data";
import httpUtils from "./utils/http.utils";
function uploadToS3(url, fields, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const form = new FormData();
        Object.entries(fields).forEach(([k, v]) => {
            form.append(k, v);
        });
        form.append("file", file);
        const res = yield httpUtils.makeRequest(url, {
            method: "POST",
            body: form,
        });
        if (!res.ok) {
            const error = yield res.json();
            throw new Error(error.message);
        }
        return;
    });
}
function uploadToGCS(url, fields, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield httpUtils.makeRequest(url, {
            method: "PUT",
            body: file,
            headers: fields,
        });
        if (!res.ok) {
            const error = yield res.json();
            throw new Error(error.message);
        }
        return;
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
        const urlObj = new URL(url);
        /**
         * File storage has been moved to Google Cloud Storage.
         * For backward compatibility, we will continue to support the both storages.
         */
        /**
         * Not using an exact match here so we can change the url in the future.
         */
        if (urlObj.hostname.includes("storage.googleapis.com")) {
            return yield uploadToGCS(url, fields, file);
        }
        return yield uploadToS3(url, fields, file);
    });
}
export { upload };
