import { default as FormData } from "form-data";
import httpUtils from "./utils/http.utils";

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
 * @returns Promise
 */
async function upload(file, signedDetails) {
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

    return await uploadToS3(url, fields, file);
}

export { upload };
