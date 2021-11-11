mod utils;

extern crate bit_vec;

use wasm_bindgen::prelude::*;
use bit_vec::BitVec;
use std::convert::TryFrom;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

//array back and forth
#[wasm_bindgen]
pub fn array_back_forth(input: Vec<u64>) -> Vec<u64> {
    // Panic hook
    utils::set_panic_hook();
    return input;
}

fn _fib_recursive(nth: u64) -> u64 {
    match nth {
        0 => panic!("zero is not a right argument to fib_recursive()!"),
        1 | 2 => 1,
        3 => 2,
        _ => _fib_recursive(nth - 1) + _fib_recursive(nth - 2),
    }
}

// merge sort private methods
// https://www.geeksforgeeks.org/merge-sort/ 
// adapted from JS version to keep 4 params in _merge method
fn _merge(arr: &mut Vec<u64>, l: usize, m: usize, r: usize) {
    let n1 = m - l + 1;
    let n2 = r - m;

    // Create temp arrays
    let mut arr_left: Vec<u64> = vec![0; n1];
    let mut arr_right: Vec<u64> = vec![0; n2];

    // Copy data to temp arrays L[] and R[]
    for i in 0..=n1-1 {
        arr_left[i] = arr[l + i];
    }
    for j in 0..=n2-1 {
        arr_right[j] = arr[m + 1 + j];
    }

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let mut i = 0;

    // Initial index of second subarray
    let mut j = 0;

    // Initial index of merged subarray
    let mut k = l;

    while i < n1 && j < n2 {
        if arr_left[i] <= arr_right[j] {
            arr[k] = arr_left[i];
            i+=1;
        }
        else {
            arr[k] = arr_right[j];
            j+=1;
        }
        k+=1;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while i < n1 {
        arr[k] = arr_left[i];
        i+=1;
        k+=1;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while j < n2 {
        arr[k] = arr_right[j];
        j+=1;
        k+=1;
    }
}

fn _merge_sort(ori: &mut Vec<u64>, low: usize, high: usize) {
    if high == low {
        return;
    }
    let mid: usize = low + ((high - low) >> 1);
    _merge_sort(ori, low, mid);
    _merge_sort(ori, mid + 1, high);
    _merge(ori, low, mid, high);
}


#[wasm_bindgen]
pub struct Starter {
    pub elapse_time: f64
}

#[wasm_bindgen]
impl Starter {

    pub fn new() -> Starter {
        let elapse_time = 0.0;
        Starter {
            elapse_time
        }
    }

    pub fn elapse_time(&self) -> f64 {
        self.elapse_time
    }

    //mergeSort
    //https://turreta.com/2019/10/26/merge-sort-algorithm-in-rust-codes/
    pub fn main_merge_call(&mut self, input: Vec<u64>) -> Vec<u64> {
        // Panic hook
        utils::set_panic_hook();

        let t0 = utils::performance_now();

        let mut ori = input;

        let end: usize = ori.len() - 1;
        _merge_sort(&mut ori, 0, end);

        let t1 = utils::performance_now();
        
        self.elapse_time = utils::performance_calc(t0, t1);

        return ori;
    }

    //binary search iteractive
    //https://shane-o.dev/blog/binary-search-rust
    pub fn binary_search(&mut self, k: i64, items: Vec<i64>) -> i64 {
        // Panic hook
        utils::set_panic_hook();
        let t0 = utils::performance_now();

        let none = -1;
        if items.is_empty() {
            return none;
        }

        let mut low: usize = 0;
        let mut high: usize = items.len() - 1;

        while low <= high {
            let middle = (high + low) / 2;
            if let Some(current) = items.get(middle) {
                if *current == k {
                    let t1 = utils::performance_now();
                    self.elapse_time = utils::performance_calc(t0, t1);
                    return middle as i64;
                }
                if *current > k {
                    if middle == 0 {
                        return none;
                    }
                    high = middle - 1
                }
                if *current < k {
                    low = middle + 1
                }
            }
        }
        none
    }

    //source:
    //https://github.com/eliovir/rust-examples/blob/master/fibonacci.rs
    pub fn fib_recursive(&mut self, nth: u64) -> u64 {
        let t0 = utils::performance_now();
        let res = _fib_recursive(nth);
        let t1 = utils::performance_now();
        self.elapse_time = utils::performance_calc(t0, t1);
        return res;
    }

    // Notes:
    // https://bugs.webkit.org/show_bug.cgi?id=213528
    // https://exercism.io/tracks/rust/exercises/sieve/solutions/e16259bec98d4784a17739137288e9c7
    pub fn sieve_of_eratosthenes(&mut self, upper_bound: u64) -> Vec<u64> {
        // Panic hook
        utils::set_panic_hook();
        let t0 = utils::performance_now();

        let n_usize = usize::try_from(upper_bound).unwrap();
        let n_sqrt = (upper_bound as f64).sqrt().ceil() as usize;

        let mut primes = BitVec::from_elem(n_usize - 1, true);
        for i in 2..=n_sqrt {
            if primes[i - 2] {
                for j in (i.pow(2)..=n_usize).step_by(i) {
                    primes.set(j - 2, false);
                }
            }
        }
        let result = primes
            .iter()
            .zip(2..)
            .filter(|(prime, _index)| *prime)
            .map(|(_prime, index)| index)
            .collect();
        
        let t1 = utils::performance_now();
        self.elapse_time = utils::performance_calc(t0, t1);

        return result;
    }
}
