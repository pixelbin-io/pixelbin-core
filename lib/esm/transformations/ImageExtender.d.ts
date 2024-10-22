export function extend(config?: {
    boundingBox: any;
    prompt: string;
    negativePrompt: string;
    strength: number;
    guidanceScale: number;
    numberOfInferenceSteps: number;
    colorAdjust: boolean;
    seed: number;
}): Transformation;
declare namespace _default {
    export { extend };
}
export default _default;
import Transformation from "../transformation.js";
