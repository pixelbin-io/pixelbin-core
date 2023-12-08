import { default as FormData } from "form-data";
import httpUtils from "./utils/http.utils";
import asyncUtils from "./utils/async.utils";

async function uploadToS3(url, fields, file) {
    const form = new FormData();
    Object.entries(fields).forEach(([k, v]) => {
        form.append(k, v);
    });
    form.append("file", file);

    const res = await httpUtils.makeRequest(url, {
        method: "POST",
        body: form,
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return;
}

// compat function for File and Buffer usage
const getFileSize = (file) => {
    if (file.size) return file.size;
    if (file.byteLength) return file.byteLength;
    return 0;
};

async function uploadToGCS(url, fields, file) {
    const res = await httpUtils.makeRequest(url, {
        method: "PUT",
        body: file,
        headers: fields,
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return;
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
async function multipartUploadToPixelBin(url, fields, file, options) {
    const uploadChunk = async (url, fields, chunk, partNumber, maxRetries) => {
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
        while (retries < maxRetries) {
            try {
                let chunk = prepareChunk();
                res = await httpUtils.makeRequest(chunk.url, {
                    method: "PUT",
                    body: chunk.form,
                });
                if (!res.ok) {
                    const error = await res.json();
                    throw error;
                }
                return;
            } catch (err) {
                retries++;
                if (retries >= maxRetries) throw err;
            }
        }

        if (!res.ok) {
            const error = await res.json();
            throw error;
        }
        return;
    };

    const completeMultipartUpload = async (url, fields) => {
        const urlObj = new URL(url);
        const res = await httpUtils.makeRequest(urlObj.toString(), {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parts: fileChunks.map((chunk) => chunk.partNumber),
                ...fields,
            }),
        });
        if (!res.ok) {
            const error = await res.json();
            throw error;
        }
    };

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

    await asyncUtils.mapLimit(fileChunks, concurrency, async (chunk) => {
        return await uploadChunk(url, fields, chunk.chunk, chunk.partNumber, maxRetries);
    });

    await completeMultipartUpload(url, fields);

    return;
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
async function upload(file, signedDetails, options = {}) {
    if (!options.chunkSize) options.chunkSize = 1 * 1024 * 1024; // 1MB
    if (!options.maxRetries) options.maxRetries = 2;
    if (!options.concurrency) options.concurrency = 3;

    // get presigned POST Url for upload
    const { url, fields } = signedDetails;
    if (!url || !Object.keys(fields).length)
        return Promise.reject(
            new Error("Please provide the correct object. Refer upload api docs for details."),
        );

    const urlObj = new URL(url);
    /**
     * File storage has been moved to Google Cloud Storage.
     * For backward compatibility, we will continue to support the both storages.
     */

    /**
     * Not using an exact match here so we can change the url in the future.
     */
    if (urlObj.hostname.includes("storage.googleapis.com")) {
        return await uploadToGCS(url, fields, file);
    }

    /**
     * PixelBin Signed Multipart Upload API v1.0
     */
    if (urlObj.pathname === "/service/public/assets/v1.0/signed-multipart") {
        return await multipartUploadToPixelBin(url, fields, file, options);
    }

    return await uploadToS3(url, fields, file);
}

export { upload };
