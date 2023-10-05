/**
 * This util is just a leaky abstraction to make it easier to mock the fetch call
 */
import fetchPonyfill from "fetch-ponyfill";
const { fetch } = fetchPonyfill();
function makeRequest(url, opts) {
    return fetch(url, opts);
}
export default { makeRequest };
