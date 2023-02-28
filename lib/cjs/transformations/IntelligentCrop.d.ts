export function crop(config?: {
    requiredWidth: number;
    requiredHeight: number;
    paddingPercentage: number;
    maintainOriginalAspect: boolean;
    aspectRatio: string;
    gravityTowards: string;
    preferredDirection: string;
    objectType: string;
}): Transformation;
declare namespace _default {
    export { crop };
}
export default _default;
import Transformation from "../transformation.js";
