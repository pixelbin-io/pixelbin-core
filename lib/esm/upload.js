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
import asyncUtils from "./utils/async.utils";
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
// compat function for File and Buffer usage
const getFileSize = (file) => {
    if (file.size)
        return file.size;
    if (file.byteLength)
        return file.byteLength;
    return 0;
};
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
 * @param {Object} options
 * @param {Number} options.chunkSize
 * @param {Number} options.maxRetries
 * @param {Number} options.concurrency
 * @returns Promise
 */
function multipartUploadToPixelBin(url, fields, file, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadChunk = (url, fields, chunk, partNumber, maxRetries) => __awaiter(this, void 0, void 0, function* () {
            let retries = 0;
            const prepareChunk = () => {
                const form = new FormData();
                Object.entries(fields).forEach(([k, v]) => {
                    form.append(k, v);
                });
                form.append("file", chunk);
                const urlObj = new URL(url);
                urlObj.searchParams.append("partNumber", partNumber);
                return { form, url: urlObj.toString() };
            };
            let res;
            while (retries <= maxRetries) {
                try {
                    let chunk = prepareChunk();
                    res = yield httpUtils.makeRequest(chunk.url, {
                        method: "PUT",
                        body: chunk.form,
                    });
                    if (!res.ok) {
                        const error = yield res.json();
                        throw error;
                    }
                    return;
                }
                catch (err) {
                    retries++;
                    if (retries >= maxRetries)
                        throw err;
                }
            }
            if (!res.ok) {
                const error = yield res.json();
                throw error;
            }
            return;
        });
        const completeMultipartUpload = (url, fields) => __awaiter(this, void 0, void 0, function* () {
            const urlObj = new URL(url);
            const res = yield httpUtils.makeRequest(urlObj.toString(), {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Object.assign({ parts: fileChunks.map((chunk) => chunk.partNumber) }, fields)),
            });
            if (!res.ok) {
                const error = yield res.json();
                throw error;
            }
            return res.json();
        });
        const createChunks = (file, chunkSize) => {
            const fileChunks = [];
            let start = 0;
            let end = chunkSize;
            const fileSize = getFileSize(file);
            while (start < fileSize) {
                end = Math.min(end, fileSize);
                fileChunks.push({
                    chunk: file.slice(start, end),
                    start,
                    end,
                    partNumber: fileChunks.length + 1,
                });
                start = end;
                end = start + chunkSize;
            }
            if (fileChunks.length === 0) {
                throw new Error("File size is 0");
            }
            return fileChunks;
        };
        const { chunkSize, maxRetries, concurrency } = options;
        const fileChunks = createChunks(file, chunkSize);
        yield asyncUtils.mapLimit(fileChunks, concurrency, (chunk) => __awaiter(this, void 0, void 0, function* () {
            return yield uploadChunk(url, fields, chunk.chunk, chunk.partNumber, maxRetries);
        }));
        return completeMultipartUpload(url, fields);
    });
}
/**
 *
 * @param {File} file - The file to be uploaded.
 * @param {Object} signedDetails - The signed details generated when initiating signed url upload
 * @param {Object} [options] - The upload options.
 * @param {Number} [options.chunkSize=1048576] - The chunk size in bytes. Default is 1MB.
 * @param {Number} [options.maxRetries=2] - The maximum number of retries. Default is 2.
 * @param {Number} [options.concurrency=3] - The number of concurrent uploads. Default is 3.
 * @returns {Promise<void|Object>} - Returns the file metadata if you are using v2 signed url
 */
function upload(file, signedDetails, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options.chunkSize)
            options.chunkSize = 1 * 1024 * 1024; // 1MB
        if (options.maxRetries == undefined)
            options.maxRetries = 2;
        if (!options.concurrency)
            options.concurrency = 3;
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
        /**
         * PixelBin Signed Multipart Upload API v1.0
         */
        if (urlObj.pathname === "/service/public/assets/v1.0/signed-multipart") {
            return yield multipartUploadToPixelBin(url, fields, file, options);
        }
        return yield uploadToS3(url, fields, file);
    });
}
export { upload };
