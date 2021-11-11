// To run:
// npm run test

import { expect } from "@jest/globals";
import * as jsLib from "../src/jsLib"
const js = new jsLib.Jas();

//hide performance and console messages from test
global.performance = {
    now: () => 0
}
global.console = {
    log: () => { }
}

describe("Fibonacci", () => {
    test("The fib of 3 should be 2", () => {
        expect(js.fibRecursive(3)).toBe(2);
    });
    test("The fib of 2 should be 1", () => {
        expect(js.fibRecursive(2)).toBe(1);
    });
});

describe("Primes", () => {
    test("Primes until 3 should be 2,3", () => {
        expect(js.sieveOfEratosthenes(3)).toEqual([2, 3]);
    });
});

describe("Merge Sort", () => {
    test("Sorts fine", () => {
        expect(js.mergeSortCall([4, 3, 1, 7, 2, 3, 5])).toEqual([1, 2, 3, 3, 4, 5, 7]);
    });
});

describe("Binary Search", () => {
    test("Finds the item", () => {
        expect(js.binarySearch(1, [1, 2])).toBe(0);
    });
});