export function detectLabels(config?: {
    maximumLabels: number;
    minimumConfidence: number;
}): Transformation;
export function moderation(config?: {
    minimumConfidence: number;
}): Transformation;
declare namespace _default {
    export { detectLabels };
    export { moderation };
}
export default _default;
import Transformation from "../transformation.js";
