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
    30
];

const wa = wasm.Starter.new();
const jas = new jsLib.Jas();

console.log('dataSetSize', dataSetSizes[0]);

let response;

// JS
response = jas.fibRecursive(dataSetSizes[0]);
const usedMemoryJInBM = jsUtils.getMemoryStatsInMB();
console.log('used memory (MB)', usedMemoryJInBM);
console.log('elapse Time', jas.elapseTime);
console.log(`fibo of ${dataSetSizes[0]}: ${response}`);

// WASM
response = wa.fib_recursive(BigInt(dataSetSizes[0]));
const usedMemoryWInBM = jsUtils.getMemoryStatsInMB();
console.log('used memory (MB)', usedMemoryWInBM);
console.log('elapse time', wa.elapse_time());
console.log(`fibo of ${dataSetSizes[0]}: ${response}`);