export const printFirstNDataSetValues = (dataSet, n) => {
    const length = n < dataSet.length ? n : dataSet.length;
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(dataSet[i])
    }
    console.log(array);
}

export const printLastNDataSetValues = (dataSet, n) => {
    let start = dataSet.length - n;
    start = start < 0 ? 0 : start;
    const length = dataSet.length;
    let array = [];
    for (let i = start; i < length; i++) {
        array.push(dataSet[i])
    }
    console.log(array);
}

export const randomizeDataSet = dataSet => {
    const length = dataSet.length;
    for (let i = 0; i < length; i++) {
        dataSet[i] = BigInt(getRandomMaxInt());
    }
}

export const orderedDataSet = dataSet => {
    const length = dataSet.length;
    for (let i = 0; i < length; i++) {
        dataSet[i] = BigInt(i);
    }
}

export const isDataSetOrdered = (dataSet, maxIndex) => {
    const length = maxIndex < dataSet.length ? maxIndex : dataSet.length;
    for (let i = 1; i < length; i++) {
        if (dataSet[i - 1] > dataSet[i]) {
            return false;
        }
    }
    return true;
}

export const getRandomMaxInt = () => Math.floor(Math.random() * 10000000);

export const getRandomInteger = (min, max) => {
    // here rand is from min to (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const getMemoryStatsInMB = () => {
    const ms = performance.memory.usedJSHeapSize
    const mbValue = ms / (1024*1024);
    return mbValue;
}