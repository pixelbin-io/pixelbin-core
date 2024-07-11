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
export function upload(file: File, signedDetails: any, options?: {
    chunkSize?: number;
    maxRetries?: number;
    concurrency?: number;
}): Promise<void | any>;
