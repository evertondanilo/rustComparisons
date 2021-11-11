import * as wasm from "wasm-algorithm";
import * as jsLib from "../src/jsLib";
import * as jsUtils from "../src/jsUtils";

const dataSetSizes = [
    // 10 ** 5,
    // 10 ** 6,
    // 10 ** 7,
    // 10 ** 8, // to big
    // 10 ** 9,
    // 10 ** 10,
    // 10 ** 11,
    // 10 ** 12,
    // 10 ** 13,
    10 ** 8
];

const wa = wasm.Starter.new();
const jas = new jsLib.Jas();

console.log('dataSetSize', dataSetSizes[0]);

let dataSet = new Array(dataSetSizes[0]);

const lookForNumber = BigInt(jsUtils.getRandomInteger(0, dataSetSizes[0]));
let response = -1;

jsUtils.orderedDataSet(dataSet);

// JS
jsUtils.printLastNDataSetValues(dataSet, 5);
console.log('IsOrdered?', jsUtils.isDataSetOrdered(dataSet));
response = jas.binarySearch(lookForNumber, dataSet);
const usedMemoryJInBM = jsUtils.getMemoryStatsInMB();
console.log('used memory (MB)', usedMemoryJInBM);
console.log('elapse Time', jas.elapseTime);
console.log(`Number ${lookForNumber} found? ${response > -1}`);

// WASM
jsUtils.printLastNDataSetValues(dataSet, 5);
console.log('IsOrdered?', jsUtils.isDataSetOrdered(dataSet));
response = wa.binary_search(lookForNumber, dataSet);
const usedMemoryWInBM = jsUtils.getMemoryStatsInMB();
console.log('used memory (MB)', usedMemoryWInBM);
console.log('elapse time', wa.elapse_time());
console.log(`Number ${lookForNumber} found? ${response > -1}`);