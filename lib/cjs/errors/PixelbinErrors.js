"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDKTransformationError = exports.PDKIllegalQueryParameterError = exports.PDKIllegalArgumentError = exports.PDKInvalidUrlError = void 0;
class PDKInvalidUrlError extends Error {
    constructor(message) {
        super(message);
        this.name = "PDKInvalidUrlError";
    }
}
exports.PDKInvalidUrlError = PDKInvalidUrlError;
class PDKIllegalArgumentError extends Error {
    constructor(message) {
        super(message);
        this.name = "PDKIllegalArgumentError";
    }
}
exports.PDKIllegalArgumentError = PDKIllegalArgumentError;
class PDKIllegalQueryParameterError extends Error {
    constructor(message) {
        super(message);
        this.name = "PDKIllegalQueryParameterError";
    }
}
exports.PDKIllegalQueryParameterError = PDKIllegalQueryParameterError;
class PDKTransformationError extends Error {
    constructor(message) {
        super(message);
        this.name = "PDKTransformationError";
    }
}
exports.PDKTransformationError = PDKTransformationError;
