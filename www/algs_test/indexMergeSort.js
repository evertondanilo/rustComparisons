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
    10 ** 7
];

const wa = wasm.Starter.new();
const jas = new jsLib.Jas();

console.log('dataSetSize', dataSetSizes[0]);

let dataSet = new Array(dataSetSizes[0]);

// JS
jsUtils.randomizeDataSet(dataSet);
jsUtils.printLastNDataSetValues(dataSet, 5);
console.log('IsOrdered?', jsUtils.isDataSetOrdered(dataSet));
dataSet = jas.mergeSortCall(dataSet); // is ordering by reference
const usedMemoryJInBM = jsUtils.getMemoryStatsInMB();
console.log('used memory (MB)', usedMemoryJInBM);
console.log('elapse Time', jas.elapseTime);
jsUtils.printLastNDataSetValues(dataSet, 5);
console.log('IsOrdered?', jsUtils.isDataSetOrdered(dataSet));

// WASM
jsUtils.randomizeDataSet(dataSet);
jsUtils.printLastNDataSetValues(dataSet, 5);
console.log('IsOrdered?', jsUtils.isDataSetOrdered(dataSet));
dataSet = wa.main_merge_call(dataSet);
const usedMemoryWInBM = jsUtils.getMemoryStatsInMB();
console.log('used memory (MB)', usedMemoryWInBM);
console.log('elapse time', wa.elapse_time());
jsUtils.printLastNDataSetValues(dataSet, 5);
console.log('IsOrdered?', jsUtils.isDataSetOrdered(dataSet));