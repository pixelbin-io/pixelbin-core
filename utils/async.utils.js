const mapLimit = async (arr, limit, asyncFn) => {
    const results = [];
    const promises = [];

    for (let i = 0; i < arr.length; i++) {
        const p = asyncFn(arr[i], i, arr);
        promises.push(p);

        if (promises.length >= limit) {
            results.push(...(await Promise.all(promises)));
            promises.length = 0;
        }
    }

    if (promises.length > 0) {
        results.push(...(await Promise.all(promises)));
    }

    return results;
};

export default { mapLimit };
