"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This util is just a leaky abstraction to make it easier to mock the fetch call
 */
const fetch_ponyfill_1 = __importDefault(require("fetch-ponyfill"));
const { fetch } = (0, fetch_ponyfill_1.default)();
function makeRequest(url, opts) {
    return fetch(url, opts);
}
exports.default = { makeRequest };
