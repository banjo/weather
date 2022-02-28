export const average = (array: number[]) => {
    return array.reduce((a, b) => a + b) / array.length;
};

export const max = (array: number[]) => {
    return Math.max.apply(null, array);
};

export const min = (array: number[]) => {
    return Math.min.apply(null, array);
};

export const median = (array: number[]) => {
    array.sort(function (a, b) {
        return a - b;
    });
    const mid = array.length / 2;
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
};
