class PDKInvalidUrlError extends Error {
    constructor(message) {
        super(message);
        this.name = "PDKInvalidUrlError";
    }
}
class PDKIllegalArgumentError extends Error {
    constructor(message) {
        super(message);
        this.name = "PDKIllegalArgumentError";
    }
}
class PDKIllegalQueryParameterError extends Error {
    constructor(message) {
        super(message);
        this.name = "PDKIllegalQueryParameterError";
    }
}
class PDKTransformationError extends Error {
    constructor(message) {
        super(message);
        this.name = "PDKTransformationError";
    }
}
export { PDKInvalidUrlError, PDKIllegalArgumentError, PDKIllegalQueryParameterError, PDKTransformationError, };
