export function getUrlParts(pixelbinUrl: any, config: any): {
    protocol: string;
    host: string;
    search: string;
    version: string;
    worker: boolean;
    workerPath: string;
};
import { version2Regex } from "./regex";
export { version2Regex };
