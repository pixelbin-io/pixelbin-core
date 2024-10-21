export function generateBG(config?: {
    backgroundPrompt: string;
    negativePrompt: string;
    seed: number;
    guidanceScale: number;
}): Transformation;
export function removeBG(config?: {}): Transformation;
export function upscale(config?: {
    type: string;
}): Transformation;
declare namespace _default {
    export { generateBG };
    export { removeBG };
    export { upscale };
}
export default _default;
import Transformation from "../transformation.js";
