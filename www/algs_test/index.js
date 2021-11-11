import * as wasm from "wasm-algorithm";
import * as jsLib from "../src/jsLib";

let x = -1;

console.log("WASM: Sieve Primes");
x = wasm.sieve_of_eratosthenes(BigInt(10));
console.log(x);

console.log("JavaScript: Sieve Primes");
x = jsLib.sieveOfEratosthenes(10);
console.log(x);

console.log("WASM: Fib");
x = wasm.fib_recursive(BigInt(3));
console.log(x);

console.log("JavaScript: Fib");
x = jsLib.fibRecursive(3);
console.log(x);

console.log('WASM passing values from JS and receiving');
x = wasm.array_back_forth([10n,20n,30n,40n]);
console.log(x);

console.log('WASM:Merge Sort');
x = wasm.main_merge_call([20n,10n,5n,45n]);
console.log(x);

console.log('JavaScript:Merge Sort');
x = jsLib.mergeSortCall([20,10,5,45]);
console.log(x);

console.log('WASM: Binary Search');
x = wasm.binary_search(1n, [1n,2n]);
console.log(x);

console.log('JavaScript: Binary Search');
x = jsLib.binarySearch(1, [1,2]);
console.log(x);