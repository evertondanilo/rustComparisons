import * as wasm from "wasm-algorithm";
import * as jsLib from "./jsLib";
import * as jsUtils from "./jsUtils";
import * as ui from "./ui";
import { Measurement, Report } from "./report";
import { AlgNames, AlgNamesReport, AlgTypes, AlgMetrics } from "./constants";

const wa = wasm.Starter.new();
const jas = new jsLib.Jas();

const urlParams = new URLSearchParams(window.location.search);
const paramAlgName = urlParams.get('algName');
const paramAlgType = urlParams.get('algType');

ui.initializeRadioGroups(paramAlgName, paramAlgType);

let dataSetSizes = Array(0);
let theAlg = null;
let reportMemory = null;
let reportElapseTime = null;

switch (paramAlgName) {
    case AlgNames.mergeSort:
        dataSetSizes = [
            75000,  //1
            100000, //2
            125000, //3
            250000, //4
            375000, //5
            500000, //6
            625000, //7
            750000, //8
            875000, //9
            1000000, //10
        ];
        reportMemory = new Report(AlgNamesReport.mergeSort, AlgMetrics.memory, paramAlgType, dataSetSizes);
        reportElapseTime = new Report(AlgNamesReport.mergeSort, AlgMetrics.elapseTime, paramAlgType, dataSetSizes);
        theAlg = (size, algType) => {
            let fnAlg = null;
            let elapseTimeByRef = null;
            let aRandomizedDS = new Array(size);
            jsUtils.randomizeDataSet(aRandomizedDS);

            if (algType === AlgTypes.js) {
                fnAlg = () => {
                    jas.mergeSortCall(aRandomizedDS); // is ordering by reference
                    elapseTimeByRef = jas.elapseTime;
                }
            } else {
                fnAlg = () => {
                    wa.main_merge_call(aRandomizedDS);
                    elapseTimeByRef = wa.elapse_time();
                }
            }

            fnAlg();
            const usedMemoryInBM = jsUtils.getMemoryStatsInMB();

            return new Measurement(elapseTimeByRef, usedMemoryInBM);
        }
        break;
    case AlgNames.binarySearch:
        dataSetSizes = [
            75000,  //1
            100000, //2
            125000, //3
            250000, //4
            375000, //5
            500000, //6
            625000, //7
            750000, //8
            875000, //9
            1000000, //10
        ];
        reportMemory = new Report(AlgNamesReport.binarySearch, AlgMetrics.memory, paramAlgType, dataSetSizes);
        reportElapseTime = new Report(AlgNamesReport.binarySearch, AlgMetrics.elapseTime, paramAlgType, dataSetSizes);
        theAlg = (size, algType) => {
            let fnAlg = null;
            let elapseTimeByRef = null;
            const lookForNumber = BigInt(jsUtils.getRandomInteger(0, size));
            let orderedDS = new Array(size);
            jsUtils.orderedDataSet(orderedDS);

            if (algType === AlgTypes.js) {
                fnAlg = () => {
                    jas.binarySearch(lookForNumber, orderedDS);
                    elapseTimeByRef = jas.elapseTime;
                }
            } else {
                fnAlg = () => {
                    wa.binary_search(lookForNumber, orderedDS);
                    elapseTimeByRef = wa.elapse_time();
                }
            }

            fnAlg();
            const usedMemoryInBM = jsUtils.getMemoryStatsInMB();

            return new Measurement(elapseTimeByRef, usedMemoryInBM);
        }
        break;
    case AlgNames.fibonacci:
        dataSetSizes = [
            5,  //1
            8,  //2
            10, //3
            15, //4
            20, //5
            25, //6
            30, //7
            35, //8
            40, //9
            45, //10
        ];
        reportMemory = new Report(AlgNamesReport.fibonacci, AlgMetrics.memory, paramAlgType, dataSetSizes);
        reportElapseTime = new Report(AlgNamesReport.fibonacci, AlgMetrics.elapseTime, paramAlgType, dataSetSizes);
        theAlg = (size, algType) => {
            let fnAlg = null;
            let elapseTimeByRef = null;

            if (algType === AlgTypes.js) {
                fnAlg = () => {
                    jas.fibRecursive(size);
                    elapseTimeByRef = jas.elapseTime;
                }
            } else {
                fnAlg = () => {
                    wa.fib_recursive(BigInt(size));
                    elapseTimeByRef = wa.elapse_time();
                }
            }

            fnAlg();
            const usedMemoryInBM = jsUtils.getMemoryStatsInMB();

            return new Measurement(elapseTimeByRef, usedMemoryInBM);
        }
        break;
    case AlgNames.primes:
        dataSetSizes = [
            75000,  //1
            100000, //2
            125000, //3
            250000, //4
            375000, //5
            500000, //6
            625000, //7
            750000, //8
            875000, //9
            1000000, //10
        ];
        reportMemory = new Report(AlgNamesReport.primes, AlgMetrics.memory, paramAlgType, dataSetSizes);
        reportElapseTime = new Report(AlgNamesReport.primes, AlgMetrics.elapseTime, paramAlgType, dataSetSizes);
        theAlg = (size, algType) => {
            let fnAlg = null;
            let elapseTimeByRef = null;

            if (algType === AlgTypes.js) {
                fnAlg = () => {
                    jas.sieveOfEratosthenes(size);
                    elapseTimeByRef = jas.elapseTime;
                }
            } else {
                fnAlg = () => {
                    wa.sieve_of_eratosthenes(BigInt(size));
                    elapseTimeByRef = wa.elapse_time();
                }
            }

            fnAlg();
            const usedMemoryInBM = jsUtils.getMemoryStatsInMB();

            return new Measurement(elapseTimeByRef, usedMemoryInBM);
        }
        break;
    default:
        console.warn('QS Algorithm not provided');
        break;
}

// Runner: Main thread block release timeout strategy
let i = 0;
setTimeout(() => {
    if (i < dataSetSizes.length) {
        fnCall();
    }
}, 500);

let measurements = [];
const fnCall = () => {
    // for each size
    const size = dataSetSizes[i];

    if (measurements.length < 10) {
        // do 10 measurements
        measurements.push(theAlg(size, paramAlgType));
    }
    else {
        // and AVG the 10 measurements
        const measurement = new Measurement(0, 0);
        measurement.calculateAvgOfItems(measurements);
        console.log(`Measurement ${i + 1}:`, measurement);

        // add measurement to report
        reportMemory.addReportMeasurement(measurement);
        reportElapseTime.addReportMeasurement(measurement);

        // clear array
        measurements = [];

        // move to the next size
        i++;
    }

    if (i < dataSetSizes.length) {
        setTimeout(() => {
            fnCall();
        }, 500);
    } else {
        reportMemory.printTable();
        reportMemory.printCSV();
        reportElapseTime.printTable();
        reportElapseTime.printCSV();
        ui.showLoading(false);
    }
}