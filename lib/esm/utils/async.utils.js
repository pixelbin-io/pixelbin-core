var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mapLimit = (arr, limit, asyncFn) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    const promises = [];
    for (let i = 0; i < arr.length; i++) {
        const p = asyncFn(arr[i], i, arr);
        promises.push(p);
        if (promises.length >= limit) {
            results.push(...(yield Promise.all(promises)));
            promises.length = 0;
        }
    }
    if (promises.length > 0) {
        results.push(...(yield Promise.all(promises)));
    }
    return results;
});
export default { mapLimit };
