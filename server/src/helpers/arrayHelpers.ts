export const average = (array: number[]) => {
    return Number((array.reduce((a, b) => a + b) / array.length).toFixed(1));
};

export const max = (array: number[]) => {
    return Number(Math.max.apply(null, array).toFixed(1));
};

export const min = (array: number[]) => {
    return Number(Math.min.apply(null, array).toFixed(1));
};

export const median = (array: number[]) => {
    array.sort(function (a, b) {
        return a - b;
    });
    const mid = array.length / 2;
    return mid % 1
        ? Number(array[mid - 0.5].toFixed(1))
        : Number(((array[mid - 1] + array[mid]) / 2).toFixed(1));
};
