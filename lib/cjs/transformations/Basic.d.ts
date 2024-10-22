export function resize(config?: {
    height: number;
    width: number;
    fit: string;
    background: string;
    position: string;
    algorithm: string;
    dpr: number;
}): Transformation;
export function compress(config?: {
    quality: number;
}): Transformation;
export function extend(config?: {
    top: number;
    left: number;
    bottom: number;
    right: number;
    background: string;
    borderType: string;
    dpr: number;
}): Transformation;
export function extract(config?: {
    top: number;
    left: number;
    height: number;
    width: number;
    boundingBox: any;
}): Transformation;
export function trim(config?: {
    threshold: number;
}): Transformation;
export function rotate(config?: {
    angle: number;
    background: string;
}): Transformation;
export function flip(config?: {}): Transformation;
export function flop(config?: {}): Transformation;
export function sharpen(config?: {
    sigma: number;
}): Transformation;
export function median(config?: {
    size: number;
}): Transformation;
export function blur(config?: {
    sigma: number;
    dpr: number;
}): Transformation;
export function flatten(config?: {
    background: string;
}): Transformation;
export function negate(config?: {}): Transformation;
export function normalise(config?: {}): Transformation;
export function linear(config?: {
    a: number;
    b: number;
}): Transformation;
export function modulate(config?: {
    brightness: number;
    saturation: number;
    hue: number;
}): Transformation;
export function grey(config?: {}): Transformation;
export function tint(config?: {
    color: string;
}): Transformation;
export function toFormat(config?: {
    format: string;
    quality: string;
}): Transformation;
export function density(config?: {
    density: number;
}): Transformation;
export function merge(config?: {
    mode: string;
    image: string;
    transformation: string;
    background: string;
    height: number;
    width: number;
    top: number;
    left: number;
    gravity: string;
    blend: string;
    tile: boolean;
    listOfBboxes: any;
    listOfPolygons: any;
}): Transformation;
declare namespace _default {
    export { resize };
    export { compress };
    export { extend };
    export { extract };
    export { trim };
    export { rotate };
    export { flip };
    export { flop };
    export { sharpen };
    export { median };
    export { blur };
    export { flatten };
    export { negate };
    export { normalise };
    export { linear };
    export { modulate };
    export { grey };
    export { tint };
    export { toFormat };
    export { density };
    export { merge };
}
export default _default;
import Transformation from "../transformation.js";
