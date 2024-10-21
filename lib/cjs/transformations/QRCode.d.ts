export function generate(config?: {
    width: number;
    height: number;
    image: string;
    margin: number;
    qRTypeNumber: number;
    qrErrorCorrectionLevel: string;
    imageSize: number;
    imageMargin: number;
    dotsColor: string;
    dotsType: string;
    dotsBgColor: string;
    cornerSquareColor: string;
    cornerSquareType: string;
    cornerDotsColor: string;
    cornerDotsType: string;
}): Transformation;
export function scan(config?: {}): Transformation;
declare namespace _default {
    export { generate };
    export { scan };
}
export default _default;
import Transformation from "../transformation.js";
