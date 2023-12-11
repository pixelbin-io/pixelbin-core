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
export function upload(file: File, signedDetails: any, options?: {
    chunkSize: number;
    maxRetries: number;
    concurrency: number;
}): Promise<void>;
