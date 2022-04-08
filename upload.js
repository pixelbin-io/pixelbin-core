import axios from "axios";

async function signedUpload(url, form) {
    return axios
        .post(url, form)
        .then((res) => {
            Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
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
    return signedUpload(url, form);
}

export { upload };
