function _performanceCalc(t0, t1) {
    const elapseTime = t1 - t0;
    console.log(`JS Call took ${elapseTime} milliseconds.`);
    return elapseTime;
}

//note:
//js version of: //https://github.com/eliovir/rust-examples/blob/master/fibonacci.rs
function _fibRecursive(nth) {
    switch (nth) {
        case 0:
            throw "zero is not a right argument to fib_recursive()!";
        case 1:
        case 2:
            return 1;
        case 3:
            return 2;
        default:
            return _fibRecursive(nth - 1) + _fibRecursive(nth - 2);
    }
}

// JavaScript program for Merge Sort
// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function _merge(arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;

    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    i = 0;

    // Initial index of second subarray
    j = 0;

    // Initial index of merged subarray
    var k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function _mergeSort(arr, l, r) {
    if (l >= r) {
        return;//returns recursively
    }
    var m = l + parseInt((r - l) / 2);
    _mergeSort(arr, l, m);
    _mergeSort(arr, m + 1, r);
    _merge(arr, l, m, r);
}

export class Jas {
    constructor(elapseTime){
        this.elapseTime = elapseTime;
    }

    // https://www.geeksforgeeks.org/merge-sort/
    mergeSortCall(input) {
        this.elapseTime = 0.0;
        const t0 = performance.now();
        let end = input.length - 1;
        _mergeSort(input, 0, end);
        const t1 = performance.now();
        this.elapseTime = _performanceCalc(t0, t1);
        return input;
    }

    // Binary Search
    // Iterative function to implement Binary Search
    // https://www.geeksforgeeks.org/binary-search-in-javascript/
    binarySearch(x, arr) {
        const t0 = performance.now();
        let start = 0, end = arr.length - 1;
        // Iterate while start not meets end
        while (start <= end) {
            // Find the mid index
            let mid = Math.floor((start + end) / 2);
            // If element is present at mid, return True
            if (arr[mid] === x) {
                const t1 = performance.now();
                this.elapseTime = _performanceCalc(t0, t1);
                return mid;
            }
            // Else look in left or right half accordingly
            else if (arr[mid] < x)
                start = mid + 1;
            else
                end = mid - 1;
        }
        return -1;
    }

    //note:
    //js version of: //https://github.com/eliovir/rust-examples/blob/master/fibonacci.rs
    fibRecursive(nth) {
        const t0 = performance.now();
        const res = _fibRecursive(nth);
        const t1 = performance.now();
        this.elapseTime = _performanceCalc(t0, t1);
        return res;
    }

    // https://www.geeksforgeeks.org/sieve-of-eratosthenes/?ref=lbp
    sieveOfEratosthenes(n) {
        const t0 = performance.now();
        // Create a boolean array
        // "prime[0..n]" and
        // initialize all entries
        // it as true. A value in
        // prime[i] will finally be
        // false if i is Not a
        // prime, else true.
        let prime = Array.from({ length: n + 1 }, () => true);

        // Neither 0 nor 1 are prime
        prime[0] = false;
        prime[1] = false;

        for (let p = 2; p * p <= n; p++) {
            // If prime[p] is not changed, then it is a
            // prime
            if (prime[p] == true) {
                // Update all multiples of p
                for (let i = p * p; i <= n; i += p)
                    prime[i] = false;
            }
        }

        const res = prime
            .map((value, index) => value == true ? index : null)
            .filter(f => f);
        
        const t1 = performance.now();
        this.elapseTime = _performanceCalc(t0, t1);
        return res;
    }
}