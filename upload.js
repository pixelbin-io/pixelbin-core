import fetchPonyfill from "fetch-ponyfill";
const { fetch } = fetchPonyfill();
import { default as FormData } from "form-data";

async function postFormData(url, form) {
    const res = await fetch(url, {
        method: "POST",
        body: form,
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
    const form = new FormData();
    Object.entries(fields).forEach(([k, v]) => {
        form.append(k, v);
    });
    form.append("file", file);
    return await postFormData(url, form);
}

export { upload };
